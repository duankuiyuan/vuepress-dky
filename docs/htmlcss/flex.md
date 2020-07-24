# flex布局
## 什么是flex布局
### flex是flexible Box的缩写，意为“弹性布局”，用来为盒状模型提供最大的灵活性
+ 任何 一个容器都可以指定为flex布局
```css
.box{
    display:flex
}
```
+ 行内元素也可以使用flex布局
```css
.box{
    display:inline-flex;
}
```
+ webkit内核的浏览器，必须加上-webkit前缀
```css
.box{
    display:-webkit-flex;
    display:flex;
}
```
::: danger 注意
设置为flex布局以后，子元素的float，clear，和vertical-align属性失效
::: 
## 基本概念
+ 采用flex布局的元素称为flex容器（flex container），简称容器，它的所有子元素自动成为容器成员，称为flex项目（flex item），简称项目
+ 容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴开始的位置（与边框的交叉点）叫做main start，结束的位置叫做main end，交叉轴的开始位置叫做cross start，结束位置叫做cross end。
+ 项目默认沿主轴排列，单个项目占据的主轴空间叫main size，占据的交叉轴空间叫做cross size
![An image](./imgs/flex_base.png)
## 容器的属性
### 容器上有6个属性
+ flex-direction
+ flex-wrap
+ flex-flow
+ justify-content
+ align-items
+ align-content
### 1.flex-direction 属性
+ flex-direction属性决定主轴的方向（即项目的排列方向）
```css
.box{
    flex-direction:row|row-reverse|column|column-reverse
}
```
+ 它可能有四个值
```
row(默认):主轴为水平方向，起点在左端
row-reverse:主轴为水平方向，起点在右端
cloumn:主轴为垂直方向，起点在上沿
cloumn-reverse:主轴为垂直方向，起点在下沿
```
![An image](./imgs/flex-direction.png)
### 2.flex-wrap 属性
+ 默认情况下项目都排在一条线（又称轴线）上，flex-wrap定义如果一行排不下，如何换行
![An image](./imgs/flex-wrap.png)
```css
.box{
    flex-wrap:nowrap|wrap|wrap-reverse
}
```
+ 它有三个值
  - （1）nowrap（默认）：不换行
  ![An image](./imgs/nowrap.png)
  - （2）wrap：换行，第一行在上方
  ![An image](./imgs/wrap.jpg)
  - （3）wrap-reverse：换行，第一行在下方
   ![An image](./imgs/wrap-reverse.jpg)
### 3.flex-flow 属性 
+ flex-flow是flex-direction和flex-wrap的缩写形式，默认值我 row nowrap
```css
.box {
  flex-flow: <flex-direction> || <flex-wrap>;
}
```
### 4.justify-content 属性
+ justify-content属性定义了项目在主轴上的对齐方式
```css
.box{
    justify-content:flex-start|flex-end|center|space-between|space-around
}
```
+ 它可能取5个值，具体的对齐方式与主轴的方向有关，下面假设主轴方向为从左到右
  - flex-start(默认)：左对齐
  - flex-end：右对齐
  - center：居中
  - space-between：两端对齐，项目之间的间隔都相等
  - space-around：每个项目两侧的间隔相等，所以，项目之间的间隔比项目与边框之间的间隔大一倍
 ![An image](./imgs/justify-content.png)
### 5.align-item 属性
+ align-item属性定义项目在交叉轴上如何对齐
```css
.box {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```
+ 它可能有5个值，具体的对齐方式与交叉轴的方向有关，下面假设交叉轴从上到下
  - flex-start：交叉轴的起点对齐
  - felx-end：交叉轴的终点对齐
  - center：交叉轴的中点对齐
  - baseline：项目的第一行文字的基线对齐
  - stretch（默认值）：如果项目未设置高度或者auto，将占满整个容器的高度
![An image](./imgs/align-item.png)  
### 6.align-content属性
+ align-content属性定义了很多跟轴线的对齐方式，如果项目只有一根轴线，该属性不起作用
```css
.box {
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```
+ 该属性有6个值
  - flex-start：与交叉轴的起点对齐
  - flex-end：与交叉轴的终点对齐
  - center：与交叉轴的中点对齐
  - space-between：与交叉轴两端对齐，轴线之间的间隔平均分布
  - space-around：每根轴线两侧的间隔都相等，所以，轴线之间的间隔比轴线与边框的间隔大一倍
  - stretch（默认）：轴线占满整个交叉轴
![An image](./imgs/align-content.png)   
## 项目的属性
### 以下六个属性设置在项目上
+ order
+ flex-grow
+ flex-shrink
+ flex-basis
+ flex
+ align-self
### 1 order属性
+ order属性定义项目的排列顺序，数值越小，排列越靠前，默认为0
```css
    .item{
    order:0
    }
```
![An image](./imgs/order.png) 
### 2 flex-grow属性
+ flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大
+ 如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。
```css
.item {
  flex-grow: <number>; /* default 0 */
}
```
![An image](./imgs/flex-grow.png) 
### 3 flex-shrink属性
+ flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小
```css
.item{
  flex-shrink:<numeber>
}

```
+ 如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。
如果有一个项目的flex-shrik属性值为0，其他项目都为1，则空间不足时，前者不缩小。
![An image](./imgs/flex-shrink.jpg) 
+ 负值对该属性无效
### 4 flex-basis属性
+ flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，几项目本来的大小
```css
.item {
  flex-basis: <length> | auto; /* default auto */
}
```
+ 它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。
### flex属性
+ flex属性是flex-grow，flex-shrink和flex-basis的缩写，默认值为0 1 auto。后两个属性可选
```js
.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```
+ 该属性有两个快捷值，auto(1 1 auto) 和none (0 0 auto)
+ 建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值
### align-self属性
+ align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，
表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。
```css
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```
![An image](./imgs/align-self.png) 
+ 该属性可能取6个值，除了auto，其他与align-items属性完全一致




