/**
 * 构造函数式定义
 * @param {*} name 
 * @param {*} voice 
 */
function Animate (name, voice) {
    this.name = name
    this.voice = voice
    this.feature = ['life', 'need oxygen', 'need nutrition'] //生命、需要氧气、需要营养
}
Animate.description = 'Created by Animate'
Animate.prototype.say = function () {
    console.log(`I'm ${this.name}, ${this.voice}~~${this.voice}~~`)
}

/**
 * es6语法糖 class类定义
 */
class Animate2 {
    constructor(name, voice) {
        this.name = name
        this.voice = voice
        this.feature = ['life', 'need oxygen', 'need nutrition'] //生命、需要氧气、需要营养
    }
    say() {
        console.log(`I'm ${this.name}, ${voice}~~${voice}~~`)
    }
}
/*************************************以下为几种继承方式********************************************/

/**
 * 原型
 * 可以共享，但是一个实例修改原型属性，其他继承的实例也会受影响
 * @param {*} name 
 * @param {*} voice 
 */
function Fish() {
    this.fishFeature = ['swimming', 'Spit bubbles', 'Live in water'] //游动，吐泡泡，生活在水中
}
Fish.prototype.name = '小金鱼'
Fish.prototype.voice = 'bubble bubble'
Fish.prototype.constructor = Fish

const fish = new Fish()
console.log(fish.name)
const fish2 = new Fish()
fish2.__proto__.name = '小龙虾'
console.log(fish.fishFeature)
console.log(fish.name, fish2.name)

/**
 * 构造函数继承
 * 缺点:1、无法继承父类的原型链；2、父类方法在构造函数中定义，函数未复用。
 */
function Dog (name, voice, walk) {
    Animate.call(this, name, voice)
    this.walk = walk
    this.dogFeature = this.feature.concat(['Four legs', 'cute', 'loyalty', 'Like the bones']) //四条腿、可爱、忠诚
}
Dog.prototype.go = function() {
    console.log(`${this.walk}~~${this.walk}~~`)
}

let dog = new Dog('旺财', 'woff', 'dong')
console.log(dog.dogFeature) //[ 'life', 'need oxygen', 'need nutrition', 'Four legs', 'cute', 'loyalty', 'Like the bones']
console.log(dog.go())//dong~~dong~~
// console.log(dog.say()) //TypeError: dog.say is not a function

/**
 * 组合继承：将原型继承和构造函数继承相结合
 * 优点：完整的继承，继承父类的属性和方法+原型链的属性和方法
 * 缺点：重复调用了父类的构造函数，根据原型链搜索原则，实例上的属性会屏蔽原型链上的属性
 * @param {*} name 
 * @param {*} voice 
 * @param {*} walk 
 */
function Cat(name, voice, walk) {
    Animate.call(this, name, voice) //继承Animate的属性
    this.walk = walk
    this.catFeature = this.feature.concat(['Four legs', 'cute', 'loyalty', 'fuzzy', 'High cold or sticky']) //四条腿、可爱、毛茸茸、高冷或粘人
}

Cat.prototype = new Animate() //继承Animate原型链上的属性和方法，此处会覆盖Cat.prototype的constructor属性
Cat.prototype.constructor = Cat

Cat.prototype.go = function() {
    console.log(`${this.walk}~~${this.walk}~~`)
}

const cat = new Cat('Orange', 'miao', 'tata')
console.log(cat.catFeature) //[ 'life', 'need oxygen', 'need nutrition', 'Four legs', 'cute', 'loyalty', 'fuzzy', 'High cold or sticky' ]
console.log(cat.go()) //tata~~tata~~
console.log(cat.say()) //I'm Orange, miao~~miao~~

/**
 * 优化版的组合继承
 * @param {*} name 
 * @param {*} voice 
 * @param {*} walk 
 */
function Cat2(name, voice, walk) {
    Animate.call(this, name, voice) //继承Animate的属性
    this.walk = walk
    this.catFeature = this.feature.concat(['Four legs', 'cute', 'loyalty', 'fuzzy', 'High cold or sticky']) //四条腿、可爱、毛茸茸、高冷或粘人
}

// function F() {}
// F.prototype = Animate.prototype
// Cat2.prototype = new F() //继承Animate原型链上的属性和方法，此处会覆盖Cat.prototype的constructor属性
// Cat2.prototype.constructor = Cat2

//或者使用Object.create(),与上面运行原理相同
Cat2.prototype = Object.create(Animate.prototype, {constructor: {value: Cat2}})

Cat2.prototype.go = function() {
    console.log(`${this.walk}~~${this.walk}~~`)
}

const cat2 = new Cat2('Orange', 'miao', 'tata')
console.log(cat2.catFeature) //[ 'life', 'need oxygen', 'need nutrition', 'Four legs', 'cute', 'loyalty', 'fuzzy', 'High cold or sticky' ]
console.log(cat2.go()) //tata~~tata~~
console.log(cat2.say()) //I'm Orange, miao~~miao~~

/**
 * 更简单的继承
 * __proto__严格模式下不可用
 */
 function Sheep(name, voice, walk) {
    Animate.call(this, name, voice) //继承Animate的属性
    this.walk = walk
    this.sheepFeature = this.feature.concat(['Four legs', 'cute', 'loyalty', 'fuzzy', 'claw', 'delicious']) //四条腿、可爱、毛茸茸、羊角、美味
 }
// 严格模式不可用
// Sheep.prototype.__proto__ = Animate.prototype
//与上面实现一样，将Sheep.prototype的__proto__指向Animate.prototype
Object.setPrototypeOf(Sheep.prototype, Animate.prototype)
//实现类的静态方法继承
Object.setPrototypeOf(Sheep, Animate)

 Sheep.prototype.go = function() {
    console.log(`${this.walk}~~${this.walk}~~`)
}
const sheep = new Sheep('暖暖', 'mie', 'tita')
console.log(sheep.sheepFeature) //[ 'life', 'need oxygen', 'need nutrition', 'Four legs', 'cute', 'loyalty', 'fuzzy', 'claw', 'delicious' ]
console.log(sheep.go()) //tita~~tita~~
console.log(sheep.say()) //I'm 暖暖, mie~~mie~~
console.log(Sheep.description) //Created by Animate

/**
 * es6 class继承
 */

class Bird extends Animate {
    constructor(name, voice, walk) {
        super(name, voice, walk)
        this.walk = walk
        this.birdFeature = [...this.feature, 'Two legs', 'cute', 'Eat insects', 'Sharp mouth'] //两条腿、可爱、吃虫子、嘴巴尖尖
    } 
    go() {
        console.log(`${this.walk}~~${this.walk}~~`)
    }  
    static description = super.description
}

const bird = new Bird('骊歌', 'jiujiu', 'tita')
console.log(bird.birdFeature)
console.log(bird.go())
console.log(bird.say())