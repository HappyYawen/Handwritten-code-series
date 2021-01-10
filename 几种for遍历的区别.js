let arr = [10, 20, , 30, 40, 50] // 角标2是一个空值
arr.demo = 60 // 额外添加的属性
Array.prototype.test = function () {} // 原型上添加的属
let obj = {
    name: 'liu',
    age: 99
}
obj.sex = '男'
Object.prototype.demo = function () {} // 原型上添加的属性

/**
 * for(let i = 0; i < arr.length; i++)
 * 不会循环原型上的可枚举属性
 * 可以使用break return跳出循环，continue跳出该轮循环
 * 不会跳过空值
 */
for(let i = 0; i < arr.length; i++){
    console.log(arr[i])
}
//10
//20
//undefined
//30
//40
//50

/**
 * forEach
 * forEach是for循环的扩展，不会循环原型上的可枚举属性
 * 多用于遍历数组
 * 不可使用break continue跳出循环，使用return只是起到了continue的作用
 * 遍历时会跳出空值
 */
arr.forEach((item, index) => {
    if(index ===1){
        return
    }
    console.log(item, typeof item)
})
//10 number
//30 number
//40 number
//50 number

/**
 * for...in...
 * for(let key in arr)
 * 会循环原型上的可枚举属性
 * 循环出的是数组每一项的索引，多用于循环对象，
 * 不建议遍历数组，因为遍历数组时，可能会不按照数组的实际元素顺序
 * 支持break continue return跳出循环
 * 遍历数组时会跳出空值
 */
for(let key in arr) {
    //key是arr的索引，但是在遍历时，被转化为了字符串
    console.log(key,typeof key, arr[key])
}
//0 string 10
//1 string 20
//3 string 30
//4 string 40
//5 string 50
//demo string 60
//test string [Function (anonymous)]

for(let i in obj){
    console.log(i)
}
// 打印结果
// name age sex demo

/**
 * for...of
 * 可遍历拥有iterator迭代器对象的集合，如数组，类数组，字符串，Set，Map，不支持普通对象
 * 可直接获取数组中的值
 * 只循环数组本身元素，不循环言行上或额外添加的属性
 * 支持break continue return跳出循环
 * 遍历时不会跳过空值
 */
for(let value of arr) {
    console.log(value, typeof value)
}
//10 number
//20 number
//undefined undefined
//30 number
//40 number
//50 number