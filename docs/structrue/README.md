# 线性表结构
## 线性结构之数组
### 数组的特性
+ 储存在物理空间上是连续的
+ 底层的数组长度是不可变的,js的数组长度可变是js内部做的扩容处理。数组扩容会重新创建更大长度的数组，将老数组的内容复制过去和新内容共同组成新数组（数组扩容会耗费性能）。
### 数组的优点
+ 查询性能好。指定查询某个位置
### 数组的缺点
+ 因为空间必须是连续的，所以数组比较大，当系统的空间碎片较多时候，容易存不下
+ 因为数组的长度是固定的，所以数组难以被添加和删除
## 线性结构之链表
### 链表
+ 链表是一种物理存储结构上非连续、非顺序的存储结构，数据元素的逻辑顺序是通过链表中的引用链接次序实现的。
```js
let c = {
    next:null,
    value:"c"

}
let b = {
    next:c,
    value:"b"

}
let a = {
    next:b,
    value:"a"
}
console.log(a.next.next == c;)//true
```
### 链表的特点
+ 空间上不是连续的
+ 每存放一个值，都要多开销一个引用空间
### 链表的优点
+ 只要内存足够大，就能存的下，不用担心空间碎片问题
+ 链表的添加和删除很容易
### 链表的缺点
+ 查询速度慢
### 链表的遍历
+ 链表的循环遍历
```js

//循环遍历
function Node(value){
    this.value=value;
    this.next = null;
}
let node1 =new Node(1);
let node2 =new Node(2);
let node3 =new Node(3);
let node4 =new Node(4);
let node5 =new Node(5);
node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node5;
function bianli(root){
   let current = root;
   while(true){
     if(current){
          console.log(current.value);
        current = current.next
     }else{
      break;
     }
   }
}
bianli(node1)//1 2 3 4 5
```
+ 链表递归遍历
```js
function Node(value){
    this.value=value;
    this.next = null;
}
let node1 =new Node(1);
let node2 =new Node(2);
let node3 =new Node(3);
let node4 =new Node(4);
let node5 =new Node(5);
node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node5;
function bianli(root){
    if(root){
        console.log(root)
        bianli(root.next)
    }
}
bianli(node1) // 1 2 3 4 5
```
### 链表的逆反
```js
//链表的逆反
function reversal(root){
    if(root.next.next){
      let result = reversal(root.next)
      root.next.next = root;
      root.next = null;
      return result;
    }else{
        root.next.next = root;
        return root.next;
    }
}
console.log(reversal(node1))
```
## 线性结构之队列
## 线性结构之栈