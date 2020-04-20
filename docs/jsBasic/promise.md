# Promise
  ## 1.Promise基础
   ### 1.1Promise基本含义
   #### 基本概念
   所谓的Promise，简单的来说是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上来说Promise是一个对象，从它可以获取到异步操作的消息。
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
  ## 2.Promise API
  ### 2.1
  ### 2.2
  ### 2.3
  ### 2.4
  ## 3.Promise/A+完整实现