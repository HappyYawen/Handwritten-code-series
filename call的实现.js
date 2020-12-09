/**
 * 实现call
 * 功能点：
 * 1、修改this指向
 * 2、允许传入其他参数
 * 3、第一个参数为null或undefined时，改为默认指向window
 * 4、第一个参数不是对象时，将其转化为对象类型
 * 5、运行函数并返回
 * 思路：
 * 将fn.call(obj) 转化为 obj.fn()，这样this默认指向obj了，执行完之后删除obj.fn即可
 * 可能存在的bug，如果obj本身就有fn属性，怎么办？创建一个随机function名称
 */

function fnFactory(context) {
    let i = 0
    var unique_fn = "fn" + i
    while (context.hasOwnProperty(unique_fn)) {
        unique_fn = "fn" + (++i)
    }
    return unique_fn
}
//es5实现
Function.prototype.call1 = function (context) {

    context = context ? Object(context) : Window;

    var fn = fnFactory(context);
    context[fn] = this; //将函数赋值给fn

    var args = [], len = arguments.length;
    for (var i = 1; i < len; i++) {
        args.push('arguments[' + i + ']');
    }
    var result = eval('context[fn](' + args + ')');
    delete context[fn];
    return result;
}

var name = "jelly.cao"
var obj = {
    name: 'karla.guo'
}

function getName() {
    console.log(this.name)
}

function getNameAndAge(age) {
    console.log(`my name is ${this.name}, and my age is ${age}`)
}
getName()
getName.call1(obj)

getNameAndAge(29)
getNameAndAge.call1(obj, 26)