class jQuery {
    constructor(selector) {
        this.selector = selector
        const result = document.querySelectorAll(selector)
        this.length = result.length
        for(let i = 0; i < this.length; i++) {
            this[i] = result[i]
        }
    }
    get(i) {
        return this[i]
    }
    each(fn) {
        for(let i = 0; i < this.length; i++) {
            const elem = this[i]
            fn(elem)
        }
    }
    on(type, fn) {
       this.each((elem) => {
            elem.addEventlistener(type, fn, false)
       })
    }
}
//jQuery插件
jQuery.prototype.dialog = function(text) {
    alert(text)
}
//造轮子
class myJquery extends jQuery {
    constructor(selector) {
        super(selector)
    }
    addClass() {
        //
    }
}
//extends的实现用的Object.setPrototypeOf(A, B)
//setPrototypeOf的实现，是A.__proto__ = B.prototype 添加隐形proto关联