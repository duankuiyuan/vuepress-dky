# 前端
## 页面加载顺序
+ 1.创建Document对象，开始解析web页面。解析HTML元素和他们的文本内容后添加Element对象和Text节点到文档中。这个阶段 document.readyState = ‘loading’ 。
+ 2.遇到link外部css，创建线程加载，并继续解析文档
+ 3.遇到script外部js，并且没有设置async、defer，浏览器加载，并阻塞，等待js加载完成并执行该脚本，然后继续解析文档。
+ 4.遇到script外部js，并且设置有async、defer，浏览器创建线程加载，并继续解析文档。 对于async属性的脚本，脚本加载完成后立即执行。（禁止使用document.write()）
+ 5.遇到img等，先正常解析dom结构，然后浏览器异步加载src，并继续解析文档。
+ 6.当文档解析完成，document.readyState = ‘interactive’ 。
+ 7.文档解析完成后，所有设置有defer的脚本会按照顺序执行。（禁止使用document.write()）;
+ 8.document对象触发DOMContentLoaded事件，这也标志着程序执行从同步脚本执行阶段，转化为事件驱动阶段。
+ 9.当所有async的脚本加载完成并执行后、img等加载完成后，document.readyState = ‘complete’，window对象触发load事件。
+ 10.从此，以异步响应方式处理用户输入、网络事件等。
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


