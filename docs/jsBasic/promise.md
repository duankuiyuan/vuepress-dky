# Promise
## 1.Promise基础
### 1.1Promise基本含义
#### 基本概念
所谓的Promise，简单的来说是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上来说Promise是一个对象，从它可以获取到异步操作的消息。
#### Promise可以解决的问题
+ 多个请求并发，希望同步最终的结果。Promise.all
+ 链式异步请求的问题，回调地狱。Promise的链式调用可以解决这个问题
#### Promise对象有两个特点
+ 对象的状态不受外界影响。Promise对象代表一个异步操作，有3种状态：Pending（进行中）、Fulfilled（已成功）、和Reject（已失败）
+ 一旦状态改变就不会再变，任何时候都可以得到这个结果。Promise的状态改变只有两种可能：Pending到Fulfilled和从Pending到Rejected。只要这两种情况发生，状态就凝固了，不会再变，而是一直保持着这种结果，这时就称为Resolved。就算改变已经发生，再对Promise添加回调函数，也会立即得到这个结果
#### Promise缺点
+ 无法取消Promise，一旦新建就会立即执行，无法中途取消。
+ 当处于Pending状态时，无法得知目前发展到哪一个阶段（刚刚开始还是即将完成）
#### 基本使用
+ 构造一个Promise实例需要给Promise构造函数传入一个函数
+ 传入的函数需要有两个形参，两个形参都是function类型的参数
+ 第一个形参运行后会让Promise实例处于resolve状态，所以我们一般给第一个形参命名为resolve,使 Promise 对象的状态改变成成功，同时传递一个参数用于后续成功后的操作
+ 第二个形参运行后会让Promise实例处于reject状态，所以我们一般给第一个形参命名为reject,将 Promise 对象的状态改变为失败，同时将错误的信息传递到后续错误处理的操作
``` js
  let promise = new Promise((resolve,reject) =>{
    setTimeout(() =>{
          if(Math.random() > 0.6){
                resolve('success');
          }else{
                reject('reject');
          }
    },1000);
});
promise.then(Fulfilled,Rejected);
```
+ 如果调用resolve和reject函数时候带有参数，那么这些参数会被传递给回调函数，reject函数的参数通常是Err对象的实例，标识抛出错诶，resolve的参数除了可以是正常值外还可以是另一个promise实例   
``` js
  let p1 = new Promise((resolve,reject) =>{
    // todo...
  });
    let p2 = new Promise((resolve,reject) =>{
    resolve(p1)
  });
```
::: danger 注意
  此时p1的状态就会传递给p2，也就是说，p1的状态决定了p2的状态。如果p1的状态是pending，那么p2的回调函数就会等待p1的状态改变；如果p1的状态已经是resolved或者rejected，那么p2的回调函数会立即执行。
:::
``` js
  let p1 = new Promise((resolve,reject) =>{
    setTimeout(() =>{
      reject(new Error('fail'));
    },3000)
  });
    let p2 = new Promise((resolve,reject) =>{
      setTimeout(() =>{
        resolve(p1);
    },1000)
  });
  p2.then((res) =>{
      console.log(res)
  }).catch((err) =>{
      console.log(err)//Error:fail
  });
```
::: danger 注意
上面的代码p1是一个Promise,3秒之后变为rejected。p2的状态在1秒之后改变，resolve方法返回的是p1.由于p2返回的是另一个promise导致p2状态无效，由p1的状态改变p2的状态。所以后面的then方法都变成针对p1的。再过2秒，p1变为rejected，触发catch方法指定的回调函数
:::
### 1.2es5模拟Promise
``` js
function Promise(executor){
//立即执行new Promise((rsolve,reject)=>{})时传入的这个立函数，rsolve和reject在promise内部定义好执行时传入
  executor((data) =>{this.success(data)},(error) =>{this.error(error)});
}
Promise.prototype.resolve = function(data){
this.success(data)
}
Promise.prototype.reject = function(error){
this.error(error);
}
Promise.prototype.then =  function(successFn,errorFn){
    this.success = successFn;
    this.error = errorFn;
}
```
### 1.3es6模拟Promise
``` js
class Promise{
constructor(executor){
    executor((data) =>{this.success(data)},(error) =>{this.error(error)});
}
resolve(){
  this.success();
}
reject(){
  this.error();
}
then(successFn,errorFn){
      this.success = successFn;
      this.error = errorFn;
}
}
```
### 1.4Promise三种状态
+ Pending Promise对象实例创建时候的初始状态
+ Fulfilled 可以理解为成功的状态
+ Rejected 可以理解为失败的状态
::: danger 注意
then方法是用来指定Promise对象状态改变时候确定执行的操作，resolve时执行第一个函数即then的第一个参数（onFulfilled）reject时执行第二个函数即then的第二个参数（onRejected）
:::


### 1.5Promise做为函数的返回值（ajax）
``` js
var getJSON = function(url){
var promise = new Promise((resolve,reject)=>{
    var client = new XMLHttpRequest();
    client.open('get',url);
    client.onreadystatechange = handler;
    client.responseType = 'json';
    client.setRequestHeader("Accept","application/json");
    client.send();
    function handler(){
        if(this.readyState !== 4){
            return;
        }
        if(this.status === 200){
          resolve(this.response)
        }else{
            reject(new Error(this.statusText));
        }
    };
});
return promise;
}
```
## 3.高阶函数
### 3.1高阶函数概念
+ 如果一个函数的参数是一个函数，它就是高阶函数（回调函数）
+ 如果一个函数返回另一个函数，则当前函数为高阶函数

  ```js
  //使用before函扩展业务代码

  //定义普通业务逻辑函数
  function say(a,b){
   console.log("say",a,b)
  }
  //定义before函数 这个函数可以返回一个函数，被返回的函数将混入的逻辑（callback）和原来的业务逻辑（this）一起执行
  //before函数接受一个函数作为参数（callback）
  Function.prototype.before(callback){
           //...arg剩余运算符（将参数转化为数组）
     return (...arg) =>{//利用箭头函数改变this指向
       callback();//混入的业务逻辑，利用闭包的特性将callback保存
          //...arg展开运算符（将数组转成一个个参数传入函数）
       this(...arg);//原有的业务逻辑
     }
  }
  //
  let usedBeforeSay = say.before(function(){
    console.log("我是混入的逻辑")
  })
  usedBeforeSay("a","b");// "我是混入的逻辑" "say" "a" "b"
  ```
  ### 3.2高阶函数经典应用函数柯里化
  #### 判断数据类型
  + 1.使用typeof 缺点是无法判断具体的对象类型 typeof[] typeof{}
  + 2.使用constructor 可判断是构造函数是谁
  + 3.使用instanceof 可判断谁是谁的实例
  + 4.使用Object.prototype.toString 缺点是无法细分谁是谁的实例
  ```js
  //一般方法
  function isType(type,value){
    return Object.prototype.toString.call(value) === `[object ${type}]`
  }
  ```
  ::: danger 注意
  上述方法虽然可以实现，但是每次调用都需要传入两个参数，如果判断是同类型的会造成每次传入的参数都一样。这里可以使用柯里化函数。将接受多个参数的函数变为接受单个参数，返回另一个函数（可接受剩余参数）
  :::
  ```js
  function isType(type){
    return function(vlaue){//执行isType方法时使用了闭包的特性保存了type
        return Object.prototype.toString.call(value) === `[object ${type}]`
    }
  }
  let isArray = isType("Array");
  console.log(isArray([]))// true
  ```
  ### 通用的函数柯里化实现
  ```js
  function currying(fn,...arg){
      let len = fn.length;
      //利用闭包特性保存上次参数 arg
      return function(...args){
        let newArgs = [...arg,...args];
        if(newArgs.length < len){
           return currying(fn,...newArgs)
        }else{
           return fn(...newArgs)
        }
      }
  }
  function isType(type, value) {
      return Object.prototype.toString.call(value) === `[object ${type}]`;
  }
  let isArray = currying(isType)('Array')
  let isString = currying(isType)('String')
  ```
  ## 4异步解决after 
  ### 多个异步请求 如何获取最终结果
  ```js
  let fs = require('fs');
  let school ={}
      //利用闭包特性 保存了times 
      //闭包 函数的定义和函数的执行不在同一作用域下 形成闭包
      /**
      * 闭包理解：
      * 一个函数返回了一个内部定义函数
      * 导致函数的定义和函数的执行不在同一作用域下
      * 被返回的内部函数可以访问到原来函数内部的变量
      * 由于内部定义的函数在定义时候继承了外部函数的作用域链，被返回并保存时候连同作用域链一同保存在外部，所以当访问某个变量会沿着作用域链找到外部函数的变量
      * 
      */
  function after(times,callback){
    return function(){
        if(--times == 0){
          callback()
        }
    }
  }
  let cb = after(2,()=>{
      console.log(school)
  })

  fs.readFile('./name.txt','utf-8',function(err,data){
    school.name = data;
    cb();
  });
  fs.readFile('./age.txt','utf-8',function(err,data){
      school.age = data;
      cb();
  });

  ```
  ## 5.发布订阅模式
  ```js
  //发布订阅
  //发布订阅模式 主要分为两个部分 on 和 emit 
  //on 就是将一些函数维护到一个数组中
  //emit 就是让数组中的方法依次执行
  let fs = require('fs');
  let event = {
      arr:[],
      on(fn){
        this.arr.push(fn)
      },
      emit(){
          this.arr.forEach(fn => fn())
      }
  }
  event.on(function(){
      console.log("执行一次读取")
  })
  event.on(function(){
      if(Object.keys(school).length === 2){
          console.log(school)
      }
  })
  let school  = {}
  fs.readFile('./name.txt','utf8',function (err,data) {
      school.name = data;
      event.emit();
  });
  fs.readFile('./age.txt','utf8',function (err,data) {
      school.age = data;
      event.emit();
  });
  ```
  ## 6.观察者模式
  ### 观察者模式中有观察者和被观察者，观察者被放到被观察者中，被观察者的状态发生变化需要通知观察者。内部也是基于发布订阅模式，被观察者收集观察者，状态变化后要通知观察者。
  ```js
  function Subject(name){
  this.name = name;
  this.status = "";
  this.observes = [];
  }
  Subject.prototype.attch = function(observe){
    this.observes.push(observe)
  }
  Subject.prototype.setState = function(newStatus){
    this.status = newStatus;
    this.observes.forEach((observe)=>{
      observe.update(this);
    });
  }
  function Observe(name){
    this.name = name;
  }
  Observe.prototype.update = function(subject){
    console.log(this.name+"发现"+subject.name+"变"+subject.status)
  }
  let subject = new Subject("宝宝");
  subject.attch(new Observe("妈妈"));
  subject.attch(new Observe("爸爸"));
  subject.setState("哭哭哭");
  ```
  ## 7.Promise/A+完整实现
  ```js
    const RESOLVED = 'RESOLVED'; // 成功
    const REJECTED = 'REJECTED'; // 失败
    const PENDING = 'PENDING'; // 等待态
    //判断是否是promise
    const isPromise = value => typeof value === 'function';
    //要兼容所有promise（bluebird/q/es6-promise）
    const resolvePromise = (promise2, x, resolve, reject) => {
        if (promise2 == x) { //循环使用同一个promise 用一个类型错误结束掉promise
            return reject(new Error("不能重复使用同一个promise"))
        }
        //后续要严格判断以兼容所有的promise
        let called;
        if ((typeof x === 'object' && x != null) || typeof x === 'function') {
            try {
                let then = x.then; //可能会有异常
                if (typeof then === 'function') { //继续判断
                    //如果写成x.then会多次取值
                    then.call(x, y => {
                        //y 可能也是一个promise，需要递归解析
                        if (called) return;//防止既执行成功又执行失败
                        called = true;
                        resolvePromise(promise2, y, resolve, reject);
                    }, e => {
                        //y 可能也是一个promise，需要递归解析
                        if (called) return;//防止既执行成功又执行失败
                        called = true;
                        resolvePromise(promise2, y, resolve, reject);
                    })
                } else {//{then:'123'}
                    resolve(x)
                }
            } catch (e) {
                //y 可能也是一个promise，需要递归解析
                if (called) return;//防止既执行成功又执行失败
                called = true;
                resolvePromise(promise2, y, resolve, reject);
            }
        } else {
            resolve(x)
        }
    }
    class Promise {
        constructor(excuter) {
            this.state = PENDING;
            this.value = undefined;
            this.reason = undefined;
            this.onFulfilleCallbacks = [];
            this.onRejectCallbacks = [];
            let resolve = (value) => {
                if (value instanceof Promise) {
                    return value.then(resolve, reject)
                }
                if (this.state === PENDING) {
                    this.state = RESOLVED;
                    this.value = value;
                    this.onFulfilleCallbacks.forEach(fn => fn());
                }
            }
            let reject = (reason) => {
                if (this.state === PENDING) {
                    this.state = REJECTED;
                    this.reason = reason;
                    this.onRejectCallbacks.forEach(fn => fn());
                }

            }
            try {
                excuter(resolve, reject)
            } catch (error) {
                reject(error)
            }
        }

        //promise成功和失败的回调函数的返回值可以传递到外层的下一个then
        //如果返回的是普通值的话（不是错误不是promise就是普通值）传递到下一次的成功中，出错的
        //情况一定会走下一次的失败，可能还有promise的情况（会采用promise的状态，决定走下一次的成功还是失败）
        //错误处理，离自己最近的then方法中没有错误处理（没有写错误函数）会向下找
        //每次执行完promise的then方法后返回的都是一个新的promise
        then(onFulfilled, onReject) {
            let promise2 = new Promise((resolve, reject) => {//为了实现链式调用
                if (this.state === RESOLVED) {
                    setTimeout(() => {//用setTimeout解决不能取到promise2问题，但trycatch无法捕获异步错误
                        try {
                            let x = onFulfilled(this.value);//x可能是一个promise
                            //x为上次（第一个）then方法返回值
                            //根据x的值去判断promise应该走失败还是成功
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }

                    }, 0);

                }
                if (this.state === REJECTED) {
                    setTimeout(() => {
                        try {
                            let x = onReject(this.reason);
                            //根据x的值去判断promise应该走失败还是成功
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }

                    }, 0);

                }
                if (this.state === PENDING) {
                    this.onFulfilleCallbacks.push(() => {
                        setTimeout(() => {//可以不加定时
                            try {
                                let x = onFulfilled(this.value);
                                //根据x的值去判断promise应该走失败还是成功
                                resolvePromise(promise2, x, resolve, reject);
                            } catch (e) {
                                reject(e);
                            }

                        }, 0);

                    });
                    this.onRejectCallbacks.push(() => {
                        setTimeout(() => {//可以不加定时
                            try {
                                let x = onReject(this.reason);
                                //根据x的值去判断promise应该走失败还是成功
                                resolvePromise(promise2, x, resolve, reject);
                            } catch (error) {
                                reject(e);
                            }

                        }, 0);

                    });
                }
            });
            return promise2;
        }
        catch(errCalBack) {
            this.then(null, errCalBack)//then是第一个参数为null的then方法
        }

        //静态方法
        static resolve(data) {
            return new Promise((resolve, reject) => {
                resolve(data)
            });
        }
        static reject(reason) {
            return new Promise((resolve, reject) => {
                reject(reason)
            });
        }
        static all(promises) {
            //全部成功才成功
            //all方法可以.then说明返回的是一个promise
            return new Promise((resolve, reject) => {
                let arr = [];//用数组储存执行结果
                let index = 0;//记录执行次数
                const processData = (key, data) => {
                    arr[key] = data;
                    if (++index == promises.length) {//证明promise已经走完
                        //此处不能用arr.length == promises.length
                        resolve(arr);
                    }
                }
                for (let i = 0; i < promises.length; i++) {
                    let result = promises[i];
                    if (isPromise(result)) {
                        result.then((data) => {
                            processData(i, data);
                        }, (err) => {
                            reject(err)
                        });
                    } else {
                        processData(i, result);
                    }
                }
            });

        }
        static race(promises) {
            //谁快用谁的
            //多个接口请求用快的接口的结果
            return new Promise((resolve, reject) => {
                for (let i = 0; i < promises.length; i++) {
                    let result = promises[i];
                    if (isPromise(result)) {
                        result.then((data) => {
                            resolve(data)
                        }, (err) => {
                            reject(err)
                        });
                    } else {
                    resolve(result)
                    }
                }
            });

        }
    }
    module.exports = Promise;
  ```
  ## 7.1内部流程
  + new Promise时传入一个函数(resolve,reject) =>{}，这个函数会被立即执行；若这个函数是异步就意味着，resolve和reject执行时then方法已经执行过了，所以then方法会判断，promise的状态为RESOLVED和REJECTED时，说明传入的执行函数没有异步（resolve，reject已经被执行，状态被改变），此时then方法会直接执行回调。若promise的状态为PENDING时，说明，立即执行的函数里是异步的（resolve，reject未被执行，状态为改变），此时then方法会判断状态为PENDING，然后将回调函数储存起来，当异步逻辑执行完毕后，resolve和reject函数就会被执行，此时才会改变promise状态并且执行then方法保存的回调函数
  + new Promise时候立即执行传入的这个函数，参数 resolve和reject 为Promise内部定义好的两个函数，这两个函数会判断状态为PENDING将resolve和reject的参数保存为成功和失败的原因并且将状态改为RESOLVED和REJECTED，并且执行then方法里储存的回调函数（可能没有）
  + then(sucessFn,errFn) then方法会判断状态，为RESOLVED和REJECTED时说明resolve和reject已经执行了（Promse的函数参数不是异步）；为PENDING说明resolve和reject没有被执行（Promse的函数参数是异步），因为reslove和reject会去改变状态，此时将sucessFn和errFn储存起来，待异步流程执行之后会执行resolve和reject方法，在resolve和reject方法里面会执行储存起来的sucessFn和errFn
  ## 7.2Promise实现规范
  + Promise是一个类
  + promise有三个状态，成功状态（resolve）失败状态（reject）等待状态（pending）
  + 用户自己决定失败和成功的原因（resolve和reject的参数），成功和失败也是用户定义的（then方法的参数）
  + Promise执行期立即执行
  + Promise的实例都有一个then方法，一个参数是成功的回调，另一个是失败的回调
  + 如果执行函数发生了异常也会执行失败的逻辑
  + 如果Promise一旦成功就不能失败（只有等待状态下才能去更改状态）
  ## 7.3基本Promise
  ```js
  const PENDING = "PENDING";
  const RESOLVE = "RESOLVE";
  const REJECT = "REJECT";
  class Promise{
    constructor(excuter){
      this.status = PENDING;
      this.value = undefined;
      this.reason = undefined;
      //reject resolve 改变promise的状态,保存失败和成功的参数值
      let reject = (value)=>{
        if(this.status == PENDING){
           this.value = value;
           this.status = RESOLVE;
        }
      }
      let resolve = (reason)=>{
        if(this.status == PENDING){
           this.reason = reason;
           this.status = REJECT;
        }
      }
      try {
        //立即执行Promise的参数，实参为Promise定义的resolve和reject
        excuter(resolve,reject);
      } catch (e) {
        reject(e)
      }
    }
    then(onFullFiled,onSucess){
      if(this.status == RESOLVE){
         onFullFiled(this.value);
      }
       if(this.status == REJECT){
          onSucess(this.reason)  
      }
    }
  }

  ```
  ## 7.4Promise的then方法，excuter里是异步逻辑then的处理
  + then方法执行的时候有可能 resolve和reject还没有被执行，此时在then方法里将回调函数都存储起来，等到resolve和reject执行时候再将回调函数执行
  ```js
  const PENDING = "PENDING";
  const RESOLVE = "RESOLVE";
  const REJECT = "REJECT";
  class Promise{
    constructor(excuter){
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.onResoveCallbacks = [];
        this.onRejectCallbacks = [];
        let resolve = (value) =>{
           if(this.status == PENDING){
            this.value = value;
            this.status = RESOLVE;
            this.onResoveCallbacks.forEach(fn => fn());
           }
        }
        let reject = (reason) =>{
            if(this.status == PENDING){
              this.reason = reason;
              this.status = REJECT;
              this.onRejectCallbacks.forEach(fn => fn())
           }
        }
        try {
            excuter(resolve, reject)
        } catch (e) {
            reject(e)
        }

    }
    then(onFulfilled,onRejected){
       if(this.status == RESOLVE){
          onFulfilled(this.vaue)
       }
       if(this.status == REJECT){
          onRejected(this.reason)
       }
       if(this.status == PENDING){
          this.onResoveCallbacks.push(() =>{
            //todo...
            onFulfilled(this.value)
          });
           this.onRejectCallbacks.push(() =>{
             //todo...
            onRejected(this.reason)
          });
       }
    }
  }

  ```
  ## 7.5Promise的链式调用(普通值处理)
  + 1.promise成功和失败的回调（then方法的参数）的返回值，可以传递到外层的下一个then（then的回调函数的参数）
  + 2.如果返回的是普通值的话（不是promise且不是错误）直接传递到下次的成功中，出错的情况下一定会走到下一次的失败
  ，如果返回的是promise的话，会根据promise的状态决定下一次是成功还是失败
  + 3.错误处理，如果离自己最近的then没有错误处理函数（没有写），会向下找
  + 4.每次执行完promise.then方法后返回的都是一个新的promise，（promise一旦成功或者失败状态就不能再修改）
  ```js
  const RESOLVED = 'RESOLVED'; // 成功
  const REJECTED = 'REJECTED'; // 失败
  const PENDING = 'PENDING'; // 等待态
  class Promise {
      constructor(excuter) {
          this.state = PENDING;
          this.value = undefined;
          this.reason = undefined;
          this.onFulfilleCallbacks = [];
          this.onRejectCallbacks = [];
          let resolve = (value) => {
              if (this.state === PENDING) {
                  this.state = RESOLVED;
                  this.value = value;
                  this.onFulfilleCallbacks.forEach(fn => fn());
              }

          }
          let reject = (reason) => {
              if (this.state === PENDING) {
                  this.state = REJECTED;
                  this.reason = reason;
                  this.onRejectCallbacks.forEach(fn => fn());
              }

          }
          try {
              excuter(resolve, reject)
          } catch (error) {
              reject(error)
          }
      }
      //promise成功和失败的回调函数的返回值可以传递到外层的下一个then
      //如果返回的是普通值的话（不是错误不是promise就是普通值）传递到下一次的成功中，出错的
      //情况一定会走下一次的失败，可能还有promise的情况（会采用promise的状态，决定走下一次的成功还是失败）
      //错误处理，离自己最近的then方法中没有错误处理（没有写错误函数）会向下找
      //每次执行完promise的then方法后返回的都是一个新的promise
      then(onFulfilled, onReject) {
          let promise2 = new Promise((resolve, reject) => {//为了实现链式调用
              if (this.state === RESOLVED) {
                  let x = onFulfilled(this.value);//x为上次（第一个）then方法返回值
                  resolve(x)//将上次的then方法的返回值传给下次then方法中的回调函数
              }
              if (this.state === REJECTED) {
                  onReject(this.reason);
              }
              if (this.state === PENDING) {
                  this.onFulfilleCallbacks.push(() => {
                      onFulfilled(this.value);
                  });
                  this.onRejectCallbacks.push(() => {
                      onReject(this.reason)
                  });
              }
          });
          return promise2;
      }
  }
  ```
   ## 7.6Promise的链式调用(promise2的状态处理，resolvePromise)
   ```js
   
  const RESOLVED = 'RESOLVED'; // 成功
  const REJECTED = 'REJECTED'; // 失败
  const PENDING = 'PENDING'; // 等待态
  const resolvePromise = (promise2, x, resolve, reject) => {
    console.log(promise2)
  }
  class Promise {
      constructor(excuter) {
          this.state = PENDING;
          this.value = undefined;
          this.reason = undefined;
          this.onFulfilleCallbacks = [];
          this.onRejectCallbacks = [];
          let resolve = (value) => {
              if (this.state === PENDING) {
                  this.state = RESOLVED;
                  this.value = value;
                  this.onFulfilleCallbacks.forEach(fn => fn());
              }

          }
          let reject = (reason) => {
              if (this.state === PENDING) {
                  this.state = REJECTED;
                  this.reason = reason;
                  this.onRejectCallbacks.forEach(fn => fn());
              }

          }
          try {
              excuter(resolve, reject)
          } catch (error) {
              reject(error)
          }
      }
      //promise成功和失败的回调函数的返回值可以传递到外层的下一个then
      //如果返回的是普通值的话（不是错误不是promise就是普通值）传递到下一次的成功中，出错的
      //情况一定会走下一次的失败，可能还有promise的情况（会采用promise的状态，决定走下一次的成功还是失败）
      //错误处理，离自己最近的then方法中没有错误处理（没有写错误函数）会向下找
      //每次执行完promise的then方法后返回的都是一个新的promise
      then(onFulfilled, onReject) {
          let promise2 = new Promise((resolve, reject) => {//为了实现链式调用
              if (this.state === RESOLVED) {
                  setTimeout(() => {//用setTimeout解决不能取到promise2问题，但trycatch无法捕获异步错误
                      try {
                          let x = onFulfilled(this.value);//x可能是一个promise
                          //x为上次（第一个）then方法返回值
                          //根据x的值去判断promise应该走失败还是成功
                          resolvePromise(promise2, x, resolve, reject);
                      } catch (e) {
                          reject(e);
                      }

                  }, 0);

              }
              if (this.state === REJECTED) {
                  setTimeout(() => {
                      try {
                          let x = onReject(this.reason);
                          //根据x的值去判断promise应该走失败还是成功
                          resolvePromise(promise2, x, resolve, reject);
                      } catch (e) {
                          reject(e);
                      }

                  }, 0);

              }
              if (this.state === PENDING) {
                  this.onFulfilleCallbacks.push(() => {
                      setTimeout(() => {//可以不加定时
                          try {
                              let x = onFulfilled(this.value);
                              //根据x的值去判断promise应该走失败还是成功
                              resolvePromise(promise2, x, resolve, reject);
                          } catch (e) {
                              reject(e);
                          }

                      }, 0);

                  });
                  this.onRejectCallbacks.push(() => {
                      setTimeout(() => {//可以不加定时
                          try {
                              let x = onReject(this.reason);
                              //根据x的值去判断promise应该走失败还是成功
                              resolvePromise(promise2, x, resolve, reject);
                          } catch (error) {
                              reject(e);
                          }

                      }, 0);

                  });
              }
          });
          return promise2;
      }
  }

   ```
 ## 7.7Promise的链式调用(resolvePromise中处理循环使用同一个promise的情况)
 ```js
 const resolvePromise = (promise2, x, resolve, reject) => {
    if(promise2 == x){ //循环使用同一个promise 用一个类型错误结束掉promise
        return reject(new Error("不能重复使用同一个promise"))
    }
    //后续要严格判断以兼容所有的promise
  }
 ```
  ## 7.8Promise的链式调用(resolvePromise中根据x判断是成功还是失败)
  ```js
  //要兼容所有promise（bluebird/q/es6-promise）
  const resolvePromise = (promise2, x, resolve, reject) => {
    if(promise2 == x){ //循环使用同一个promise 用一个类型错误结束掉promise
        return reject(new Error("不能重复使用同一个promise"))
    }
    //后续要严格判断以兼容所有的promise
    if((typeof x === 'object' && x != null) || typeof x === 'function'){
        try {
          let then = x.then; //可能会有异常
          if(typeof then === 'function'){ //继续判断
              //如果写成x.then会多次取值
              then.call(x,y =>{
                  resolve(y) 
              },e =>{
                  reject(e)
              })
          }else{//{then:'123'}
              resolve(x) 
          }
        } catch (e) {
            reject(e)
        }
    }else{
        resolve(x)
    }
  }
  ```
  ## 7.9Promise的链式调用(resolvePromise中根据x的then方法的参数仍是promise)
  ```js
  //要兼容所有promise（bluebird/q/es6-promise）
  const resolvePromise = (promise2, x, resolve, reject) => {
    if(promise2 == x){ //循环使用同一个promise 用一个类型错误结束掉promise
        return reject(new Error("不能重复使用同一个promise"))
    }
    //后续要严格判断以兼容所有的promise
    let called;
    if((typeof x === 'object' && x != null) || typeof x === 'function'){
        try {
          let then = x.then; //可能会有异常
          if(typeof then === 'function'){ //继续判断
              //如果写成x.then会多次取值
              then.call(x,y =>{
                  //y 可能也是一个promise，需要递归解析
                  if(called) return;//防止既执行成功又执行失败
                  called = true;
                  resolvePromise(promise2, y, resolve, reject);
              },e =>{
                  //y 可能也是一个promise，需要递归解析
                  if(called) return;//防止既执行成功又执行失败
                  called = true;
                  resolvePromise(promise2, y, resolve, reject);
              })
          }else{//{then:'123'}
              resolve(x) 
          }
        } catch (e) {
          //y 可能也是一个promise，需要递归解析
          if(called) return;//防止既执行成功又执行失败
          called = true;
          resolvePromise(promise2, y, resolve, reject);
        }
    }else{
        resolve(x)
    }
  }
  ```
  ## 8Promise延迟对象
  ```js
  // promise的延迟对象
  Promise.defer = Promise.deferred = function () {
      let dfd = {};
      dfd.promise = new Promise((resolve,reject)=>{
          dfd.resolve = resolve;
          dfd.reject = reject;
      })
      return dfd
  }
  //延迟对象的使用
  function read(filename) {
      let dfd = Promise.defer();//避免在内部new Promise操作
      fs.readFile(filename, 'utf8', (err, data) => {
          if (err)  dfd.reject(err);
          dfd.resolve(data);
      })
      return dfd.promise
  }

  ```
## 9Promise catch方法的实现
```js
  //定义在Promise类里面
  catch(errCalBack){
     this.then(null,errCalBack)//then是第一个参数为null的then方法
  }
```
## 10Promise Promise.resolve()和Promise.reject()方法的实现
+ resolve会等待里面的promise执行完毕（递归解析resolve参数）
+ reject不会有等待效果
```js
    let resolve = (value) => {
            if(value instanceof Promise){
               return value.then(resolve,reject)
            } 
            if (this.state === PENDING) {
                this.state = RESOLVED;
                this.value = value;
                this.onFulfilleCallbacks.forEach(fn => fn());
            }
    }
    static resolve(data){
      return  new Promise((resolve,reject) =>{
            resolve(data)
        });
    }
    static reject(reason){
        return   new Promise((resolve,reject) =>{
            reject(reason)
        });
    }
```
## 10Promise finally方法的实现
+ finally不是最终的意思是无论如何都会执行的意思
+ 如果返回一个promise会等这个promise也执行完毕，（如果是失败的promise，会用失败原因传给下一个then）
```js
Promise.prototype.finally = function (callback) {
    return this.then((value)=>{
        return Promise.resolve(callback()).then(()=>value)
    },(reason)=>{
        return Promise.resolve(callback()).then(()=>{throw reason})
    })  
}
```
## 11Promise promisefy方法的实现
+ 将异步方法快速转化为promise
+ 针对node的api（因为node的异步回调第一个参数是err第二个是data）
```js
const promisfy = (fn) =>{
    return (...args) =>{
         return new Promise((resolve,reject) =>{
             fn(...args,function(err,data){
                 if(err){
                    reject(err)
                 }else{
                    resolve(data)
                 }
             });
         });
    }
}
let read = promisfy(fs.readFile)
read('./age.text').then((data)=>{
  console.log("data")
}).catch((err) =>{
    console.log(err)
})

```
## 12 Promise all实现
```js
  //判断是否是promise
  const isPromise = value => typeof value === 'function';
   static all(promises) {
        //全部成功才成功
        //all方法可以.then说明返回的是一个promise
        return new Promise((resolve, reject) => {
            let arr = [];//用数组储存执行结果
            let index = 0;//记录执行次数
            const processData = (key, data) => {
                arr[key] = data;
                if (++index == promises.length) {//证明promise已经走完
                    //此处不能用arr.length == promises.length
                    resolve(arr);
                }
            }
            for(let i = 0; i < promises.length; i++){
               let result = promises[i];
               if(isPromise(result)){
                result.then((data) =>{
                    processData(i,data);
                },(err) =>{
                    reject(err)
                });
               }else{
                   processData(i,result);
               }
            }
        });
    }
```
## 13Promise race实现
```js
   static race(promises) {
        //谁快用谁的
        //多个接口请求用快的接口的结果
        return new Promise((resolve, reject) => {
            for (let i = 0; i < promises.length; i++) {
                let result = promises[i];
                if (isPromise(result)) {
                    result.then((data) => {
                        resolve(data)
                    }, (err) => {
                        reject(err)
                    });
                } else {
                  resolve(result)
                }
            }
        });

    }
```
## 14 Promise的中断 利用promise的race方法
```js
//中断promise  一个promise正在走向成功 3000 之后成功 ，如果超过2s 就认为失败了
  const wrap = promise => {
      let abort;
      let myP = new Promise((resolve,reject)=>{
          abort = reject;
      })
      let p = Promise.race([promise,myP]);
      p.abort = abort;
      return p;
  }
  let p = wrap(promise);
  p.then(data=>{
      console.log(data);
  },(err)=>{
      console.log(err)
  })
  setTimeout(() => {
      p.abort('promise 超时'); // 中断请求
  }, 2000);
```
## 15 Promise的中断promise链
```js
  Promise.resolve(100).then().then((data)=>{
    //返回一个不成功也不失败的promise 链中的后续then方法就不执行
    return new Promise(()=>{})了
  }).then(data=>{
      console.log(data);
  },err=>{
      console.log(err);
  });
```