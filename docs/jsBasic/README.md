# 前端
## async、defer
+ defer、async都是异步下载，但是执行时刻不一致；
+ async：HTML5新增属性，用于异步下载脚本文件，下载完毕立即解释执行代码。
+ defer：用于开启新的线程下载脚本文件，并使脚本在文档解析完成后执行。
## 页面渲染过程
+ 1.解析html文件，创建DOM树
  + 1）css加载不会阻塞html文件的解析，但会阻塞dom的渲染
  + 2）css加载会阻塞后面js语句的执行
  + 3）js会阻塞html的解析和渲染
  + 4）没有defer和async标签的script会立即加载并执行
  + 5）有async标签的js，js的加载执行和html的解析和渲染并行
  + 6）有defer标签的js，js的加载和html的解析和渲染并行，但会在html解析完成后执行,在触发DOMContentLoaded事件前执行
  + 7）DOMContentLoaded和onload的区别：DOMContentLoaded在html解析完毕后执行，loload在页面完全加载完成后执行（包括样式和图片）
+ 2.解析css，生成CSSOM，css对象模型
+ 3.dom和css合并，构建渲染树（Render Tree）
+ 4.布局（Layout）和绘制（Paint），重绘（repaint）和重排（reflow/回流）
## 浏览器渲染原理
+ DOM Tree：浏览器将HTML解析成树形的数据结构。
+ CSS Rule Tree：浏览器将CSS解析成树形的数据结构。　　
+ Render Tree（着色树）：DOM和CSSOM合并后生成Render Tree。　　
+ layout：有了Render Tree，浏览器已经能知道网页中有哪些节点、各个节点的CSS定义以及他们的从属关系，从而去计算出每个节点在屏幕中的位置。　　
+ painting（绘制）：按照算出来的规则，通过显卡，把内容画到屏幕上。
+ reflow（回流/重排）：当浏览器发现某个部分发生了点变化影响了布局，需要倒回去重新渲染，内行称这个回退的过程叫 reflow。reflow 会从 html 这个 root frame 开始递归往下，依次计算所有的结点几何尺寸和位置。reflow 几乎是无法避免的。现在界面上流行的一些效果，比如树状目录的折叠、展开（实质上是元素的显 示与隐藏）等，都将引起浏览器的 reflow。鼠标滑过、点击……只要这些行为引起了页面上某些元素的占位面积、定位方式、边距等属性的变化，都会引起它内部、周围甚至整个页面的重新渲 染。通常我们都无法预估浏览器到底会 reflow 哪一部分的代码，它们都彼此相互影响着。
+ repaint（重绘）：改变某个元素的背景色、文字颜色、边框颜色等等不影响它周围或内部布局的属性时，屏幕的一部分要重画，但是元素的几何尺寸没有变。
+ （1）display:none 的节点不会被加入Render Tree，而visibility: hidden 则会，所以，如果某个节点最开始是不显示的，设为display:none是更优的。
+ display:none 会触发 reflow，而 visibility:hidden 只会触发 repaint，因为没有发现位置变化。
+ 有些情况下，比如修改了元素的样式，浏览器并不会立刻reflow 或 repaint 一次，而是会把这样的操作积攒一批，然后做一次 reflow，这又叫异步 reflow 或增量异步 reflow。但是在有些情况下，比如resize 窗口，改变了页面默认的字体等，对于这些操作，浏览器会马上进行 reflow。
### DOM解析：把HTML文档解析为DOM树的过程
+ 遇到script标签则停止解析，先执行js
+ DOMContentLoaded事件在HTML文档完全加载并解析后触发，不等样式表、图片、子帧（subframes）完成加载。
+ 此时图片资源并未加载完成
### CSS解析：将CSS代码解析为CSS规则树的过程
+ 与DOM解析同步进行
+ 与script的执行互斥（js中可能要获取css属性）
+ Webkit内核进行了script执行优化（当script与css无关时，不会互斥）
### DOM Tree
+ display:none的元素也在DOM树中
+ script标签也在DOM树中、
+ 注释也在DOM树中
### Render Tree
+ DOM Tree + CSS Rules = Render Tree
+ 每个节点为一个Render Object对象，包含宽高、位置、背景色等样式信息
+ 宽高和位置是通过Layout（重排）计算出
+ ender Tree和DOM Tree不完全对应
+ display:none的元素不在Render Tree中
+ visibility:hidden的元素在Render Tree中
+ float元素、absolute元素、fixed元素会发生位置偏移
+ 常说的脱离文档流，就是脱离Render Tree
##  dom树节点和渲染树节点一一对应吗，有什么是dom树会有，渲染树不会有的节点
+ 渲染树不包括 head 和隐藏元素，大段文本的每一个行都是独立节点，每一个节点都有对应的 css 属性
## css会阻塞DOM解析吗
+ 对于一个HTML文档来说，不管是内联还是外链的css，都会阻碍后续的dom渲染，但是不会阻碍后续dom的解析。当css文件放在中时，虽然css解析也会阻塞后续dom的渲染，但是在解析css的同时也在解析dom，所以等到css解析完毕就会逐步的渲染页面了。
## requestIdleCallbackk是干什么用的

## 前端的网络安全如何防御（xss，csrf）
## cookies的保护方式
## 浏览器构成
1. 用户界面
2. 浏览器引擎
3. 渲染引擎
4. 网络
5. js解释器
6. 数据存储
## 重绘与重排
### 重绘
元素的外观被改变
### 重排
重新生成布局，重新排列元素
### 触发
+ 添加、删除、更新DOM节点
+ 通过display: none隐藏一个DOM节点-触发重排和重绘
+ 通过visibility: hidden隐藏一个DOM节点-只触发重绘，因为没有任何变化
+ 移动或者给页面中的DOM节点添加动画
+ 添加一个样式表，调整样式属性
+ 用户行为，例如调整窗口太小，改变字号，或者滚动。
### 如何避免
+ 通过改变class的方式来集中改变样式
+ 用transform做形变和位移
+ 通过绝对定位，脱离当前层叠上下文（即形成新的Render Layer）
## js事件环机制
### 相关线程
+ GUI渲染线程（UI线程 渲染页面）
+ js引擎线程 （j s引擎线程和GUI渲染线程互斥，不能在一边渲染一边加载js，防止死锁）
+ evenLoop处理线程
+ 事件（click）、setTimeout、ajax等都是独立的线程
### 宏任务、微任务
+ 宏任务，宿主环境提供的异步方法都是宏任务。script脚本、定时器、ajax
+ 微任务：语言提供的promise、mutationObserver
### 执行顺序
![](./imgs/evenloop.jpg)
1. js主线程执行，在执行时候会把微任务和宏任务放到对应的队列中等待执行
2. js主线程代码执行完毕后，会把微任务队列拿来执行，执行时可能会再次遇到宏任务和微任务，将遇到的微任务放入微任务队列，在此清空微任务队列，宏任务加入到宏任务队列
3. GUI渲染页面
4. 从宏任务队列中取出一个任务执行，执行过程中会遇到微任务和宏任务，遇到时将他们加入到对应的任务队列
5. 取出微任务队列执行，清楚微任务队列
6. GUI渲染页面
7. 再次取出一个宏任务执行（重复4）
```js
  document.body.style.background = 'red';
  console.log(1)
  Promise.resolve().then(()=>{//微任务
      console.log(2)
      document.body.style.background = 'yellow';
  })
  console.log(3);
  //输出结果 1 3 2 因为在微任务后才渲染页面 所以不会显示红色 只显示黄色
```


