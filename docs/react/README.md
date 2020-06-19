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
