const person = {
  name: 'karla',
  age: 27
}

const personProxy = new Proxy(person, {
  get(target, property){
    // console.log(target, property)
    return property in target ? target[property] : 'default'
  },
  set(target, property, value){
    if(property === 'age' && !Number.isInteger(value)) {
      throw new TypeError(`${value} is not an int`)
    }
    target[property] = value
  },
  deleteProperty(target, property) {
    console.log('delete: ', property)
    delete target[property]
  }
})
personProxy.age = 26
personProxy.gender = true
console.log(personProxy.name)
console.log(personProxy.age)
delete personProxy.gender
console.log(person)

// proxy监视数组对象
const list = []
const listProxy = new Proxy(list, {
  set(target, property, value) {
    console.log('set', property, value)
    target[property] = value
    return true // 必须有返回值
  }
})
listProxy.push(100)
// set 0 100
// set length 1