# 网络
## url/uri

## 输入url后
### 整体过程
+ **1、DNS解析**
+ **2、建立TCP链接（三次握手）**
+ **3、发出http请求**
+ **4、服务端处理请求，返回数据**
+ **5、客户端接收响应**
+ **6、浏览器解析HTML、渲染页面**
## get和post的区别
## http有哪些方法
+ http1.0定义了三种请求方法：get、post、head
+ http1.1新增了五种请求方法：options、put、delete、trace、connect
### 这些方法的具体作用
+ get：GET方法用于使用给定的URI从给定服务器中检索信息，即从指定资源中请求数据。使用GET方法的请求应该只是检索数据，并且不应对数据产生其他影响。GET请求是可以缓存的，我们可以从浏览器历史记录中查找到GET请求，还可以把它收藏到书签中；且GET请求有长度限制，仅用于请求数据（不修改）。
+ head：请求资源的头部信息，并且这些头部与http的get方法请求时返回一致。该请求方法的一个使用场景是在下载一个大文件前先获取其大小再决定是否要下载，以此可以节约宽带资源
+ post：POST方法用于将数据发送到服务器以创建或更新资源，POST请求永远不会被缓存，且对数据长度没有限制；我们无法从浏览器历史记录中查找到POST请求。
+ put：用于将数据发送到服务器以创建或更新资源，它可以用上传的内容替换目标资源中的所有当前内容。它会将包含的元素放在所提供的URI下，如果URI指示的是当前资源，则会被改变。如果URI未指示当前资源，则服务器可以使用该URI创建资源。
+ delete：delete方法用来删除指定的资源，它会删除URI给出的目标资源的所有当前内容。
+ options:用来描述了目标资源的通信选项，会返回服务器支持预定义URL的HTTP策略。
+ connect:用来建立到给定URI标识的服务器的隧道；它通过简单的TCP / IP隧道更改请求连接，通常实使用解码的HTTP代理来进行SSL编码的通信（HTTPS）。
+ trace:用于沿着目标资源的路径执行消息环回测试；它回应收到的请求，以便客户可以看到中间服务器进行了哪些（假设任何）进度或增量。
## put和post方法的区别
put和post都是更新、创建资源。在创建资源时候，put可以指定资源路径，post无法指定资源路径

因而put是幂等操作，即重复操作不会产生变化，多次put的创建请求与1次**相同**，只会创建一个资源

post的重复操作截然不同，10次post请求将会创建10个资源
## put和patch的区别
**put和patch都是可新资源，而patch用来对已知资源进行局部更新**

比如我们有一篇文章的地址 https://www.xxxx.com/xxxx/1 ,这篇文章的可以表示为:
```js
article = { author: 'dxy', creationDate: '2019-6-12', content: '11111111111111111', id: 820357430 }
```
当我们要修改文章的作者时，我们可以直接发送 PUT https://www.xxxx.com/xxxx/1 ，这个时候的数据应 该是:
```js
{ author: 'dxy', creationDate: '2019-6-12', content: '2222222', id: 820357430 }
```
这种直接覆盖资源的修改方式应该为put，但是你觉得每次都带有这么多无用的信息，那么可以发送 PATCH https://www.xxxx.com/xxxx/1 ，这个时候只需要:
```js
 { content: '2222222'}
```
## http的请求报文
### 包含部分
+ 请求行
>请求行包括：请求方法、url、http协议版本它们用空格分隔。例如GET /index.html HTTP/1.1
+ 请求头
>请求头部由关键字/值对组成，每行一对，关键字和值用英文冒号“:”分隔
+ 请求体
> post put等携带的数据
![](./img/http.jpg)
## http的响应报文
+ 响应行
>由报文协议版本和状态码状态描述构成
+ 响应头
+ 响应体
>服务器响应的数据
![](./img/http1.jpg)
## http头部信息
1. 通用头

**通用头包含请求和响应消息都支持的头域**

Cache-Control：指定请求和响应遵循的缓存机制。

Connection：控制连接
>HTTP请求是基于TCP连接的，TCP的请求会包含（三次握手，中间请求，四次挥手）在HTTP/1.0时代，一个HTTP请求就要三次握手和四次挥手，当一个网页中包含大量的图片或者其它外部资源时，加载一个Document要很多个HTTP请求，也就意味着要多次三次握手和四次挥手，这样就造成了网络资源的浪费.到了HTTP/1.1的时候，通过请求头的connection字段用来申明，作用就是减少TCP握手次数，开始的三次握手后就可以进行多次HTTP正文请求，可以长时间的保持，也就是加载一个Document的时候，即使有大量的图片等，也只用进行一次握手，这样就大大的减少了传输量了。keep-alive就表示之前已经进行过握手，可以直接进行HTTP正文传输，close表示结束，我接下来没有东西了，可以进行四次挥手结束这个TCP连接了
Upgrade: 升级为其他协议

via: 代理服务器的相关信息

Wraning 错误和警告通知

Transfor-Encoding 报文主体的传输编码格式 

Trailer 报文末端的首部一览

Pragma 报文指令；最常用的是Pragma:no-cache。在HTTP/1.1协议中，它的含义和Cache-Control:no-cache相同。

Date 创建报⽂的⽇期

2. 实体头

**举个例子来说Content-Length和Content-Type这两个Header就是实体头（Entity Header），他们出现的作用主要是对Entity（请求体、响应体）的一些信息进行描述，上面的虽然也是Header，但并非是对Entity进行描述的**

Allow ：资源可以持http请求的方法

Content-Language 实体的资源语言

Content-Encoding 服务器通过这个头告诉浏览器数据的压缩格式

Content-Length 服务器通过这个头告诉浏览器回送数据的长度

Content-Type 服务器通过这个头告诉浏览器回送数据的类型。Content-Type实体头用于向接收方指示实体的介质类型，指定HEAD方法送到接收方的实体介质类型，或GET方法发送的请求介质类型。

Last-Modified：指定服务器上保存内容的最后修订时间。

Expires：告诉浏览器把回送的资源缓存多长时间 -1或0则是不缓存

其中三种禁止浏览器缓存的头字段：

Expires：-1或0

Cache-Control：no-cache

Pragma：no-cache

3. 请求头
Accept： 浏览器可接受的MIME类型。

Accept-Charset：浏览器可接受的字符集。

Accept-Encoding：浏览器能够进行解码的数据编码方式，比如gzip。Servlet能够向支持gzip的浏览器返回经gzip编码的HTML页面。许多情形下这可以减少5到10倍的下载时间。

Accept-Language：浏览器所希望的语言种类，当服务器能够提供一种以上的语言版本时要用到。

Authorization：授权信息，通常出现在对服务器发送的WWW-Authenticate头的应答中。

Host： 客户机通过这个头告诉服务器，想访问的主机名。Host头域指定请求资源的Intenet主机和端口号，必须表示请求url的原始服务器或网关的位置。HTTP/1.1请求必须包含主机头域，否则系统会以400状态码返回。

If-Modified-Since：客户机通过这个头告诉服务器，资源的缓存时间。只有当所请求的内容在指定的时间后又经过修改才返回它，否则返回304“Not Modified”应答。

Referer：客户机通过这个头告诉服务器，它是从哪个资源来访问服务器的(防盗链)。包含一个URL，用户从该URL代表的页面出发访问当前请求的页面。

User-Agent：User-Agent头域的内容包含发出请求的用户信息。浏览器类型，如果Servlet返回的内容与浏览器类型有关则该值非常有用。

Cookie：客户机通过这个头可以向服务器带数据，这是最重要的请求头信息之一。
4. 响应头
Refresh：告诉浏览器隔多久刷新一次，以秒计。

Server：服务器通过这个头告诉浏览器服务器的类型。

Set-Cookie：设置和页面关联的Cookie。Servlet不应使用response.setHeader(“Set-Cookie”, …)，而是应使用HttpServletResponse提供的专用方法addCookie。

WWW-Authenticate：客户应该在Authorization头中提供什么类型的授权信息?在包含401(Unauthorized)状态行的应答中这个头是必需的。

vary 代理服务器的缓存信息

Location 令客户端重定向的URI
## http状态码
### 2xx 成功
+ 200 OK  表示从客户端发来的请求在服务器端被正确处理
+ 201 Created 请求已经被实现，而且有一个新的资源已经依据请求的需要而建立
+ 202 Accepted 请求已接受，但是还没执行，不保证完成请求
+ 204 No content 表示请求成功，但响应报文不含实体的主体部分
+ 206 Partial Content，进行范围请求
### 3xx 重定向
+ 301 moved permanently，永久性重定向，表示资源已被分配了新的 URL
+ 302 found，临时性重定向，表示资源临时被分配了新的 URL 
+ 303 see other，表示资源存在着另一个 URL
+ 304 not modified，表示服务器允许访问资源，但因发生请求未满足条件的情况
+ 307 temporary redirect，临时重定向，和302含义相同
### 4xx 客户端错误
+ 400 bad request，请求报文存在语法错误
+ 401 unauthorized，表示发送的请求需要有通过 HTTP 认证的认证信息
+ 403 forbidden，表示对请求资源的访问被服务器拒绝
+ 404 not found，表示在服务器上没有找到请求的资源
+ 408 Request timeout, 客户端请求超时
+ 409 Confict, 请求的资源可能引起冲突
### 5xx 服务器错误
+ 500 internal sever error，表示服务器端在执行请求时发生了错误
+ 501 Not Implemented 请求超出服务器能力范围，例如服务器不支持当前请求所需要的某个功能，或者请求是服务 器不支持的某个方法
+ 503 service unavailable，表明服务器暂时处于超负载或正在停机维护，无法处理请求
+ 505 http version not supported 服务器不支持，或者拒绝支持在请求中使用的 HTTP 版本
### 同样是重定向307，303，302的区别？
302是http1.0的协议状态码，在http1.1版本的时候为了细化302状态码又出来了两个303和307。

303明确表示客户端应当采用get方法获取资源，他会把POST请求变为GET请求进行重定向。 307会遵照浏览器标准， 不会从post变为get。
## http中的keep-alive
>在早期的HTTP/1.0中，每次http请求都要创建一个连接，在创建连接的过程需要消耗资源和时间，为了减少资源消耗， 缩短响应时间，就需要重用连接。在后来的HTTP/1.0中以及HTTP/1.1中，引入了重用连接的机制，就是在http请求头中 加入Connection: keep-alive来告诉对方这个请求响应完成后不要关闭，下次咱们还用这个请求继续交流。协议规定HTTP/1.0如果想要保持长连接，需要在请求头中加上Connection: keep-alive。
## http1.0与http1.1区别

## http1.1与http2.0区别



