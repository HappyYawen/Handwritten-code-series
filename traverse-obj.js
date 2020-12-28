/**
 * 遍历多叉树
 * @param {*} obj 
 */
function traverseObj(obj) {
    let res = [
        Object.keys(obj)
        ],
        arr = Object.values(obj),
        result = []
    helper(arr, res)
    for (let i = res.length - 1; i >= 0; i--) {
        for (let j = 0; j < res[i].length; j++) {
            result.push(res[i][j])
        }
    }
    console.log(result)
    return result
}

function helper(arr, res) {
    let res1 = [],
        obj1 = []
    if (!arr.length) {
        return res
    }
    for (let i = 0; i < arr.length; i++) {
        res1 = [...res1, ...Object.keys(arr[i])]
        for (let key in arr[i]) {
            if (arr[i][key] + '' === '[object Object]') {
                obj1.push(arr[i][key])
            }
        }
    }
    res.push(res1)
    helper(obj1, res)
}

traverseObj({
    a: {
        b: {
            aa: {
                m0: '2'
            }
        },
        c: {
            bb: {
                m1: '2'
            }
        },
        d: {
            cc: {
                m2: '2'
            }
        }
    }
})