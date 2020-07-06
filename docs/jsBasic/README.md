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