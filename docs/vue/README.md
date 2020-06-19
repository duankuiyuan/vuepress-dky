# vue
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
## 动态组件
## 异步组件
## 计算属性computed
## 侦听器watch
## 插槽
## vm.$forceUpdate（）
## vm.$nextTick()
## vue.$mount()
## vue.component（）
## Vue.compile( template )
## vue.mixin（）
## vue.extend（）
## render()
## keep-alilve
## 选项 el
## vm.$el
## vm.$data
## vm.$props
## vm.$options
## $emit()
## $on()
## provide / inject