# js 基础
   ## 1 浏览器及内核
::: tip 主流浏览器
1. IE ------------------------ trident ------- '-ms-'
2. Chrome ----------------- webkit/blink------- '-webkit-'
3. firefox ------------------- Gecko ------------ '-moz-'
4. Opera ------------------- presto -------------- '-o-'
5. Safari -------------------- Webkit ------------- '-webkit-'
:::
## 2 js数据类型
### 2.1 原始数据类型
::: tip 5种原始数据类型
+ Number （原始数据类型中的基本数据类型）
   1. number类型包含整数和浮点数（浮点数数值必须包含一个小数点，且小数点后至少有一位数字）。
浮点数会自动转换为整数，如下：
    ``` js
    let a = 1.00
    console.log(a) // 输出：1，自动转换为了整数
    ```
   2. NaN：非数字类型，特点：涉及到任何关于NaN的操作，都会返回NaN，而且NaN不等于自身
   3. isNaN()函数用于判断是否是一个非数字类型，如果传入的参数是一个非数字类型，那么返回true，否则返回false；
   4. isNaN()函数传入一个参数，函数会先将参数转换为数值，如果参数类型为对象类型，会先调用对象的valueOf()方法，再确定该方 法返回的值是否可以转换为数值类型，如果不能，再调用对象的toString()方法，再确定返回值；
   5. Number()，转型函数，可以用于任何数据类型;parseInt()，将值转换为整型，用的较多;parseFloat()，将值转换为浮点型
+ Boolean（原始数据类型中的基本数据类型）
+ String  （原始数据类型中的基本数据类型）
+ undefined （原始数据类型中的特殊数据类型）
   1. 只有一个值，即undefined，如果声明了一个变量，但是未给变量初始化值，那么这个变量的值就是undefined：
   2. 调用函数时，应该提供的参数没有提供，该参数等于undefined；
   3. 对象没有赋值的属性，该属性的值为undefined；
   4. 函数没有返回值，默认返回undefined。
+ null （原始数据类型中的特殊数据类型）
  1. null类型被看做空对象指针，只有一个值，即null值，所以在用typeof操作符去检测null类型的值得时候，结果是object类型；
  2. 如果你定义了一个变量，但是想在以后把这个对象当做一个对象来使用，最好将该对象初始化为null值
 
:::
::: tip 基本数据类型的特点
1. 基本数据类型是按值访问的，我们操作的是存在变量中的实际的值；
2. 基本数据类型的值是不可变的；
``` js
let a = 'abc'
  a.toUpperCase()
  console.log(a) // 输出：abc
  let data = 'abc'
  data = 'def'
  console.log(data) // 输出：def
  //此时data中的值 ‘abc’并没有改变 只是指向了新值‘def’
```
3. 基本数据类型不可以添加属性和方法（调用基本类型的方法或者属性时，js内部会创建包装类）
4. 基本数据类型的赋值是简单的赋值（如果从一个变量向另一个变量赋值基本类型的值，会在变量对象上创建一个新值，然后把该值赋值到位新变量分配的位置上）：
``` js
let a = 'abc'
  let a = 18
  let b = a
  a++
  console.log(a) // 输出：19
  console.log(b) // 输出：18
```
5. 基本数据类型的比较是值的比较：
6. 基本类型的值在内存中占据固定大小的空间，被保存在栈内存中。（从一个变量向另一个变量复制基本类型的值，会创建这个值的一个副本）；
:::
### 2.2 引用数据类型
::: tip 引用类型特点(Array Object)
1. 引用数据类型可以拥有属性和方法，且值是可变的；
2. 引用数据类型的值是同时保存在栈内存和堆内存的对象
3. 引用类型的比较是引用的比较；
![An image](./imgs/duizhan.png)
:::
### 2.3 typeof
::: tip typeof 的返回值
+ "string"
+ "number"
+ "object"
+ "undefined"
+ "boolean"
+ "function"
:::
::: tip 利用typeof返回值判断值得类型
``` js
let a = 'abc'
  
```
:::

### 2.4 es6数据类型
::: tip 1.Symbol
+ es6除了Number String Bollean Object null undefined 还新增了Symbol，它标识独一无二的值，可以用来定义对象的唯一的属性名
+ Symbol不能使用new命令，因为Symbol是原始数据类型不是对象。可以接收一个字符串作为参数，为新创建的symbol提供描述，用来显示在控制台或者做为字符串的时候使用，便于区分
   ``` js
    let a = Symbol('a');
    let b = Symbol('a');
    console.log(a) //输出 Symbol(a)
    console.log(b) ;//输出 Symbol(a)
    console.log(a === b);//输出 false
    console.log(a.toString()) //输出 'Symbol(a)'
    console.log(typeof a)//输出 'symbol'
    let obj = {};
    obj[b] = '测试';
    console.log(obj[b]);//输出 '测试'
   ```
:::
::: tip 2.Set

:::
::: tip 3.Map
#### Map 对象保存键值对。任何值(对象或者原始值) 都可以作为一个键或一个值
#### Map 和 Object
 ::: warning  区别
 + 一个 Object 的键只能是字符串或者 Symbols，但一个 Map 的键可以是任意值。
 + Map 中的键值是有序的（push进去的顺序），而添加到对象中的键则不是（他们会先排数字开头的key值，然后才是字符串开头的key值）。
 + Map 的键值对个数可以从 size 属性获取，而 Object 的键值对个数只能手动计算
 + Object对象有原型， 也就是说他有默认的key值在对象上面， 除非我们使用Object.create(null)创建一个没有原型的对象
 :::

   ## 3 js运算符
::: tip &&运算符
  #### && 碰到假就停返回当前表达式值而不是布尔值
  ::: warning  &&详细规则
  先看第一个表达式转换成布尔值的结果，如果第一个结果为真，那么它就会看第二个表达式转换成布尔值的结果。如果只有两个表达式，只要看到第二个表达式(第一个表达式的值为真)，就可以返回该表达式（第二个表达式）的值了。
  如果第一个表达式转换成布尔值的结果为fasle，直接返回第一个表达式的值。
  ``` js
   var f = 1 + 1 && 1 - 1; //f = 0
   var f = 1 - 1 && 1 + 1; //f = 0
    2 > 1 && document.write('1') //相当于if 起到中断作用
  ```
  :::
::: tip ||运算符  碰到真就停返回当前表达式值而不是布尔值
  ``` js
    var event = e || window.event; //事件兼容写法
  ```
 

:::