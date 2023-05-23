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