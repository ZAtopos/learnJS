## 基础
```Ts
//数字类型
let decLiteral: number = 6
//字符串类型
let protagonist: string = "sherlock Holmes"
let partner: string = 'Dr.John Hamish Watson'
//模板字符串s
let protagonists: string = 'Sherlock'
let sentence: string = `华生是${protagonists}的朋友、助手和室友。`
//void 类型
function doNothing(): void{
    let a = 10
}
//声明 void类型变量没什么大用 赋值为 undefined 和 null
let nothing: void = undefined
//数组类型
let list: number[] = [1, 2, 3]
let names: string[] = ['Sherlock', 'Watson', 'Mrs. Hudson']
//数组泛型 Array<元素类型>
let lists: Array<number> = [1,2,3]
let namess: Array<string> = ['Sherlock', 'Watson', 'Mrs. Hudson']
//混合元素类型 不要乱用any
let list1: any[]=['Sherlock',1887]
//BigInt 类型信息
typeof 10n === 'bigint'//true
typeof BigInt(10) === 'bigint'//true

typeof 10 === 'number'//true
typeof Number(10) === 'number'//true

// bigint 数据类型是用来表示那些已经超出了 number 类型最大值的整数值
//BigInt  +、-、*、/、**、%
const previousMaxSafe: bigint = BigInt(Number.MAX_SAFE_INTEGER)
const maxPlusOne: bigint = previousMaxSafe +1n
const multi: bigint = previousMaxSafe * 2n
const subtr: bigint = multi - 10n
const mod: bigint = nulti % 10n
const bigN: bigint = 2n ** 54n
//当使用 / 操作符时，会向下取整，不会返回小数部分
const divided: bigint = 5n / 2n
```
### Symbol
//每个从 Symbol() 返回的 symbol 值都是唯一的
//Symbol([description])
//参数 description：可选的，字符串类型。

```ts
const sym1: Symbol = Symbol()
const sym2: Symbol = Symbol('foo')
const sym3: Symbol = Symbol('foo')
console.log(sym1 === sym2);//false
console.log(sym2 === sym3);//false

const sym = Symbol('imooc')
console.log(sym);//Symbol('imooc')
console.log(sym.toString);//Symbol('imooc')
console.log(sym.description);//imooc
```
### 元组
//相同类型元素组成成为数组，不同类型元素组成了元组（Tuple）
//元组中规定的元素类型顺序必须是完全对照的
```ts
const list:[string, number] = ['Jack', 1887]
console.log(list[0].substr(0));//Jack
console.log(list[1]);//1887
```
#### 元组类型的 Rest 使用
```ts
declare function rest(...args: [number, string, boolean]): void
相等于
declare function rest(arg1: number, arg2: string, arg3: boolean): void

//也可以这样写
const list: [number, ...string[]] = [10, 'a', 'b', 'c']

const list1: [string, ...number[]] = ['a', 1, 2, 3]

```
## 枚举
#### 字符串类型
```ts
enum TokenType {
    ACCESS = 'accessToken',
    REFRESH = 'refreshToken'
  }
  
  // 两种不同的取值写法
  console.log(TokenType.ACCESS === 'accessToken')        // true
  console.log(TokenType['REFRESH'] === 'refreshToken')   // true
```
#### 计算常量成员
```ts
enum Calculate{
    a,
    b,
    expired = 60 * 60 * 24,
    length = 'imooc'.length,
    plus = 'hello ' + 'world'
}
console.log(Calculate.expired);// 86400
console.log(Calculate.length); // 5
console.log(Calculate.plus); // hello world
```
#### 反向映射
```ts
enum Monrhs{
    Jan = 1,
    Feb,
    Mar,
    Apr
}
```
//解析出的js
```js
var Monrhs;
(function (Monrhs) {
    Monrhs[Monrhs["Jan"] = 1] = "Jan";
    Monrhs[Monrhs["Feb"] = 2] = "Feb";
    Monrhs[Monrhs["Mar"] = 3] = "Mar";
    Monrhs[Monrhs["Apr"] = 4] = "Apr";
})(Monrhs || (Monrhs = {}));
```
#### const 枚举
```ts
enum Months {
  Jan = 1,
  Feb,
  Mar,
  Apr
}

const month = Months.Mar
```
//编译后
```js
'use strict'
const month = 3 /* Mar */
```
#### 枚举合并
```ts
enum Months{
    Jan = 1,
    Feb,
    Mar,
    Apr
}
enum Months{
    May = 5,
    Jun,
}
console.log(Months.Apr);//4
console.log(Months.Jun);//6
```
//编译后js
```js
var Months;
(function (Months) {
    Months[Months["Jan"] = 1] = "Jan";
    Months[Months["Feb"] = 2] = "Feb";
    Months[Months["Mar"] = 3] = "Mar";
    Months[Months["Apr"] = 4] = "Apr";
})(Months || (Months = {}));
(function (Months) {
    Months[Months["May"] = 5] = "May";
    Months[Months["Jun"] = 6] = "Jun";
})(Months || (Months = {}));
console.log(Months.Apr);//4
console.log(Months.Jun);//6
```
### never unknown 类型
//never 类型表示那些永不存在的值的类型。
//unknown 类型是 any 类型对应的安全类型

### 接口 interface
```ts
interface Clothes{
    color: string;
    size: string;
    price: number;
}
function getClothesInfo(clothes: Clothes){
    console.log(clothes.price);
}
let myClothes: Clothes = {
    color: 'black',
    size: 'XL',
    price: 98
}
getClothesInfo(myClothes)
```
#### 接口的可选属性
//只是在可选属性名字定义的后面加一个 ? 符号
```ts
// 语法
interface Clothes {
  color?: string;
  size: string;
  price: number;
}

// 这里可以不定义属性 color
let myClothes: Clothes = { 
  size: 'XL', 
  price: 98 
}

```
####  接口的只读属性
//属性名前用 readonly 来指定只读属性
```ts
// 语法
interface Clothes {
  color?: string;
  size: string;
  readonly price: number;
}

// 创建的时候给 price 赋值
let myClothes: Clothes = { 
  size: 'XL', 
  price: 98 
}

// 不可修改
myClothes.price = 100
// error TS2540: Cannot assign to 'price' because it is a constant or a read-only property
```
#### 接口的任意属性
//语法是用 [] 将属性包裹起来
```ts
// 语法
interface Clothes {
  color?: string;
  size: string;
  readonly price: number;
  [propName: string]: any;
}

// 任意属性 activity
let myClothes: Clothes = { 
  size: 'XL', 
  price: 98,
  activity: 'coupon'
}
```
#### 项目案例
//使用 axios 库发起 HTTP 传输的时候，可以写入一个自定义的属性，就是因为源码中定义了一个任意属性：
```ts
this.$axios({
  method: 'put',
  url: '/cms/user',
  data: {
    nickname: this.nickname,
  },
  showBackend: true,
})
```
#### 函数类型
```ts
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string): boolean {
  return source.search(subString) > -1;
}
```
//两种书写方式等价
```ts
interface Calculate {
  add(x: number, y: number): number
  multiply: (x: number, y: number) => number
}
```
#### 可索引类型
```ts
interface ScenicInterface{
    [index: number]: string
}
let arr: ScenicInterface = ['西湖', '华山', '故宫']
let favorite: string = arr[0]
console.log(favorite);
```
#### 类类型
```ts
interface AnimalInterface {
    name: string;
  }
  
  class Dog implements AnimalInterface {
    name: string;
    
    constructor(name: string){
      this.name = name
    }
  }

let myAnimal: AnimalInterface = {
    name:'哈哈'
}
const cla = new Dog('xixi');
console.log(cla);//Dog{name: 'xixi'}
```
//在接口中描述一个方法，在类里实现它
```ts
interface AnimalInterface {
  name: string

  eat(m: number): string
}

class Dog implements AnimalInterface {
  name: string;

  constructor(name: string){
    this.name = name
  }

  eat(m: number) {
    return `${this.name}吃肉${m}分钟`
  }
}
 
```
#### 继承接口
```ts
interface Shape {
    color: string;
  }
  
  interface PenStroke {
    penWidth: number;
  }
  
  interface Square extends Shape, PenStroke {
    sideLength: number;
  }
  
  let square = {} as Square;
  square.color = "blue";
  square.sideLength = 10;
  square.penWidth = 5.0;
   
  console.log(square);//{color: 'blue', sideLength: 10, penWidth: 5}
  ```
### 混合类型
```ts
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = function (start: number) { } as Counter;
  counter.interval = 123;
  counter.reset = function () { };
  return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
```
## 类
```js
function Calculate (x, y) {
  this.x = x
  this.y = y
}

Calculate.prototype.add = function () {
  return this.x + this.y
}

var calculate = new Calculate(1, 2)
console.log(calculate.add()) // 3
```
//class 进行改写
```ts
class Calculate {
  // 类的属性
  public x: number
  public y: number

  // 构造函数
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  // 类的方法
  add () {
    return this.x + this.y
  }
}

const calculate = new Calculate(1, 2)
console.log(calculate.add()) // 3

console.log(typeof Calculate) // 'function'
console.log(Calculate === Calculate.prototype.constructor) // true
```
### 类的继承
```js
// 继承 JavaScript 内置的 Date 对象
class LinDate extends Date {

  getFormattedDate() {
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return this.getDate() + "-" + months[this.getMonth()] + "-" + this.getFullYear();
  }
}

const date = new LinDate()

console.log(date.getFullYear());     // 2020
console.log(date.getFormattedDate()) // 7-Jan-2020
```
//class 进行改写

```ts
class Animal {
  public name:string

  constructor(name: string) { 
    this.name = name 
  }

  move(distance: number = 0) {
      console.log(`${this.name} moved ${distance}m.`)
  }
}

class Dog extends Animal {
  constructor(name: string) { 
    // 调用父类的构造函数
    super(name)
  }

  move(distance = 10) {
      console.log('bark...')
      // 执行父类的方法
      super.move(distance) 
  }
}

const dog: Animal = new Dog('Coco')

dog.move() // Coco moved 10m.
```
### 访问修饰符
//用四种访问修饰符 public、protected、private 和 readonly
```ts  public
class Calculate {
  // 类的属性
  public x: number
  public y: number

  // 构造函数
  public constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  public add () {
    return this.x + this.y
  }
}
```

```ts protected
class Base {
  protected baseUrl: string = 'http://api.com/'

  constructor() {}

  protected request(method: string) {
    const url = `${this.baseUrl}${method}`
    // TODO 封装基础的 http 请求
  }
}

class Address extends Base {
  get() {
    return this.request('address')
  }
}
```
//父类中的 labour() 方法被定义为私有方法，只能在父类中被使用，子类中调用报错
```ts private 
class Mom {
  private labour() {
    return 'baby is coming'
  }
}

class Son extends Mom {
  test () {
    this.labour() // Error, Property 'labour' is private and only accessible within class 'Mom'
  }
}
```
//Token 类的属性 expired 被设置为只读属性，不可被修改
```ts readonly
class Token {
  readonly secret: string = 'xjx*xh3GzW#3'

  readonly expired: number

  constructor (expired: number) {
    this.expired = expired
  } 
}

const token = new Token(60 * 60 * 24)
token.expired = 60 * 60 * 2 // Error, expired 是只读的
```
### 静态方法
//静态方法调用同一个类中的其他静态方法，可使用 this 关键字
```ts
class StaticMethodCall {

  static staticMethod() {
      return 'Static method has been called'
  }
  static anotherStaticMethod() {
      return this.staticMethod() + ' from another static method'
  }

}
```
//非静态方法中用类本身或者构造函数的属性来调用该方法
```ts
class StaticMethodCall {
  constructor() {
      // 类本身调用
      console.log(StaticMethodCall.staticMethod())

      // 构造函数的属性调用
      console.log(this.constructor.staticMethod())
  }
  static staticMethod() {
      return 'static method has been called.'
  }
}

```
### 抽象类
//抽象类通过创建子类来调用
```ts abstract
abstract class Animal{
    abstract makeSound():void;
    move(): void{
        console.log('roaming the earch...');
        
    }
}
class Dog extends Animal{
    makeSound(){
        console.log('bark bark bark...');
    }
}
const dog = new Dog()
dog.makeSound()//bark bark bark...
dog.move()//roaming the earch...
```
### 把类当做接口使用
```ts
class Pizza {
  constructor(public name: string, public toppings: string[]) {}
}

class PizzaMaker {
  // 把 Pizza 类当做接口
  static create(event: Pizza) {
    return new Pizza(event.name, event.toppings)
  }
}

const pizza = PizzaMaker.create({ 
  name: 'Cheese and nut pizza', 
  toppings: ['pasta', 'eggs', 'milk', 'cheese']
})
```
## 函数
### 函数类型
```ts
const add = function(x: number, y: number): string {
  return (x + y).toString()
}

// 只要参数位置及类型不变，变量名称可以自己定义，比如把两个参数定位为 a b
const add: (a: number, b: number) => string = (x: number, y: number): string => (x + y).toString()

```
### 函数参数要保持一致
```ts
const fullName = (firstName: string, lastName: string): string => `${firstName}${lastName}`

let result1 = fullName('Sherlock', 'Holmes')
let result2 = fullName('Sherlock', 'Holmes', 'character') // Error, Expected 2 arguments, but got 3
let result3 = fullName('Sherlock')                        // Error, Expected 2 arguments, but got 1
```
#### 可选参数
//参数名旁使用 ? 实现可选参数的功能
```ts
const fullName = (firstName: string, lastName?: string): string => `${firstName}${lastName}`

let result1 = fullName('Sherlock', 'Holmes')
let result2 = fullName('Sherlock', 'Holmes', 'character') // Error, Expected 1-2 arguments, but got 3
let result3 = fullName('Sherlock')                        // OK
```
#### 默认参数
//默认值的参数不需要放在必须参数的后面，可随意调整位置
```ts
const token = (expired = 60*60, secret: string): void  => {}
// 或
const token1 = (secret: string, expired = 60*60 ): void => {}
```
#### 剩余参数
//rest 参数 (形式为 ...变量名)来获取函数的剩余参数
```ts
function assert(ok: boolean, ...args: string[]): void {
  if (!ok) {
    throw new Error(args.join(' '));
  }
}

assert(false, '上传文件过大', '只能上传jpg格式')
```

#### this参数
```ts
interface Triangle {
  a: number;
  b: number;
  c: number;
  area(this: Triangle): () => number;
}

let triangle: Triangle = {
  a: 10,
  b: 15,
  c: 20,
  area: function (this: Triangle) {
    return () => {
      const p = (this.a + this.b + this.c) / 2
      return Math.sqrt(p * (p - this.a) * (p - this.b) *(p - this.c))
    }
  }
}

const myArea = triangle.area()
console.log(myArea())
```
#### 方法重载
//函数重载是指函数根据传入不同的参数，返回不同类型的数据
```ts
function reverse(x: string): string
function reverse(x: number): number

function reverse(target: string | number) {
  if (typeof target === 'string') {
    return target.split('').reverse().join('')
  }
  if (typeof target === 'number') {
    
    return +[... target.toString().split('')].reverse().join('')
  }
}
console.log(reverse('imooc'))   // coomi
console.log(reverse(23874800))  // 847832
```
#### 字面量类型
//字符串字面量类型
```ts
let protagonist: 'Sherlock'

protagonist = 'Sherlock'
protagonist = 'Watson' // Error, Type '"Watson"' is not assignable to type '"Sherlock"'
```
//布尔字面量类型
```ts
let success: true
let fail: false
let value: true | false
```
//数字字面量类型
```ts
let die: 1 | 2 | 3 | 4 | 5 | 6

die = 9 // Error
```
#### 类型推断
```ts
let x = 3             // let x: number
let y = 'hello world' // let y: string

let z                 // let z: any
```
//最佳通用类型判断
```
let x = [1, 'imooc', null]

```
#### 类型断言
```
