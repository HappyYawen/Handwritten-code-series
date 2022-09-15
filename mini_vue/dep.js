class Dep {
  constructor() {
    //将所有观察者集中在数组中
    this.subs = []
  }
  //添加观察者
  addSub(sub) {
    if (sub && sub.update) {
      this.subs.push(sub)
    }
  }
  //通知所有观察者
  notify() {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}