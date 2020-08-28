# 防抖与节流
## 防抖 debounce

>函数防抖（debounce）：将几次操作合并为一次操作进行，原理是维护一个计时器，规定在delay时间后触发函数，但是在delay时间内再次触发的话，就会取消之前的计时器而重新设置。这样一来只有最后一次操作能被触发
```js
    let dom =  document.getElementById("debounce");
    dom.onclick = debounce(function a(){
        console.log("防抖")
    },2000)
    function debounce(fn, wait) {
        let time = null;
        return function (...args) {
            if (time) {
                    clearTimeout(time);
            }
            time = setTimeout(() =>{
                    fn.apply(this, args);
            },wait);
        }
    }
```
## 节流 throttle
>函数节流：使得一定时间内只触发一次函数。原理是通过判断是否达到一定时间来触发函数
```js
//利用时间戳
function throttle(fn,wait){
    let pre = 0;
    return function(...args){
        let now = Date.now();
        if((now - pre) > wait){
        fn.apply(this,args)
        pre = Date.now();
        }
    }
}
//利用定时器
function throttle(fn,wait){
    let timer = null;
    return function(...args){
        if(!timer){
        timer = setTimeout(() =>{
            fn.apply(this,args);
            timer = null;
        },wait);
        }

    }
}
```
## 区别
>函数节流不管事件触发有多频繁，都会保证在规定时间内一定会执行一次真正的事件处理函数，而函数防抖只是在最后一次事件后才触发一次函数。比如在页面的无线加载场景下，我们需要用户在滚动页面时，每隔一秒触发一侧ajax请求，而不是在用户停下滚动页面操作时才去请求数据，这样的场景就适合用节流的技术来实现。