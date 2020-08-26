# 线性表结构
## 线性结构之数组
> 特别注意：这里所说的数组是数据结构中的数组，和js中的数组不一样

**数组时一整块连续的内存空间，它由固定数量的元素组成，数组具有以下基本特征**

1. 数组占用的内存空间是连续的
2. 数组中元素的数量是固定的（不可增加也不可减少），创建数组时必须指定长度
3. 每个元素占用的内存大小是完全一致的
![](./imgs/2019-11-21-15-06-05.png)

**根据数组的基本特征，我们可以推倒出数组具有以下特点**

1. 通过下标寻找对应的元素效率极高，因此遍历速度快
2. 无法添加和删除数据，虽然可以通过某种算法完成类似操作，但会增加额外的内存开销或者时间开销
3. 如果数组需要的空间很大，可能一时无法找到足够大的连续空间

**JS中的数组**

在es6之前，js没有真正意义的数组，所谓的Array，实际上底层实现是链表

在es6之后，出现真正的数组（类型化数组），但由于只能存储数字，因此功能有限。


## 线性结构之链表
### 链表
链表是一种物理存储结构上非连续、非顺序的存储结构，数据元素的逻辑顺序是通过链表中的引用链接次序实现的。

链表是为了弥补数组的缺陷而出现的一种数据结构，它具有以下特征

1. 长度是可变的，随时可以增加和删除元素
2. 插入和删除元素的效率很高
3. 由于要存储下一个元素的地址，会增加额外的内存开销
4. 通过下标查询链表中的某个点，效率很低，因此链表的下标遍历效率很低

**手动用代码实现链表**

实际上，很多语言本身已经实现了链表（如js中的数组，底层就是用链表实现的）
1. **遍历打印**
```js
  function Node(value){
           this.value = value;
           this.next = null;
       }
       let root = new Node("a");
       let b = new Node("b");
       let c = new Node("c");
       let d = new Node("d");
       let e = new Node("e");
       let f = new Node("f");
       let g = new Node("g");
       root.next = b;
       b.next = c;
       c.next = d;
       d.next = e;
       e.next = f;
       f.next = g;
       //遍历
       function print(root){
        //   while(root){
        //     console.log(root.value);
        //     root = root.next;
        //   }
       
        if(root){
            console.log(root.value);
            root = root.next;
            print(root)
        }
       }
       print(root);
        
```
2. **获取链表的长度**
```js
function count(root){
    if(!root){
    return 0;
    }
    return 1 + count(root.next)//1表示根节点占用一个数量
}
console.log(count(root))
```
3. **通过下标获取链表中的某个数据**
```js
function getNode(root,index){
        function _get(root,i){
           if(!root){
             return null;
           }
           if(i == index){
             return root;
           }
           return _get(root.next,i +1);
        }
        return _get(root,0);
    }
   console.log(getNode(root,6)) 
```
4. **通过下标设置链表中的某个数据**
```js
function setValue(root,index,value){
   function _set(root,i,value){
      if(!root){
          return;
      }
      if(i== index){
         root.value = value;
         return;
      }
      _set(root.next,i + 1,value);
   }
   _set(root,0,value)
}
setValue(root,3,"3")
print(root)
```
5. **在链表某一个节点之后加入一个新节点**
```js
function insertAfter (node,newNode){
    let tem = node.next;
    node.next = newNode;
    newNode.next = tem;

}
insertAfter(b,new Node("b1"))
 print(root)
```
6. **在链表末尾加入一个新节点**
```js
function push(root,newNode){
   if(!root.next){
    root.next = newNode;
    return;
   }
   push(root.next,newNode)
}
push(root,new Node('l'))
print(root)
```
7. **删除一个链表节点**
```js
function removeChld(root,newNode){
  if(!root || !root.next){
    return;
  }
  if(root.next.value == newNode.value){
     root.next = root.next.next;
     return;
  }
  removeChld(root.next,newNode);
}
removeChld(root,c);
print(root)
```
8. **链表倒序**
```js
function reverse(root){
   if(!root.next.next){
       //只有两项
       let temp = root.next;
       root.next.next = root;
       root.next = null;

       return temp;
   }else{
     let temp = reverse(root.next);
     root.next.next = root;
     root.next = null;
     return temp;
   }
}
print(reverse(root));
```

## 物理结构与逻辑结构
### 逻辑结构
+ 所谓逻辑结构就是数据与数据之间的关联关系，准确的说是数据元素之间的关联关系
### 物理结构
+ 数据的物理结构就是数据存储在磁盘中的方式。官方语言为：数据结构在计算机中的表示（又称映像）称为数据的物理结构，或称存储结构。它所研究的是数据结构在计算机中的实现方法，包括数据结构中元素的表示及元素间关系的表示。
## 线性结构之队列
### 队列
+ 队列是一种先进先出的线性表。允许插入的一端称为队尾，允许删除的一端称为队头。
## 线性结构之栈
### 栈
+ 栈又名堆栈，它是一种受限制的线性表，仅限定在表尾进行插入和删除操作的线性表。它按照先进后出的原则存储数据
