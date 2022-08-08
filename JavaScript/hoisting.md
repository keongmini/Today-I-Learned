## JavaScript 이론

### scope, hoisting

* hoisting : 변수의 선언만을 해당 스코프의 맨위로 끌어올리는 것을 뜻함

1. var  
변수를 선언한 위치랑 상관없이 같은 scope내에서는 맨위에 선언되어있다고 처리

```
console.log(x)
var x =1
```
위와 같이 선언해도 아래처럼 실행됨
```
var x
console.log(x)
x = 1
```

var로 선언하지 않는다면 referenceError 발생

2. function

**주의!** 함수의 선언과 값의 초기화는 다름 - 함수는 선언하는 것 자체가 인정됨 / 변수선언과 초기화는 별도의 과정으로 인정

* binding : 코드의 어떤 식별자가 실제로 어떤 값을 가리키는지 결정
* lexical scop : js에서의 바인딩  
안쪽에서 바깥쪽 변수에 접근 가능  
바깥에서 안쪽으로는 접근 불가  
```
var x = 1
if (true){
  var x = 2
}
console.log(x) // 2
```

var는 block scoping의 대상이 아님 <-> let, const

참고) [패스트캠퍼스 한번에 끝내는 node.js 웹 프로그래밍](https://fastcampus.co.kr/dev_online_node)
