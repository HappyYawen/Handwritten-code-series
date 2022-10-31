/**
 * es2016新增两个变动
 * 1、数组实力对象新增includes方法
 * 2、指数运算符 2 ** 10 替代 Math.pow(2, 10)
 *  */ 


/**
 * es2017新增变动
 * 1、Object.values(), Object.entries(), Object.getOwnPropertyDescriptors()
 * 2、字符串填充方法：String.Prototype.padStart, String.Prototype.padEnd
 * 意义：用给定的字符串为目标字符串的开始和结尾填充位置
 * 3、Async/Await
 */

const obj = {
  name: 'karla',
  age: 27
}
const entries = Object.entries(obj)
console.log(Object.values(obj))
console.log(entries) // [['name', 'karla'], ['age', 27]]
// 使用object.enteries()后生成的双重数组，有两个用途
// 1、定义为map类型
const map = new Map(entries)
console.log("🚀 ~ file: 05-es2016&2017.js ~ line 21 ~ map", map)
// 2、使用for...of遍历对象
for(let [key, value] of entries) {
  console.log('key, value: ', key, value)
}

const p1 = {
  firstName: 'Lei',
  lastName: 'wang',
  get fullName() { // 定义一个只读属性
    return this.firstName + ' ' + this.lastName
  }
}
console.log(p1.fullName) // Lei Wang
const p2 = Object.assign({}, p1)
p2.firstName = 'Guo'
// p2无法通过修改firstName来改动fullName的值，因为fullName作为一个属性值 复制给的p2
console.log(p2.fullName) // Lei Wang
/**
 * 查看此时p2的所有属性完整的描述信息，发现fullName是一个普通的可被读写的属性值
 * {
  firstName: {
    value: 'Guo',
    writable: true,
    enumerable: true,
    configurable: true
  },
  lastName: {
    value: 'wang',
    writable: true,
    enumerable: true,
    configurable: true
  },
  fullName: {
    value: 'Lei wang',
    writable: true,
    enumerable: true,
    configurable: true
  }
}
 */
console.log(Object.getOwnPropertyDescriptors(p2))

// 如何能完成的复制p1的属性特征，通过 Object.getOwnPropertyDescriptors(p1)
const p3 = Object.defineProperties({}, Object.getOwnPropertyDescriptors(p1))
p3.firstName = 'Guo'
console.log(p3.fullName) // Guo Wang

//String.Prototype.padStart 和 String.Prototype.padEnd 使用案例

const books = {
  html: 5,
  css: 16,
  javascript: 128
}
/** 打印结果
html------------|005
css-------------|016
javascript------|128
 */
for(const [name, count] of Object.entries(books)) {
  console.log(`${name.padEnd(16, '-')}|${count.toString().padStart(3, 0)}`)
}