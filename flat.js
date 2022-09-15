/**
 * 实现一个数组的flat函数，将多维数组展开为一个一维数组
 * 递归思路
 */

Array.prototype.flat1 = function() {
    let newArr = []
    let self = this
    for(let i = 0; i < self.length; i++) {
        if(Array.isArray(self[i])) {
            newArr = newArr.concat(self[i].flat1())
        } else {
            newArr.push(self[i])
        }
    }
    return newArr
 }

 console.log([1,2,[3,4,[5,6,7]]].flat1())
 