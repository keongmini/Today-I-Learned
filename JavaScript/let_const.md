## JavaScript 이론 

### let과 const

let과 const 특징: hoisting 규칙x, block scoping 지원

[let vs const]
```
let x = 1
x = 2 (0)
```
```
const y = 1
y = 2 (x)
```

[let, const vs var]
1. 재선언
```
var x = 1
var x = 2 (o)
```
```
let x = 1
let x = 2 (x)

```
2. hoisting
```
console.log(x)   // undefined
var x = 0
```
```
console.log(y)  // error
let y = 0
```

2. block scoping
```
var x = 1
{
  var x = 2
  console.log(x)    // 2
}
console.log(x)     // 2
```
```
const x = 1
{
  const x = 2
  console.log(x)    // 2
}
console.log(x)     // 1
```

let과 const의 예측가능성과 유지보수성이 var보다 뛰어남, **const > let > var**
