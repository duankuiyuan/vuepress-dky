# JS继承
## 原型链继承
### 实现
```js
    function Super(){
        this.property = true;
    }
    Super.prototype.getSuperValue = function(){
        return this.property;
    }
    function Sub(){
        this.subproperty = false;
    }
    Sub.prototype = new Super();
    Sub.prototype.getSubValue = function(){
        return this.subproperty;
    }
    var sub = new Sub();
    console.log(sub.getSubValue())//true
```
代码定义了两个类 Super和Sub，每个类型分别有一个属性和一个方法，Sub继承了Super继承是通过将Super的实例赋值给Sub.prototype实现的

实现的本质是重写原型对象，代之以一个新类型的实例，那么存在Super的实例中的所有属性和方法现在也存在Sub.prototype中

我们知道在创建一个实例的时候，实例对象中会有一个内部指针指向创建它的原型，进行关联起来，在这里代码Sub.prototype = new Super()就会在Sub.prototype的内部创建一个指针指向Super.prototype

所以sub的__proto__指向Sub的原型（prototype），而Sub的原型的__proto__又指向Super的原型（prototype）
### 添加方法
```js
    function Super(){
		 this.property = true;
	 }
	 Super.prototype.getSuperValue = function(){
		 return this.property;
	 }
	 function Sub(){
		 this.subproperty = false;
	 }
	 Sub.prototype = new Super();
	 Sub.prototype = {
		getSubValue:function(){
		 return this.subproperty;
	    }
	 }
	 var sub = new Sub();
	// console.log(sub.getSuperValue())//报错 找不到getSuperValue
```
在给Sub的原型上添加方法时候，如果父类也有同样的名字，Sub将会覆盖这个方法，达到重新的目的。 但是这个方法依然存在于父类中。

记住不能以字面量的形式添加，因为，上面说过通过实例继承本质上就是重写，再使用字面量形式，又是一次重写了，但这次重写没有跟父类有任何关联，所以就会导致原型链截断。
### 问题
```js
	 function Super(){
	  this.colors = ['red','blue','green'];
	  this.color = "1"
	}
	function Sub(){

	}
	Sub.prototype = new Super();
	var sub1 = new Sub();
	var sub2 = new Sub();
	sub1.colors.push("black");
	sub1.color = "2";
	console.log(sub1.colors);// ["red", "blue", "green", "black"]
	console.log(sub2.colors);// ["red", "blue", "green", "black"]
	console.log(sub1.color);//'2'
	console.log(sub2.color);//1
```
父类型的属性是引用类型的话如果修改引用类型（修改而不是重新赋值），则会影响到所有实例。普通类型则不会

原因是 当操作 当对sub1取值时候 会先在sub1上找，找不到则顺着sub1.\__proto__ => new Sub()方式向上找，最终colors取值则取到了new Sub()的colors，所以就修改了父类实例的colors

如果是修改值的这种操作 则直接修改的是sub1的color，如果sub1的color的color不存在则在sub1上添加了color

注意: 对color或者colors的属性重新赋值操作的是sub1本身的属性，而对colors（引用类型）已存在的值进行修改，会先取值（沿着原型链向上查找），所以改的是父类实例的colors
## 构造函数继承
此方法解决了原型链继承中引用类型的值的问题

此方法的核心是在子类构造函数的内部调用父类构造函数，借用call改变this指向，父类函数执行时候将属性都放在了子类的this上
### 基本实现
```js
   function Super(){
        this.colors = ['red','blue','green'];
    }
    function Sub(){
        //继承Super
        Super.call(this)
    }
    var sub1 = new Sub();
    var sub2 = new Sub();
    sub1.colors.push("black");
    console.log(sub1.colors);//["red", "blue", "green", "black"]
    console.log(sub2.colors);//["red", "blue", "green"]
```
### 参数传递
```js
function Super(name){
    this.supername = name;
}
function Sub(){
    this.subname = "sub";
    Super.call(this,'super');
}
var sub = new Sub();
console.log(sub);//subname: "sub" supername: "super"
```
### 问题
方法都在构造函数中定义，无法复用、只能继承父类构造函数的属性
## 原型链和构造函数组合
组合继承是将原型继承和构造函数结合起来，发挥各自长处的一种方式

使用原型链实现对原型属性和方法的继承，而通过构造函数来实现对实例属性的继承
```js
function Super(name){
   this.name = name;
   this.colors = ["red", "blue", "green"];
 }
 Super.prototype.sayName = function(){
	 return this.name;
 }
 function Sub(name,job){
	 this.job = job;
	 //继承属性
	 Super.call(this,name);
 }
 //继承方法
 Sub.prototype = new Super();
 Sub.prototype.sayJob = function(){
    console.log(this.job);
 }
 var sub1 = new Sub('name','job');
 sub1.colors.push('black');
 console.log(sub1.colors);
 console.log(sub1.sayName());
 console.log(sub1.sayJob());
 var sub2 = new Sub('name1','job1');
 console.log(sub2.colors);
 console.log(sub2.sayName());
 console.log(sub2.sayJob());
```
## Object.create()
```js
let a = {
	name:"a"
}
let b = Object.create(a);
console.log(b.name) // a
```
Object.create()方法创建新对象 这个新对象的\__proto__指向的是参数对象
## 圣杯模式
```js
var inherit = (function(){
                 var F = function(){};//形成闭包
                 return function(Target,Origin){
                      F.prototype = Origin.prototype;//继承父类的prototype的内容而不会继承父类本身里面的内容
                      Target.prototype = new F();
                      Target.prototype.constructor = Target;
                      Target.prototype.uber = Origin.prototype;
                 }
             }())
```

