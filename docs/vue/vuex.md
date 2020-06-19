# vuex
## State|Getter|Mutation|Action|Module
```js
//Vuex.Store 是一个类接受一个对象作为参数 对象中包含 state getters mutations actions
let store = new Vuex.Store({
    //state用来存储响应式的状态数据，数据发生改变触发页面更新
    //可使用this.$store.state.那么使用
   state:{
       name:"蛮大人",
       age:10
   },
   //getters类似state的计算属性，可用来访问数据，一般使用在组件的计算属性中
   //this.$store.getters.getName
   getters:{
       getName:state =>{
           return state.name
       },
       getAge:state =>{
           return state.age +1
       }
   },
   //mutations 用来同步操作state,避免状态的修改不可追踪
   //this.$store.commit('setName', '蛮大人')
   mutations:{
     setName:(state,name) =>{
       state.name = name;
     },
     setAge:(state,age) =>{
       state.age = age;
     },
   },
   //actions 用来操作mutations actions的放啊里面可以使用异步逻辑
   //this.$store.dispatch('SETNAME')
   actions:{
      SETNAME({commit},name){
        commit("setName",user.name);  
      }
   }
})
//state

```
## Vuex的基本实现
### 1.install方法
### 2.vuex中state的实现
### 3.actions和mutations的实现
## Vuex的module的实现
## Vuex插件