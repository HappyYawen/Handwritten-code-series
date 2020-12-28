/**
 * 根据执行顺序得知:
 * 1、setTimeout的优先级高于setImmediate
 *    promise.nextTick的优先级高于promise.then
 * 2、每一类异步任务都有一个自己的任务队列，如下：
 * 宏任务                        微任务
 * *************   ********     *****************
 * timeout队列     **     **     promise.nextTick队列
 * *************  ** 执行栈 **   *****************
 * immediate队列   **     **     promise队列
 * *************   *******      *****************
 * 
 * 3、整体异步队列分为两种情况：宏任务(matro-task)和微任务(micro-task),现称为task和jobs
 * 4、大类的分类：macro-task：script、setTimeout、setImmediate、I/O、UI rendering
 *              micro-task：promise.nextTick、promise、async/await、Object.observe(已废弃)、MutationObserver(html5新特性)
 * 5、执行顺序：先顺序执行script，再清空micro-task、再执行一个宏任务、再清空micro-task。。。。。
 * 6、await后面的顺序执行内容，都会先进入微任务中等待，当await执行完成，后面的顺序内容会一次性执行完
 */

console.log('golb1');

setImmediate(function() {
    console.log('immediate1');
    process.nextTick(function() {
        console.log('immediate1_nextTick');
    })
    new Promise(function(resolve) {
        console.log('immediate1_promise');
        resolve();
    }).then(function() {
        console.log('immediate1_then')
    })
})

setTimeout(function() {
    console.log('timeout1');
    process.nextTick(function() {
        console.log('timeout1_nextTick');
    })
    new Promise(function(resolve) {
        console.log('timeout1_promise');
        resolve();
    }).then(function() {
        console.log('timeout1_then')
    })
})

new Promise(function(resolve) {
    console.log('glob1_promise');
    resolve();
}).then(function() {
    console.log('glob1_then')
})

process.nextTick(function() {
    console.log('glob1_nextTick');
})

setTimeout(function() {
    console.log('timeout2');
    process.nextTick(function() {
        console.log('timeout2_nextTick');
    })
    new Promise(function(resolve) {
        console.log('timeout2_promise');
        resolve();
    }).then(function() {
        console.log('timeout2_then')
    })
})

new Promise(function(resolve) {
    console.log('glob2_promise');
    resolve();
}).then(function() {
    console.log('glob2_then')
})

process.nextTick(function() {
    console.log('glob2_nextTick');
})

setImmediate(function() {
    console.log('immediate2');
    process.nextTick(function() {
        console.log('immediate2_nextTick');
    })
    new Promise(function(resolve) {
        console.log('immediate2_promise');
        resolve();
    }).then(function() {
        console.log('immediate2_then')
    })
})

async function syncFun() {
    console.log('sync1')
    await Promise.resolve('await resolve').then((res) => {
        console.log(res)
    })
    new Promise(function(resolve) {
        console.log('glob3_promise');
        resolve();
    }).then(function() {
        console.log('glob3_then')
    })
    console.log('sync end')
}
syncFun()



/**
 * 答案：
 * 第一轮循环:
 * 宏任务：
 *  golb1
 *  glob1_promise
 *  glob2_promise
 *  sync1
 * 微任务：
 *  glob1_nextTick
 *  glob2_nextTick
 *  glob1_then
 *  glob2_then
 *  await resolve
 *  glob3_promise
 *  sync end
 *  glob3_then
 * 第二轮循环:
 * 宏任务：
 *  timeout1
 *  timeout1_promise
 * 微任务：
 *  timeout1_nextTick
 *  timeout1_then
 * 第三轮循环:
 * 宏任务：
 *  timeout2
 *  timeout2_promise
 * 微任务：
 *  timeout2_nextTick
 *  timeout2_then
 * 第四轮循环:
 * 宏任务：
 *  immediate1
 *  immediate1_promise
 * 微任务：
 *  immediate1_nextTick
 *  immediate1_then
 * 第五轮循环:
 * 宏任务：
 *  immediate2
 *  immediate2_promise
 * 微任务：
 *  immediate2_nextTick
 *  immediate2_then
 */