/**
 * 防抖函数
 * 高频操作触发时，只执行一次，要么执行第一次，要么执行最后一次
 * 如果执行第一次，那么后面的触发都不做处理(也需要定时器来配合)；
 * 如果执行最后一次，设置一个定时器，每次触发都重新计时，直到没有再次触发该函数，则执行函数
 * 实现原理：
 * 执行最后一次的实现原理就是利用定时器，函数第一次执行时设定一个定时器，
 * 之后调用时发现已经设定过定时器就清空之前的定时器，并重新设定一个新的定时器，
 * 如果存在没有被清空的定时器，当定时器计时结束后触发函数执行。
 * 
 * 执行第一次的实现原理，结合上面定时器timer是否存在来标记，是否已经执行了第一次
 * 
 * 使用场景：
 * 滚动监听、input输入框动态校验，inputSearch动态查询等
 */
function debounce(fn, wait = 300, immediate = false) {
    if (typeof fn !== 'function') throw new Error('fn must be an function')
    // 如果只传了两个参数，第二个参数是boolean类型，则
    if (typeof wait === 'boolean') {
        immediate = wait
        wait = 300
    }
    // 通过闭包缓存一个定时器 id
    let timer = null
    // 将 debounce 处理结果当作函数返回
    // 触发事件回调时执行这个返回函数
    return function proxy(...args) {
        // 第一次执行
        if (timer === null && immediate) {
            fn.apply(this, args)
        }
        // 如果已经设定过定时器就清空上一次的定时器
        if(timer) clearTimeout(timer)

        //最后一次执行
        // 开始设定一个新的定时器，定时器结束后执行传入的函数 fn
        //使用箭头函数，不会修改this指向
        timer = setTimeout(() => {
            timer = null
            !immediate ? fn.apply(this, args) : null
        }, wait)
    }
}
// DEMO
// 执行 debounce 函数返回新函数
const betterFn = debounce(() => console.log('fn 防抖执行了'), 1000)
// 停止滑动 1 秒后执行函数 () => console.log('fn 防抖执行了')
document.addEventListener('scroll', betterFn)
