# css
## css选择器的优先级
css选择器的优先级是：!important > 内联样式 > id选择器 > 类选择器 > 元素（标签）选择器 > 通配符选择器 > 继承 > 浏览器默认属性

到具体的计算层面，优先级是由A、B、C、D的值来决定的，其中他们的值计算规则如下：
+ A的值等于1的前提是存在内联样式，否则A=0
+ B的值等于ID选择器出现的次数
+ C的值等于类选择器和属性选择器和伪类出现的总次数
+ D的值等于标签选择器和伪元素出现的总次数

就比如下面的选择器，它不存在内联样式，所有A=0，不存在id选择器B=0，存在一个类选择器C=1，存在3个标签选择器D=3，那么最终的计算结果为：{0，0，1，3}

```css
ul ol li .red{
    ...
}
```
按照这个结算方式，下面的计算结果为：{0，1，0，0}
```css
#red{
    ...
}
```
我们的比较优先级的方式是从A到D去比较值的大小，A、B、C、D权重从左到右，依次减小。判断优先级时，从左到右一一比较，直到比较出最大值，即可停止

比如第二个例子的B与第一个例子的B相比，1>0,接线来就不需要比较了，第二个选择器的优先级更高
## link和@import的区别
+ link属于html标签，而@import是css提供的
+ 页面被加载时，link会被同时加载，而@import引用的css会等到页面被加载完再加载；所以有时候浏览@import加载CSS的页面时会没有样式（就是闪烁），网速慢的时候还挺明显。
+ ink支持使用Javascript控制DOM去改变样式；而@import不支持。
## 隐藏页面元素的方式
+ opacity：0，本质上是将元素的透明度降为0，就看起来隐藏了，但是依然占据空间并且可以交互
+ visibillity：hidden，占据空间但是不可以按交互
+ overflow：hidden，只隐藏元素溢出部分，但是占据空间且不可交互
+ display：none，元素从文档流中消失，既不占据空间，也不能交互，不影响其他布局
+ z-index：-9999，原理是将层级放到底部，这样就被覆盖了，看起来就隐藏了
+ transform：scale(0,0)，平面转换，将元素缩放为0，依然占据空间但不可交互

## px/em/rem区别
+ px：绝对定位，页面按精确像素展示
+ em：相对单位，基准点为父节点字体的大小，如果自身定义了font-size按自身来计算（浏览器默认字体是16px），整个页面内1em不是一个固定的值
+ rem：相对单位，可以理解为“root em”，相对根节点html的字体大小来计算，css3新加属性
## 水平垂直居中
### 水平居中
+ 行内元素 使用 text-align：center
```html
<p style="text-align: center;">行内元素水平居中</p>
```
+ 定宽块状元素(dispaly: block)水平居中（块状元素的width是一个固定值），满足块状和定宽两个条件时，即可通过给自己设置“左右margin为auto”来实现。
```html
<div style="width: 200px; text-align: center; margin: 0 auto;">定宽块状元素水平居中</div>
```
+ 不定宽块状元素水平居中
   - 改变块状元素的 dispaly 属性为 inline， 然后给父级设置 text-aline：center 来实现水平居中， 这种方法的缺点是不能再给元素设置宽高了
   ```html
    <div style="text-align: center;">
        <div style="display: inline;">不定宽块状元素水平居中</div>        
    </div>
   ```
   - 利用绝对定位，让元素向右偏移50%，然后再向左偏移自身的50%
   ```html
   <div style="position: absolute; left: 50%; transform: translateX(-50%);">不定宽块状元素水平居中</div>
   ```
   -  利用flex实现水平居中
   ```html
   <div style="display: flex;justify-content:center;">
     <div>不定宽块状元素水平居中</div>
   </div>
   ```
   -  利用table
   ```css
   .center{ display:table; margin:0 auto; border:1px solid red; }
    <div class="center">水平居中</div>
   ```
## css几种定位方式
+ static：正常文档流定位，此时，top，right，bottom，left，和z-index属性无效，块级元素从上往下排布，行级元素从左向右排布
+ relative：相对定位，此时相对于正常文档流
+ absolute，相对于最近的非static定位的元素偏移，来确定位置。比如一个个绝对定位元素它的父级、和祖 父级元素都为relative，它会相对他的父级而产生偏移。
+ fixed：指定元素相对于屏幕视口（viewport）位置来指定元素位置，元素的位置在屏幕滚动时不会改变。
+ sticky：跟前面四个属性值都不一样，它会产生动态效果，很像relative和fixed的结合：一些时候是relative定位（定位基点是自身默认位置），另一些时候自动变成fixed定位（定位基点是视口）。
## z-index
z-index 属性用来控制元素在z轴上的顺序

z-index仅适用于定位元素，即position值为relative，absolute，和fixed属性

**定位元素默认z-index:auto可以看成是z-index:0;**

**z-index不为auto的定位元素会创建层叠上下文；**

**z-index层叠顺序的比较止步于父级层叠上下文；**

z-index:auto 和z-index:0,前者不创建层叠上下文，后者创建层叠上下文，

从层叠顺序上讲，z-index:auto可以看成z-index:0,但从层叠上下文来讲，两者却有着本质差异。

页面根元素天生具有层叠上下文，称之为‘根层叠上下文’。

z-index值为数值的定位元素(相对或绝对)也具有层叠上下文。

其他参与层叠上下文的属性们：

1. z-index值不为auto的flex项（父元素display:flex|inline-flex）
2. 元素的opacity值不是1
3. 元素的transform值不是none
4. 元素mix-blend-mode值不是normal
5. 元素的filter值不是none
6. 元素的isolation值是isolate
7. position:fixed声明
8. will-change指定的属性值为上面任意一个
9. 元素的-webkit-overflow-scrolling设为touch

## 清除浮动
### 浮动副作用
1. 背景不能显示

2. 边框不能被撑开

3. margin padding 设置值不能正常显示
### 清除浮动
1. 手动设置父级元素的高度
2. 使用clear：both
3. 父级div定义overflow：hidden或者auto
## css sprites
### css sprites是什么
雪碧图也叫CSS精灵， 是一种CSS图像合成技术，开发人员往往将小图标合并在一起之后的图片称作雪碧图。
### 如何操作
使用工具（PS之类的）将多张图⽚打包成一张雪碧图，并为其生成合适的 CSS。 每张图片都有相应的 CSS 类，该类 定义了background-image、background-position和background-size属性。 使用图片时，将相应的类添加到你的元素 中。
### 好处
+ 减少加载多张片的 HTTP 请求数（一张雪碧图只需要一个请求）
+ 提前加载资源
### 不足
+ CSS Sprite维护成本较高，如果也，页面背景有少许改动，一般就要改这张合并的图片
+ 加载速度优势在http2开启后荡然无存，HTTP2多路复用，多张图片也可以重复利用一个连接通道搞定
## BFC
**Block Formatting Context 块级上下文格式** ，它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用
简而言之，它是一块独立的区域，让处于BFC内部的元素与外部的元素互相隔离
**BFC触发条件**
1. 根元素，即HTML元素
2. position:fixed/absolute
3. float不为none
4. overflow不为visible
5. diaplay的值为inline-block、table-cell、table-caption、flex
**BFC布局规则**
+ 它的自动高度需要计算浮动元素
+ 它的边框盒不会与浮动元素重叠
+ 它不会和它的子元素进行外边距合并
## 伪类与伪元素
**伪类（pseudo-class）** 是一个以冒号(:)作为前缀，被添加到一个选择器末尾的关键字，当你希望样式在特定状态下才被 呈现到指定的元素时，你可以往元素的选择器后面加上对应的伪类。

**伪元素**用于创建那些不在文档树中的元素，并为其添加样式。比如说，我们可以通过::before来在某个元素前增加一些文本，并为这些文本添加样式。虽然用户可以看到这些文本，但是这些文本实际上不在文档树中。
### 区别
伪类是通过在元素选择器上加入伪类改变元素状态，而伪元素通过对元素的操作进行对元素的改变。
## css动画（animation）和过渡（transition）
