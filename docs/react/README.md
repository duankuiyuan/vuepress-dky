# react
## react概述
+ React 是一个用于构建用户界面的javascript库，核心专注于视图，目的是实现组件化开发
    ```
    组件的特性：
    1.可组合：一个组件可以和其他组件一起使用，或者可以直接嵌套在其他组建的内部
    2.可复用：每个组件都具有独立的功能，它可以被使用在多个场景中
    3.可维护：每个组件仅仅包含自身的逻辑，更容易被理解和维护
    ```
+ 开发环境
    ```
    cnpm i create-react-app -g
    create-react-app react2019
    cd react2019
    yarn start
    ```
+ react.js 是 React 的核心库
+ react-dom.js 是提供与DOM相关的功能,内部比较重要的方法是render,它用来向浏览器里插入DOM元素
## JSX
### 什么是JSX
+ jsx是一种将js和html混合的语法，将组件的结构、数据甚至样式都聚合在一起定义组件
+ jsx其实只是一种语法糖，最终会通过babel转成createElement语法
+ jsx表达式有且仅有一个根节点 React.Fragment
### React元素
+ 元素是构成React应用的最小单位
+ 元素用来描述屏幕上的内容
+ React当中的元素本质上是普通的js对象，ReactDom来确保浏览器中的DOM数据和React元素保持一致
```js
    //jsx表达式
    <h1 className="title" style={{color:'red'}}>hello</h1>
    //React写法
    React.createElement("h1", {
    className: "title",
    style: {
        color: 'red'
    }
    }, "hello");
    //最终返回结果
    {
    type:'h1',
    props:{
        className: "title",
        style: {
        color: 'red'
        }
    },
    children:"hello"
    }
```
### jsx使用
+ 可以任意的在jsx中使用javascript表达式，jsx中的表达式要包含在大括号里
+ jsx并不是html，在jsx中属性不能包含关键字，像class这种需要写成className，属性名需要使用驼峰命名法
+ jsx对象在if中使用
```js
import React from 'react';
import ReactDOM from 'react-dom';
function greeting(name) {
    if (name) {
      return <h1>Hello, {name}!</h1>;
    }
    return <h1>Hello, Stranger.</h1>;
  }
  let name = 'zhufeng';
  const element = greeting(name);

  ReactDOM.render(
    element,
    document.getElementById('root')
  );
```
+ jsx在for中使用
```js
    import React from 'react';
    import ReactDOM from 'react-dom';
    let names = ['张三','李四','王五'];
    let elements = [];
    for(let i=0;i<names.length;i++){
    elements.push(<li>{names[i]}</li>);
    }
    ReactDOM.render(
    <ul>
        {elements}
    </ul>,
    document.getElementById('root')
    );
```
+ null、undefined、false不会显示在表达式中
## 元素的更新与渲染
+ React元素都是不可变的，当元素被创建后是无法改变内容和属性的，一个元素就好像动画里的一帧，它代表应用界面在某一时间点的样子
+ 更新界面的唯一办法是创建一个新元素，然后将它传入ReactDom的render方法中
+ ReactDOM首先会比较元素先后的不同，在渲染过程中只会更新改变了的部分
+ 即便我们每秒都创建了一个描述整个UI树的新元素，React DOM 也只会更新渲染文本节点中发生变化的内容
## 组件
+ 函数组件返回一个React元素
+ 类组件必须继承React.Component,必须提供render函数，用于组件渲染
+ 组件名称的首字母必须大写
## 组件属性
+ 对于函数组件，属性会作为一个对象的属性，传递给函数的参数
+ 对于类组件，属性会作为一个对象的属性，传递给构造函数的参数
+ 组件的属性应该使用小驼峰命名法
+ React中的数据是自上而下流动，数据属于谁谁才有权利改动
+ React元素本身就是一个组件（内置组件）
## 组件的状态
+ 组将的状态仅在类组件中生效
+ 组件可以通过状态（state）维护数据
+ 组建中不能直接该状态，必须是用setState方法来更改状态，一旦调用setState方法，就会导致当前组件重新渲染
+ 出于性能考虑，React 可能会把多个 setState() 调用合并成一个调用
+ 因为 this.props 和 this.state 可能会异步更新，所以你不要依赖他们的值来更新下一个状态
+ 可以让 setState() 接收一个函数而不是一个对象。这个函数用上一个 state 作为第一个参数
+ props：该数据是由组件的使用者传递的数据，所有权不属于组件自身，因此组件无法改变该数组
+ state：该数组是由组件自身创建的，所有权属于组件自身，因此组件有权改变该数据
## 深入认识setState
+ setState中状态的改变可能是异步的
  + 如果改变状态的代码处于某个html元素的事件中，则是异步的，否则是同步的
+ setState第二个参数接收一个函数，在状态改变后（render执行后）可获取改变后的sate
+ setState第一个参数可接受一个函数（解决多次改变状态的情况）
```js
state = {
    n:0
}
this.setState({
    n:this.state.n +1
})
this.setState({
    n:this.state.n +1
})
this.setState({
    n:this.state.n +1
})
//此时n的值仍为1
//因为setState是异步执行的 当执行时候n的初始值始终为0
this.setState((state)=>{n:state.n +1});
this.setState((state)=>{n:state.n +1});
this.setState((state)=>{n:state.n +1});
//此时n的值为3
//因为(state)=>{n:state.n +1} 中的state是被改变之后的，且该函数也是异步直至执行的
```
+ react会队setState进行优化，将多个setState进行合并，将多次状态改变完成过后，再统一对state进行改变，出发render函数。所以上述情况状态改了三次，render只触发一次
