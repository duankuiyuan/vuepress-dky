# html
## doctype
### DOCTYPE

是html5标准网页声明，且必须声明在HTML文档的第一行。来告知浏览器的解析器用什么文档标准解析这个文档，不同的渲染模式会影响到浏览器对于 CSS 代码甚至JavaScript 脚本的解析

### 文档解析类型
+ **标准模式式(standards mode)** 页面按照 HTML 与 CSS 的定义渲染

+ **怪异模式(quirks mode)** 会模拟更旧的浏览器的行为

+ **近乎标准(almost standards)模式** 会实施了一种表单元格尺寸的怪异行为（与IE7之前的单元格布局方式一致）， 除此之外符合标准定义
## html、xhtml、xml的区别
+ **XML（可扩展标记语言）** 主要存储数据结构，可扩展，大家熟悉的JSON也有类似作用，但是JSON更加轻量高效

+ **HTML（超文本标记语言）**  

+ **XHTML（可扩展超文本标记语言）**  

  + XHTML是基于可扩展标记bai语言（duXML）。HTML是基于标bai准通用标记语言（SGML）。
  + XHTML语法比较严格，HTML语法要求比较松散，这样对网页编写者来说，比较方便
  + XHTML可以混合各种XML应用，比如MathML、SVG。HTML不能混合其它XML应用。
  + XHTML对大小写敏感，标准的XHTML标签应该使用小写。HTML对大小写不敏感。

## data-属性
### data-
HTML的数据属性，用于将数据储存于标准的HTML元素中作为额外信息,我们可以通过js访问并操作它，来达到操作数 据的目的。
### 使用attribute方法存取 data-* 自定义属性的值
```js
<div id="div1" class="div1" data-id = "myId" data-class = "myClass" data-id-and-class = "Hello"></div>
var div = document.getElementById("div1");
//获取自定义的值
var myId = div.getAttribute("data-id");
var myClass = div.getAttribute("data-class");
var my = div.getAttribute("data-id-and-class");
console.log(myId);      //myId
console.log(myClass);   //myClass
console.log(my);        //Hello
//设置自定义的值
div.setAttribute("data-name","nicai")
```
### dataset属性存取data-*自定义属性的值
```js
<div id="div1" class="div1" data-id = "myId" data-class = "myClass" data-id-and-class = "Hello"></div>
    var div = document.getElementById("div1");
    var attr = div.attributes;
    var data = div.dataset;
    var id = div.id;
    var myId = div.dataset.id;
    var iac = div.dataset.idAndClass;
    console.log(attr);      //NamedNodeMap对象
    console.log(data);      //DOMStringMap对象
    console.log(id);        //div1
    console.log(myId);      //myId
    console.log(iac);       //Hello
```
## html语义化
### 语义化

语义化是指使⽤恰当语义的html标签，让页面具有良好的结构与含义，比如 \<p> 标签就代表段落， \<article> 代表正文内容等等。
### 语义化好处

+ **开发者友好：** 使用语义类标签增强了可读性，开发者也能够清晰地看出网页的结构，也更为便于团队的开发和维护

+ **机器友好：** 带有语义的文字表现力丰富，更适合搜索引擎的爬虫爬取有效信息，语义类还可以支持读屏软件，根据文章章可以自动生成目录

>这对于简书、知乎这种富文本类的应用很重要，语义化对于其网站的内容传播有很大的帮助，但是对于功能性的web软 件重要性大打折扣，比如一个按钮、Skeleton这种组件根本没有对应的语义，也不需要什么SEO。

###  常见语义化标签
 + **\<header>** 页眉通常包括网站标志、主导航、全站链接以及搜索框。

+ **\<nav>** 标记导航，仅对文档中重要的链接群使用。

+ **\<main>** 页面主要内容，一个页面只能使用一次。如果是web应用，则包围其主要功能。

+ **\<article>** 定义外部的内容，其中的内容独立于文档的其余部分。

+ **\<section>** 定义文档中的节（section、区段）。比如章节、页眉、页脚或文档中的其他部分。

+ **\<aside>** 定义其所处内容之外的内容。如侧栏、文章的一组链接、广告、友情链接、相关产品列表等。

+ **\<footer>** 页脚，只有当父级是body时，才是整个页面的页脚。

+ **\<small>** 呈现小号字体效果，指定细则，输入免责声明、注解、署名、版权。

+ **\<strong>** 和 em 标签一样，用于强调文本，但它强调的程度更强一些。

## meta标签
### mate标签定义及使用说明
\<meta> 标签提供了 HTML 文档的元数据。元数据不会显示在客户端，但是会被浏览器解析。

META元素通常用于指定网页的描述，关键词，文件的最后修改时间，作者及其他元数据。

元数据可以被使用浏览器（如何显示内容或重新加载页面），搜索引擎（关键词），或其他 Web 服务调用。
### 属性
+ **charset** 	定义文档的字符编码
+ **content** 	定义与 http-equiv 或 name 属性相关的元信息。
+ **http-equiv** 把 content 属性关联到 HTTP 头部。
+ **name** 把 content 属性关联到一个名称。
+ **scheme**  	HTML5不支持。 定义用于翻译 content 属性值的格式。
+ **name="viewport"** 它用于移动端显示优化的 content=。
  - width: 设置layout viewport  的宽度，为一个正整数，或字符串"width-device"
  - initial-scale:  设置页面的初始缩放值，为一个数字，可以带小数
  - minimum-scale: 允许用户的最小缩放值，为一个数字，可以带小数
  - maximum-scale: 允许用户的最大缩放值，为一个数字，可以带小数
  - height: 设置layout viewport  的高度，这个属性对我们并不重要，很少使用
  - user-scalable: 是否允许用户进行缩放，值为 "no" 或 "yes", no 代表不允许，yes 代表允许
### 应用实例
1. 定义文档关键词，用于搜索引擎：
```html
<meta name="keywords" content="HTML, CSS, XML, XHTML, JavaScript">
```
2. 定义web页面描述：
```html
<meta name="description" content="Free Web tutorials on HTML and CSS">
```
3. 定义页面作者：
```html
<meta name="author" content="Hege Refsnes">
```
4. 每30秒刷新页面：
```html
<meta http-equiv="refresh" content="30">
```
5. 以设置http的缓存过期日期：
```html
<meta http-equiv="expires" content="Wed, 20 Jun 2019 22:33:00 GMT">
```
6. 控制视口的大小和比例：
```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
```
## src和href的区别？
+ href 

href是HypertextReference的缩写，标识超文本引用。用来建立当前元素和文档之间的链接。常用的有：link、a

浏览器会识别该文档为css文档，并行下载该文档，并且不会停止对当前文档的处理。

+ src 

src是source的缩写，src的内容是页面必不可少的一部分，是引入

src指向的内容会嵌入到文档中标签所在的位置。常用的有：img、script、iframe

当浏览器解析到该元素时候，会暂停浏览器的渲染，直到该元素加载完毕

## img标签的 srcset

可以设计响应式鱼片，我们可以使用两个新的属性srcset 和 sizes来提供更多额外的资源图像和提示，帮助浏览器选择 正确的一个资源。

srcset 定义了我们允许浏览器选择的图像集，以及每个图像的大小。

sizes 定义了一组媒体条件（例如屏幕宽度）并且指明当某些媒体条件为真时，什么样的图片是最佳选择。

所以，有了这些属性，浏览器会：
+ 查看设备宽度
+ 检查sizes列表中哪个媒体条件是第一个为真
+ 查看给予该媒体查询的槽大小
+ 加载 srcset 列表中引⽤的最接近所选的槽大小的图像
>srcset提供了根据屏幕条件选取图片的能力
```html
<img src="clock-demo-thumb-200.png" alt="Clock" srcset="clock-demo-thumb-200.png 200w, clock-demo-thumb-400.png 400w" sizes="(min-width: 600px) 200px, 50vw">
```

\<picture> 元素通过包含零或多个 \<source> 元素和多个 \<img> 元素来为不同的显示/设备场景提供图像版本。浏览器 会选择最匹配的子 \<source> 元素，如果没有匹配的，就选择 \<img> 元素的 src 属性中的URL。然后，所选图像呈现 在 \<img> 元素占据的空间中
>picture同样可以通过不同设备来匹配不同的图像资源
```html
<picture>
<source srcset="/media/examples/surfer-240-200.jpg" media="(min-width: 800px)"> <img src="/media/examples/painted-hand-298-332.jpg" />
 </picture>
```
## 前端存储方式
+ cookies
在html5前本地存储的主要方式，有点事兼容性好，请求头自带cookie方便，缺点是大小只有4k，自动请求头加入cookie浪费流量，每个domain限制20个cookie，使用起来需要自行封装
+ localStorage
html5加入的以键值对（key-value）为标准方式，优点操作方便，永久性储存，大小为5M
+ sessionStorage 与localStorage相似，区别是sessionStorage当前页面关闭后会被清理，而且与cookie、localStorage 不同，他不能在所有同源窗口中共享，是会话级别的储存方式。
+ IndexedDB
是被正式纳入HTML5标准的数据库储存方案，它是NoSQL数据库，用键值对进行存储，可以进行快速读取操作，非常适合web场景，同时用JavaScript进行操作会非常方便。
