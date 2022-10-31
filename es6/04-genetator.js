// 生成器的应用

// 案例1: 发号器
function * createIdMaker() {
  let id = 1
  while(true) {
    yield id++
  }
}
const g1 = createIdMaker()
console.log(g1.next())
console.log(g1.next())
console.log(g1.next())
console.log(g1.next())

// 案例2: 使用 Genetator 函数实现 iterator 方法
const todos = {
  life: ['吃饭', '睡觉', '打豆豆'],
  learn: ['语文', '数学', '英语', '体育'],
  work: ['喝茶'],

  [Symbol.iterator]: function * () {
    const all = [...this.life, ...this.learn, ...this.work]
    for(let item of all) {
      yield item
    }
  }
}
for(let item of todos) {
  console.log(item)
}