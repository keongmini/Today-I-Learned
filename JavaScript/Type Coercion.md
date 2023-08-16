# 타입 변환
기존 원시값을 사용해서 다른 타입의 새로운 원시 값 생성

1. 명시적 타입 변환, 타입 캐스팅: 개발자가 의도적으로 값의 타입을 변환하는 것
    ```javascript
    var x = 10;

    var str = x.toString();        // 숫자를 문자열로 타입 변경
    ```
1. 암묵적 타입 변환, 타입 강제 변환: 개발자의 의도와 상관없이 자바스크립트 엔진에 의해 자동으로 변환, 표현식을 에러 없이 평가하기 위해 피연산자 값의 타입을 변환하는 것(일회용)
    ```javascript
    var x = 10;
  
    var str = x + '';        // 문자열 연결 연산자에 의해 숫자 값을 가지고 문자열 생성
    ```

- 두가지 변환 모두 기존 값을 직접 변경x (원시 값 - 변경 불가능한 값)

## 암묵적 타입 변환
```javascript
'10' + 2     // '102'

5 * '10'     // 50
```
위 코드처럼 코드의 문맥에 부합하지 않는 경우 에러를 발생하기 보다 암묵적 타입 변환을 통해 표현식을 평가

- 암묵적 타입 변환이 발생하면 문자열, 숫자, 불리언 같은 뭔시 타입 중 하나로 변환됨

1. **문자열 타입**으로 변환
    ```javascript
    1 + '2'        // '12'
    ```
    위 예시에서 피연산자 중 하나 이상이 문자열이기 때문에 + 연산자는 문자열 연결 연산자로 동작     
    => 문자열 값을 만드는 역할에 충실하여 피연산자 중 문자열이 아닌 피연산자를 문자열 타입으로 암묵적 타입 변환
    
    - 표현식의 피연산자 뿐만 아니라 표현식을 평가할 때에도 암묵적 타입 변환 실행       
      예시. (ES6)템플릿 리터럴 - 표현식 삽입
      ```javascript
      `1 + 1 = {$1 + 1}`         // '1 + 1 = 2' - 평가 결과를 문자열 타입으로 변환
      ```

2. **숫자 타입**으로 변환
    ```javascript
    1 - '1'              // 0
    1 * '10'             // 10
    1 / 'one'            // NaN
    ```
    위 코드에서 사용한 산술연산자의 역할은 숫자 값을 생성하는 것   
    => 피연산자 중 숫자 타입이 아닌 피연산자를 숫자 타입으로 변환, 숫자 타입으로 변환할 수 없는 경우 결과는 NaN
    
    ```javascript
    '1' > 0              // true
    ```
    비교연산자는 피연산자의 크기를 비교하는 역할 - 피연산자가 모두 숫자 타입이어야 함
    
    - '+' 단항 연산자는 피연산자를 숫자 타입의 값으로 암묵적 타입 변환 수행     
      ```javascript
      +''                  // 0
      +'1'                 // 1
      +'string'            // NaN
    
      // [주의]
      // 빈 문자열(''), 빈 배열(''), null, false - 0으로 변환
      // 객체, 빈 배열이 아닌 배열, undefined - 변환 불가, NaN 반환
      ```

3. **불리언 타입**으로 변환
    ```javascript
    ''         // false
    true       // true
    0          // false
    'str'      // true
    null       // false
    ```
    - 불리언 타입이 아닌 값을 **Truthy 값(true로 변환) or Falsy 값(false로 변환)** 으로 구분
    
    [Falsy 값]
    - false
    - undefined
    - null
    - 0, -0
    - NaN
    - ''(빈 문자열)
    
    => 이 외의 값은 모두 Truthy 값

## 명시적 타입 변환
[변환 방법]    
- 표준 빌트인 생성자 함수(String, Number, Boolean)를 new 연산자없이 호출
- 빌트인 메서드 사용
- 암묵적 타입 변환 사용

1. **문자열 타입**으로 변환
   - String 생성자 함수를 new 연산자 없이 호출
     ```javascript
     String(1);              // '1'
     String(NaN);            // 'NaN'
     String(true);           // 'true'
     ```
   - Object.prototype.toString 메서드 사용
     ```javascript
     (1).toString();         // '1'
     (NaN).toString();       // 'NaN'
     (true).toString();      // 'true'
     ```
   - 문자열 연결 연산자 이용
     ```javascript
     1 + '';                 // '1'
     NaN + '';               // 'NaN'
     true + '';              // 'true'
     ```

2. **숫자 타입**으로 변환
   - Number 생성자 함수를 new 연산자 없이 호출
     ```javascript
     Number('0');             // 0
     Number('-1');            // -1
     Number(true);            // 1
     ```
   - parseInt, parseFloat 함수를 사용(문자열만 가능)
     ```javascript
     parseInt('0');           // 0
     parseInt('-1');          // -1
     parseFloat('10.53');     // 10.53
     ```
   - '+' 단항 산술 연산자를 이용
     ```javascript
     +'0';                    // 0
     +'-1';                   // -1
     +true;                   // 1  
     ```
   - '*' 산술 연산자를 이용
     ```javascript
     '0' * 1;                 // 0              
     '-1' * 1;                // -1
     true * 1;                // 1  
     ```

3. **불리언 타입**으로 변환
   - Boolean 생성자 함수를 new 연산자 없이 호출
     ```javascript
     Boolean('x');            // true
     Boolean(0);              // false
     Boolean(null);           // false
     Boolean({});             // true
     ```
   - ! 부정 논리 연산자를 두번 사용
     ```javascript
     !!'x';                   // true    
     !!0;                     // false
     !!null;                  // false
     !!{};                    // true
     ```

## 단축 평가

### 논리 연산자 사용
논리곱(&&) 또는 논리합(||) 연산자 표현식의 평가 결과는 2개의 피연산자 중 한쪽으로 평가됨 (Boolean이 아닐 수 도 있음)
1. 논리곱 연산자
   - 두 개의 피연산자가 모두 true일 때 true 반환
   - 두 번째 피연산자가 논리곱 연산자 표현식의 평가 결과를 결정
      ```javascript
      'Cat' && 'Dog'          // 'Dog'
      // 논리곱 연산자 -> 논리 연산의 결과를 결정하는 두번째 피연산자 반환
      ```
2. 논리합 연산자
   - 두 개의 피연산자 중 하나만 true여도 true 반환
   - 첫번째 피연산자 값이 true일 경우, 두번째 피연산자 값을 확인하지 않아도 표현식 평가 가능
     ```javascript
     'Cat' && 'Dog'       // 'Cat'
     // 논리합 연산자 -> 논리 연산의 결과를 결정하는 첫번쩨 피연산자 반환
     ```
- 논리 연산의 결과를 결정하는 피연산자를 타입 변환하지 않고 그래도 반환 => **단축 평가**
- 단축 평가: 표현식을 평가하는 도중에 평가 결과가 확정된 경우 나머지 평가 과정 생략
  ```
  true || anything => true
  false || anything => anything
  true && anything => anything
  false && anything => false
  ```

- if문 대체
  ```javascript
  // 어떤 조건이 true일 때 논리곱 연산자 활용
  var done = true;
  var message = '';

  if (done) message = '완료';

  message = done && '완료';

  console.log(message);            // 완료

  // 삼항 조건 연산자 사용
  message = done ? '완료' : '미완료';
  console.log(message);            // 완료
  ```

  ```javascript
  // 어떤 조건이 false일 때 논리합 연산자 활용
  var done = false;
  var message = '';

  if(!done) message = '미완료';

  message = done || '미완료';
  console.log(message);            // 미완료
  ```

- 단축 평가 사용 예시
  1. 객체로 기대되는 변수가 null 또는 undefined인지 확인하고 참조
     ```javascript
     var elem = null;
     var value = elem.value;          // TypeError
     ```
     위 코드처럼 변수의 값이 객체가 아니라 null 또는 undefined인 경우 TypeError 발생 - 아래와 같이 논리 연산자 사용해서 해결
     ```javascript
     var elem = null;
     var value = elem && elem.value;      // null
     // elem이 null 또는 undefined일 경우 false 이기 때문에 false로 평가
     ```
  2. 함수 매개변수에 기본값을 설정       
     함수 호출 시 인수를 전달하지 않으면 매개변수에 undefined 할당되어 에러 발생 - 아래와 같이 해결
     ```javascript
     function checkLength(str){
       str = str || '';              // 들어온 str값이 false일 경우 '' 반환
       return str.length;
     }

     checkLength();        // 0

     // ES6 방식
     function checkLength(str = ''){
       return str.length;
     }
     ```

### 옵셔널 체이닝 연산자(ES11)
옵셔널 체이닝 연산자(?.)는 좌항의 피연산자가 null 또는 undefined인 경우 undefined 반환, 아니면 우항의 프로퍼티 참조 진행
```javascript
var elem = null;

var value = elem?.value;
console.log(value);        // undefined
```
- [옵셔널 체이닝 연산자와 논리 연산자의 차이]          
  옵셔널 체이닝 연산자는 좌항 피연산자가 null 또는 undefined인지만 확인       
  <-> 논리 연산자는 false인지 확인

### null 병합 연산자(ES11)
null 병합 연산자(??)는 좌항의 피연산자가 null 또는 undefined인 경우 우항의 피연산자 반환, 아니면 좌항의 피연산자 반환
```javascript
var foo = null ?? 'default string';
console.log(foo);                        // 'default string'
```
- [null 병합 연산자와 논리 연산자의 차이]      
  null 병합 연산자는 좌항의 피연산자가 null 또는 undefined인지만 확인      
  <-> 논리 연산자는 false인지 확인 - 0이나 빈 문자열이 유효한 값이라도 false로 평가되기 때문에 예측과 다른 결과 반환될 수 있음
    ```javascript
    var foo = '' || 'default string';
    console.log(foo);                      // 'default string'
    ```
