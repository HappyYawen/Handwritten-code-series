let _Vue = null
class Store {
  constructor(options) {
    const {
      state,
      getters,
      mutations,
      actions
    } = options
    // 注意一定要将state数据转化为响应式数据，不然state数据变化不会更新视图
    this.state = _Vue.observable(state)
    this.getters = Object.create(null)
    Object.keys(getters).forEach(key => {
      Object.defineProperty(this.getters, key, {
        get: () => getters[key](state)
      })
    })
    this._mutations = mutations
    this._actions = actions
  }
  commit(type, payload) {
    this._mutations[type](this.state, payload)
  }
  dispatch(type, payload) {
    this._actions[type](this.state, payload)
  }
}

function install(Vue) {
  _Vue = Vue
  // 在vue注册插件时混入
  // 在vue实例化时会执行这个钩子函数，并将$store挂载到vue实例上
  _Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        _Vue.prototype.$store = this.$options.store
      }
    }
  })
}

const vuex = {
  Store,
  install
}