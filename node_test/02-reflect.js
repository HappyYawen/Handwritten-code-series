// reflect存在的意义：提供了统一的一套操作对象的API
// reflect成员的方法，是proxy定义监管对象方法的默认实现

const obj = {
  name: 'karla',
  age: 27
}
// 传统的操作
// console.log('name' in obj) // 操作符方式
// console.log(delete obj.age) // 操作符方式
// console.log(Object.keys(obj)) // Object API 方式

// 使用reflect方式
console.log(Reflect.has(obj, 'name'))
console.log(Reflect.deleteProperty(obj, 'age'))
console.log(Reflect.ownKeys(obj))

const person = {
  name: 'karla'
}
const proxy = new Proxy(person, {
  get(target, property) { 
    // 如果定义proxy对象时，不自定义get方法，那么get方法默认就是调用Reflect.get(target, property)来实现的
    // 所以在定义proxy监管对象的方法时，最好的实现方式是写完自定义的逻辑后，再调用reflect的默认方法
    console.log("watch logic~")
    return Reflect.get(target, property)
  }
})
console.log(proxy.name)