class Vue {
  constructor(options) {
    // 构造函数中的参数，记录在$options中
    this.$options = options || {}
    // $data中的setter是真正监视数据变化的地方
    this.$data = options.data || {}
    this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el
    this._proxyData(options.data)
    new Observer(this.$data)
    new Compiler(this, this.$el)
  }
  // 将data中的属性注入到Vue实例中，转换成getter/setter
  _proxyData(data) {
    Object.keys(data).forEach(key => {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get() {
          return data[key]
        },
        set(newValue) {
          if (newValue === data[key]) {
            return
          }
          data[key] = newValue
        }
      })
    })
  }
}