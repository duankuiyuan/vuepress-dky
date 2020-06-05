# Vue生命周期
## 生命周期
![An image](./imgs/lifeCycle.png)
## 钩子函数
### Vue.mixin
```js
Vue.mixin({ //  globalApi 里有
    beforeCreate(){
        console.log('初始化前的公共逻辑1')
    },
    data(){
        return {aa:'hello xx'}
    },
    methods:{
        fn(){

        }
    },
    mounted(){
        console.log('混合的')
    }
})
```

::: danger 注意
Vue.mixin()用来抽离公共方法和编写插件（ vuex ， vue-router）；使用Vue.mixin()会导致这些方法的来源不明，Vue3.0 compositionApi 来解决这个问题
:::
### 钩子函数
#### 生命周期中都会有this 指向的是当前实例,生命周期是同步执行的
```js
let vm = new Vue({
    el:"#app",
    beforeCreate(){
        //创建前
        //初始化之前，没有进行数据观测，只是调用了初始化父子关系及内部的事件(像methods,watch等已生成)
        //一般情况下会混入公共逻辑 Vue.mixin
         console.log('beforeCreate',this);

    },
    created(){
        //没有真实的挂载元素，只是初始化数据，无法获取到dom元素
         console.log('created',this);
    },
    beforeMount(){
        //第一次调用render之前执行
      console.log('before mount')
    },
    
    render(h){
        //Vue 选项中的 render 函数若存在，则 Vue 构造函数不会从 template 选项或通过 el 选项指定的挂载元素中提取出的 HTML 模板编译渲染函数。
        console.log('render')
        return h('div',this.msg+this.aa)
    },
    mounted(){
      //创建出真实的dom，替换掉老的节点，vm.$el替换掉el
      //vm.$el 渲染的真实dom
        console.log('挂载完成');
        console.log(this);
    },
    beforeUpdate(){ // 可以做一些合并更新的操作
                console.log('更新前')
    },
    updated(){ // 不要在更新数据了
                console.log('更新后')
     },
    beforeDestroy(){
      //做自定义事件的解绑 $off 可以去取消dom的事件绑定  定时器的清理
        console.log('更新前')
    },
    destroyed(){
         //基本用不到
          console.log('销毁完成')
    },

})
vm.msg = 'world'
vm.$destroy(); // 手动销毁 只是移除监听
```
::: danger 注意
ajax 应该在哪里发请求 (异步请求一定是在 mounted 之后才会执行)；
如果开发的是前端vue项目 mounted中；
服务端渲染的vue 不支持 mounted 在服务器中没有dom概念
:::
## 父子组件
父组件先进行beforeCreate  created  beforeMount render； 

 渲染子组件 beforeCreate created beforeMount mounted； 
 
  再进行父组件mounted 