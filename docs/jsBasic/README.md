# 第一大节
## 第一节
   ::: tip 啊实打实的
这是一个提示     是打发斯蒂芬是打发斯蒂芬是打发斯蒂芬是打发斯蒂芬是打发斯蒂芬是打发斯蒂芬是打发斯蒂芬是打发斯蒂芬是打发斯蒂芬是打发斯蒂芬是打发斯蒂芬是打发斯蒂芬是打发斯蒂芬

:::

::: warning
这是一个警告
:::

::: danger
这是一个危险警告
:::

::: details
这是一个详情块，在 IE / Edge 中不生效
:::
## 第二节
``` html
<ul>
  <li
    v-for="todo in todos"
    :key="todo.id"
  >
    {{ todo.text }}
  </li>
</ul>
```
``` js
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```