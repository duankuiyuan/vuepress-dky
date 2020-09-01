# 设计模式
## 设计原则
## 单例模式
保证一个类仅有一个实例
```js
  // 完美单例模式
    var Test = (function () {
        //AO 
        var instance = null;
        return function (name) {
            if (instance) {
            return instance;
            }
        this.name = name;
        instance = this;
        // return this;
        }
    })();
```
## 工厂模式
## 发布订阅模式
## 观察者模式