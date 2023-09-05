# 생성자함수에 의한 객체 생성

## Object 생성자 함수
new 연산자와 함께 Object 생성자 함수를 호출하면 빈 객체 생성 후 반환 - 이후 프로퍼티 또는 메서드 추가하여 객체 완성
```javascript
const person = new Object();

person.name = 'Lee';
person.sayHello() = function () {
  console.log('Hi! My name is ' + this.name);
};

console.log(person);      // {name: 'Lee', sayHello: f};
```

* 생성자 함수: new 연산자와 함께 호출하여 객체(인스턴스)를 생성하는 함수
* 인스턴스: 생성자 함수에 의해 생성된 객체


## 생성자 함수

### 객체 리터럴에 의한 객체 생성 방식의 문제점
단 하나의 객체만 생성 -> 동일한 프로퍼티를 갖는 객체를 여러 개 생성해야 하는 경우 반복해야 해서 비효율적
```javascript
const circle1 = {
  radius: 5,
  getDiameter(){
    return 2 * this.radius;
  }
}

console.log(circle.getDiameter());      // 10

const circle2 = {
  radius: 10,
  getDiameter() {
    return 2 * this.radius;
  }
};

console.log(circle2.getDiameter());      // 20
```
객체는 프로퍼티를 통해 객체 고유의 상태를 표현, 메서드를 통해 상태 데이터인 프로퍼티를 참조하고 조작하는 동작 표현 -> 프로퍼티는 객체마다 프로퍼티 값이 다를 수 있지만 일반적으로 메서드 내용은 동일        
(위 코드에서 circle1 객체와 circle2 객체는 동일한 프로퍼티 구조 - radius 프로퍼티 값은 다르지만 getDiameter 메서드 동일)

하지만 객체 리터럴에 의해 객체를 생성할 경우) 프로퍼티 구조가 동일함에도 매번 같은 프로퍼티와 메서드 기술 필요

### 생성자 함수에 의한 객체 생성 방식의 장점
객체(인스턴스)를 생성하기 위한 템플릿(클래스)처럼 프로퍼티 구조가 동일한 객체 여러 개 생성 가능
```javascript
function Circle(radius) {
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

const circle1 = new Circle(5);
const circle2 = new Circle(10);
```

> this: 객체 자신의 프로퍼티나 메서드를 참조하기 위한 자기 참조 변수        
> this 바인딩(this가 가리키는 값)은 함수 호출 방식에 따라 동적으로 결정
>   1. 일반 함수로서 호출: 전역 객체
>   2. 메서드로서 호출: 메서드를 호출한 객체
>   3. 생성자 함수로서 호출: 생성자 함수가 (미래에) 생성할 인스턴스

클래스 기반 객체지향 언어의 생성자와 다름!       
형식이 정해져 있지 않고 일반 함수와 동일한 방법으로 생성자 함수 정의, new 연산자와 함께 호출하면 해당 함수는 생성자 함수로 동작     
(new 연산자 사용하지 않으면 일반 함수로 동작)

### 생성자 함수의 인스턴스 생성 과정
- 생성자 함수의 역할
  - 프로퍼티 구조가 동일한 인스턴스를 생성하기 위한 템플릿(클래스)으로 동작
  - 인스턴스 생성 - 필수
  - 생성된 인스턴스 초기화(인스턴스 프로퍼티 추가 및 초기값 할당) - 옵션

- this에 프로퍼티 추가, 필요에 따라 전달된 인수를 프로퍼티의 초기값으로 할당하여 인스턴스 초기화
- 인스턴스 생성하고 반환하는 코드 x -> 자바스크립트 엔진이 암묵적으로 인스턴스 생성하고 반환(new 연산자와 함께 호출할 경우)

1. 인스턴스 생성과 this 바인딩      
   암묵적으로 빈 객체(생성자 함수가 생성한 인스턴스) 생성 -> 인스턴스(빈 객체)는 this에 바인딩

   > 바인딩: 식별자와 값을 연결하는 과정

2. 인스턴스 초기화       
   생성자 함수에 기술되어 있는 코드가 한줄씩 실행되어 this에 바인딩 되어 있는 인스턴스 초기화      
   = this에 바인딩되어 있는 인스턴스에 프로퍼티나 메서드 추가, 생성자 함수가 인수로 전달받은 초기값을 인스턴스 프로퍼티에 할당하여 초기화 or 고정값 할당

3. 인스턴스 반환      
   생성자 함수 내부에서 모든 처리가 끝나면 완성된 인스턴스가 바인딩된 this를 암묵적으로 반환

   - return 문에 다른 객체를 명시적으로 작성하면 this 대신 명시한 객체 반환
   - 명시한 값이 원시 값이면 원시 값은 무시하고 this 반환

   -> 생성자 함수 내부에서 명시적으로 this가 아닌 다른 값을 반환하는 것은 생성자 함수의 기본 동작 훼손 -> 생성자 함수 내부에서 return 문 **반드시 생략!**

```javascript
function Circle(radius) {
  // 1. 암묵적 빈 객체 생성, this에 바인딩

  // 2. this에 바인딩되어 있는 인스턴스 초기화
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  }

  // 3. 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환
}

const circle = new Circle(5);
```

### 내부 메서드 [[Call]]과 [[Construct]]
- 함수 선언문 or 함수 표현식으로 정의한 함수도 생성자 함수로 호출 가능 -> 생성자 함수로 호출하면 객체 생성
- 함수도 객체지만 일반 객체와 다름! **일반 객체는 호출 불가 <-> 함수는 호출 가능**       
  -> 함수 객체는 일반 객체가 가지고 있는 내부 슬롯과 내부 메서드 + 함수로서 동작하기 위한 [[Environment]], [[FormalParameters]] 등의 내부 슬롯, [[Call]], [[Constructor]] 같은 내부 메서드 보유
     - 함수가 일반 함수로 호출 - [[Call]] 호출
     - 내부 메서드 [[Call]]을 갖는 함수 객체 = callable = 호출할 수 있는 객체(함수)
       
     - 생성자 함수로 호출 - [[Constructor]] 호출
     - 내부 메서드 [[Constructor]]를 갖는 함수 객체 = constructor = 생성자 함수로서 호출할 수 있는 함수        
       <-> [[Constructor]]를 갖지 않는 함수 객체 = non-constructor = 객체를 생성자 함수로서 호출할 수 없는 함수
  
     - 함수 객체가 아니기 때문에 반드시 callable이어야 함 -> 모든 함수 객체는 내부 메서드 [[Call]]을 갖고 있고 호출 가능 / 모든 함수 객체가 [[Constructor]]를 갖지는 않음       
       -> 함수 객체는 constructor 일 수 도 있고 non-constructor 일 수 도 있음

  **모든 함수 객체는 호출 할 수 있지만 모든 함수 객체를 생성자 함수로서 호출할 수 있는 것은 아니다.**

### constructor와 non-constructor 구분
함수 정의를 평가하여 함수 객체를 생성할 때 함수 정의 방식에 따라 구분
  - constructor: 함수 선언문, 함수 표현식, 클래스
  - non-constructor: 메서드(ES6 메서드 축약 표현), 화살표 함수

* 주의! ECMAScript에서의 메서드의 범위는 일반적인 메서드보다 좁다.
  - 함수를 프로퍼티 값으로 사용하면 일반적으로 메서드로 통칭
  - ECMAScript에서 메서드 = ES6의 메서드 축약 표현       
    -> 함수가 할당된 위치가 아닌 함수 정의 방식에 따라 constructor와 non-constructor 구분

* 주의! 생성자 함수로서 호출될 것을 기대하고 정의하지 않은 일반 함수(callable, constructor)에 new 연산자를 붙여 호출하면 생성자 함수로 동작 가능

### new 연산자
- new 연산자와 함께 함수 호출하면 해당 함수는 생성자 함수로 동작 => 함수 객체의 내부 메소드 [Constructor]] 호출        
  이때, 연산자와 함께 호출하는 함수는 constructor
  ```javascript
  // 일반 함수
  
  function add(x, y) {
    return x + y;
  }

  let inst = new add();

  // 함수가 객체를 반환하지 않았기 때문에 반환문 무시 - 빈 객체 반환
  console.log(inst);          // {}

  function createUser(name, role) {
    return { name, role };
  }

  inst = new createUser('Lee', 'admin');

  // 함수가 생성한 객체 반환
  console.log(inst);         // {name: 'Lee', role: 'admin'};
  ```

- new 연산자 없이 생성자 함수를 호출하면 일반 함수로 호출 => [[Call]] 호출
  ```javascript
  // 생성자 함수
  
  function Circle(radius) {
    this.radius = radius;
    this.getDiameter = function () {
      return 2 * this.radius;
    };
  }

  // new 연산자 없이 생성자 함수 호출
  const circle = Circle(5);

  console.log(circle);          // undefined
  ```
  - 생성자 함수를 일반 함수로 호출하면 함수 내부 this는 전역 객체 window를 가리킴
  - radius 프로퍼티, getDiameter 메서드는 전역 객체의 프로퍼티와 메서드가 됨

### new.target
생성자 함수가 new 연산자 없이 호출되는 것을 방지하기 위해 파스칼 케이스 컨벤션 사용 -> 그럼에도 실수가 발생할 수 있기 때문에 ES6에서는 new.target 지원

- new.target은 this와 유사하게 constructor인 모든 함수 내부에서 암묵적인 지연 변수와 같이 사용되며 메타 프로퍼티라고 부름(IE에서는 지원 x)
- new 연산자와 함께 생성자 함수로서 호출되면 함수 내부의 new.target은 함수 자실을 가리킴       
  -> new 연산자 없이 일반 함수로서 호출된 함수 내부의 new.target = undefined        
  -> 함수 내부에서 new.target을 사용하여 new 연산자와 생성자 함수로 호출됐는지 확인 가능

  ```javascript
  function Circle(radius) {
    // 생성자 함수로 호출하지 않은 경우 new 연산자 사용하여 재귀 호출 -> 생성자 함수로 호출
    if (!new.target) {
      return new Circle(radius);
    }

    this.radius = radius;
    this.getDiameter = function () {
      return 2 * this.radius;
    }
  }

  const circle = Circle(5);      // new 연산자 없이 생성자 함수 호출해도 new.target을 통해 생성자 함수 호출 가능
  console.log(circle.getDiameter());
  ```

  > [스코프 세이프 생성자 패턴]       
  > new.target은 IE에서 지원하지 않음 -> 스코프 세이프 생성자 패턴 사용
  >
  > ```javascript
  > function Circle(radius) {
  >   if(!(this instanceof Circle)) {
  >     return new Circle(radius);
  >   }
  >
  >   this.radius = radius;
  >   this.getDiameter = function () {
  >     return 2 * this.radius;
  >   }
  > }
  >
  > const circle = Circle(5);
  > ```

- Object, Function: new 연산자 없이 호출했을 때, new 연산자와 함께 호출했을 때 동일
- String, Number, Boolean: new 연산자 없이 호출했을 때 - String, Number, Boolean 객체 생성 후 반환 <-> new 연산자 없이 호출했을 때 - 문자여르 숫자, 불리언 값 반환









