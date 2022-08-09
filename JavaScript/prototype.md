## JavaScript 이론 

### prototype

* prototype - 사용을 많이 안할 수 있음

상속 구현

1. function
```
/* eslint-disable */

function Person(name) {
  this.name = name
}

Person.prototype.greet = function greet() {
  return `Hi, ${this.name}`
}

function Student(name) {
  this.__proto__.constructor(name)
}

Student.prototype.study = function study() {
  return `${this.name} is studying`
}

Object.setPrototypeOf(Student.prototype, Person.prototype)

const me = new Student('keongmin')
console.log(me.study()) // Student { name: 'keongmin' }

console.log(me.greet()) // Hi, keongmin

console.log(me instanceof Student) // Student의 instance 인지   true
console.log(me instanceof Person) // true

const anotherPerson = new Person('foo')
console.log(anotherPerson instanceof Student) // false
console.log(anotherPerson instanceof Person) // true

```

2. class 
```
/* eslint-disable */

class Person {
  constructor(name) {
    this.name = name
  }

  greet() {
    return `Hi, ${this.name}`
  }
}

class Student extends Person {
  constructor(name) {
    super(name)
  }

  study() {
    return `${this.name} is studying`
  }
}

const me = new Student('keongmin')
console.log(me.study())
console.log(me.greet())

```





참고) [패스트캠퍼스 한번에 끝내는 node.js 웹 프로그래밍](https://fastcampus.co.kr/dev_online_node)
