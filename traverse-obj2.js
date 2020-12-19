/**
 * 通用树的层序遍历
 * @param {*} tree 
 */
function traverseObj(tree) {
    let res = [],
        stack = [tree]
    while (stack.length) {
        let arr = [], res1 = []
        stack.forEach((node) => {
            res1 = [...res1,...Object.keys(node)]
            arr = arr.concat(Object.values(node).filter(val => typeof val === 'object'))
        })
        stack = arr
        res = res1.concat(res)
    }
    return res
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