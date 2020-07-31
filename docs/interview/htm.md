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
### 应用实例

