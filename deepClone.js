/**
 * 深拷贝
 */
const obj = {
    age: 20,
    name: 'xxxxx',
    address: {
        city: 'beijing'
    },
    [Symbol({name:'111'})]: 22,
    arr: ['a', 'b', 'c']
}

/**
 * 深拷贝
 * @param {*} obj 
 */
function deepClone(obj = {}, hash = new WeakMap()) {
    if(typeof obj !== 'object' || obj == null) {
        return obj
    }
    //防止obj中有属性引用自身，形成死循环
    if(hash.has(obj)) return hash.get(obj) //查哈希表

    let result = obj instanceof Array ? [] : {}
    hash.set(obj, result)//哈希表设值
    //Symbol类型的属性，不可枚举，使用Object.getOwnPropertySymbols获取
    let symbols = Object.getOwnPropertySymbols(obj)
    for(let i = 0; i < symbols.length; i++) {
        result[symbols[i]] = deepClone(obj[symbols[i]])
    }
    for(let key in obj) { //会枚举出原型的属性
        //保证key不是原型的属性
        if(obj.hasOwnProperty(key)) {
            //递归调用
            result[key] = deepClone(obj[key])
        }
    }

    return result
}

const obj2 = deepClone(obj)
obj2.address.city = 'shanghai'
obj2.arr[1] = 'd'
console.log("🚀 ~ file: deepClone.js ~ line 38 ~ obj2", obj2, obj)