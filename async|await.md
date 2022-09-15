## async/await的原理
> async函数是Generator函数的语法糖

### Generator的用法
> Generator是ES6标准引入的新的数据类型。Generator可以理解为一个状态机，内部封装了很多状态，同时返回一个迭代器iterator对象。可以通过这个迭代器遍历相关的值及状态。

- 普通函数声明，在执行结尾，如果没有return语句，会默认返回 undefined，否则就返回return后面的内容。
- Generator函数使用function*声明的函数，除了return，还有yield可以返回多次
```javascript
function* foo(x) {
    yield x + 1;
    yield x + 2;
    return x + 3;
}
const result = foo(0) // foo {<suspended>}
result.next();  // {value: 1, done: false}
result.next();  // {value: 2, done: false}
result.next();  // {value: 3, done: true}
result.next();  //{value: undefined, done: true}

```
Generator函数的实例。它具有状态值suspended和closed，suspended代表暂停，closed则为结束。但是这个状态是无法捕获的，我们只能通过Generator函数的提供的方法获取当前的状态。

注意:在遇到return的时候，所有剩下的yield不再执行，直接返回{ value: undefined, done: true }

### Generator的方法

Generator函数提供了3个方法，next/return/throw

#### 1、throw抛错
```javascript
function* foo(x) {
  try{
    yield x+1
    yield x+2
    yield x+3
    yield x+4
    
  }catch(e){
    console.log('catch it')
  }
}
const result = foo(0) // foo {<suspended>}
result.next();  // {value: 1, done: false}
result.next();  // {value: 2, done: false}
result.throw();  // catch it {value: undefined, done: true}
result.next();  //{value: undefined, done: true}

```
> 注意！如果在执行throw的时候，没有try catch包裹捕获错误，则会直接抛错

#### 2、遍历
Generator函数的返回值是一个带有状态的Generator实例（Iterator遍历器）。它可以被for of 调用，进行遍历，且只可被for of 调用。
```javascript
function* foo(x) {
    console.log('start')
    yield x+1
   console.log('state 1')
    yield x+2
   console.log('end')
}
const result = foo(0) // foo {<suspended>}
for(let i of result){
    console.log(i)
}
//start
//1
//state 1
//2
//end
result.next() //{value: undefined, done: true}
```

参考链接：https://www.jianshu.com/p/0f1b6ae1888c