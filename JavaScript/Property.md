# 프로퍼티 어트리뷰트

* 내부 슬롯(internal slot), 내부 메서드(internal method)
  - 자바스크립트 엔진의 구현 알고리즘을 설명하기 위해 ECMAScript 사양에서 사용하는 의사 프로퍼티(pseudo property), 의사 메서드(pseudo method)
  - 이중 대괄호([[...]])로 감싼 이름들
  - 자바스크립트 엔진의 내부 로직으로 원칙적으로 직접 접근하거나 호출할 수 는 없음 - 일부 내부 슬롯과 메서드에 한해 간접적으로 접근할 수 있는 수단 제공
    ```javascript
    const o = {};

    o.[[Prototype]]        // Uncaught SyntaxError - 내부 슬롯에 직접 접근 불가

    o.__proto__            // Object.prototype - 간접적으로 접근
    ```
 

## 프로퍼티 어트리뷰트와 프로퍼티 디스크립터 객체
자바스크립트 엔진은 프로퍼티를 생성할 때 프로퍼티의 상태를 나타내는 프로퍼티 어트리뷰트를 기보값으로 자동 정의한다.

* 프로퍼티 상태: 프로퍼티 값, 값의 갱신 가능 여부, 열거 가능 여부, 재정의 가능 여부
* 프로퍼티 어트리뷰트: 자바스크립트 엔진이 관리하는 내부 상태 값인 내부 슬롯 [[Value]], [[Writable]], [[Enumerable]], [[Configurable]]
  - ```Object.getOwnPropertyDescriptor``` 메서드를 통해 간접 접근
    ```javascript
    const person = {name: 'Lee'};
  
    console.log(Object.getOwnPropertyDescriptor(person, 'name'));       // {value: 'Lee', writable: true, enumerable: true, configurable: true}
    // 첫번째 매개변수: 객체의 참조 전달, 두번째 매개변수: 프로퍼티 키를 문자열로 전달
    // 결과: 프로퍼티 디스크립터(Property Descriptor) 객체 반환
    // 존재하지 않는 프로퍼티에 접근하면 undefined 반환
    ```


## 데이터 프로퍼티와 접근자 프로퍼티
1. 데이터 프로퍼티        
   - 키와 값으로 구성된 일반적인 프로퍼티
   - 어트리뷰트: [[Value]], [[Writable]], [[Enumerable]], [[Configurable]]

2. 접근자 프로퍼티
   - 자체적으로 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장힐 때 호출되는 접근자 함수로 구성된 프로퍼티
   - 어트리뷰트: [[Get]], [[Set]], [[Enumerable]], [[Configurable]]
   - 접근자 함수는 getter/setter 함수라고도 부름

   ```javascript
   const person = {
     firstName: 'Ungmo',
     lastName: 'Lee',

     get fullName(name){
       return `${this.firstName} ${this.lastName}`
     },

     set fullName(name){
       [this.firstName, this.lastName] = name.split(' ');
     }
   };

   console.log(person.firstName + ' ' + person.lastName);          // Ungmo Lee

   // 접근자 프로퍼티 fullName에 값을 저장하면 setter함수 호출
   person.fullName = 'Heegun Lee';
   console.log(person);                 // {firstName: 'Heegun', lastName: 'Lee'};

   // 접근자 프로퍼티 fullName에 접근하면 getter 함수 호출
   console.log(person.fullName);        // Heegun Lee
   ```
   - person 객체의 firstName, lastName 프로퍼티는 일반적인 데이터 프로퍼티
   - get, set이 붙어있는 메서드가 접근자 프로퍼티

   - 접근자 프로퍼티는 자체적으로 값을 가지지 않으며 단지 데이터 프로퍼티의 값을 읽거나 저장할 때 관여하는 역할

   [접근자 프로퍼티 ```fullName```으로 프로퍼티 값에 접근하면 동작하는 과정]
   1. 프로퍼티 키가 유요한지 확인(프로퍼티 키는 문자열 또는 심벌)
   2. 프로토타입 체인에서 프로퍼티 검색 - person 객체에 fullName 프로퍼티 존재
   3. fullName 프로퍼티가 데이터 프로퍼티인지, 접근자 프로퍼티인지 확인 - fullName은 접근자 프로퍼티
   4. 접근자 프로퍼티 fullName의 프로퍼티 어트리뷰트 [[GET]]의 값(getter 함수) 호출하여 결과 반환

   > 프로토타입 prototype
   > - 어떤 객체의 상위(부모) 객체의 역할을 하는 객체, 하위(자식) 객체에게 자신의 프로퍼티와 메서드를 상속
   > - 프로토타입 체인: 프로토타입이 단방향 링크드 리스트 형태로 연결되어 있는 상속 구조
   
## 프로퍼티 정의
새로운 프로퍼티를 추가하면서 프로퍼티 어트리뷰트를 명시적으로 정의하거나 기존 프로퍼티의 프로퍼티 어트리뷰트를 재정의하는 것

```javascript
const person = {};

Object.defineProperty(person, 'firstName', {
  value: 'Ungmo',
  writable: true,
  enumerable: true,
  configurable: true,
})

Object.defineProperty(person, 'lastName', {
  value: 'Lee',
})

let descriptor = Object.getOwnPropertyDescriptor(person, 'firstName');
console.log('firstName', descriptor);
// firstName {value: 'Ungmo', writable: true, enumerable: true, configurable: true}

descriptor = Object.getOwnPropertyDescriptor(person, 'lastName');
console.log('firstName', descriptor);
// lastName {value: 'Lee', writable: false, enumerable: false, configurable: false}

console.log(Object.keys(person));      // ['firstName']
// [[Enumerable]]의 값이 false인 경우) 반복문이나 Object.keys 등으로 열거 불가(lastName 반환되지 않은 이유)

person.lastName = 'Kim';
// [[Writable]]의 값이 false인 경우) 해당 프로퍼티의 [[Value]]의 값 변경 불가 - 에러 발생하지 않고 무시

delete person.lastName;
// [[Configurable]]의 값이 false인 경우) 해당 프로퍼티 삭제 불가 - 에러 발생하지 않고 무시 / 재정의 불가(에러 발생)

```

## 객체 변경 방지
1. 객체 확장 금지
   - ```Object.preventExtensions``` 메서드
   - 객체 확장 금지 = 프로퍼티 추가 금지
   - 프로퍼티 동적 추가와 ```Object.defineProperty``` 메서드를 통한 추가 모두 금지
   - ```Object.isExtensible```: 확장 가능한 객체인지 확인
   
   ```javascript
   const person = { name: 'Lee' };

   console.log(Object.isExtensible(person));          // true

   Object.preventExtensions(person);

   console.log(Object.isExtensible(person));          // false
   ```

2. 객체 밀봉
   - ```Object.seal``` 메서드
   - 객체 밀봉 = 프로퍼티 추가 및 삭제와 프로퍼티 어트리뷰트 재정의 금지 -> 읽기와 쓰기만 가능
   - ```Object.isSealed```: 밀봉된 객체인지 확인 
     
   ```javascript
   const person = { name: 'Lee' };

   console.log(Object.isSealed(person));      // false

   Object.seal(person);

   console.log(Object.isSealed(person));      // true
   ```

3. 객체 동결
   - ```Object.freeze``` 메서드
   - 객체 동결 = 프로퍼티 추가 및 삭제와 프로퍼티 어트리뷰트 재정의 금지, 프로퍼티 값 갱신 금지 -> 읽기만 가능
   - ```Object.isFrozen```: 동결된 객체인지 확인

   ```javascript
   const person = { name: 'Lee' };

   console.log(Object.isFrozen(person));       // false

   Object.freeze(person);

   console.log(Object.isFrozen(person));      // true
   ```

**위의 변경 방지 메서드들은 얕은 변경 방지로 직속 프로퍼티만 변경 방지 가능, 중첩 객체는 영향 X**

4. 불변 객체          
   객체의 중첩 객체까지 동결하여 변경 불가능한 읽기 전용의 불변 객체를 구현하려면 객체를 값으로 갖는 모든 프로퍼티에 대해 재귀적으로 ```Object.freeze``` 메서드 호출해야 함

   ```javascript
   function deepFreeze(target) {
     if (target && typeof target === 'object' && !Object.isFrozen(target)) {
       Object.freeze(target);

       Object.keys(target).forEach(key => deepFreeze(target[key]));
     }

     return target;
   }
   ```



   
