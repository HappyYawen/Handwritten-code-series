/** 
 * 迭代器模式
 * 意义：对外提供统一的遍历接口，让外部不再去担心这个数据内部的结构是怎么样的
 * **/
const todos = {
  life: ['吃饭', '睡觉', '打豆豆'],
  learn: ['语文', '数学', '英语', '体育'],
  work: ['喝茶'],
  // each此时产生的作用是与iterator一样的，但是他只能针对数组
  each: function(callback) {
    const arr = [].concat(this.life, this.learn, this.work)
    for(let item of arr) {
      callback(item)
    }
  },
  // 可以针对任何数据结构实现iterator迭代器，使其能够用for...of来遍历
  [Symbol.iterator]: function() {
    const all = [...this.life, ...this.learn, ...this.work]
    let index = 0
    return {
      next: function() {
        return {
          value: all[index],
          done: index++ >= all.length
        }
      }
    }
  }
}

for(let item of todos) {
  console.log("todos遍历", item)
}