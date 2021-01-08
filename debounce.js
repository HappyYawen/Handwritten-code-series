/**
 * 防抖函数
 * 函数触发后，一定的时间间隔内不作处理，
 * 如果这个时间间隔内没有再次触发该函数，则执行函数；
 * 如果这个时间间隔内又触发了函数，则重新计时新的时间间隔，直到时间间隔内没有再次触发该函数，则时间间隔结束后执行函数
 * 实现原理：
 * 实现原理就是利用定时器，函数第一次执行时设定一个定时器，
 * 之后调用时发现已经设定过定时器就清空之前的定时器，并重新设定一个新的定时器，
 * 如果存在没有被清空的定时器，当定时器计时结束后触发函数执行。
 * 
 * 使用场景：
 * 滚动监听、input输入框动态校验，inputSearch动态查询等
 */
function debounce(fn, wait) {
    // 通过闭包缓存一个定时器 id
    let timer = null
    // 将 debounce 处理结果当作函数返回
    // 触发事件回调时执行这个返回函数
    return function(...args) {
        // 如果已经设定过定时器就清空上一次的定时器
        if(timer) clearTimeout(timer)

        // 开始设定一个新的定时器，定时器结束后执行传入的函数 fn
        //使用箭头函数，不会修改this指向
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, wait)
    }
}
// DEMO
// 执行 debounce 函数返回新函数
const betterFn = debounce(() => console.log('fn 防抖执行了'), 1000)
// 停止滑动 1 秒后执行函数 () => console.log('fn 防抖执行了')
document.addEventListener('scroll', betterFn)