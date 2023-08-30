# let, const 키워드

## var 키워드로 선언한 변수의 문제점
1. 변수 중복 선언 허용
   ```javascript
   var x = 1;
   var y = 1;
   
   var x = 100;  
   var y;               // 초기화문이 없는 변수 선언문은 무시

   console.log(x);      // 100
   console.log(y);      // 1
   ```
   var 키워드로 선언한 x, y 중복 선언 -> 변수가 이미 선언되어 있는지 모르고 변수를 중복 선언하고 값을 할당하면 변수 값이 변경되는 부작용 발생

2. 함수 레벨 스코프         
   var 키워드로 선언한 변수는 **함수의 코드 블록만 지역 스코프로 인정** - 함수 외부에서 var 키워드로 선언한 변수를 코드 블록 내에서 선언해도 모두 전역 변수가 됨
   ```javascript
   var x = 1;

   if (true) {
     var x = 10;
   }

   console.log(x);        // 10
   ```
   의도치 않게 전역 변수 중복 선언되는 경우 발생

3. 변수 호이스팅        
   호이스팅에 의해 var 키워드로 선언한 변수는 변수 선언문 이전에 참조 가능 - 할당문 이전에 참조하면 undefined 반환
   ```javascript
   console.log(foo);      // undefined

   var foo = 123;

   console.log(foo);     // 123
   ```
   선언문 이전에 변수를 참조해도 에러가 발생하지는 않지만 가독성 저하, 오류 발생 여지 생성

## let 키워드
1. 변수 중복 선언 금지      
   중복 선언시, 문법 에러(SyntaxError) 발생
   ```javascript
   let bar = 123;

   let bar = 456;        // SyntaxError: Identifier 'bar' has already beem declared
   ```

1. 블록 레벨 스코프      
   모든 코드 블록(함수, if문, for문, while문, try/catch문 등)을 지역 스코프로 인정 = 블록 레벨 스코프
   ```javascript
   let foo = 1;          // 전역 변수
   
   {
     let foo = 2;        // 지역 변수
     let bar = 3;        // 지역 변수
   }

   console.log(foo);      // 1
   console.log(bar);      // ReferenceError: bar is not defined
   ```

1. 변수 호이스팅       
   ```
   console.log(foo);      // ReferenceError

   let foo;
   ```
   let 키워드로 선언한 변수를 변수 선언문 이전에 참조하면 참조 에러 발생
   - '선언 단계'와 '초기화 단계'가 분리되어 실행      
     -> 런타임 이전에 자바스크립트 엔진에 의해 암묵적으로 선언 단계가 먼저 실행되지만 초기화 단계는 변수 선언문에 도달하여 실행
   - 초기화 단계 이전에 변수 참조시 에러 발생 -> let 키워드로 선언한 변수는 스코프의 시작점부터 초기화 시작점까지 참조 불가 = 일시적 사각 지대 (Temporal Dead Zone: TDZ)
     ```javascript
     // 선언 단계 실행
     // 일시적 사각 지대 - 변수 참조 불가
     console.log(foo);     // ReferenceError 

     let foo;              // 변수 선언문 - 초기화 단계 실행 

     console.log(foo);     // undefined

     foo = 1;              // 할당

     console.log(foo);     // 1
     ```

   변수 호이스팅이 발생하지 않는것처럼 보이지만 변수 호이스팅은 발생! 초기화 전에 변수 참조가 안되는 것 뿐
   > let, const 포함해서 모든 선언을 호이스팅 - let, const, class를 사용한 선언문은 호이스팅이 발생하지 않은 것처럼 동작할 뿐

1. 전역 객체와 let     
   let 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 아니다. -> 보이지 않는 개념적인 블록 내에 존재
   ```javascript
   let x = 1;

   console.log(window.x);      // undefined
   console.log(x);             // 1
   ```

## const 키워드
const 키워드는 상수 선언시 사용 (산수만을 위해 사용하지는 않음)

1. 선언과 초기화      
   const 키워드로 선언한 변수는 반드시 선언과 동시에 초기화 필수
   ```javascript
   const foo = 1;

   const foo;          // SyntaxError: Missing initializer in cost declaration
   ```

   * let과 동일하게 블록 레벨 스코프를 가지고 변수 호이스팅이 발생하지만 발생하지 않은 것처럼 동작

1. 재할당 금지      
   ```javascript
   const foo = 1;
   foo = 2;            // TypeError: Assignment to constant variable
   ```

1. 상수      
   const로 선언한 변수에 원시 **값을 할당하면 변수 값 변경 불가**
   > 원시 값은 변경 불가능한 값이기 때문에 재할당 없이 값을 변경할 수 없음, const는 재할당 불가 -> const 키워드로 상수 표현     
   > 상수: 재할당이 금지된 변수
   
   - 프로그램 전체에서 고정된 값으로 사용할 값을 미리 상수로 정의하면 값의 의미를 쉽게 파악하고 고정값으로 사용 가능
   - 상수는 프로그램 전체에서 공통적으로 사용하기 때문에 변경시 상수만 변경하면 됨 -> 유지보수성 향상
   - 일반적으로 상수 이름은 대문자로 선언 - 상수임을 명확히 표시, 여러 단어일 경우, 스네이크 케이스 사용(언더바)

1. const 키워드와 객체        
   const 키워드로 선언한 변수에 **객체를 할당한 경우 값 변경 가능**
   > 객체는 재할당없이 직접 변경이 가능하기 때문에
   
   ```javascript
   const person = {
     name: 'Lee'
   };

   person.name = 'Kim';

   console.log(person);      // {name: "Kim"}
   ```

const 키워드는 재할당 금지 O, 불변 X = 새로운 값 재할당 불가능, 프로퍼티 동적 생성, 삭제, 프로퍼티 값의 변경을 통해 객체 변경은 가능
> 객체가 변경되어도 변수에 할당된 참조 값은 변경되지 않음


## var, let, const
권장하는 사용 방식
- 변수 선언시 기본적으로 const 사용
- 재할당이 필요할 경우 let 사용 - 변수의 스코프 최대한 좁게 설정
- ES6 사용시 var 키워드 사용 x
- 변경이 발생하지 않고 읽기 전용으로 사용하는 원시 값과 객체에는 const 사용
