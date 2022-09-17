
const isObject = (target) => target !== null && typeof target === 'object'
const convert = (target) => isObject(target) ? reactive(target) : target
const hasOwn = Object.prototype.hasOwnProperty

function reactive(target) {
  if (!isObject(target)) return
  const handler = {
    get (target, key, receiver) {
      // 收集依赖
      track(target, key)
      const result = Reflect.get(target, key, receiver)
      return convert(result) // 如果属性值是对象，则将属性值转化为代理对象
    },
    set (target, key, value, receiver) {
      let result = true
      const oldValue = Reflect.get(target, key, receiver)
      if (value !== oldValue) {
        result = Reflect.set(target, key, value, receiver)
        // 触发更新
        trigger(target, key)
      }
      return result
    },
    deleteProperty(target, key) {
      const hadKey = hasOwn.call(target, key)
      const result = Reflect.deleteProperty(target, key)
      if (hadKey && result) {
        // 触发更新
        trigger(target, key)
      }
      return result
    }
  }
  return new Proxy(target, handler)
}
let activeEffect = null
//监听属性变化
function effect(callback) {
  activeEffect = callback
  callback() // 立即执行回调函数，会访问响应式对象属性，去收集依赖
  activeEffect = null // 收集完依赖，就释放该变量
}

let targetMap = new WeakMap()
//收集依赖
function track(target, key) {
  if(!activeEffect) return
  let depsMap = targetMap.get(target)
  if(!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  let dep = depsMap.get(key)
  if(!dep) {
    depsMap.set(key, (dep = new Set()))
  }
  dep.add(activeEffect)
}

//触发更新
function trigger(target, key) {
  const depsMap = targetMap.get(target)
  if(!depsMap) return
  const dep = depsMap.get(key)
  if(dep) {
    dep.forEach(effect => {
      effect()
    })
  }
}

function ref(raw) {
  if (isObject(raw) && raw.__v_isRef) return
  let value = convert(raw)
  const r = {
    __v_isRef: true,
    get value() {
      track(r, 'value')
      return value
    },
    set value (newValue) {
      if(newValue !== value) {
        raw = newValue
        value = convert(raw)
        trigger(r, 'value')
      }
    }
  }
  return r
}

function toRefs(proxy) {
  const ret = proxy instanceof Array ? new Array(proxy.length) : {}
  for(let key in proxy) {
    ret[key] = toProxyRef(proxy, key)
  }
  return ret
}

function toProxyRef(proxy, key) {
  const r = {
    __v_isRef: true,
    get value() {
      return proxy[key] // 访问的是响应式对象，proxy对象内会去收集依赖
    },
    set value(newValue) {
      proxy[key] = newValue
    }
  }
  return r
}

function computed(getter) {
  let result = ref()
  effect(() => result.value = getter())
  return result
}