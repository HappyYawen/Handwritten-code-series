/**
 * 节流函数
 * 指某函数在一定的时间间隔内只执行一次，只执行第一次函数调用，在这个时间间隔内，后面的产生的所有该函数的调用都无视，直到时间间隔结束。
 * 时间间隔结束后，当再次触发时，执行函数，并开始新的时间间隔，这个时间间隔内同样无视后面产生的所有该函数的调用，直到时间间隔结束，以此类推。。。
 * 函数节流非常适用于函数被频繁调用的场景，例如：window.onresize() 事件、mousemove 事件、上传进度等情况
 * 
 * wait：我们可以自己设置的节流频率
 */
function throttle(fn, wait) {
    let previous = 0 //上一次执行fn的时间
    return function(...args) {
        let now = +new Date()
        if(now - previous > wait) {
            previous = now
            fn.apply(this, args)
        }
    }
}
//定时器方式实现
function throttle1(fn, wait) {
    let timeout = null
    return function(...args) {
        let self = this
        if(!timeout) {
            fn.apply(self, args)
            timeout = setTimeout(function(){
                clearTimeout(timeout)
                timeout = null
            },wait)
        }
    }
}
console.log("触发")
let a = throttle(function() {
    console.log("hello")
}, 3000)

a()//立马打印hello

let b = throttle1(function() {
    console.log("world")
}, 3000)
b()//立马打印world

let timeout = setTimeout(
    function() {
        //三秒后打印
        a()
        b()
        clearTimeout(timeout)
        timeout = null
    }, 
3000)