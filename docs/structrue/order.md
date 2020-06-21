# 排序
## 冒泡排序
### 排序的本质
+ 排序的本质是比较和交换，不是比较大小
```js
//比较
function compare(a,b){
  if(a > b){
      return true;
  }else{
    return false;
  }
}
//交换位置
function exchange(arr,a,b){
    let temp = arr[a];
    let arr[a] = arr[b];
    let arr[b] = temp;
}
//排序
function sort(){
  for(let i = 0; i< arr.length;i++){
    //for循环走完一次（i加1）会把符合比较条件的放在数组的最后一位
      for(let j = 0;j < arr.length -1-i;j++){
          if(compare(arr[j],arr[j+1])){
              exchange(arr,j,j+1);
          }
      }
  }

}
```
## 选择排序
+ 首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。以此类推，直到所有元素均排序完毕。
```js
function compare(a,b){
  if(a > b){
   return true;
  }else{
   return false;
  }
}
function exchange(arr,a,b){
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}
//选择排序
function sort(arr){
  for(let i = 0; i < arr.length; i++){
    let maxIndex = 0;
    for(let j = 0; j< arr.length -i; j++){
      if(compare(arr[maxIndex],arr[j])){//找最大或者最小元素
        maxIndex = j;
      }
    }
    exchange(arr,maxIndex,arr.length-1-i)//将最大或者最小元素放在末尾
  }

  return arr;
   
}
```
## 快速排序
+ 快速排序简单版本
```js

```
+ 快速排序标准版
