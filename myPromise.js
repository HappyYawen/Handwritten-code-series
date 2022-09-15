const FULFILLED = 'fulfilled'
const PENDING = 'pending'
const REJECTED = 'rejected'
class MyPromise {
  constructor(executor) {
    try {
      executor(this.resolve, this.reject)
    }catch(e) {
      this.reject(e)
    }
  }
  status = PENDING
  value = undefined
  reason = undefined
  onFulFilledCallBack = []
  onRejectedCallBack = []
  resolve = (value) => {
    if (this.status !== PENDING) return
    this.value = value
    this.status = FULFILLED
    while(this.onFulFilledCallBack.length) this.onFulFilledCallBack.shift()()
  }
  reject = (reason) => {
    if (this.status !== PENDING) return
    this.reason = reason
    this.status = REJECTED
    while(this.onRejectedCallBack.length) {
      this.onRejectedCallBack.shift()()
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled = onFulfilled ? onFulfilled : value => value
    onRejected = onRejected ? onRejected : reason => { throw reason }
    const promise2 = new MyPromise((resolve, reject) => {
      // console.log("进入then", this.status)
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          }catch(e) {
            reject(e)
          }
        }, 0)
      } else if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            const reason = onRejected(this.reason)
            resolvePromise(promise2, reason, resolve, reject)
          }catch(e) {
            reject(e)
          }
        }, 0)
      } else {
        this.onFulFilledCallBack.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value)
              resolvePromise(promise2, x, resolve, reject)
            }catch(e) {
              reject(e)
            }
          }, 0)
        })
        this.onRejectedCallBack.push(() => {
          setTimeout(() => {
            try {
              const reason = onRejected(this.reason)
              resolvePromise(promise2, reason, resolve, reject)
            }catch(e) {
              reject(e)
            }
          }, 0)
        })
      }
    })
    return promise2
  }
  finally(callback) {
    //实现链式调用，那么就要返回一个Promise，借助then方法实现
    return this.then(value => {
      // 如果callback是异步操作，则需要等待callback执行完成再返回数据
      return MyPromise.resolve(callback()).then(() => value)
    }, reason => {
      return MyPromise.resolve(callback()).then(() => { throw reason })
    })
  }
  catch(callback) {
    return this.then(undefined, callback)
  }
  static all(array) {
    let result = []
    let index = 0
    return new Promise((resolve, reject) => { 
      function addData(key, value) {
        result[key] = value
        index++
        if (index === array.length) {
          resolve(result)
        }
      }
      for(let i = 0; i < array.length; i++) {
        const current = array[i]
        if(current instanceof MyPromise) {
          current.then(val => addData(i, val), reason => reject(reason))
        } else {
          addData(i, current)
        }
      }
    })
  }
  static resolve(value) {
    if (value instanceof MyPromise) {
      return value
    }
    return new MyPromise((resolve) => {
      resolve(value)
    })
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('循环调用 promise'))
  }
  if (x instanceof MyPromise) {
    x.then(val => resolve(val), reason => reject(reason))
  } else {
    resolve(x)
  }
}
const promise2 = new MyPromise((resolve) => resolve(2222))
const p3 = () => {
  return new MyPromise((resolve) => {
    setTimeout(() => {
      resolve('2s后～')
    }, 2000)
  })
}
// MyPromise.resolve(100).then(val => console.log(val))
// MyPromise.resolve(promise2).then(val => console.log(val))
promise2.finally(() => {
  console.log("finally")
  return p3()
}).then((val) => console.log(val))// 打印的是promise2返回的数据
.then(() => {
  throw new Error('失败了')
})
.catch(e => {
  console.log(e.message)
})
console.log(11111)