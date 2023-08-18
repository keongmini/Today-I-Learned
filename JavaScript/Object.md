# 객체

* 자바스크립트는 객체 기반의 프로그래밍 언어, 원시 값을 제외한 나머지 값은 모두 객체
* 객체 타입: 다양한 타입의 값을 하나의 단위로 구성한 복합적인 자료구조, 변경 가능한 값 (<-> 원시값: 변경 불가능)
* 객체: 0개 이상의 프로퍼티(키와 값)로 구성, 모든 값은 프로퍼티값이 될 수 있음
  (프로퍼티 값이 함수: 메서드)

=> 객체: 프로퍼티와 메서드로 구성된 집합체
  - 프로퍼티: 객체의 상태를 나타내는 값
  - 메서드: 프로퍼티를 참조하고 조작할 수 있는 동작

## 객체 생성
다양한 객체 생성 방법 지원
- 객체 리터럴
- Object 생성자 함수
- 생성자 함수
- Object.create 메서드
- 클래스(ES6)

> 클래스 기반 객체지향 언어의 경우, 클래스를 정의하고 new 연산자와 함께 생성자 호출하여 인스턴스 생성
> ```java
> public class Student {
>   private int age;
>   private String name;
>
>   public Student(String name, int age) {
>     this.name = name;
>     this.age = age;
>   }
> }
>
> 
> Student student = new Student("sally", 24);
> ```

[객체 리터럴로 객체 생성]         
중괄호 내에 0개 이상의 프로퍼티를 정의, 변수에 할당되는 시점에 자바스크립트 엔진은 객체 리터럴을 해석해서 객체 생성     
- 프로퍼티 정의 X - 빈 객체
- 객체 리터럴의 중괄호 - 코드블록 x
- 클래스 기반 객체 지향 언어와 다르게 클래스 정의와 new 연산자 사용이 필요 없기 때문에 유연함

```javascript
var person = {
  name: 'Lee',
  sayHello: function() {
    console.log(`Hello, My name is ${this.name}.`);
  }
};

console.log(typeof person);     // object
```

## 프로퍼티
- 키와 값으로 구성
  - 키: 빈 문자열을 포함하는 모든 문자열, 심벌 값 (빈 문자열 사용은 권장 x)      
       이 외의 값 사용시 암묵적 타입 변환으로 문자열이 됨      
       값에 접근할 수 있는 이름(식별자 역할) - 식별자 네이밍 규칙을 따르지 않아도 되지만 그럴 경우 따옴표 사용 필수
  - 값: 자바스크립트에서 사용할 수 있는 모든 값
- 프로퍼티 나열시 쉼표(,)로 구분
- 프로퍼티 동적 생성
  ```javascript
  var obj = {};
  var key = 'hello';

  obj[key] = 'world';

  console.log(obj);      // {hello: 'world'};
  ```
- 예약어를 키로 사용 가능하지만 권장 x
- 프로퍼티 키를 중복 선언할 경우 마지막에 선언한 프로퍼티 사용 (에러 발생 x)

## 메서드
객체에 묶여 있는 함수
```javascript
var circle = {
  radius: 5,
  getDiameter: function () {
    return 2 * this.radius;
  }
};

console.log(circle.getDiameter());        // 10
```
메서드 내부에서 사용한 this 키워드는 객체 자신을 가르키는 참조변수

### 프로퍼티 접근
1. 마침표 표기법: 마침표 프로퍼티 접근 연산자(.) 사용
  ```javascript
  var person = {
    name: 'lee'
  };
  
  console.log(person.name);
  ```
2. 대괄호 표기법: 대괄포 프로퍼티 접근 연산자([...]) 사용 - 프로퍼티 키는 따옴표로 감싼 문자열
  ```javascript
  var person = {
    name: 'lee'
  };
  
  console.log(person['name']);
  ```

- 객체에 존재하지 않는 프로퍼티에 접근하면 undefined 반환 - 에러 발생 x
- 키가 식별자 네이민 규칙을 준수하지 않을 경우 대괄호 표기법을 사용해야함


### 프로퍼티 값 갱신
= 재할당
```javascript
var person = {
  name: 'Lee'
};

person.name = 'Kim';

console.log(person);        // {name: 'Kim'};
```

### 프로퍼티 동적 생성
존재 하지 않는 프로퍼티 값을 할당하면 동적으로 생성
```javascript
var person = {
  name: 'Lee'
};

person.age = 20;

console.log(person);        // {name: 'Lee', age: 20};
```

### 프로퍼티 삭제
delet 연산자를 사용, 존재하지 않는 프로퍼티를 삭제할 경우 에러 없이 무시
```javascript
var person = {
  name: 'lee',
  age: 20
};

delete person.age;

console.log(person);      // {name: 'lee']
```

## 객체 리터럴의 확장 기능 (ES6)
1. 프로퍼티 축약 표현    
   프로퍼티 값으로 변수를 사용할 때, 변수 이름과 키가 동일할 경우 키 생략 가능 - 키는 변수 이름으로 자동 생성
   ```javascript
   let x = 1, y = 2;

   const obj = { x, y ];

   console.log(obj);          //{x: 1, y: 2}
   ```
2. 계산된 프로퍼티 이름       
   문자열 or 문자열로 타입 변환할 수 있는 값으로 평가되는 표현식을 사용해 프로파티 키를 동적으로 생성할 때, 프로퍼티 키로 사용할 표현식을 대괄호로 묶어야 함
   ```javascript
   const perfix = 'prop';
   let i = 0;

   const obj = {
     [`${perfix}-${++i}`]:i,
     [`${perfix}-${++i}`]:i,
     [`${perfix}-${++i}`]:i,
   }

   console.log(obj);        // {prop-1: 1, prop-2: 2, prop-3: 3};
   ```
3. 메서드 축약 표현     
   function 키워드를 사용하던 이전 방법과 달리 생략 가능 - 이전 방법과 동작 방식이 다름
   ```javascript
   const obj = {
     name: 'lee',
     sayHi(){
       console.log('Hi! ' + this.name);
     }
   };

   obj.sayHi();      // Hi! lee
   ```
