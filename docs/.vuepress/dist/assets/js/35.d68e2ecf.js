(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{292:function(t,a,s){"use strict";s.r(a);var e=s(28),n=Object(e.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"vue"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vue"}},[t._v("#")]),t._v(" vue")]),t._v(" "),s("h2",{attrs:{id:"库与组件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#库与组件"}},[t._v("#")]),t._v(" 库与组件")]),t._v(" "),s("ul",[s("li",[t._v("库是将代码集合成一个产品，库是我们调用库中的方法实现自己的功能")]),t._v(" "),s("li",[t._v("框架是为了解决一类问题而开发的产品，框架是我们按照规范在指定位置编写好代码，框架帮助我们调用")])]),t._v(" "),s("h2",{attrs:{id:"mvc与mvvm"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#mvc与mvvm"}},[t._v("#")]),t._v(" MVC与MVVM")]),t._v(" "),s("ul",[s("li",[t._v("传统的MVC只的是指，用户操作会请求服务端路由，路由会调用对应控制器来处理，控制器会调用数据层获取数据，将结果返回给视图层，页面重新渲染")]),t._v(" "),s("li",[t._v("MVVM 传统的前端会手动将数据渲染到页面上，MVVM不需要用户操作dom元素，将数据绑定到viewModel层，会自动将数据渲染到页面上，试图变化会通知viewModel层更细数据。ViewModel是MVVM模式中的桥梁")])]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("Vue并没有完全遵循MVVM模型，严格的MVVM模式中,View层不能直接和Model层通信,\n只能通过ViewModel来进行通信。\n")])])]),s("h2",{attrs:{id:"组件基础"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#组件基础"}},[t._v("#")]),t._v(" 组件基础")]),t._v(" "),s("h3",{attrs:{id:"组件分为两种"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#组件分为两种"}},[t._v("#")]),t._v(" 组件分为两种")]),t._v(" "),s("ul",[s("li",[t._v("全局组件")]),t._v(" "),s("li",[t._v("局部组件")])]),t._v(" "),s("h3",{attrs:{id:"为什么要使用组件开发"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#为什么要使用组件开发"}},[t._v("#")]),t._v(" 为什么要使用组件开发")]),t._v(" "),s("ul",[s("li",[t._v("抽离组件实现复用效果")]),t._v(" "),s("li",[t._v("方便维护代码")]),t._v(" "),s("li",[t._v("提高页面更新效率，因为更新时候是组件级别的更新，给每个组件添加一个watcher")])]),t._v(" "),s("h3",{attrs:{id:"组件使用"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#组件使用"}},[t._v("#")]),t._v(" 组件使用")]),t._v(" "),s("ul",[s("li",[t._v("组件其实就是一个对象，组件实例化过程会通过当前传入的对象创建实例，将当前的组件相关html js css放在一起")])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 定义一个名为 button-counter 的新组件")]),t._v("\nVue"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("component")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'button-counter'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("data")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      count"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  template"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'<button v-on:click=\"count++\">You clicked me {{ count }} times.</button>'")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//使用")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("div id"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"components-demo"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("button"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("counter"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("button"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("counter"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("div"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//初始化vue")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Vue")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" el"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'#components-demo'")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("ul",[s("li",[t._v("可以通过Vue.extend构建一个子类，实现手动挂载")])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 构建一个子类")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" Ctor "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Vue"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("extend")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    template"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'<div>{{msg}}</div>'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("data")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// data必须是一个函数 为了防止组件之间的数据相互引用")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("msg"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'hello'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 我们可以手动挂载组件")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// new Vue().$mount()")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//$mount()方法如果传入参数el 创建并挂载到 el (会替换 el)；如果没有传入参数，将会被渲染为文档之外的参数，必须使用dom将其插入到页面")]),t._v("\ndocument"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("body"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("appendChild")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Ctor")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("$mount")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$el"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nconsole"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Ctor"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 返回的是一个子的构造器")]),t._v("\n\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Vue.component 会调用这个Vue.extend方法")]),t._v("\nVue"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("component")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'my-component'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("Ctor"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 组件的使用可以在父级的模板中使用 ")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" vm "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Vue")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    el"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'#app'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("div",{staticClass:"custom-block danger"},[s("p",{staticClass:"custom-block-title"},[t._v("注意")]),t._v(" "),s("p",[t._v("在组建中data必须是一个函数，为了防止组件复用时候，组件之间的数据相互引用")])]),t._v(" "),s("h2",{attrs:{id:"组件间参数传递"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#组件间参数传递"}},[t._v("#")]),t._v(" 组件间参数传递")]),t._v(" "),s("h2",{attrs:{id:"动态组件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#动态组件"}},[t._v("#")]),t._v(" 动态组件")]),t._v(" "),s("h2",{attrs:{id:"异步组件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#异步组件"}},[t._v("#")]),t._v(" 异步组件")]),t._v(" "),s("h2",{attrs:{id:"计算属性computed"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#计算属性computed"}},[t._v("#")]),t._v(" 计算属性computed")]),t._v(" "),s("h2",{attrs:{id:"侦听器watch"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#侦听器watch"}},[t._v("#")]),t._v(" 侦听器watch")]),t._v(" "),s("h2",{attrs:{id:"插槽"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#插槽"}},[t._v("#")]),t._v(" 插槽")]),t._v(" "),s("h2",{attrs:{id:"vm-forceupdate（）"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vm-forceupdate（）"}},[t._v("#")]),t._v(" vm.$forceUpdate（）")]),t._v(" "),s("h2",{attrs:{id:"vm-nexttick"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vm-nexttick"}},[t._v("#")]),t._v(" vm.$nextTick()")]),t._v(" "),s("h2",{attrs:{id:"vue-mount"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vue-mount"}},[t._v("#")]),t._v(" vue.$mount()")]),t._v(" "),s("h2",{attrs:{id:"vue-component（）"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vue-component（）"}},[t._v("#")]),t._v(" vue.component（）")]),t._v(" "),s("h2",{attrs:{id:"vue-compile-template"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vue-compile-template"}},[t._v("#")]),t._v(" Vue.compile( template )")]),t._v(" "),s("h2",{attrs:{id:"vue-mixin（）"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vue-mixin（）"}},[t._v("#")]),t._v(" vue.mixin（）")]),t._v(" "),s("h2",{attrs:{id:"vue-extend（）"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vue-extend（）"}},[t._v("#")]),t._v(" vue.extend（）")]),t._v(" "),s("h2",{attrs:{id:"render"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#render"}},[t._v("#")]),t._v(" render()")]),t._v(" "),s("h2",{attrs:{id:"keep-alilve"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#keep-alilve"}},[t._v("#")]),t._v(" keep-alilve")]),t._v(" "),s("h2",{attrs:{id:"选项-el"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#选项-el"}},[t._v("#")]),t._v(" 选项 el")]),t._v(" "),s("h2",{attrs:{id:"vm-el"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vm-el"}},[t._v("#")]),t._v(" vm.$el")]),t._v(" "),s("h2",{attrs:{id:"vm-data"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vm-data"}},[t._v("#")]),t._v(" vm.$data")]),t._v(" "),s("h2",{attrs:{id:"vm-props"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vm-props"}},[t._v("#")]),t._v(" vm.$props")]),t._v(" "),s("h2",{attrs:{id:"vm-options"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vm-options"}},[t._v("#")]),t._v(" vm.$options")]),t._v(" "),s("h2",{attrs:{id:"emit"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#emit"}},[t._v("#")]),t._v(" $emit()")]),t._v(" "),s("h2",{attrs:{id:"on"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#on"}},[t._v("#")]),t._v(" $on()")]),t._v(" "),s("h2",{attrs:{id:"provide-inject"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#provide-inject"}},[t._v("#")]),t._v(" provide / inject")])])}),[],!1,null,null,null);a.default=n.exports}}]);