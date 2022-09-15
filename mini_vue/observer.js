/**
 * Observer 数据劫持
 * 能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知Dep
 * 
 * 具体功能
 * 负责把data选项中的数据转换为响应式数据
 * data中的某个属性也是对象，把该属性转化为响应式数据
 * 数据变化发送通知
 */
class Observer {
  constructor(data) {
    this.walk(data)
  }
  walk(data) {
    if (!data || typeof data !== 'object') {
      return;
    }
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
    })
  }
  defineReactive(data, key, value) {
    const that = this
    this.walk(data[key])
    const dep = new Dep()
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get() {
        //收集依赖，添加观察者
        Dep.target && dep.addSub(Dep.target)
        // 此处不能使用data[key], 如果使用data[key]，就会触发这个属性的get方法，就造成死循环了
        return value
      },
      set(newValue) {
        if(newValue === value) {
          return
        }
        value = newValue
        that.walk(newValue) // 将新值也转化为响应式数据
        //发送通知
        dep.notify()
      }
    })
  }
}