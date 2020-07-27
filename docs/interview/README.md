# 函数柯里化
## 柯里化
### 柯里化，curring，是把接受多个参数的函数转变成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术
 ``` js
   //普通的add函数
   function add(x,y){
    return x + y;
   }
   //柯里化后的函数
   function curringAdd(x){
       return function(y){
           return x + y;
       }
   }
  
  ```
  ### 简洁版实现
  ```js
  function curry(fn){
      var args = Array.prototype.slice.call(arguments,1);//利用闭包特性 保存除了fn之外的参数
     return function(){
         var innerArgs = Array.prototype.slice.call(arguments);//柯里化后的函数curryAdd调用时传的参数
         var finalArgs = args.contact(innerArgs);// 最初的函数add执行所需要的的参数
         return fn.apply(null,finalArgs);
     }
  }
    function add(x,y,z){
     return x+y+z
  }
  var curryAdd = curry(add,1);
  console.log(curryAdd(2,3))//6
  console.log(curryAdd(1,2))//4
  ```
  ### 加强版实现
  ```js
  function curry(fn,...args){
     var arg = args || [];
     var length = fn.length;
      return function(){
          var newArgs = args.concat(Array.prototype.slice.call(arguments));
          if(newArgs.length < length){
           return curry.call(this,fn,...newArgs);
          }else{
             return fn.apply(null,newArgs);
          }
         
      }
  }
  function add(x,y,z){
   return x  + y + z;
  }
  var add1 = curry(add);
  let sum = add1(1)(2)(3);
  console.log(sum) //6
  ```
  ### 柯里化好处
  + 1.参数复用
  ```js
  //字符验证函数

  //普通封装 一个可接收多个参数的函数
  function check(reg, txt){
      return reg.test(reg, txt)
  }
  check(/\d+/g, 'test')       //false
  check(/[a-z]+/g, 'test')    //true
  //柯里化后函数   接受一个参数 返回一个接受原函数的剩余参数的函数
  function CurryCheck(reg){
      return function(txt){
          return reg.test(reg, txt);
      }
  }
  var hasNumber = CurryCheck(/\d+/g);
  var hasLetter = CurryCheck(/[a-z]+/g);
    hasNumber('test1')      // true
    hasNumber('testtest')   // false
    hasLetter('21212')      // false
  
  ```
  + 2.延迟执行
  ```js
  Function.prototype.bind = function(newThis){
      var _this = this;
      var args = Array.prototype.slice.call(arguments,1);
      return function(){
          return _this.apply(newThis,args);
      } 

  }
  ```

## 反柯里化
### 反柯里化的作用在与扩大函数的适用性，使本来作为特定对象所拥有的功能的函数可以被任意对象所用.
```js
Function.prototype.uncurring = function(){
    let fn = this;
    return function(){
        let args = Array.prototype.slice.call(arguments,1);
        let obj = arguments[0];
        return fn.apply(obj,args);
    }
}
var uncurring = function(fn){
    return function(){
        let args = Array.prototype.slice.call(arguments,1);
        let obj = arguments[0];
        return fn.apply(obj,args);
    }
}

let obj = {
    name:"蛮大人"
};
function func(str){
    console.log(this.name+str)//蛮大人的小妾
}
let uncurFn = func.uncurring();
let uncurFn = uncurring(func)
uncurFn(obj,"的小妾"); 
```
## 性能优化
## 长列表优化 虚拟列表