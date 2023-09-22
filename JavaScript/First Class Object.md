# 일급 객체

[일급 객체 조건]       
1. 무명의 리터럴로 생성 가능 = 런타임에 생성 가능
2. 변수나 자료구조(객체, 배열 등)에 저장 가능
3. 함수의 매개변수에 전달 가능
4. 함수의 반환값으로 사용 가능

```javascript
// 1. 무명의 리터럴로 생성 가능
// 2. 함수는 변수에 저장 가능
// 런타임에 함수 리터럴이 평가되어 함수 객체 생성, 변수에 할당
const increase = funtcion (num) {
  return ++num;
}

const decrease = function (num) {
  return --num;
}


// 3. 함수의 매개변수에 전달 가능
// 4. 함수의 반환값으로 사용 가능
const auxs = { increase, decrease };

functuin makeCounter (aux) {
  let num = 0;

  return function () {
    num = aux(num);
    return num;
  }
}
```
위 코드를 참고하면, 함수는 일급 객체이다!      
-> 함수를 객체와 동일하게 사용할 수 있다는 의미 -> 객체는 값이므로 함수는 값과 동일하게 취급 가능

일반 객체는 호출할 수 없지만 함수 객체는 호출 가능, 함수 객체는 함수 고유의 프로퍼티 소유 -> 일반 객체와의 차이점

## 함수 객체의 프로퍼티
함수 객체 고유의 프로퍼티: arguments, caller, length, name, prototype

> Object.prototype 객체의 ```__proto__``` 접근자 프로퍼티는 모든 객체에서 사용 가능
