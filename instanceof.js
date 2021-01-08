/**
 * instanceof的用途
 * 用来判断一个对象实例的类型是否是某构造函数
 * 也可以用来判断对象实例是否属于其原型链上的祖先类型
 * instanceof的原理
 * 就是左侧的参数实例的__proto__属性 沿着原型链一直往上延伸查找每一个原型 是否与右侧的参数的原型相等
 */
function instance_of(L, R) {
    let O = R.prototype
    L = L.__proto__
    while(L) {
        if(L === null) {
            return false
        }
        if(L === O) {
            return true
        }
        L = L.__proto__
    }
    return false
}
console.log(instance_of([], Array))
console.log(instance_of([], Object))