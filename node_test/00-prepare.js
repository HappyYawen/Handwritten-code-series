console.log('准备工作1')
const obj = {
  name: 'jack',
  sayHi: function() {
    console.log(this.name)
  },
  sayHiArrow: () => {
    console.log(this.name)
  },
  sayHiAsync: function() {
    setTimeout(function () {
      console.log(this.name)
    }, 1000)
  },
  sayHiArrowAsync: function() {
    setTimeout(() => {
      console.log(this.name)
    }, 1000)
  }
}
// 箭头函数与this指向问题
obj.sayHi() // 'jack'
obj.sayHiArrow() // undefined
obj.sayHiAsync() // undefined
obj.sayHiArrowAsync() // 'jack'