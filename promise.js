const PENDING = "pending"
const FULFILLED = "fulfilled"
const REJECTED = 'rejected'

class Promise {
    constructor(fn) {
        this.state = PENDING
        this.value = null
        this.reason = null
        this.onfulfilledcallbacks = []
        this.onrejectedcallbacks = []
        const resolve = (value) => {
            if (this.state === PENDING) {
                this.state = FULFILLED
                this.value = value
                this.onfulfilledcallbacks.forEach(cb => cb())
            }
        }
        const reject = (reason) => {
            if (this.state === PENDING) {
                this.state = REJECTED
                this.value = reason
                this.onrejectedcallbacks.forEach(cb => cb())
            }
        }
        try {
            fn(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }
    static resolve(value) {
        if (value instanceof Promise) {
            return value
        }
        return new Promise((resolve) => {
            resolve(value)
        })
    }
    static reject(reason) {
        return new Promise((resolve, reject) => {
            reject(reason)
        })
    }
    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : err => {
            throw err;
        };

        let promise2;
        if (this.state === FULFILLED) {
            promise2 = new Promise((resolve, reject) => {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
            });
        }

        if (this.state === REJECTED) {
            promise2 = new Promise((resolve, reject) => {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
            });
        }

        if (this.state === PENDING) {
            promise2 = new Promise((resolve, reject) => {
                this.onFulfilledCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    });
                });

                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    });
                });
            });
        }

        return promise2;
    }
    static all(promises) {
        let result = []
        let len = promises.length
        return new Promise((resolve, reject) => {
            for (let i = 0; i < len; i++) {
                Promise.resolve(promises[i]).then(
                    //将每一个resolve的结果存到result中
                    (res) => {
                        result.push(res)
                        //最后一个promise处理完成，直接返回result
                        if (i === len - 1) {
                            return resolve(result)
                        }
                        //遇到reject就直接返回
                    }, (reason) => {
                        return reject(reason)
                    })
            }
        })
    }
    static race(promises) {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < promises.length; i++) {
                //第一个执行完的promise返回，无论是resolve还是reject
                promises[i].then(resolve, reject)
            }
        })
    }
    //Promise.all的区别，遇到手动throw error、手动reject，或者语法报错等，不会立即退出，resolve结果
    //每一个结果都是object,格式{status,value/reason}，来区分是成功数据还是异常数据
    static allSettled(promises) {
        let result = []
        let len = promises.length
        return new Promise((resolve) => {
            for (let i = 0; i < len; i++) {
                Promise.resolve(promises[i]).then(
                    //将每一个resolve的结果，以该格式{status: fulfilled, value}存到result中
                    (res) => {
                        result.push({
                            status: FULFILLED,
                            value: res
                        })
                        //最后一个promise处理完成，直接返回result
                        if (i === len - 1) {
                            return resolve(result)
                        }
                        //遇到reject存数据{status: rejected, reason}的数据
                    }, (reason) => {
                        result.push({
                            status: REJECTED,
                            reason
                        })
                        //最后一个promise处理完成，直接返回result
                        if (i === len - 1) {
                            return resolve(result)
                        }
                    })
            }
        })
    }
}

function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        throw new TypeError('循环引用');
    }

    let called;
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        try {
            let then = x.then;
            if (typeof then === 'function') {
                then.call(x, y => {
                    if (called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject);
                }, e => {
                    if (called) return;
                    called = true;
                    reject(e);
                });
            } else {
                resolve(x);
            }
        } catch (e) {
            if (called) return;
            called = true;
            reject(e);
        }
    } else {
        resolve(x);
    }
}