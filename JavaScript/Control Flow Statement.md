# 제어문
조건문이나 반복문에서 사용

## 블록문
0개 이상의 문을 중괄호로 묶은 것 = 코드 블록, 블록

```javascript
{
  var foo = 10;
}

function sum(a, b) {
  return a + b;
}

// 각각이 블록문
```

- 자바스크립트에서의 블록문 = 하나의 실행 단위
- 단독으로 사용될 수 있으나 주로 제어문이나 함수를 정의할 때 사용
- 블록문은 문의 종료를 의미하는 자체 종결성을 가지기 때문에 블록문 끝에 세미콜론이 생략되기도 함

#### 주의! var와 const, let 차이
- var로 선언시 블록 범위를 가지지 않음 = 블록 내에서 선언한 함수여도 블록 밖까지 영향을 줌
  ```javascript
  var name = 'kim';
  
  {
    var name = 'lee';
  }

  console.log(name);       // lee
  ```

  => 사용을 권장하지 않음

- const, let으로 선언한 식별자는 블록 범위를 가짐
  ```javascript
  const name = 'kim';

  {
    const name = 'lee';
  }

  console.log(name);      // kim
  ```

  블록 내에서 const로 재선언해도 ```SyntaxError: Identifier 'c' has already been declared``` 발생하지 않음 => 블록 안이기 때문에 범위가 다름

## 조건문
조건식의 결과에 따라 블록문의 실행을 결정(조건식은 Boolean값으로 평가될 수 있는 표현식)

### if ...else 문
조건식의 결과 - 논리적 참 거짓에 따라 실행할 코드 블록 결정
```javascript
if (조건식1) {
  // 조건식1의 결과가 참일 때 실행
} else if(조건식2){
  // 조건식2의 결과가 참일 때 실행
} else{
  // 위 조건식 모두 거짓일 때 실행
}
```

- if문의 조건식이 Boolean이 아닌 값으로 평가될 경우 암묵적으로 타입이 변환되어 실행
- else if, else문은 옵션 - 필요한 경우에만 사용
- 여러개의 조건을 추가하고 싶을 경우 else if를 여러번 사용
- 블록문 내의 문이 하나라면 중괄호 생략 가능
  ```javascript
  var num = 2;

  if (num > 0) console.log('0 이상')
  else if (num < 0) console.log('0과 같음')
  else console.log('0 이하')
  ```
- if ...else문은 삼항 조건 연산자로 표현 가능
  ```javascript
  var num = 2;

  // 두 가지 경우의 수
  var result = x % 2 ? '홀수' : '짝수';

  // 세 가지 경우의 수
  var kind = nums ? (num > 0 ? '양수' : '음수')
  ```
  [삼항 연산자와 if ...else문 차이]    
  삼항 연산자는 표현식이어서 변수에 할당하고 값으로 사용 가능 <-> if ...else문은 문이기 때문에 변수에 할당 x

### switch 문
표현식을 평가하여 그 값과 일치하는 표형식을 갖는 case 문으로 실행 흐름을 이동하는 방식, 일치하는 case문이 없다면 default문으로 이동(default문은 옵션)
```javascript
switch (표현식){
  case 표현식1:
    표현식과 표현식1이 일치하면 실행
    break;
  case 표현식2:
    표현식과 표현식2이 일치하면 실행
    break;
  case 표현식3:
    표현식과 표현식3이 일치하면 실행
    break;
  default:
    표현식과 일치하는 case가 없으면 실행
}
```
- if ...else 문과 달리 switch 문의 표현식은 문자열이나 숫자
- 다양한 상황에 따라 실행할 코드 블록을 결정할 때 사용
- 블록문을 탈출하는 break문을 사용하지 않으면 실행 흐름이 멈추지 않고(case문의 표현식이 일치하지 않더라도) 계속 진행
  ```javascript
  // break를 사용하지 않은 경우 = 풀스루
  
  var num = 3;

  switch (num) {
    case 1: console.log(1);
    case 2: console.log(2);
    case 3: console.log(3);
    case 4: console.log(4);
    default: 'Invalid Number';
  }

  // 실행 결과
  // 3
  // 4
  // 'Invalid Number'

  ```
- default 문은 switch 문의 마지막에 위치하므로 break 문 안해줘도 됨

## 반복문
조건식을 반복적으로 평가하여 여전히 참인 경우 블록문 실행, 거짓일 때까지 반복

### for 문
```javascript
for (변수 선언문 or 할당문; 조건식; 증감식){
  조건식이 참인 경우 반복 실행될 문;
}
```

```javascript
for (var i = 0; i < 2; i++){      // 반복할 때마다 변수 i를 하나씩 증가시키고 이를 i가 2보다 작을 때까지만 실행
  console.log(i);
}

// 실행 결과
// 0
// 1
```
- for문을 중첩해서 사용할 수 있음 = 이중 for문

### while 문
```javascript
var count = 0;

while (count < 3){
  console.log(count);
  count++;
}

// 실행 결과
// 0
// 1
// 2
```

- for문: 반복 횟수가 명확할 때 <-> while문: 반복횟수가 불명확할 때
- 조건식의 결과가 Boolean이 아닐 경우 타입 강제 변환 실행
- ``while (true)```와 같이 무한루프 생성할 경우, 조건문을 이용하여 break문으로 블록문의 탈출 지점 지정해야 함

### do ...while 문
코드 블록 먼저 실행 후, 조건식 평가 => 코드 블록 무조건 한번 이상 실행됨
```javascript
var count = 0;

do {
  console.log(count);
  count++;
} while (count < 0);

// 실행 결과
// 0
```

## break 문
레이블문, 반복문, switch문 코드 블록 탈출 (이 외 다른 코드 블록에서 사용시 ```SyntaxError(문법 에러)``` 발생   
> 레이블문: 식별자가 붙은 문      
> ```foo: console.log('foo');```
>
> break문과 함께 사용시,
> ```javascript
> foo: {
>   console.log(1);
>   break foo;      // 레이블명 지정
> }
> ```
> 레이블 명을 지정해서 탈출하기 때문에 중첩 반복문 탈출시 유용, 그 외의 경우에는 권장 x

```javascript
var result = 3;
var i = 0;

while (true) {
  if (i === result){
    break;
  }
  i++;
}
```

## conitnue 문
반복문의 코드 블록 실행을 중단하고 반복문의 증감식으로 실행 흐름 이동 - break문과 달리 반복문 탈출 x
```javascript
for (var i = 0; i < 5; i++){
  if (i === 2){
    continue;
  }
  console.log(i);
}

// 실행 결과
// 0
// 1
// 3
// 4
```
