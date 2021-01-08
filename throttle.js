/**
 * 节流函数
 * 指某函数在一定的时间间隔内只执行一次，只执行第一次函数调用，在这个时间间隔内，后面的产生的所有该函数的调用都无视，直到时间间隔结束。
 * 时间间隔结束后，当再次触发时，执行函数，并开始新的时间间隔，这个时间间隔内同样无视后面产生的所有该函数的调用，直到时间间隔结束，以此类推。。。
 * 函数节流非常适用于函数被频繁调用的场景，例如：window.onresize() 事件、mousemove 事件、上传进度等情况
 */
function throttle(fn, wait) {
    let previous = 0
    return function(...args) {
        let now = new Date().getTime()
        if(now - previous > wait) {
            previous = now
            fn.apply(this, args)
        }
    }
}