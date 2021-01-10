/**
 * 使用filter
 * 时间复杂度O(n^2)
 * 空间复杂度O(1)
 */
function duplicate(arr) {
    //filter不修改原来的数组，返回一个新数组
    return arr.filter((item, i, array) => {
        return array.indexOf(item) === i
    })
}

/**
 * 使用object键值不可重复的特性
 * @param {*} arr 
 * 时间复杂度O(n)
 * 空间复杂度O(n)
 */
function duplicate1(arr) {
    let obj = {}
    for(let i = 0; i < arr.length; i++) {
        obj[arr[i]] = arr[i]
    }
    return Object.values(obj)
}

/**
 * 使用es6的Set数据结构
 * 额外补充
 * Set的has时间复杂度是O(1)
 * Set的key,value值一样
 * for of遍历的是Set的values的值
 * * * * * * * * * * *
 * 该种方法时间复杂度O(n),空间复杂度O(n)
 */
function duplicate2(arr) {
    return [...new Set(arr)]
}

/**
 * 利用reduce
 * 时间复杂度O(n^2)
 * 空间复杂度O(1)
 */
function duplicate3(arr) {
    return arr.reduce((prev, cur) => {
        //indexof的时间复杂度为O(n),一直遍历查找到第一个匹配的元素的索引为止
        if(prev.indexOf(cur) === -1) { 
            prev.push(cur) 
        }
        return prev
    },[])
}

/**
 * 先排序，再利用快慢指针
 * sort排序的使用方法：
 * 当没有参数传入的时候，其排序顺序默认为，将待排序数据转换为字符串，并按照Unicode序列排序；
 * 当传入自定义函数的时候，自定义排序函数需要返回值，其返回值为-1，0，1，分别表示a<b, a=b, a>b.
 * sort排序的原理
 * 当数组长度小于等于10的时候，采用插入排序(最小O(n)最大O(n^2))，大于10的时候，采用快排(时间复杂度O(nlogn))
 * 时间复杂度O(n)
 * 空间复杂度O(1)
 */
function duplicate4(arr) {
    //sort会改变原来数组的顺序
    arr.sort((a,b)=> a-b)
    let res = [arr[0]], slow = 0, fast = 1
    while(fast < arr.length) {
        if(arr[slow] !== arr[fast]) {
            res.push(arr[fast])
            slow = fast
        }
        fast++
    }
    return res
}


let array = [1,2,3,4,5,1,2,3,4,5,1,2,3,4,5]
console.log(duplicate(array))
console.log(duplicate1(array))
console.log(duplicate2(array))
console.log(duplicate3(array))
console.log(duplicate4(array))