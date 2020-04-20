# js 基本原理
## 1 js作用域、预编译、作用域链、闭包
## 2 js原型、原型链、继承
## 3.1 this概述
   + 在绝大多数情况下，函数的调用方式决定了this的值。this不能在执行期间被赋值，并且在每次函数被调用时this的值也可能会不同，es5引入bind的方法来设置函数的this的值，而不用考虑函数是如何被调用的，es6引入了支持词法分析的箭头函数（它在闭合的执行环境内设置this的值）
   + javascript函数中的this并不是函数定义时候确定的，而是在函数调用的时候确定的。换句话说，函数的调用方式决定了this的指向。
## 3.1.1 this全局环境
+ 无论是否在严格模式下，在全局执行环境中（在任何函数体外部）this 都指向全局对象。
``` js
  // 在浏览器中, window 对象同时也是全局对象：
console.log(this === window); // true

a = '蛮大人';
console.log(window.a); // 蛮大人

this.b = "mdr";
console.log(window.b)  // "mdr"
console.log(b)         // "mdr"
```
::: danger 提示
你可以使用 globalThis 获取全局对象，无论你的代码是否在当前上下文运行。
:::

## 3.1.2 this函数（运行内）环境
+ 在函数内部，this的值取决于函数被调用的方式。
## 3.2 javascript this的原理（阮一峰版）
   #### （1）问题的由来
``` js
    var obj = {
    foo: function () { console.log(this.bar) },
    bar: 1
    };
    var foo = obj.foo;
    var bar = 2;

    obj.foo() // 1
    foo() // 2
```
::: danger 提示
obj.foo()就是在obj环境执行，this指向obj，而一旦var foo = obj.foo，foo()就变成在全局环境执行this执行window；why？
:::
#### （2）内存的数据结构
+ JavaScript 语言之所以有this的设计，跟内存里面的数据结构有关系。
``` js
var obj = { foo:  5 };
```
::: danger 提示
上面的代码将一个对象赋值给变量obj。JavaScript 引擎会先在内存里面，生成一个对象{ foo: 5 }，然后把这个对象的内存地址赋值给变量obj。
![An image](./imgs/this1.jpg)

也就是说，变量obj是一个地址（reference）。后面如果要读取obj.foo，引擎先从obj拿到内存地址，然后再从该地址读出原始的对象，返回它的foo属性。
原始的对象以字典结构保存，每一个属性名都对应一个属性描述对象。举例来说，上面例子的foo属性，实际上是以下面的形式保存的。

![An image](./imgs/this2.jpg)

``` js
{
  foo: {
    [[value]]: 5
    [[writable]]: true
    [[enumerable]]: true
    [[configurable]]: true
  }
}
```
注意，foo属性的值保存在属性描述对象的value属性里面。


:::
#### （3）函数   
``` js
  var obj = {
    foo:function(){}
  }
``` 
::: danger 提示
 这样的结构是很清晰的，问题在于属性的值可能是一个函数 如上所示；这时，引擎会将函数单独保存在内存中，然后再将函数的地址赋值给foo属性的value属性。

 ![An image](./imgs/this3.jpg)
:::
``` js
  {
  foo: {
    [[value]]: 函数的地址
    ...
  }
}
``` 
由于函数是一个单独的值，所以它可以在不同的环境（上下文）执行。

``` js
  var f = function () {};
  var obj = { f: f };
  // 单独执行
  f()
  // obj 环境执行
  obj.f()
```

#### （4）环境变量 
+ JavaScript 允许在函数体内部，引用当前环境的其他变量。

``` js
var f = function () {
  console.log(x);
};
``` 
::: danger 提示
+ 上面代码中，函数体里面使用了变量x。该变量由运行环境提供。
+ 现在问题就来了，由于函数可以在不同的运行环境执行，所以需要有一种机制，能够在函数体内部获得当前的运行环境（context）。所以，this就出现了，它的设计目的就是在函数体内部，指代函数当前的运行环境。
:::
``` js
var f = function () {
  console.log(this.x);
}
``` 
::: danger 提示
+ 上面代码中，函数体里面的this.x就是指当前运行环境的x。
:::
``` js

var f = function () {
  console.log(this.x);
}

var x = 1;
var obj = {
  f: f,
  x: 2,
};

// 单独执行
f() // 1

// obj 环境执行
obj.f() // 2onsole.log(this.x);
}
``` 
::: danger 提示
+ 上面代码中，函数f在全局环境执行，this.x指向全局环境的x。
+ 在obj环境执行，this.x指向obj.x。
+ 回到本文开头提出的问题，obj.foo()是通过obj找到foo，所以就是在obj环境执行。一旦var foo = obj.foo，变量foo就直接指向函数本身，所以foo()就变成在全局环境执行。
:::
## 3.3 js this 之 call
## 3.4 js this 之 apply
## 3.5 js this 之 bind
## 4 页面加载
       
## 5 Event Loop
