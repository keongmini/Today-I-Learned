## jsx 기초

● JSX : 자바스크립트의 확장 문법, XML과 유사

   JSX로 작성한 코드는 브라우저에서 실행되기 전 코드가 번들링되는 과정에서 바벨을 사용하여 일반 js코드로 변환됨

  ❗️ 공식적인 자바스크립트 문법은 아니다. 바벨에서 지원하는 여러 문법 중 하나
  
```
// JSX로 작성한 코드
function App(){
	return (
    	<div>
        	Hello <b>react</b>
        </div>
    );
}

// 아래와 같이 js형태로 변환
function App(){
	return React.createElement("div",null,"Hello",React.createElement("b",null,"react"));
}
```

● JSX 특징

  1. HTML 코드와 작성이 비슷하기 때문에 가독성이 높고 사용이 쉬움

  2. HTML 태그 외에 직접 만든 컴포넌트를 JSX 코드 내에서 사용 가능 



● JSX 문법

   1. 코드 감싸기 : 컴포넌트 내 여러 요소가 있다면 부모 요소로 감싸주어야 함

    Virtual DOM에서 컴포넌트 변화를 감지할 때 효율적으로 비교할 수 있도록 컴포넌트 내부를 하나의 DOM 트리구조로 작성 필요

    ✅  부모 태그 <> </> 사용 가능  (Fragment 기능)
    
```
function App() {
  return (
    <div>
      <h1>hi</h1>
      <h2>hi</h2>
    </div>
  );
}
```

위 코드에서 div 태그가 부모코드, 부모코드로 감싸주지 않으면 Parsing error 발생



  2. 자바스크립트 표현 : JSX 안에 코드를 { }로 감싸주어서 자바스크립트 표현식 작성

```
function App() {
  const name = "리액트";
  return (
    <div>
      <h1>{name} hi</h1>
      <h2>hi</h2>
    </div>
  );
}
```

   3. 조건부 연산 및 렌더링

      ▷ 삼항연산자
```
function App() {
  const name = "리액트";
  return (
    <div>
      {name === "리액트" ? (
        <h1>리액트입니다.</h1>
      ) : (
        <h2>리액트가 아닙니다.</h2>
      )}
    </div>
  );
}
```

      ▷ AND연산자(&&)
```
function App() {
  const name = "리액트";
  return (
    <div>
      {name === "리액트" && <h1>리액트입니다.</h1>}
    </div>
  );
}
```

❗️ False 렌더링시 null과 마찬가지로 화면에 아무 표시도 하지 않는다. 하지만 숫자 0은 예외적으로 화면에 표시된다. 



   4. undefined 렌더링하지 않기

   - undefined 값을 렌더링하게 되면 오류가 발생한다. OR(||) 연산자를 사용하요 해당값이 undefined일 때 사용할 값을 지정 가능

```
function App() {
  const name = undefined;
  return name || "undefined";
}
```

   - JSX 내부에서 렌더링은 가능
```
function App() {
  const name = undefined;
  return <div>{name}</div>;
}
```

   5. 인라인 스타일링 : DOM 요소에 스타일을 적용할 경우 객체 형태로 작성해야 함, css 스타일 이름 중 '-'이 포함되어있는 이름은 '-'을 제거하고 카멜표기법으로 작성해야 함
```
function App() {
  const name = "React";
  return (
    <div
      style = {{
        backgroundColor : "black",
        color : "blue",
        fontSize : "40px",
        fontWieght : "bold",
        padding : 16
      }}
    >
      {name}
    </div>
  )
}
```

<p>
  <img src="https://blog.kakaocdn.net/dn/NCsPA/btreOL8OBCp/5SLKT8GHqBVMFi5MRzUxA0/img.png" /><br/>
  <em>위 코드 출력 화면</em>
</p>

   5. className

   HTML에서 css 클래스 사용시 태그 내에 class 속성을 이용하여 사용 가능하지만 JSX에서는 class 대신 className 으로 사용함
   
```
/* App.css */
.react{
  background-color: aqua;
  color : black;
  font-size: 48px;
  font-weight: bold;
  padding: 16px;
}
```
```
import './App.css';

function App() {
  const name = "React";
  return (
    <div className = "react">
      {name}
    </div>
  )
}
```

<p>
  <img src="https://blog.kakaocdn.net/dn/D1gpZ/btreLg9IVuK/KIqNez1eR2DVtJiMsGr91K/img.png" /><br/>
  <em>위 코드 출력 화면</em>
</p>

   6. 태그 닫기

   HTML에서는 input, image 등 닫힌 태그를 사용하지 않는 태그들이 있다. JSX에서는 모든 태그들을 닫아주어야 한다.
   
```
function App() {
  const name = "React";
  return (
    <>
      <div className = "react">
        {name}
      </div>
      <input></input>
      {/* <input /> 로도 사용할 수 있다. self-closing 태그 */}
    </>
  )
}
```

참고. 리액트를 다루는 기술
