### DOM事件类
1. DOM0 element.onclick = function(){}
2. DOM2 element.addEventListener('click', function() {}, false)//默认false冒泡
3. DOM3 element.addEventListener('keyup', function(){}, false) //在DOM2的基础上增加了事件类型
### DOM事件模型：捕获与冒泡
捕获从上到下，冒泡：从目标元素往上
事件流,一共三个阶段，捕获、目标阶段、冒泡：![avatar](./%E9%A1%B5%E9%9D%A2%E5%B8%83%E5%B1%80/md-image/dom%E4%BA%8B%E4%BB%B6%E6%B5%81.jpg)
### 描述DOM事件捕获的具体流程
* 第一个接收到事件的对象是window,然后是document、html(document.documentElement)、body、然后按照document元素一层一层往下递进
* 最后到目标元素
冒泡流程与捕获相反
### Event对象的常见应用
* event.preventDefault() 阻止默认事件，比如a标签的默认事件跳转
* event.stopPropagation() 阻止冒泡行为
* event.stopImmediatePropagation() 加入一个按钮绑定了两个click事件a,b，触发事件时，调用完事件a的回调函数，在a回调函数中调用该api，就可以立即阻止b回调函数的执行
* event.currentTarget 当前所绑定的事件对象
* event.target 当前被点击的元素
### 自定义事件
```js
var eve = new Event('custome') // 定义事件
// 监听事件
ev.addEventListener('custome', function(){
  console.log('custome')
})
ev.dispatchEvent(eve) // 触发事件

// CustomeEvent(eventName, object) 第二个参数可以接收object，挂载在回调函数的参数event上
var mdiv = document.getElementById("mydiv");
var eventName = "MY_EVENT";
var myEvent = new CustomEvent(eventName, {
  detail: {
    data:"Hello myEvent"
  }
});
mdiv.addEventListener(eventName, function(evt){
  console.log(evt.detail.data); //此处可以拿到自定义的参数
});
mydiv.onclick = function(){
  mydiv.dispatchEvent(myEvent);
}
```


