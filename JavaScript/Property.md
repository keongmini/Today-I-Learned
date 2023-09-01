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

3. 접근자 프로퍼티
   - 자체적으로 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장힐 때 호출되는 접근자 함수로 구성된 프로퍼티
   - 어트리뷰트: [[Get]], [[Set]], [[Enumerable]], [[Configurable]]





   
