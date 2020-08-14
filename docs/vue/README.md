# vue
## 库与组件
+ 库是将代码集合成一个产品，库是我们调用库中的方法实现自己的功能
+ 框架是为了解决一类问题而开发的产品，框架是我们按照规范在指定位置编写好代码，框架帮助我们调用
## MVC与MVVM
+ 传统的MVC只的是指，用户操作会请求服务端路由，路由会调用对应控制器来处理，控制器会调用数据层获取数据，将结果返回给视图层，页面重新渲染
+ MVVM 传统的前端会手动将数据渲染到页面上，MVVM不需要用户操作dom元素，将数据绑定到viewModel层，会自动将数据渲染到页面上，试图变化会通知viewModel层更细数据。ViewModel是MVVM模式中的桥梁
```
Vue并没有完全遵循MVVM模型，严格的MVVM模式中,View层不能直接和Model层通信,
只能通过ViewModel来进行通信。
```
## 组件基础
### 组件分为两种
+ 全局组件
+ 局部组件
### 为什么要使用组件开发
+ 抽离组件实现复用效果
+ 方便维护代码
+ 提高页面更新效率，因为更新时候是组件级别的更新，给每个组件添加一个watcher
### 组件使用
+ 组件其实就是一个对象，组件实例化过程会通过当前传入的对象创建实例，将当前的组件相关html js css放在一起
```js
// 定义一个名为 button-counter 的新组件
Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})
//使用
<div id="components-demo">
  <button-counter></button-counter>
</div>
//初始化vue
new Vue({ el: '#components-demo' })
```
+ 可以通过Vue.extend构建一个子类，实现手动挂载
```js
 // 构建一个子类
let Ctor = Vue.extend({
    template:'<div>{{msg}}</div>',
    data(){ // data必须是一个函数 为了防止组件之间的数据相互引用
        return {msg:'hello'}
    }
})
// 我们可以手动挂载组件
// new Vue().$mount()
//$mount()方法如果传入参数el 创建并挂载到 el (会替换 el)；如果没有传入参数，将会被渲染为文档之外的参数，必须使用dom将其插入到页面
document.body.appendChild(new Ctor().$mount().$el);
console.log(Ctor) // 返回的是一个子的构造器


// Vue.component 会调用这个Vue.extend方法
Vue.component('my-component',Ctor)
// 组件的使用可以在父级的模板中使用 
let vm = new Vue({
    el:'#app',
});
```
::: danger 注意
在组建中data必须是一个函数，为了防止组件复用时候，组件之间的数据相互引用
:::
## 组件间参数传递
### 1.父子组件通信：父传给子通过props，子传给父通过$on,$emit（发布订阅）
### 2.获取父子组件实例的方式$parent、$children
### 3.在父组件中提供数据子组件进行消费provide、inject
### 4.ref获取实例的方法调用组件的属性或者方法
### 5.Event Bus实现跨组件通信。Vue.prototype.$bus = new Vue
### 6.vuex状态管理
### 7.$attrs $listeners
**$attrs**包含了父作用域中不作为 prop 被识别 (且获取) 的特性绑定 (class 和 style 除外)。当一个组件没有声明任何prop 时，这里会包含所有父作用域的绑定 (class 和 style 除外)，并且可以通过 v-bind="$attrs" 传入内部组件——在创建高级别的组件时非常有用。
简单点讲就是包含了所以父组件在子组件上设置的属性（除了prop传递的属性、class 和 style ）。

**$listeners**包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。它可以通过 v-on="$listeners" 传入内部组件——在创建更高层次的组件时非常有用。
简单点讲它是一个对象，里面包含了作用在这个组件上所有的监听器（监听事件），可以通过 v-on="$listeners" 将事件监听指向这个组件内的子元素（包括内部的子组件）。

## 动态组件
```html
<!-- 组件会在 `currentTabComponent` 改变时改变 -->
<component v-bind:is="currentTabComponent"></component>
```
## 异步组件
在大型应用中，我们可能需要将应用分割成小一些的代码块，并且只在需要的时候才从服务器加载一个模块。为了简化，Vue 允许你以一个工厂函数的方式定义你的组件，这个工厂函数会异步解析你的组件定义。Vue 只有在这个组件需要被渲染的时候才会触发该工厂函数，且会把结果缓存起来供未来重渲染。例如：

```html
Vue.component('async-example', function (resolve, reject) {
  setTimeout(function () {
    // 向 `resolve` 回调传递组件定义
    resolve({
      template: '<div>I am async!</div>'
    })
  }, 1000)
})
```
如你所见，这个工厂函数会收到一个 resolve 回调，这个回调函数会在你从服务器得到组件定义的时候被调用。你也可以调用 reject(reason) 来表示加载失败。这里的 setTimeout 是为了演示用的，如何获取组件取决于你自己。一个推荐的做法是将异步组件和 webpack 的 code-splitting 功能一起配合使用：
```html
Vue.component('async-webpack-example', function (resolve) {
  // 这个特殊的 `require` 语法将会告诉 webpack
  // 自动将你的构建代码切割成多个包，这些包
  // 会通过 Ajax 请求加载
  require(['./my-async-component'], resolve)
})
```
你也可以在工厂函数中返回一个 Promise，所以把 webpack 2 和 ES2015 语法加在一起，我们可以这样使用动态导入：
```html
Vue.component(
  'async-webpack-example',
  // 这个动态导入会返回一个 `Promise` 对象。
  () => import('./my-async-component')
)
```

当使用局部注册的时候，你也可以直接提供一个返回 Promise 的函数：

```html
new Vue({
  components: {
    'my-component': () => import('./my-async-component')
  }
})
```
## vm.$forceUpdate（）
迫使 Vue 实例重新渲染。注意它仅仅影响实例本身和插入插槽内容的子组件，而不是所有子组件。
## vm.$nextTick()
将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。它跟全局方法 Vue.nextTick 一样，不同的是回调的 this 自动绑定到调用它的实例上。
## vue.$mount()
如果 Vue 实例在实例化时没有收到 el 选项，则它处于“未挂载”状态，没有关联的 DOM 元素。可以使用 vm.$mount() 手动地挂载一个未挂载的实例。

如果没有提供 elementOrSelector 参数，模板将被渲染为文档之外的的元素，并且你必须使用原生 DOM API 把它插入文档中。

这个方法返回实例自身，因而可以链式调用其它实例方法。
```js
var MyComponent = Vue.extend({
  template: '<div>Hello!</div>'
})

// 创建并挂载到 #app (会替换 #app)
new MyComponent().$mount('#app')

// 同上
new MyComponent({ el: '#app' })

// 或者，在文档之外渲染并且随后挂载
var component = new MyComponent().$mount()
document.getElementById('app').appendChild(component.$el)
```
## vue.component（）
注册或获取全局组件。注册还会自动使用给定的 id 设置组件的名称
```js
// 注册组件，传入一个扩展过的构造器
Vue.component('my-component', Vue.extend({ /* ... */ }))

// 注册组件，传入一个选项对象 (自动调用 Vue.extend)
Vue.component('my-component', { /* ... */ })

// 获取注册的组件 (始终返回构造器)
var MyComponent = Vue.component('my-component')
```
## Vue.compile( template )
将一个模板字符串编译成 render 函数。
## vue.mixin（）
全局注册一个混入，影响注册之后所有创建的每个 Vue 实例。插件作者可以使用混入，向组件注入自定义的行为。不推荐在应用代码中使用。
## vue.extend（）
使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。

data 选项是特例，需要注意 - 在 Vue.extend() 中它必须是函数

```html
<div id="mount-point"></div>
```
```js
// 创建构造器
var Profile = Vue.extend({
  template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
  data: function () {
    return {
      firstName: 'Walter',
      lastName: 'White',
      alias: 'Heisenberg'
    }
  }
})
// 创建 Profile 实例，并挂载到一个元素上。
new Profile().$mount('#mount-point')
```
## render()
字符串模板的代替方案，允许你发挥 JavaScript 最大的编程能力。该渲染函数接收一个 createElement 方法作为第一个参数用来创建 VNode。

如果组件是一个函数组件，渲染函数还会接收一个额外的 context 参数，为没有实例的函数组件提供上下文信息。

Vue 选项中的 render 函数若存在，则 Vue 构造函数不会从 template 选项或通过 el 选项指定的挂载元素中提取出的 HTML 模板编译渲染函数。
## keep-alilve
+ Props：
  - include - 字符串或正则表达式。只有名称匹配的组件会被缓存。
  - exclude - 字符串或正则表达式。任何名称匹配的组件都不会被缓存。
  - max - 数字。最多可以缓存多少组件实例。
+ 用法

\<keep-alive> 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。和 \<transition> 相似，\<keep-alive> 是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在组件的父组件链中。

当组件在 \<keep-alive> 内被切换，它的 activated 和 deactivated 这两个生命周期钩子函数将会被对应执行。 
```html
<!-- 基本 -->
<keep-alive>
  <component :is="view"></component>
</keep-alive>

<!-- 多个条件判断的子组件 -->
<keep-alive>
  <comp-a v-if="a > 1"></comp-a>
  <comp-b v-else></comp-b>
</keep-alive>

<!-- 和 `<transition>` 一起使用 -->
<transition>
  <keep-alive>
    <component :is="view"></component>
  </keep-alive>
</transition>
``` 
## 选项 el
提供一个在页面上已存在的 DOM 元素作为 Vue 实例的挂载目标。可以是 CSS 选择器，也可以是一个 HTMLElement 实例。

在实例挂载之后，元素可以用 vm.$el 访问。

如果在实例化时存在这个选项，实例将立即进入编译过程，否则，需要显式调用 vm.$mount() 手动开启编译。
## vm.$el
Vue 实例使用的根 DOM 元素。
## vm.$data
Vue 实例观察的数据对象。Vue 实例代理了对其 data 对象 property 的访问。
## vm.$props
当前组件接收到的 props 对象。Vue 实例代理了对其 props 对象 property 的访问。
## vm.$options
用于当前 Vue 实例的初始化选项。需要在选项中包含自定义 property 时会有用处：
```js
new Vue({
  customOption: 'foo',
  created: function () {
    console.log(this.$options.customOption) // => 'foo'
  }
})
```
## $emit()
触发当前实例上的事件。附加参数都会传给监听器回调。

## $on()
监听当前实例上的自定义事件。事件可以由 vm.$emit 触发。回调函数会接收所有传入事件触发函数的额外参数。
```js
vm.$on('test', function (msg) {
  console.log(msg)
})
vm.$emit('test', 'hi')
// => "hi"
```
## provide / inject
父组件provide提供数据，子组件inject使用数据