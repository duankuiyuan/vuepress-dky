# vue原理
## 零、Vue初次渲染过程
+ **new Vue() => init()=> initState() => $mount() => compile() => render() => vnode => patch() => dom** 

new Vue()执行时候调用Vue.prototype.init方法，init方法中调用initState来初始化状态，随后调用vm.$mount方法，$mount中默认会先找有没有render方法，没有render会使用template，没有template会使用el中的内容，之后通过compile将template转换成render函数，然后执行mountComponent（渲染当前组件方法），在mountComponent中创建Watcher，Watcher被创建过程中会渲染页面包括：执行render方法，render执行后会生成虚拟dom，通过path方法将虚拟dom再转换成真实dom；
>new Watcher()时，会执行vm._update(vm._render());，render方法执行过程中，会将data中的数据进行取值操作，取值过程中会触发initState中观测数据的get方法，进行依赖收集（将watcher关联到当前属性上）。当数据下次被修改，触发set方法是通过此依赖（watcher）实现当前组件刷新
## 一、Vue响应式原理
## 0. Vue构造函数
#### (1)导出构造函数 Vue()
index.js === Vue框架的入口文件
```js
import {initMixin} from './init';
// Vue的核心代码 只是Vue的一个声明
function Vue(options) {
    this._init(options);
}
initMixin(Vue); // 给原型上新增_init方法
export default Vue;
```
#### (2)在init方法中初始化状态
```js
import {initState} from './state';
export function initMixin(Vue){
    Vue.prototype._init = function (options) {
        const vm  = this;
        // vue中使用 this.$options 指代的就是用户传递的属性 new Vue({data:{},methods:{}......})
        vm.$options = options
        // 初始化状态
        initState(vm)
    }
}
```
#### (3)initState方法根据不同的值进行不同的初始化操作
```js
export function initState(vm){
    const opts = vm.$options;
    if(opts.props){
        initProps(vm);
    }
    if(opts.methods){
        initMethod(vm);
    }
    if(opts.data){
        // 初始化data
        initData(vm);
    }
    if(opts.computed){
        initComputed(vm);
    }
    if(opts.watch){
        initWatch(vm);
    }
}
function initProps(){}
function initMethod(){}
function initData(){}
function initComputed(){}
function initWatch(){}
```
## 1.数据初始化
```js
import {observe} from './observer/index.js'
function initData(vm){
    // 数据初始化工作
    let data = vm.$options.data;// 用户传递的data
    data = vm._data = typeof data === 'function' ? data.call(vm) : data;

    observe(data);// 响应式原理,用来观测用户传入的data
}
```
## 2.递归属性劫持
```js
class Observer { // 观测值
    constructor(value){
        this.walk(value);
    }
    walk(data){ // 让对象上的所有属性依次进行观测
        let keys = Object.keys(data);
        for(let i = 0; i < keys.length; i++){
            let key = keys[i];
            let value = data[key];
            defineReactive(data,key,value);
        }
    }
}
function defineReactive(data,key,value){
    observe(value);// 递归实现深度检测
    Object.defineProperty(data,key,{
        get(){//  获取值的时候做一些操作
            return value
        },
        set(newValue){ // 数据更新也可以做一些操作
            if(newValue == value) return;
            observe(newValue);// 继续劫持用户设置的值，因为有可能用户设置的值是一个对象
            value = newValue
        }
    })
}
export function observe(data) {
    if(typeof data !== 'object' && data != null){
        return;
    }
    return new Observer(data);
}
```
## 3.数组方法的劫持
```js
import {arrayMethods} from './array';
class Observer { // 观测值
    constructor(value){

        // 如果是数组的话并不会对索引进行观测 因为会导致性能问题
        // 前端开发中很少很少 去操作索引 push shift unshift 
        if(Array.isArray(value)){//是数组的话数组的观测是通过重写原型方法实现
            value.__proto__ = arrayMethods; // 重写数组原型方法
            this.observeArray(value);//对数组中的每一项再次进行观测
        }else{//如果是对象
            this.walk(value);
        }
    }
    observeArray(value){
        for(let i = 0 ; i < value.length ;i ++){
            observe(value[i]);
        }
    }
}
```
#### 重写数组的原型方法
```js
// 重写数组的那些方法 7个 push shift unshift pop reverse sort splice 会导致数组本身发生变化
let oldArrayProtoMethods = Array.prototype;
export let arrayMethods = Object.create(oldArrayProtoMethods);
// arrayMethods = {} arrayMethods.__proto__ = oldArrayMethods  
let methods = [
    'push',
    'pop',
    'shift',
    'unshift',
    'reverse',
    'sort',
    'splice'
];
methods.forEach(method => {
    arrayMethods[method] = function (...args) {
        //此处重写其实写的是arrayMethods.push,
        //  value.__proto__ = arrayMethods; 这个代码代表找value（数组）的push方法时，会沿着value.__proto__ 找到arrayMethods的
        //push方法，如果没有则会沿着arrayMethods.__proto__找到了oldArrayMethods 
        const result = oldArrayProtoMethods[method].apply(this, args);
        const ob = this.__ob__;//每个被观测过的数据都会有一个__ob__属性，指向Observer的实例
        let inserted;
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args;
                break;
            case 'splice':
                inserted = args.slice(2)
            default:
                break;
        }
        if (inserted) ob.observeArray(inserted); // 对新增的每一项进行观测
        return result
    }
})
```
#### 增加__ob__属性
```js
class Observer { 
    constructor(value){
        //每个被观测过的数据都会有一个__ob__属性，在重写数组的方法中可以用它取到Observer的实例上的observeArray方法
        //，继续对添加的数据进行观测
        Object.defineProperty(value,'__ob__',{
            enumerable:false,
            configurable:false,
            value:this
        });
        // ...
    }
 }
```
## 4.数据代理
```js
function proxy(vm,source,key){
    Object.defineProperty(vm,key,{
        get(){
            return vm[source][key];
        },
        set(newValue){
            vm[source][key] = newValue;
        }
    });
}
function initData(vm){
    let data = vm.$options.data;
    data = vm._data = typeof data === 'function' ? data.call(vm) : data;
    for(let key in data){ // 将_data上的属性全部代理给vm实例  可以通过Vue的实例直接访问到vm_data上的数据
        proxy(vm,'_data',key)
    }
    observe(data);
}
```
## 二、模板编译
```js
Vue.prototype._init = function (options) {
    const vm = this;
    vm.$options = options;
    // 初始化状态
    initState(vm);
    // 页面挂载
    if (vm.$options.el) {
    	vm.$mount(vm.$options.el);
    }
}
Vue.prototype.$mount = function (el) {
    const vm = this;
    const options = vm.$options;
    el = document.querySelector(el);

    // 如果没有render方法
    if (!options.render) {
        let template = options.template;
        // 如果没有模板但是有el
        if (!template && el) {
        	template = el.outerHTML;
        }
        const render= compileToFunctions(template);
        options.render = render;
    }
}
```
> 最后将template编译成render函数
## 1.解析标签和内容
```js
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;  
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 标签开头的正则 捕获的内容是标签名
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 匹配标签结尾的 </div>
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性的
const startTagClose = /^\s*(\/?)>/; // 匹配标签结束的 >
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g
function start(tagName,attrs){
    console.log(tagName,attrs)
}
function end(tagName){
    console.log(tagName)
}
function chars(text){
    console.log(text);
}
function parseHTML(html){
    while(html){
        let textEnd = html.indexOf('<');
        if(textEnd == 0){
            const startTagMatch = parseStartTag();
            if(startTagMatch){
                start(startTagMatch.tagName,startTagMatch.attrs);
                continue;
            }
            const endTagMatch = html.match(endTag);
            if(endTagMatch){
                advance(endTagMatch[0].length);
                end(endTagMatch[1]);
                continue;
            }
        }
        let text;
        if(textEnd >= 0){
            text = html.substring(0,textEnd);
        }
        if(text){
            advance(text.length);
            chars(text);
        }
    }
    function advance(n){
        html = html.substring(n);
    }
    function parseStartTag(){
        const start = html.match(startTagOpen);
        if(start){
            const match = {
                tagName:start[1],
                attrs:[]
            }
            advance(start[0].length);
            let attr,end;
            while(!(end = html.match(startTagClose)) && (attr = html.match(attribute))){
                advance(attr[0].length);
                match.attrs.push({name:attr[1],value:attr[3]});
            }
            if(end){
                advance(end[0].length);
                return match
            }
        }
    }
}
export function compileToFunctions(template){
    parseHTML(template);
    return function(){}
}
```
## 2.生成ast语法树
语法树就是用对象描述js语法
```js
{
    tag:'div',
    type:1,
    children:[{tag:'span',type:1,attrs:[],parent:'div对象'}],
    attrs:[{name:'zf',age:10}],
    parent:null
}
```
```js
let root;
let currentParent;
let stack = [];
const ELEMENT_TYPE = 1;
const TEXT_TYPE = 3;

function createASTElement(tagName,attrs){
    return {
        tag:tagName,
        type:ELEMENT_TYPE,
        children:[],
        attrs,
        parent:null
    }
}
function start(tagName, attrs) {
    let element = createASTElement(tagName,attrs);
    if(!root){
        root = element;
    }
    currentParent = element;
    stack.push(element);
}
function end(tagName) {
    let element = stack.pop();
    currentParent = stack[stack.length-1];
    if(currentParent){
        element.parent = currentParent;
        currentParent.children.push(element);
    }
}
function chars(text) {
    text = text.replace(/\s/g,'');
    if(text){
        currentParent.children.push({
            type:TEXT_TYPE,
            text
        })
    }
}
```
## 3.生成代码
template转化成render函数的结果
```js
<div style="color:red">hello {{name}} <span></span></div>
render(){
   return _c('div',{style:{color:'red'}},_v('hello'+_s(name)),_c('span',undefined,''))
}
```
实现代码生成
```js
function gen(node) {
    if (node.type == 1) {
        return generate(node);
    } else {
        let text = node.text
        if(!defaultTagRE.test(text)){
            return `_v(${JSON.stringify(text)})`
        }
        let lastIndex = defaultTagRE.lastIndex = 0
        let tokens = [];
        let match,index;
        
        while (match = defaultTagRE.exec(text)) {
            index = match.index;
            if(index > lastIndex){
                tokens.push(JSON.stringify(text.slice(lastIndex,index)));
            }
            tokens.push(`_s(${match[1].trim()})`)
            lastIndex = index + match[0].length;
        }
        if(lastIndex < text.length){
            tokens.push(JSON.stringify(text.slice(lastIndex)))
        }
        return `_v(${tokens.join('+')})`;
    }
}
function getChildren(el) { // 生成儿子节点
    const children = el.children;
    if (children) {
        return `${children.map(c=>gen(c)).join(',')}`
    } else {
        return false;
    }
}
function genProps(attrs){ // 生成属性
    let str = '';
    for(let i = 0; i<attrs.length; i++){
        let attr = attrs[i];
        if(attr.name === 'style'){
            let obj = {}
            attr.value.split(';').forEach(item=>{
                let [key,value] = item.split(':');
                obj[key] = value;
            })
            attr.value = obj;
        }
        str += `${attr.name}:${JSON.stringify(attr.value)},`;
    }
    return `{${str.slice(0,-1)}}`;
}
function generate(el) {
    let children = getChildren(el);
    let code = `_c('${el.tag}',${
        el.attrs.length?`${genProps(el.attrs)}`:'undefined'
    }${
        children? `,${children}`:''
    })`;
    return code;
}
let code = generate(root);
```
## 4.生成render函数
```js
export function compileToFunctions(template) {
    parseHTML(template);
    let code = generate(root);
    let render = `with(this){return ${code}}`;
    let renderFn = new Function(render);
    return renderFn
}

//下面为render方法被执行的代码，所以render里面的this永远指向的都是当前的实例vm
Vue.prototype._render = function () {
        const vm = this;
        const {
            render
        } = vm.$options;
        let vnode = render.call(vm); // 去实例上 取值

        return vnode;
    }
```
## 三、渲染watcher
## 1.初始化渲染watcher
在$mount方法中，render方法生成以后会调用mountComponent(vm,el)方法
```js
import {mountComponent} from './lifecycle'
Vue.prototype.$mount = function (el) {
    const vm = this;
    const options = vm.$options;
    el = document.querySelector(el);

    // 如果没有render方法
    if (!options.render) {
        let template = options.template;
        // 如果没有模板但是有el
        if (!template && el) {
            template = el.outerHTML;
        }

        const render= compileToFunctions(template);
        options.render = render;
    }
    mountComponent(vm,el);
}
```
lifecycle.js

```js
export function lifecycleMixin() {
    Vue.prototype._update = function (vnode) {}
}
export function mountComponent(vm, el) {
    vm.$el = el;//将页面的真实dom放在实例的$el属性上
    let updateComponent = () => {

        // vm._render 通过解析的render方法 返回虚拟dom _c _v _s
        // vm._update 通过虚拟dom 创建真实的dom  
        // 将虚拟节点 渲染到页面上
        vm._update(vm._render());
    }
    new Watcher(vm, updateComponent, () => {}, true);
}
```

render.js
```js
export function renderMixin(Vue){
    Vue.prototype._render = function () {}
}
```
watcher.js
```js
let id = 0;
class Watcher {
    constructor(vm, exprOrFn, cb, options) {
        this.vm = vm;
        this.exprOrFn = exprOrFn;//用来渲染页面的updateComponent方法，方法里会vm._update(vm._render())，导致页面重新渲染
        if (typeof exprOrFn == 'function') {
            this.getter = exprOrFn;
        }
        this.cb = cb;
        this.options = options;
        this.id = id++;
        this.get();//初次渲染立即执行渲染watcher
    }
    get() {
        this.getter();
    }
}

export default Watcher;
```
>先调用_render方法生成虚拟dom,通过_update方法将虚拟dom创建成真实的dom
## 2.生成虚拟dom
```js
import {createTextNode,createElement} from './vdom/create-element'
export function renderMixin(Vue){
    // _c 创建元素的虚拟节点
    // _v 创建文本的虚拟节点
    // _s JSON.stringify
    Vue.prototype._v = function (text) { // 创建文本
        return createTextNode(text);
    }
    Vue.prototype._c = function () { // 创建元素
        return createElement(...arguments);
    }
    Vue.prototype._s = function (val) {
        return val == null? '' : (typeof val === 'object'?JSON.stringify(val):val);
    }
    Vue.prototype._render = function () {
        const vm = this;
        const {render} = vm.$options;
        let vnode = render.call(vm);
        return vnode;
    }
}
```
创建虚拟节点
```js
export function createTextNode(text) {
    return vnode(undefined,undefined,undefined,undefined,text)
}
export function createElement(tag,data={},...children){
    let key = data.key;
    if(key){
        delete data.key;
    }
    return vnode(tag,data,key,children);
}
function vnode(tag,data,key,children,text){
    return {
        tag,
        data,
        key,
        children,
        text
    }
}
// 虚拟节点 就是通过_c _v 实现用对象来描述dom的操作 （对象）

// 1) 将template转换成ast语法树-> 生成render方法 -> 生成虚拟dom -> 真实的dom
//  重新生成虚拟dom -> 更新dom
```

## 3.生成真实dom元素
将虚拟节点渲染成真实节点
```js
import {patch} './observer/patch';
export function lifecycleMixin(Vue){
    //_update方法就是执行patch方法 将真实节点赋值给$el
    Vue.prototype._update = function (vnode) {
        const vm = this;
        vm.$el = patch(vm.$el,vnode);
    }
}
```
```js
export function patch(oldVnode,vnode){
    const isRealElement = oldVnode.nodeType;
    // 1.判断是更新还是要渲染
    if(isRealElement){
        const oldElm = oldVnode;
        const parentElm = oldElm.parentNode;
        
        let el = createElm(vnode);
        parentElm.insertBefore(el,oldElm.nextSibling);
        parentElm.removeChild(oldVnode)
   		return el; //返回真实节点
    } 
}
//根据虚拟节点创建真实的节点
function createElm(vnode){
    let {tag,children,key,data,text} = vnode;
    if(typeof tag === 'string'){
        vnode.el = document.createElement(tag);
        updateProperties(vnode);
        children.forEach(child => { // 递归创建儿子节点，将儿子节点扔到父节点中
            return vnode.el.appendChild(createElm(child));
        });
    }else{
        // 虚拟dom上映射着真实dom  方便后续更新操作
        vnode.el = document.createTextNode(text);
    }
    return vnode.el
}
// 更新属性
function updateProperties(vnode){
    let newProps = vnode.data || {}; // 获取当前老节点中的属性 
    let el = vnode.el; // 当前的真实节点
    for(let key in newProps){
        if(key === 'style'){ 
            for(let styleName in newProps.style){
                el.style[styleName] = newProps.style[styleName]
            }
        }else if(key === 'class'){
            el.className= newProps.class
        }else{ // 给这个元素添加属性 值就是对应的值
            el.setAttribute(key,newProps[key]);
        }
    }
}
```
## 四、生命周期的合并
## 1.Mixin原理
mixin是Vue的全局方法
```js
import {mergeOptions} from '../util/index.js'
export function initGlobalAPI(Vue){
    Vue.options = {}; // 整合了所有的全局相关的内容
    Vue.mixin = function (mixin) {
        // 将属性合并到Vue.options上
        this.options = mergeOptions(this.options,mixin);
        return this;
    }
}
```
## 2.合并生命周期
```js
export const LIFECYCLE_HOOKS = [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeDestroy',
    'destroyed',
]
const strats = {};
//生命周期的合并策略
function mergeHook(parentVal, childValue) {
    if (childValue) {
        if (parentVal) {
            return parentVal.concat(childValue);
        } else {
            return [childValue]
        }
    } else {
        return parentVal;
    }
}
LIFECYCLE_HOOKS.forEach(hook => {
    strats[hook] = mergeHook
})
export function mergeOptions(parent, child) {
    const options = {}
    for (let key in parent) {
        mergeField(key)
    }
    for (let key in child) {//  如果已经合并过了就不需要再次合并了
        if (!parent.hasOwnProperty(key)) {
            mergeField(key);
        }
    }
     // 默认的合并策略 但是有些属性 需要有特殊的合并方式 生命周期的合并
    function mergeField(key) {
        if (strats[key]) {
            options[key] = strats[key](parent[key], child[key]);
        } else {
            if (typeof parent[key] == 'object' && typeof child[key] == 'object') {
                options[key] = {
                    ...parent[key],
                    ...child[key]
                }
            }else{
                options[key] = child[key];
            }
        }
    }
    return options
}
```
## 3.调用生命周期
```js
export function callHook(vm, hook) {
    const handlers = vm.$options[hook];
    if (handlers) {
        for (let i = 0; i < handlers.length; i++) {
            handlers[i].call(vm);
        }
    }
}
```
## 4.初始化流程中调用声明周期
```js
Vue.prototype._init = function (options) {
    const vm = this;
     // 将用户传递的 和 全局的进行一个合并 
    vm.$options = mergeOptions(vm.constructor.options,options);//
    // 初始化状态
    callHook(vm,'beforeCreate');//声明周期的调用
    initState(vm);
    callHook(vm,'created');
    if (vm.$options.el) {
    	vm.$mount(vm.$options.el);
    }
}
```
## 五、依赖收集
## 1.在渲染时存储watcher
**watcher的get方法是依赖收集的入口**
```js
class Watcher{
    // ...
    get(){
        pushTarget(this); // 把watcher存起来  Dep.target = this
        this.getter(); // 渲染watcher的执行  
        popTarget(); // 移除watcher
    }
}
```
>在Watcher的get执行时，this.getter()执行，会对页面的data里的数据进行取值操作，执行get方法时候会将Dep.target里的watcher（也就是当前watcher）收集到被取值的属性上
```js
let id = 0;
class Dep{
    constructor(){
        this.id = id++;
    }
}
let stack = [];
//全局存入watcher
export function pushTarget(watcher){
    Dep.target = watcher;
    stack.push(watcher);
}
//依赖收集后移除watcher
export function popTarget(){
    stack.pop();
    Dep.target = stack[stack.length-1];
}
export default Dep;
```
## 2.对象依赖收集
**在Object.defineProperty定义的get方法中取到依赖并通过dep实现依赖收集，当属性的set方法执行时通知watcher执行渲染**
```js
let dep = new Dep();
Object.defineProperty(data, key, {
    get() {
        if(Dep.target){ // 如果取值时有watcher
            dep.depend(); // 让watcher保存dep，并且让dep 保存watcher
        }
        return value
    },
    set(newValue) {
        if (newValue == value) return;
        observe(newValue);
        value = newValue;
        dep.notify(); // 通知渲染watcher去更新
    }
});
```
Dep类的实现
```js
class Dep{
    constructor(){
        this.id = id++;
        this.subs = [];
    }
    depend(){
        if(Dep.target){
            Dep.target.addDep(this);// 让这个watcher 记住我当前的dep,如果watcher没存过dep ，dep肯定不能存过watcher
        }
    }
    notify(){
        this.subs.forEach(watcher=>watcher.update());
    }
    addSub(watcher){
        this.subs.push(watcher);
    }
}
```
watcher
```js
constructor(){
	this.deps = [];
	this.depsId = new Set();
}
// watcher 里不能放重复的dep  dep里不能放重复的watcher
addDep(dep){
    let id = dep.id;
    if(!this.depsId.has(id)){
        this.depsId.add(id);
        this.deps.push(dep);
        dep.addSub(this);
    }
}
get() {
        pushTarget(this); // 把watcher存起来  Dep.target = this
        this.getter(); // 渲染watcher的执行  
        popTarget(); // 移除watcher
}
update(){
    this.get();
}
```
## 3.数组的依赖收集
**在Observer里定义this.dep= new Dep给数组使用收集依赖**
```js
class Observer{  
    constructor(value){  // 仅仅是初始化的操作
        this.dep = new Dep; // 给数组用的
        // vue如果数据的层次过多 需要递归的去解析对象中的属性，依次增加set和get方法
        // value.__ob__ = this; // 我给每一个监控过的对象都增加一个__ob__属性
        def(value,'__ob__',this);
        if(Array.isArray(value)){
            // 如果是数组的话并不会对索引进行观测 因为会导致性能问题
            // 前端开发中很少很少 去操作索引 push shift unshift 
            value.__proto__ = arrayMethods;
            // 如果数组里放的是对象我再监控
            this.observerArray(value); //  这里虽然递归了 但是没有依赖收集
        }else{
             // 对数组监控
            this.walk(value); // 对对象进行观测
        }
    }
    observerArray(value){ // [{}]
        for(let i = 0; i < value.length;i++){
            observe(value[i]);
        }
    }
    walk(data){
        let keys = Object.keys(data); // [name,age,address]
        // 如果这个data 不可配置 直接reurn
        keys.forEach((key)=>{
            defineReactive(data,key,data[key]);
        });
    }
}	

function defineReactive(data, key, value) {
    let childOb = observe(value);
    let dep = new Dep();
    Object.defineProperty(data, key, {
        get() {
            if(Dep.target){
                dep.depend();
                if(childOb){ 
                    childOb.dep.depend(); // 收集数组依赖
                }
            }
            return value
        },
        set(newValue) {
            if (newValue == value) return;
            observe(newValue);
            value = newValue;
            dep.notify();
        }
    })
}


arrayMethods[method] = function (...args) {
    	// ...
        ob.dep.notify()
        return result;
}
```
```js
function defineReactive(data,key,value){
    let dep = new Dep(); // 这个dep 是为了给对象使用的
    // 这里这个value可能是数组 也可能是对象 ，返回的结果是observer的实例，当前这个value对应的observer
    let childOb = observe(value); // 数组的observer实例
    Object.defineProperty(data,key,{
        configurable:true,
        enumerable:true,
        get(){ //  获取值的时候做一些操作 
           // 每个属性都对应着自己的watcher
            if(Dep.target) { // 如果当前有watcher 
                dep.depend(); // 意味着我要将watcher存起来
                if(childOb){ // *******数组的依赖收集*****
                    childOb.dep.depend(); // 收集了数组的相关依赖

                    // 如果数组中还有数组
                    if(Array.isArray(value)){
                        dependArray(value);
                    }

                }
            }
            return value;
        },
        set(newValue){ // 也可以做一些操作
            // console.log('更新数据')
            if(newValue === value) return;
            observe(newValue); // 继续劫持用户设置的值，因为有可能用户设置的值是一个对象
            value = newValue;
            dep.notify(); // 通知依赖的watcher来进行一个更新操作
        }
    });
}
function dependArray(value) {
    for (let i = 0; i < value.length; i++) {
        let current = value[i];
        current.__ob__ && current.__ob__.dep.depend();
        if (Array.isArray(current)) {
            dependArray(current)
        }
    }
}
```
**在数组原型方法重写时候ob.dep.notify()实现数组变化更新页面**
```js
export const arrayMethods = Object.create(oldArrayMethods); 

const methods = [
    'push',
    'shift',
    'unshift',
    'pop',
    'sort',
    'splice',
    'reverse'
]
methods.forEach(method=>{
    arrayMethods[method] = function (...args) { 
        const result = oldArrayMethods[method].apply(this,args); // 调用原生的数组方法
        // push unshift 添加的元素可能还是一个对象
        let inserted; // 当前用户插入的元素
        let ob = this.__ob__;
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args;
                break;
            case 'splice': // 3个  新增的属性 splice 有删除 新增的的功能 arr.splice(0,1,{name:1})
                inserted = args.slice(2)
            default:
                break;
        }
        if(inserted) ob.observerArray(inserted); // 将新增属性继续观测

        ob.dep.notify(); // 如果用户调用了 push方法 我会通知当前这个dep去更新
        return result;
    }
})
```
## 六、Vue异步更新nextTick
## 1.实现队列机制
**当渲染watcher执行时，将watcher储存起来，通过Vue的nextTick方法执行**
```js
update(){
    queueWatcher(this);
}
```
```js
import {
    nextTick
} from '../util/next-tick'
let has = {};
let queue = [];

function flushSchedulerQueue() {
    for (let i = 0; i < queue.length; i++) {
        let watcher = queue[i];
        watcher.run()
    }
    queue = [];
    has = {}
}
let pending = false
export function queueWatcher(watcher) {
    const id = watcher.id;
    if (has[id] == null) {
        has[id] = true;
        queue.push(watcher);
        if(!pending){//如果update方法执行时只执行一次nextTick方法即可，
        //flushSchedulerQueue 里面使用的queue在flushSchedulerQueue方法被执行前不耽误queue.push(watcher)
        //flushSchedulerQueue是被放到异步队列里面执行的而queue.push(watcher)会是同步执行的，肯定在异步之前执行完毕
            nextTick(flushSchedulerQueue)
            pending = true;
        }
    }
}
```
## 2.nextTick实现原理
```js
let callbacks = [];
function flushCallbacks() {
    callbacks.forEach(cb => cb());
}
let timerFunc;
if (Promise) { // then方法是异步的
    timerFunc = () => {
        Promise.resolve().then(flushCallbacks)
    }
}else if (MutationObserver) { // MutationObserver 也是一个异步方法
    let observe = new MutationObserver(flushCallbacks); // H5的api
    let textNode = document.createTextNode(1);
    observe.observe(textNode, {
        characterData: true
    });
    timerFunc = () => {
        textNode.textContent = 2;
    }
}else if (setImmediate) {
    timerFunc = () => {
        setImmediate(flushCallbacks)
    }
}else{
    timerFunc = () => {
        setTimeout(flushCallbacks, 0);
    }
}
//nextTick被调用时候会被放在数组中，等同步代码执行后会依次执行书中的函数
//框架内部放入的是flushSchedulerQueue，肯定会先于用户手动调用nextTick放入的函数执行，因此框架的函数先更新页面，用户传入的函数内就可以获取真实元素
export function nextTick(cb) {
    callbacks.push(cb);
    timerFunc();
}
```
## 七、基本diff算法
## 1.比对标签
```js
 // 如果标签不一致说明是两个不同元素
 if(oldVnode.tag !== vnode.tag){
    oldVnode.el.parentNode.replaceChild(createElm(vnode),oldVnode.el)
 }
```
>在diff过程中会先比较标签是否一致，如果标签不一致用新的标签替换掉老的标签
```js
// 如果标签一致但是不存在则是文本节点
if(!oldVnode.tag){
    if(oldVnode.text !== vnode.text){
    	oldVnode.el.textContent = vnode.text;
    }
}
```
>如果标签一致，有可能都是文本节点，那就比较文本的内容即可
## 2.比对属性
**标签相同，复用标签，更新属性**
```js
// 复用标签,并且更新属性
let el = vnode.el = oldVnode.el;
updateProperties(vnode,oldVnode.data);
function updateProperties(vnode,oldProps={}) {
    let newProps = vnode.data || {};
    let el = vnode.el;
    // 如果老的属性中有 新的属性中没有 ，在真实的dom上将这个属性删除掉
    // 比对样式
    let newStyle = newProps.style || {};
    let oldStyle = oldProps.style || {};
     // mergeOptions
    for(let key in oldStyle){
        if(!newStyle[key]){
            el.style[key] = ''
        }
    }
    // 删除多余属性
    for(let key in oldProps){
        if(!newProps[key]){
            el.removeAttribute(key);
        }
    }
    //以新的为准
    for (let key in newProps) {
        if (key === 'style') {
            for (let styleName in newProps.style) {
                // 新增样式
                el.style[styleName] = newProps.style[styleName];
            }
        } else if (key === 'class') {
            el.className = newProps.class;
        } else {
            el.setAttribute(key, newProps[key]);
        }
    }
}
```
## 3.比对子元素
```js
 // 我需要比对儿子
let oldChildren = oldVnode.children || [];
let newChildren = vnode.children || [];
if (oldChildren.length > 0 && newChildren.length > 0) {
    // 新老都有儿子 需要比对里面的儿子
    updateChildren(el, oldChildren, newChildren);

} else if (newChildren.length > 0) {
    // 新的有孩子 老的没孩子 ，直接将孩子虚拟节点转化成真实节点 插入即可
    for (let i = 0; i < newChildren.length; i++) {
        let child = newChildren[i];
        el.appendChild(createElm(child))
    }
} else if (oldChildren.length > 0) {
    // 老的有孩子 新的没孩子
    el.innerHTML = '';
}
```
## 八、diff中的优化策略
## 1.在开头和结尾新增元素
```js
function isSameVnode(oldVnode,newVnode){
    // 如果两个人的标签和key 一样我认为是同一个节点 虚拟节点一样我就可以复用真实节点了
    return (oldVnode.tag === newVnode.tag) && (oldVnode.key === newVnode.key)
}
function updateChildren(parent, oldChildren, newChildren) {
    let oldStartIndex = 0;
    // vue采用的是双指针的方式
    // vue在内部比对的过程中做了很多优化策略
    let oldStartVnode = oldChildren[0];
    let oldEndIndex = oldChildren.length - 1;
    let oldEndVnode = oldChildren[oldEndIndex];

    let newStartIndex = 0;
    let newStartVnode = newChildren[0];
    let newEndIndex = newChildren.length - 1;
    let newEndVnode = newChildren[newEndIndex];
     // 在比对的过程中 新老虚拟节点有一方循环完毕就结束
    while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
        // 优化向后追加逻辑
        if(isSameVnode(oldStartVnode,newStartVnode)){ // 如果是同一个节点 就需要比对这个元素的属性
            patch(oldStartVnode,newStartVnode);// 比对开头节点
            oldStartVnode = oldChildren[++oldStartIndex];
            newStartVnode = newChildren[++newStartIndex];
        // 优化向前追加逻辑
        }else if(isSameVnode(oldEndVnode,newEndVnode)){ 
            patch(oldEndVnode,newEndVnode); // 比较孩子 
            oldEndVnode = oldChildren[--oldEndIndex];
            newEndVnode = newChildren[--newEndIndex];
        }
    }
    if(newStartIndex <= newEndIndex){
        for(let i = newStartIndex ; i<=newEndIndex ;i++){
            let ele = newChildren[newEndIndex+1] == null? null:newChildren[newEndIndex+1].el;
            parent.insertBefore(createElm(newChildren[i]),ele);
        }
    }
}
```
## 2.头移尾、尾移头
```js
 // 头移尾  (涉及到 倒叙变成正序)
else if(isSameVnode(oldStartVnode,newEndVnode)){
    patch(oldStartVnode,newEndVnode);
    parent.insertBefore(oldStartVnode.el,oldEndVnode.el.nextSibling);
    oldStartVnode = oldChildren[++oldStartIndex];
    newEndVnode = newChildren[--newEndIndex]
// 尾部移动到头部
}else if(isSameVnode(oldEndVnode,newStartVnode)){
    patch(oldEndVnode,newStartVnode);
    parent.insertBefore(oldEndVnode.el,oldStartVnode.el);
    oldEndVnode = oldChildren[--oldEndIndex];
    newStartVnode = newChildren[++newStartIndex]
}
```
> 以上四个条件对常见的dom操作进行了优化。
## 3.暴力对比
```js
function makeIndexByKey(children) {
    let map = {};
    children.forEach((item, index) => {
    	map[item.key] = index
    });
    return map; 
}
let map = makeIndexByKey(oldChildren);
```
>对所有的孩子元素进行编号

```js
let moveIndex = map[newStartVnode.key];
if (moveIndex == undefined) { // 老的中没有将新元素插入
    parent.insertBefore(createElm(newStartVnode), oldStartVnode.el);
} else { // 有的话做移动操作
    let moveVnode = oldChildren[moveIndex]; 
    oldChildren[moveIndex] = undefined;
    parent.insertBefore(moveVnode.el, oldStartVnode.el);
    patch(moveVnode, newStartVnode);
}
newStartVnode = newChildren[++newStartIndex]
```
>用新的元素去老的中进行查找，如果找到则移动，找不到则直接插入

```js
if(oldStartIndex <= oldEndIndex){
    for(let i = oldStartIndex; i<=oldEndIndex;i++){
        let child = oldChildren[i];
        if(child != undefined){
            parent.removeChild(child.el)
        }
    }
}
```
> 如果有剩余则直接删除
```js
if(!oldStartVnode){
    oldStartVnode = oldChildren[++oldStartIndex];
}else if(!oldEndVnode){
    oldEndVnode = oldChildren[--oldEndIndex]
}
```
> 在比对过程中，可能出现空值情况则直接跳过
## 九、更新操作
```js
Vue.prototype._update = function (vnode) {
    const vm  = this;
    const prevVnode = vm._vnode; // 保留上一次的vnode
    vm._vnode = vnode;
    if(!prevVnode){
        vm.$el = patch(vm.$el,vnode); // 需要用虚拟节点创建出真实节点 替换掉 真实的$el
        // 我要通过虚拟节点 渲染出真实的dom     
    }else{
        vm.$el = patch(prevVnode,vnode); // 更新时做diff操作
    }
}
```
## 十、watch的实现原理
**watch用于监控用户的data变化，数据变化后会触发对应的watch的回调方法**
```js
let vm = new Vue({
    el: '#app',
    data(){
    	return {name:'zf'}
    },
    watch:{
        name(newValue,oldValue){
        	console.log(newValue,oldValue);
    	}
    }
});
```
**new Vue时选项中如果有watch则对watch进行初始化**
```js
if (opts.watch) {
	initWatch(vm,opts.watch);
}
```
**这里涉及了watch的三种写法,1.值是对象、2.值是数组、3.值是字符串 （如果是对象可以传入一些watch参数），最终会调用vm.$watch来实现**
```js
function initWatch(vm, watch) {
    for (const key in watch) {
        const handler = watch[key];
        // 如果结果值是数组循环创建watcher
        if (Array.isArray(handler)) {
            for (let i = 0; i < handler.length; i++) {
                createWatcher(vm,key,handler[i]);
            }
        }else{
            createWatcher(vm,key,handler)
        }
    }
}
function createWatcher(vm,exprOrFn,handler,options){
    // 如果是对象则提取函数 和配置
    if(isObject(handler)){
        options = handler;
        handler = handler.handler;
    }
    // 如果是字符串就是实例上的函数
    if(typeof handler == 'string'){
        handler = vm[handler];
    }
    return vm.$watch(exprOrFn,handler,options);
}
```
**扩展Vue原型上的方法，都通过mixin的方式来进行添加的。**
```js
stateMixin(Vue);
export function stateMixin(Vue) {
    Vue.prototype.$watch = function(exprOrFn, cb, options = {}) {
        options.user = true; // 标记为用户watcher
        // 核心就是创建个watcher
        const watcher = new Watcher(this, exprOrFn, cb, options);
        if(options.immediate){
            cb.call(vm,watcher.value)
        }
    }
}
```
**exprOrFn参数将会被转换为一个函数用来在data属性上取值**

**callback参数是用户定义的，数据发生变化后要执行的函数**

**new Watcher过程中，会执行getter方法对watcher的属性进行取值操作，当执行到data中被观测的属性时，会将此watcher收集到对应的属性上**

**当属性发生变化时，set方法会执行watcher，此时执行run方法，run方法判断这是个watch的watcher（this.user）就会执行callback，实现用户定义的函数被调用**

**关于新老值：new Watcher时，会对用传入的exprOrFn对data对应属性进行取值，保存在this.value中，等再次调用watcher时，此值则做为老值，而新的值为重新执行this.get()的结果，并且此值为下次wather执行的老值**

```js
class Watcher {
    constructor(vm, exprOrFn, callback, options) {
        // ...
        this.user = !! options.user
        if(typeof exprOrFn === 'function'){
            this.getter = exprOrFn; 
        }else{
            this.getter = function (){ // 将表达式转换成函数
                let path = exprOrFn.split('.');
                let obj = vm;
                for(let i = 0; i < path.length;i++){
                    obj = obj[path[i]];
                }
                return obj;
            }
        }
        this.value = this.get(); // 将初始值记录到value属性上
    }
    get() {
        pushTarget(this); // 把用户定义的watcher存起来  
        const value = this.getter.call(this.vm); // 执行函数 （依赖收集）
        popTarget(); // 移除watcher
        return value;
    }
    run(){
        let value = this.get();    // 获取新值
        let oldValue = this.value; // 获取老值
        this.value = value;
        if(this.user){ // 如果是用户watcher 则调用用户传入的callback
            this.callback.call(this.vm,value,oldValue)
        }
    }
}
```
**sync的实现的原理是当this.sync为真则舍弃watcher的异步更新机制，实现属性改变后立即执行了watcher的run方法**
```js
//Watcher的update方法
update() {
        if (this.sync) {
            this.run();
        }else if(this.lazy){ // 计算属性依赖的值发生了变化
            this.dirty = true;
        } else {
            queueWatcher(this);
            // console.log(this.id)
            // 等待着 一起来更新 因为每次调用update的时候 都放入了watcher
            // this.get();
        }
    }
```
## 十一、computed的实现原理
**initState中初始化computed**
```js
if (opts.computed) {
    initComputed(vm,opts.computed);
}
```
**initComputed方法会根据computed中的key创建不通的watcher,并保存起来**
```js
function initComputed(vm, computed) {
    // 存放计算属性的watcher
    const watchers = vm._computedWatchers = {};
    for (const key in computed) {
        const userDef = computed[key];
        // 获取get方法
        const getter = typeof userDef === 'function' ? userDef : userDef.get;
        // 创建计算属性watcher
        watchers[key] = new Watcher(vm, userDef, () => {}, { lazy: true });
        defineComputed(vm, key, userDef)
    }
}
```
**每个计算属性都是一个watcher，内部根据lazy:true来判定，如果是计算属性就不执行默认的方法**
```js
class Watcher {
    constructor(vm, exprOrFn, callback, options) {
        this.vm = vm;
        this.dirty = this.lazy
        // ...
        this.value = this.lazy ? undefined : this.get(); // 调用get方法 会让渲染watcher执行
    }
} 
```
**默认计算属性需要保存一个dirty属性，用来实现缓存功能**

**将computed的属性都定义在vm实例上，这样vm上访问计算属性就能执行用户自定义方法**
**但是为了实现缓存效果，也就是计算属性用到的值如果没发生变化，取值计算属性时，应该不执行用户定义的方法。因此，get方法不是直接使用用户定义的方法，而是使用createComputedGetter方法，此方法会调用watcher，让watcher来执行用户定义的方法**
```js
function defineComputed(target, key, userDef) {
    if (typeof userDef === 'function') {
        sharedPropertyDefinition.get = createComputedGetter(key)
    } else {
        sharedPropertyDefinition.get = createComputedGetter(userDef.get);
        sharedPropertyDefinition.set = userDef.set;
    }
    // 使用defineProperty定义
    Object.defineProperty(target, key, sharedPropertyDefinition)
}
```
**创建具有缓存功能的get方法**

**通过vm对计算属性取值时，会走到定义的get方法中，get方法会根据dirty的值来判断是否执行watcher（用户定义的方法）**

**watcher.dirty为ture才会执行，因为watcher.evaluate内部取值（执行用户定义的方法）之后会将dirty设为false**
**因此需要在计算属性内部用到的属性值变化后重新将dirty设置为true**
```js
function createComputedGetter(key) {
    return function computedGetter() {
        const watcher = this._computedWatchers[key];
        if (watcher) {
            if (watcher.dirty) { // 如果dirty为true
                watcher.evaluate();// 计算出新值，并将dirty 更新为false
            }
            // 如果依赖的值不发生变化，则返回上次计算的结果
            return watcher.value
        }
    }
}
```
**watcher.evaluate()用来执行计算属性的watcher，并将dirty设为false**
```js
evaluate() {
    this.value = this.get()
    this.dirty = false
}
//当依赖的属性变化时，会通知watcher调用update方法，此时我们将dirty置换为true。这样再取值时会重新进行计算。
update() {
    if (this.lazy) {
        this.dirty = true;
    } else {
        queueWatcher(this);
    }
}
```
**如果计算属性在模板中使用，就让计算属性中依赖的数据也记录渲染watcher,这样依赖的属性发生变化也可以让视图进行刷新**
```js
depend() {
	let i = this.deps.length
	while (i--) {
		this.deps[i].depend()
	}
}
function createComputedGetter(key){
    return function (){ // 添加了缓存,通过watcher来添加的
        // 拿到了刚才的watcher
        let watcher = this._computedWatchers[key];
        if(watcher.dirty){ // 默认第一次取值dirty为true 就调用用户的方法
            watcher.evaluate();//会触发 计算属性方法里的数据取值操作，取值操作触发数据观测的get方法触发依赖收集
        }
        if(Dep.target){
            // watcher 指代的是计算属性watcher
            watcher.depend(); // 渲染watcher 也一并收集起来
        }
        return watcher.value;
    }   
}
```
### computed总结
+ 1.初始化computed ，每个计算属性都会创建一个对应的watcher，这个wtcher的执行就代表着计算属性中用户定义的方法的执行
+ 2.创建计算属性watcher，内部根据lazy:true来判定，如果是计算属性就不执行默认的方法
+ 3.通过Object.defineProperty将computed的属性都定义在vm实例上，访问vm将会执行计算属性的方法。但是为了实现缓存效果，也就是计算属性用到的值如果没发生变化，取值计算属性时，应该不执行用户定义的方法。因此，get方法不是直接使用用户定义的方法，而是使用createComputedGetter方法，此方法会调用watcher，让watcher来执行用户定义的方法
4. 通过vm对计算属性取值时，会走到定义的get方法中，get方法会根据dirty的值来判断是否执行watcher（用户定义的方法）。watcher.dirty为ture才会执行，否则返回watcher.value。因为watcher.evaluate内部取值（执行用户定义的方法）之后会将dirty设为false 因此需要在计算属性内部用到的属性值变化后重新将dirty设置为true
5. watcher.evaluate()用来执行计算属性的watcher，并将dirty设为false。
6. 如果计算属性在模板中使用，就让计算属性中依赖的数据也记录渲染watcher,这样依赖的属性发生变化也可以让视图进行刷新
> new Watch()不执行方法 dirty为true => 对计算属性取值时执行方法，并且将值保存this.vaue，设为false ==> 计算属性依赖的数据不变化，再次取值由于dirty为false，不执行方法直接返回watcher.value => 当计算属性依赖的数据发生变化触发watcher的update，将dirty设为true，此时会触发页面渲染 => 页面的渲染会触发计算属性重新取值，触发Object.defineProperty的get方法，此时会通过计算属性的watcher.evaluate取值，由于dirty已经被改为true，所以重新执行方法取到新值。

总的来说，计算属性方法中使用的属性收集了计算属性watcher，当属性变化后watcher的update方法只是将dirty设为了true，真正执行方法的时候是，计算属性被取值操作时候，通过Object.defineProperty的get找到了watcher.evalute,执行了计算属性watcher的方法
## 十二、计算属性与watcher的不同
+ watcher没有缓存，在new Watcher()时，执行get方法，get的方法会做取值操作并保存值，此时做取值操作的属性收集了当前的watcher，属性更新时触发watcher的update方法，重新取值为新值并执行用户的callback方法
+ computed没有缓存，new Watcher时，不执行get方法（也就是计算属性默认不进行取值操作，而watcher默认执行取值操作保存为老值），当对计算属性被取值时，才通过Object.defineProperty为计算属性的get方法通过watcher.evalute去进行取值操作，此时进行依赖收集，计算属性使用的属性都依赖了当前数算属性watcher，当属性变化触发计算属性watcher的update，但不执行用户的方法，只是将dirty改为true，触发渲染watcher，渲染watcher渲染页面时触发计算属性取值操作，取值操作的get触发watcher.evalute取到新值

## 十三、组件渲染