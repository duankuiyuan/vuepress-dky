# 排序与查找
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
+ 快速排序标准版
```js
//小的放左边，大的放右边
function quickSort(){
 
  function _quickSort(arr,start,end){
    if(start >= end || start > arr.length -1){
     return;
    }
    let low = start;
    let high = end;
    let key = arr[end]
    while(low < high){
       while(low < high && arr[low] <= key){
           low ++;
       }
       arr[high] = arr[low];
       while(low < high && arr[high] >= key){
          high --;
       }
       arr[low] = arr[high];
    }
    arr[low] = key;
    _quickSort(arr,start,low -1);
    _quickSort(arr,low +1,end);
  }
  _quickSort(arr,0,arr.length-1)
}
let arr = [0,6,8,3,7,8,2,1,9];
quickSort(arr)
```
## 二分查找
```js
function search(arr,target){
  if(arr.length === 0 || target < arr[0] || target > arr[arr.length -1]) return false;
  let minIndex = 0;
  let maxIndex = arr.length -1;
  while(minIndex <= maxIndex){
    let mid = Math.floor((minIndex + maxIndex)/2);//中间下标
    if(arr[mid] === target){
      return true;
    }else if(arr[mid] > target){
      maxIndex = mid - 1;
    }else{
      minIndex = mid + 1;
    }

  }
  return false;
}
console.log(search([1,2,3,4,5,6,7,8],100))
```