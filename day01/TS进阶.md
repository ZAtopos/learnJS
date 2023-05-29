## 泛型
//泛型函数的返回值类型是根据你的业务需求决定，并非一定要返回泛型类型 T
```ts
function identity<T>(arg: T): T {
  return arg
}
```
### 多个类型参数使用
```ts

function extend<T, U>(first: T,second: U): T & U {
    for(const key in second) {
        (first as T & U)[key] = second[key] as any
    }
    return first as T & U
}
```
### 泛型参数默认类型
//默认参数语法为 <T = 默认类型>
```ts
function min<T = number>(arr:T[]): T{
  let min = arr[0]
  arr.forEach((value)=>{
     if(value < min) {
         min = value
     }
  })
   return min
}
console.log(min([20, 6, 8n])) // 6
```
### 泛型类型与泛型接口
// <T>(arg: T) => T 字面量书写方式：{ <T>(arg: T): T }
```ts
function identity<T>(arg: T): T {
    return arg
}
//两种方式都可
let myIdentity: <T>(arg: T) => T = identity

let myIdentity: { <T>(arg: T): T} = identity
```
//接口 
//示例中传入了 number 类型，这就锁定了之后代码里使用的类型
```ts 
interface GenericIdentityFn<T> {
  (arg: T): T
}

function identity<T>(arg: T): T {
  return arg
}

let myIdentity: GenericIdentityFn<number> = identity
```
### 泛类型
```ts
// 类名后加上 <T>
class MinClass<T> {
  public list: T[] = []
  add(num: T) {
    this.list.push(num)
  }
  min(): T {
    let minNum = this.list[0]
    for (let i = 0; i < this.list.length; i++) {
      if (minNum > this.list[i]) {
        minNum = this.list[i]
      }
    }
    return minNum
  }
}


let m = new MinClass<string>()
m.add('hello')
m.add('world')
m.add('generic')
console.log(m.min()) // generic
```
### 泛型约束
//通过 extends 关键字来实现泛型约束
```ts
interface User {
  username: string
}

function info<T extends User>(user: T): string {
  return 'imooc ' + user.username
}
```
### 多重类型泛型约束
//通过 <T extends Interface1 & Interface2> 这种语法
```ts
interface Sentence {
  title: string,
  content: string
}

interface Music {
  url: string
}

class Classic<T extends Sentence & Music> {
  private prop: T

  constructor(arg: T) {
    this.prop = arg
  }

  info() {
    return {
      url: this.prop.url,
      title: this.prop.title,
      content: this.prop.content
    }
  }
}
```
## 类型兼容性
```ts
interface User {
  name: string,
  year: number
}

let protagonist = {
  name: 'Sherlock·Holmes',
  year: 1854,
  address: 'Baker Street 221B'
}

let user: User = protagonist 
console.log(user);
//{name: 'Sherlock·Holmes', year: 1854, address: 'Baker Street 221B'}
```
### 函数参数 
```ts
let fn1 = (a: number | string, b: string) => {}
let fn2 = (c: number, d: string, e: boolean) => {}

fn2 = fn1 // OK
```
### 枚举的类型兼容性
```ts
enum Status {
  Pending,
  Resolved,
  Rejected
}

let current = Status.Pending
let num = 0

current = num
num = current

```
//不同枚举类型之间是不兼容的
```ts
enum Status { Pending, Resolved, Rejected }
enum Color { Red, Blue, Green }

let current = Status.Pending
current = Color.Red // Error
```
### 类的类型兼容
```ts
class Animal {
  feet!: number
  constructor(name: string, numFeet: number) { }
}

class Size {
  feet!: number
  constructor(numFeet: number) { }
}

let a: Animal
let s: Size

a = s!  // OK
s = a  // OK
```
### 泛型的类型兼容性
```ts
interface Empty<T> {}

let x: Empty<number>
let y: Empty<string>

x = y! // OK
```
//因为第 4 行，泛型参数是 number 类型，第 5 行，泛型参数是 string 类型，所以最后一行赋值失败。
```ts
interface NotEmpty<T> {
  data: T
}
let x: NotEmpty<number>
let y: NotEmpty<string>

x = y! // Error
```
## 交叉类型
//把 & 的意思理解成 and 即可轻松记忆 
//id 类型相同，timestamp 类型不同 在此交叉类型中，timestamp 属性类型冲突，不可被赋值
```ts
interface Admin {
  id: number,
  administrator: string,
  timestamp: string
}

interface User {
  id: number,
  groups: number[],
  createLog: (id: number) => void,
  timestamp: number
}

let t: Admin & User

t!.administrator // 合法 Admin.administrator: string
t!.groups        // 合法 User.groups: number[]
t!.id            // 合法 id: number
t!.timestamp     // 合法 timestamp: never
```
//通过 extend() 函数合并了两个类的实例，我们知道交叉类型是 and 的意思
```ts
class Person {
  constructor(public name: string) { }
}
class ConsoleLogger {
  log() {}
}

let jim = extend(new Person('Jim'), new ConsoleLogger())
let n = jim.name
jim.log()

```
## 联合类型 
// 把 | 理解成 or，便于记忆
//联合类型表示取值为多种中的一种类型，而交叉类型每次都是多个类型的合并类型
//语法为：类型一 | 类型二
```ts
let currentMonth: string | number
currentMonth = 'February'
currentMonth = 2

type Scanned = true | false
type Result = { status: 200, data: object} | { status: 500, request: string}
```
### 访问联合类型成员
//如果一个值是联合类型，那么只能访问联合类型的共有属性或方法
```ts
interface Dog {
  name: string,
  eat: () => void,
  destroy: () => void
}

interface Cat {
  name: string,
  eat: () => void,
  climb: () => void
}

let pet: Dog | Cat
pet!.name    // OK
pet!.eat()   // OK
pet!.climb() // Error
```
### 可辨识联合
```ts
interface Rectangle {
    type: 'rectangle',
    width: number,
    height: number
}
interface Circle {
    type: 'circle',
    radius: number
}
interface Parallelogram {
    type: 'parallelogram',
    bottom: number,
    height: number
}
function area(shape: Rectangle | Circle | Parallelogram) {
    switch (shape.type) {
        case 'rectangle':
            return shape.width * shape.height
        case 'circle' :
            return Math.PI * Math.pow(shape.radius,2)
        case 'parallelogram' :
            return shape.bottom * shape.height
    }
}

let shape1: Rectangle = {
    type: 'rectangle',
    width: 10,
    height: 10
}
let shape2: Circle = {
    type: 'circle',
    radius: 10
}
let shape3: Parallelogram = {
    type: 'parallelogram',
    bottom: 10,
    height: 10
}

console.log(area(shape1));//100
console.log(area(shape2));//314.1592653589793
console.log(area(shape3));//100
```

## 类型别名
//类型别名不会新建一个类型，而是创建一个新名字来引用此类型

### 原始类型
```ts
type brand = string
type used = true | false

const str: brand = 'imooc'
const state: used = true
```
### 联合类型
```ts
type month = string | number

const currentMonth: month = 'February'
const nextMonth: month = 3

```
### 交叉类型
```ts
interface Admin {
  id: number,
  administrator: string,
  timestamp: string
}

interface User {
  id: number,
  groups: number[],
  createLog: (id: number) => void,
  timestamp: number
}

type T = Admin & User
```
### 类型别名也可以是泛型
```ts
type Tree<T, U> = {
  left: T,
  right: U
}
```
## 索引类型
### 索引类型查询操作符 - keyof
//通过 keyof 拿到了属性名
//对于任何类型 T， keyof T 的结果为 T 上已知的公共属性名的联合
```ts
interface User {
  id: number,
  phone: string,
  nickname: string,
  readonly department: string,
}

class Token{
  private secret: string | undefined
  public accessExp: number = 60 * 60
  public refreshExp: number = 60 * 60 * 24 * 30 * 3
}

let user: keyof User // let user: "id" | "phone" | "nickname" | "department"
type token = keyof Token // type token = "accessExp" | "refreshExp"

```
### 索引访问操作符 - T[K]
//属性名对应属性值的类型
```ts
class Token{
  public secret: string = 'ixeFoe3x.2doa'
  public accessExp: number = 60 * 60
  public refreshExp: number = 60 * 60 * 24 * 30 * 3
}

type token = keyof Token
type valueType = Token[token] // type valueType = string | number
type secret = Token['secret'] // type secret = string
```
//函数
```ts
function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
  return o[name]; // o[name] is of type T[K]
}
```
### 函数 pluck() 的类型定义
```ts
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map(n => o[n])
}

interface Person {
  name: string
  position: string
  age: number
}
let person: Person = {
  name: 'Evan',
  position: 'Software Engineer',
  age: 27
}

let values: unknown[] = pluck(person, ['name', 'age'])
console.log(values)//['Evan', 27]
```
## 映射类型
//语法：映射类型的语法是 [K in Keys]
### Readonly 与 Partial 关键字
```ts
type Readonly<T> = {
    readonly [K in keyof T]: T[K]
}

type Partial<T> = {
    [K in keyof T]?: T[K]
}
```
```ts
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}

interface User {
  id: number
  age: number
  name: string
}

type PickUser = Pick<User, 'id'>
//最后一行，就相当于 type PickUser = { id: number }
```
## 条件类型
//语法: T extends U ? X : Y
//语义类似三目运算符：若 T 是 U 的子类型，则类型为 X，否则类型为 Y。若无法确定 T 是否为 U 的子类型，则类型为 X | Y
```ts
declare function f<T extends boolean>(x: T): T extends true ? string : number

const x = f(Math.random() < 0.5) // const x: string | number

const y = f(true) // const y: string
const z = f(false) // const z: number
```
```ts
type FunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T]
type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>

interface Part {
  id: number
  name: string
  subparts: Part[]
  firstFn: (brand: string) => void,
  anotherFn: (channel: string) => string
}

type FnNames = FunctionPropertyNames<Part>
type FnProperties = FunctionProperties<Part>
```

## is 关键字
//is 关键字一般用于函数返回值类型中，判断参数是否属于某一类型，并根据结果返回对应的布尔类型
//语法：prop is type
//通过 is 关键字将类型范围缩小为 string 类型，这也是一种代码健壮性的约束规范
```ts
const isString = (s: unknown): s is string => typeof val === 'string'

function toUpperCase(x: unknown) {
  if(isString(x)) {
    x.toUpperCase()
  }
}
```
### 常用的类型判断函数
```ts
const isNumber = (val: unknown): val is number => typeof val === 'number'
const isString = (val: unknown): val is string => typeof val === 'string'
const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol'
const isFunction = (val: unknown): val is Function => typeof val === 'function'
const isObject = (val: unknown): val is Record<any, any> => val !== null && typeof val === 'object'

function isPromise<T = any>(val: unknown): val is Promise<T> {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

const objectToString = Object.prototype.toString
const toTypeString = (value: unknown): string => objectToString.call(value)
const isPlainObject = (val: unknown): val is object => toTypeString(val) === '[object Object]'

```

## infer 关键字
//infer 的作用是让 TypeScript 自己推断，并将推断的结果存储到一个类型变量中，infer 只能用于 extends 语句中
### 通过 ReturnType 理解 infer
```ts
/**
 * Obtain the return type of a function type
 */
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any
```
### 借助 infer 实现元组转联合类型
```ts
type Flatten<T> = T extends Array<infer U> ? U : never

type T0 = [string, number]
type T1 = Flatten<T0> // string | number

```
```ts
type TypeTuple = [string, number] 
type TypeArray = Array<string | number>

type B0 = TypeTuple extends TypeArray ? true : false // true

```
## TypeScript Truthy 与 Falsy
### ! 与 !!
//操作符 ! 表示取反，得到一个布尔值
```ts
let fn = () => {}
let obj = {}
let arr: never[] = []

console.log(!fn)  // false
console.log(!obj) // false
console.log(!arr) // false

let num = 10
let str = 'imooc'

console.log(!num) // false
console.log(!str) // false

let n = null
let u = undefined
let N = NaN
let z = 0

console.log(!n)   // true
console.log(!u)   // true
console.log(!N)   // true
console.log(!z)   // true

```
//操作符 !! 表示变量被强制类型转换为布尔值后的值
```ts
let fn = () => {}
let obj = {}
let arr: never[] = []

console.log(!!fn)  // true
console.log(!!obj) // true
console.log(!!arr) // true

let num = 10
let str = 'imooc'

console.log(!!num) // true
console.log(!!str) // true

let n = null
let u = undefined
let N = NaN
let z = 0

console.log(!!n)   // false
console.log(!!u)   // false
console.log(!!N)   // false
console.log(!!z)   // false

```
## TS迭代器(iterator)
```ts
interface IteratorInterface {
  next: () => {
    value: any
    done: boolean
  }
}

function createIterator(array: any[]): IteratorInterface {
  let index = 0
  let len = array.length

  return {
    next: function () {
      return index < len ? { value: array[index++], done: false } : { value: undefined, done: true }
    }
  }
}

var iterator = createIterator([1, 2, 3])

console.log(iterator.next()) // { value: 1, done: false }
console.log(iterator.next()) // { value: 2, done: false }
console.log(iterator.next()) // { value: 3, done: false }
console.log(iterator.next()) // { value: undefined, done: true }
```
### 可迭代性
```ts
let str: string = 'Hi'
let iterator: IterableIterator<string> = str[Symbol.iterator]()
 
console.log(iterator.next())      // { value: 'H', done: false }
console.log(iterator.next())      // { value: 'i', done: false }
console.log(iterator.next())      // { value: undefined, done: true }
```
### for…of
#### 迭代数组
```ts
let iterable = [10, 20, 30]

for (const value of iterable) {
  console.log(value)
}
// 10
// 20
// 30
```
```ts
const heroes = [
  {
    name: '艾希',
    gender: 2
  },
  {
    name: '泰达米尔',
    gender: 1
  }
]

for (let { name } of heroes) {
  console.log(name)
}
```
#### 迭代字符串
```ts
let iterable = 'imooc'

for (const s of iterable) {
  console.log(s)
}
// i
// m
// o
// o
// c
```
#### 迭代 Map
//for...in 可以操作任何对象，迭代对象的可枚举属性
//for...of 只关注于可迭代对象的值
```ts
let iterable = new Map()

iterable.set('a', 1)
iterable.set('b', 2)
iterable.set('c', 3)

for (let entry of iterable) {
  console.log(entry)
}
// ['a', 1]
// ['b', 2]
// ['c', 3]

for (let [key, value] of iterable) {
  console.log(value)
}
// 1
// 2
// 3
```
#### 解构赋值与扩展运算符
//对数组和 Set 结构进行解构赋值时，会默认调用 Symbol.iterator 方法
```ts
let [head, ...tail] = [1, 2, 3, 4]
// tail = [2, 3, 4]
```
```ts
let arr = [...'imooc']
console.log(arr) //  ['i','m','o','o','c']
```

## 生成器(Generator)
//迭代器是一个对象   而生成器返回一个迭代器对象
//生成器是一种能够中途停止，然后从停止的地方继续运行的函数 可以借助 yield 或 return 停止函数运行
```ts
function* gen() { 
  console.log('开始执行')
  let res1 = yield 1
  console.log('中断后继续执行')
  console.log(res1)
  
  let res2 = yield 2
  console.log(res2)
  
  console.log('执行结束')
  return 3
}

let iterator = gen()
console.log(iterator.next('first'))
console.log(iterator.next('second'))
console.log(iterator.next('third'))

//执行结果
开始执行
{ value: 1, done: false }
中断后继续执行
second
{ value: 2, done: false }
third
执行结束
{ value: 3, done: true }

//注意:生成器最初没有产生任何结果，在第一次调用 next() 时传参是无意义的

```
ts-node .\src\routine.ts
## 装饰器（Decorator）
#### 装饰器工厂
//通过装饰器工厂方法，可以额外传参，普通装饰器无法传参
```ts
function log(param: string) {
  return function (target: any, name: string, descriptor: PropertyDescriptor) {
    console.log('target:', target)
    console.log('name:', name)
    console.log('descriptor:', descriptor)

    console.log('param:', param)
  }
}

class Employee {

  @log('with param')
  routine() {
    console.log('Daily routine')
  }
}

const e = new Employee()
e.routine()
//运行结果
target: Employee { routine: [Function] }
name: routine
descriptor: {
  value: [Function],
  writable: true,
  enumerable: true,
  configurable: true
}
param: with param
Daily routine

```
#### 装饰器组合
//由上至下依次对装饰器表达式求值
//求值的结果会被当作函数，由下至上依次调用
```ts
function f() {
  console.log('f(): evaluated');
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('f(): called');
  }
}

function g() {
  console.log('g(): evaluated');
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('g(): called');
  }
}

class C {
  @f()
  @g()
  method() {}
}
//输出结果
f(): evaluated
g(): evaluated
g(): called
f(): called
```
#### 类装饰器
//方法一：通过类装饰器扩展类的属性和方法
```ts
function extension<T extends { new(...args:any[]): {} }>(constructor: T) {
  // 重载构造函数
  return class extends constructor {
    // 扩展属性
    public coreHour = '10:00-15:00'
    // 函数重载
    meeting() {
      console.log('重载：Daily meeting!')
    }
  }
}

@extension
class Employee {
  public name!: string
  public department!: string

  constructor(name: string, department: string) {
    this.name = name
    this.department = department
  }

  meeting() {
    console.log('Every Monday!')
  }

}

let e = new Employee('Tom', 'IT')
console.log(e) // Employee { name: 'Tom', department: 'IT', coreHour: '10:00-15:00' }
e.meeting()    // 重载：Daily meeting!

```
//方法二：函数表达式的写法
```ts
const extension = (constructor: Function) => {
  constructor.prototype.coreHour = '10:00-15:00'

  constructor.prototype.meeting = () => {
    console.log('重载：Daily meeting!');
  }
}

@extension
class Employee {
  public name!: string
  public department!: string

  constructor(name: string, department: string) {
    this.name = name
    this.department = department
  }

  meeting() {
    console.log('Every Monday!')
  }

}

let e: any = new Employee('Tom', 'IT')
console.log(e.coreHour) // 10:00-15:00
e.meeting()             // 重载：Daily meeting!

```
#### 装饰器执行顺序
```ts
function extension(params: string) {
  return function (target: any) {
    console.log('类装饰器')
  }
}

function method(params: string) {
  return function (target: any, name: string, descriptor: PropertyDescriptor) {
    console.log('方法装饰器')
  }
}

function attribute(params: string) {
  return function (target: any, name: string) {
    console.log('属性装饰器')
  }
}

function argument(params: string) {
  return function (target: any, name: string, index: number) {
    console.log('参数装饰器', index)
  }
}

@extension('类装饰器')
class Employee{
  @attribute('属性装饰器')
  public name!: string

  @method('方法装饰器')
  salary(@argument('参数装饰器') name: string, @argument('参数装饰器') department: string) {}
}
//运行结果
属性装饰器
参数装饰器 1
参数装饰器 0
方法装饰器
类装饰器

```
## TypeScript Reflect Metadata
// 主要用来在声明的时候添加和读取元数据
//TIPS: 注意, 实例方法与静态方法取元数据是不同的，实例方法需要在类的实例上取元数据，静态方法直接在类上取元数据
```ts
import 'reflect-metadata'

@Reflect.metadata('token', 'aW1vb2M=')
class Employee {

  @Reflect.metadata('level', 'D2')
  salary() {
    console.log('这是个秘密')
  }

  @Reflect.metadata('times', 'daily')
  static meeting() {}

}

const token = Reflect.getMetadata('token', Employee)
const level = Reflect.getMetadata('level', new Employee(), 'salary')
const times = Reflect.getMetadata('times', Employee, 'meeting')

console.log(token) // aW1vb2M=
console.log(level) // D2
console.log(times) // daily

```
#### API
```ts
import 'reflect-metadata'
 
// 元数据的命令式定义，定义对象或属性的元数据
Reflect.defineMetadata(metadataKey, metadataValue, target)
Reflect.defineMetadata(metadataKey, metadataValue, target, propertyKey)
 
// 检查对象或属性的原型链上是否存在元数据键
let result = Reflect.hasMetadata(metadataKey, target)
let result = Reflect.hasMetadata(metadataKey, target, propertyKey)
 
// 检查对象或属性是否存在自己的元数据键
let result = Reflect.hasMetadata(metadataKey, target)
let result = Reflect.hasMetadata(metadataKey, target, propertyKey)
 
// 获取对象或属性原型链上元数据键的元数据值
let result = Reflect.getMetadata(metadataKey, target)
let result = Reflect.getMetadata(metadataKey, target, propertyKey)
 
// 获取对象或属性的自己的元数据键的元数据值
let result = Reflect.getOwnMetadata(metadataKey, target)
let result = Reflect.getOwnMetadata(metadataKey, target, propertyKey)
 
// 获取对象或属性原型链上的所有元数据键
let result = Reflect.getMetadataKeys(target)
let result = Reflect.getMetadataKeys(target, propertyKey)
 
// 获取对象或属性的所有自己的元数据键
let result = Reflect.getOwnMetadataKeys(target)
let result = Reflect.getOwnMetadataKeys(target, propertyKey)
 
// 从对象或属性中删除元数据
let result = Reflect.deleteMetadata(metadataKey, target)
let result = Reflect.deleteMetadata(metadataKey, target, propertyKey)
 
// 通过装饰器将元数据应用于构造函数
@Reflect.metadata(metadataKey, metadataValue)
class C {
  // 通过装饰器将元数据应用于方法(属性)
  @Reflect.metadata(metadataKey, metadataValue)
  method() {
  }
}


```
#### 结合装饰器使用
```ts
import 'reflect-metadata'

function get(path: string): MethodDecorator {
  return (target, name) => {
    Reflect.defineMetadata('path', path, target, name)
  }
}

class Employee {
  @get('/init')
  async init() {}
}

const metadata = Reflect.getMetadata('path', new Employee(), 'init')
console.log(metadata) // '/init'

```
## 混入(Mixins)
#### TypeScript Mixins
//简单实例
```ts
let target = {  a: 1,  b: 1 }
let source1 = {  a: 2,  c: 3 }
let source2 = {  b: 2,  d: 4 }

Object.assign(target, source1, source2)

console.log(target) // { a: 2, b: 2, c: 3, d: 4 }

```
```ts
// Disposable Mixin
class Disposable {
  isDisposed!: boolean
  dispose() {
    this.isDisposed = true
  }
}

// Activatable Mixin
class Activatable {
  isActive!: boolean;
  activate() {
    this.isActive = true
  }
  deactivate() {
    this.isActive = false
  }
}

class SmartObject{
  constructor() {
    setInterval(() => console.log(this.isActive + " : " + this.isDisposed), 500)
  }

  interact() {
    this.activate()
  }

  // Disposable
  isDisposed: boolean = false
  dispose!: () => void
  // Activatable
  isActive: boolean = false
  activate!: () => void
  deactivate!: () => void
}
applyMixins(SmartObject, [Disposable, Activatable])

let smartObj = new SmartObject()
setTimeout(() => smartObj.interact(), 2000)

function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      derivedCtor.prototype[name] = baseCtor.prototype[name]
    })
  })
}

```