/**
 * 实现bind
 * 特性：
 * 1、可以指定this
 * 2、返回一个函数
 * 3、可以传入参数
 * 4、柯里化
 * 5、this指向，优先级低于new 构造器
 */
Function.prototype.bind2 = function (context) {
    let args = Array.prototype.slice.call(arguments,1)
    let self = this
    var fBound = function() {
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(this instanceof fBound ? this : context, args.concat(bindArgs))
    }
    let fNOP = function() {}
    fNOP.prototype = this.prototype
    fBound.prototype = new fNOP()// 断开fBound.prototype与this.prototype的关系，通过实例化，复制一份原型链，与fBound.prototype连接
    return fBound
}


// 测试用例
var value = 2;
var foo = {
    value: 1
};
function bar(name, age) {
    this.habit = 'shopping';
    console.log(this.value);
    console.log(name);
    console.log(age);
}
bar.prototype.friend = 'kevin';

var bindFoo = bar.bind2(foo, 'Jack'); // bind2
var obj = new bindFoo(20); // 返回正确


console.log(obj.habit); // 返回正确
// shopping

console.log(obj.friend); // 返回正确
// kevin
obj.__proto__.friend = "Kitty"; // 修改原型

console.log(obj.friend); // 返回正确

console.log(bar.prototype.friend); // 不会被修改