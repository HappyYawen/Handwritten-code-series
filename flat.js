/**
 * 实现一个数组的flat函数，将多维数组展开为一个一维数组
 * 递归思路
 */

Array.prototype.flat1 = function() {
    let newArr = []
    for(let i = 0; i< this.length; i++) {
        if(Array.isArray(this[i])) {
            newArr = newArr.concat(this[i].flat1())
        } else {
            newArr.push(this[i])
        }
    }
    return newArr
 }

 console.log([1,2,[3,4,[5,6,7]]].flat1())
 