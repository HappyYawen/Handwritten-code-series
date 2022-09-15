/**
 * Watcher 观察者
 * 功能：
 * 当数据变化触发依赖，dep通知所有Watcher实例更新视图
 * 自身实例化的时候，往dep对象中添加自己
 */
class Watcher{
  constructor(vm, key, cb) {
    this.vm = vm
    this.key = key
    // 回调函数负责更新视图
    this.cb = cb
    Dep.target = this
    // 记录旧值，用于对比
    this.oldValue = vm[key] // 此处获取属性值，触发属性的get方法，dep实例会去添加该观察者
    // 添加完观察者，立马清空静态属性值，防止重复添加
    Dep.target = null
  }
  update() {
    const value = this.vm[this.key]
    if(value === this.oldValue) {
      return
    }
    // 更新旧值
    this.oldValue = value
    // 回调函数，触发具体的更新视图的方法
    this.cb(value)
  }
}