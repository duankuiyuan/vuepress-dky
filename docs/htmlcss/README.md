# css基础
## css选择器
+ **.class** => .intro =>  选择  class="intro" 的所有元素。
+ **#id** => 	#firstname =>  选择 id="firstname" 的所有元素。
+ **'*'** => 	'*' =>  选择所有元素。
+  **element** => p =>  选择所有 \<p>元素。
+  **element,element** => div,p =>  选择所有 \<div> 元素和所有 \<p> 元素。
+  **element element** => div p =>  选择 \<div> 元素内部的所有 \<p> 元素。
+  **element>element** => div>p =>  选择父元素为 \<div> 元素的所有 \<p> 元素。
+  **element+element** => div+p =>  选择紧接在 \<div> 元素之后的所有 \<p> 元素。
+  **[attribute]** => [target] =>  选择带有 target 属性所有元素。
+  **[attribute=value]** => [target=_blank] => 选择 target="_blank" 的所有元素。
+  **[attribute~=value]** => [title~=flower] => 选择 title 属性包含单词 "flower" 的所有元素。
+  **[attribute|=value]** => [lang|=en] => 选择 lang 属性值以 "en" 开头的所有元素。
+  **:link** => a:link => 选择所有未被访问的链接。
+  **:visited** => a:visited => 选择所有已被访问的链接。
+  **:active** => a:active => 选择活动链接。
+  **:hover** => a:hover => 选择鼠标指针位于其上的链接。
+  **:focus** => input:focus => 选择获得焦点的 input 元素。
+  **:first-letter** => p:first-letter => 选择每个 \<p> 元素的首字母。
+  **:first-line** => p:first-line => 选择每个 \<p> 元素的首行。
+  **:first-child** => p:first-child => 选择属于父元素的第一个子元素的每个 \<p> 元素。
+  **:before** => p:before => 在每个 \<p> 元素的内容之前插入内容。
+  **:after** => p:after => 在每个 \<p> 元素的内容之后插入内容。
+  **:lang(language)** => p:lang(it) => 选择带有以 "it" 开头的 lang 属性值的每个 \<p> 元素。
+  **element1~element2** => p~ul => 选择前面有 \<p> 元素的每个 \<ul> 元素。
+  **[attribute^=value]** => a[src^="https"] => 选择其 src 属性值以 "https" 开头的每个 \<a> 元素。
+  **[attribute$=value]** => a[src$=".pdf"] => 选择其 src 属性以 ".pdf" 结尾的所有 \<a> 元素。
+  **[attribute*=value]** => a[src*="abc"] => 选择其 src 属性中包含 "abc" 子串的每个 \<a> 元素。
+  **:first-of-type** => p:first-of-type => 选择属于其父元素的首个 \<p> 元素的每个\<p> 元素。
+  **:last-of-type** => p:last-of-type => 选择属于其父元素的最后 \<p> 元素的每个 \<p> 元素。
+  **:only-of-type** => p:only-of-type => 选择属于其父元素唯一的 \<p> 元素的每个 \<p> 元素。
+  **:only-child** => p:only-child => 选择属于其父元素的唯一子元素的每个 \<p> 元素。
+  **nth-child(n)** => p:nth-child(2) => 选择属于其父元素的第二个子元素的每个 \<p> 元素。
+  **:nth-last-child(n)** => p:nth-last-child(2) => 同上，从最后一个子元素开始计数。
+  **:nth-of-type(n)** => p:nth-of-type(2) => 选择属于其父元素第二个 \<p> 元素的每个 \<p> 元素。
+  **:nth-last-of-type(n)** => p:nth-last-of-type(2) => 同上，但是从最后一个子元素开始计数。
+  **:last-child** => p:last-child => 选择属于其父元素最后一个子元素每个 \<p> 元素。
+  **:root** => :root => 选择文档的根元素。
+  **:empty** => p:empty => 选择没有子元素的每个 \<p> 元素（包括文本节点）。
+  **:target** => #news:target => 选择当前活动的 #news 元素。 URL 带有后面跟有锚名称 #，指向文档内某个具体的元素。这个被链接的元素就是目标元素(target element)。
+  **:enabled** => input:enabled => 选择每个启用的 \<input> 元素。
+  **:disabled** => input:disabled => 选择每个禁用的 \<input> 元素.
+  **:checked** => input:checked => 选择每个被选中的 \<input> 元素。
+  **:not(selector)** => :not(p) => 选择非 \<p> 元素的每个元素。
+  **::selection** => ::selection => 选择被用户选取的元素部分。
## box-sizing
1. content-box:宽度和高度分别应用到元素的内容框。在宽度和高度之外绘制元素的内边距和边框
2. boder-box：为元素设定的宽度和高度决定了元素的边框盒，就是说，为元素指定的任何内边距和边框都将在已设定的宽度和高度内进行绘制。通过从已设定的宽度和高度分别减去边框盒内边距才能得到内容的宽度和高度
## 伪类与伪元素
+ 基本概念
> css引入伪类与伪元素的概念是为了格式化文档树以外的信息。
>伪类用于当已有元素处于某个状态时，为其添加对应的样式，这个状态时根据用户行为而动态变化的。比如说，当用户悬停在指定的元素时，我们可以通过:hover来描述这个元素的状态。虽然它和普通的css类相似，可以为已有的元素添加样式，但是它只有处于dom树无法描述的状态下才能为元素添加样式，所以将其称为伪类。
>伪元素用于创建一些不在文档树种的元素，并为其添加样式。比如说，我们可以通过:before来在一个元素前增加一些文本，并为这些文本添加样式，虽然用户可以看到这些文本，但这些文本实际不在文档树种。
+ 伪类与伪元素的区别(有没有创建一个文档树之外的元素)
  1. 看这段html代码
  ```html
  <ul>
    <li>第一个元素</li>
    <li>第二个元素</li>
  </ul>
  ```
  2. 如果想要给第一个li元素添加样式，可以在为第一个li添加一个类，并在该类中定义对应样式：
    ```html
  <ul>
    <li class="first-li">第一个元素</li>
    <li>第二个元素</li>
  </ul>

  <style>
      li.first-li {
         color: red
        }
  </style>
  ```
  3. 如果不添加类，可以通过伪类来为其添加样式
  ```css
  li:first-child {
    color: red
  }
  ```
  4. 且看另一段代码
  ```html
  <p>hehe你好，世界</p>
  ```
  5. 如果想要给该段落的第一个字母添加样式，可以在第一个字母中包裹一个元素，并设置该span元素的样式：
  ```html
  <p><span class="first">h</span>ehe你好，世界</p>
  <style>
    .first {
      font-size: 5em;
    }
  </style>
  ```
  6. 如果不创建一个span元素，我们可以通过设置p的:first-letter伪元素来为其添加样式。这个时候，看起来好像是创建了一个虚拟的span元素并添加了样式，但实际上文档树中并不存在这个span元素。
  ```html
  <p>hehe你好，世界</p>
  <style>
    p:first-letter {
      font-size: 5em;
      }
    </style>
  ```
  >从上述例子中可以看出，伪类的操作对象是文档树中已有的元素，而伪元素则创建了一个文档数外的元素。因此，伪类与伪元素的区别在于：有没有创建一个文档树之外的元素。


