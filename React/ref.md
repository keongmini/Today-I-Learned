## ref

### ref 이해하기

● ref : (reference) 리액트 프로젝트 내부에서 DOM에 이름을 설정하는 방법(HTML의 id와 동일)

    DOM에 직접적으로 접근해야 할 경우 사용



1. ref 설정하는 두가지 방법



▶ 콜백함수를 통한 ref 설정

ref을 설정하고자 하는 요소에 ref라는 콜백 함수를 props로 전달한다. 콜백함수는 ref값을 매개변수로 전달 받는다. 함수 내부에서 매개변수로 받은 ref를 컴포넌의 멤버 변수로 설정해준다. 

```<input ref = {(ref) => {this.name = ref}} />```
위와 같이 작성시 this.input은 input 요소의 DOM을 가리킨다. ref의 이름은 타입과 상관없이 원하는 이름으로 설정가능하다. ref를 설정한 DOM에 접근하려면 this.input를 통해 조회 가능하다. 



▶ createRef를 통한 ref 설정

리액트에 내장되어있는 createRef 함수 사용
```
import React, { Component } from 'react';

class RefSample extends Component {
    input = React.createRef();
    
    handleFocus = () => {
    	this.input.current.focus();
    }
    
    render(){
    	return (
        	<div>
            	<input ref = {this.input} />
            </div>
        );
    }
}

export default RefSample;
```
컴포넌트 내부 멤버 변수에 React.createRef( )를 선언해주어야 한다. ref를 설정하고자 하는 요소에 ref값을 props값으로 전달해주면 ref 설정이 된다. ref를 설정한 DOM에 접근하려면 this.input.current를 통해 조회 가능하다.



▷ ref 설정한 예시 (input에 값을 입력하고 버튼을 누르고 난 다음에 다시 커서를 input창에 뜨도록 하는 코드)
```
import { Component } from 'react';
import './ValidationSample.css';

class ValidationSample extends Component{
    state = {
        password : "",
        clicked : false,
        validated : false
    }

    handleChange = (e) => {
        this.setState({
            password : e.target.value
        });
    }

    handleButtonClick = () => {
        this.setState({
            clicked : true,
            validated : this.state.password  === "000"
        });
        this.input.focus();
    }

    render() {
        return (
            <div>
                <input
                    ref = {(ref) => this.input = ref}
                    type = "password"
                    value = {this.state.password}
                    onChange = {this.handleChange}
                    className = {this.state.clicked ? (this.state.validated ? "success" : "failure") : ''}
                />
                <button onClick = {this.handleButtonClick}>검증하기</button>
            </div>
        )
    }
}

export default ValidationSample;
```

2. 컴포넌트에 ref 설정

주로 컴포넌트 내부에 있는 DOM을 컴포넌트 외부에서 접근하고자 할 때 사용한다. 
```
<MyComponent 
	ref = {(ref) => {this.myComponent = ref}}
/>
```
위와 같이 컴포넌트에 ref를 지정해줄 경우 컴포넌트를 통해 컴포넌트 내부 DOM에 접근 가능하다. (MyComponent.handleClick, MyComponent.input 등)



▷ 컴포넌트에 ref 설정한 예시
```
// ScrollBox.js
import { Component } from "react";

class ScrollBox extends Component{

    scrollToBottom = () => {
        const { scrollHeight, clientHeight } = this.box;
        this.box.scrollTop = scrollHeight - clientHeight;
    }

    render() {
        const style = {
            border : "1px solid black",
            height : "300px",
            width : "300px",
            overflow : "auto",
            position : "relative"
        };

        const innerStyle = {
            width : "100%",
            height: "650px",
            background : "linear-gradient(white, black)"
        }

        return(
            <div
                style = {style}
                ref = {(ref) => {this.box = ref}}>
                    <div style = {innerStyle}></div>
            </div>
        )
    }
}

export default ScrollBox;
```
```
// App.js
import { Component } from "react";
import ScrollBox from "./ScrollBox";

class App extends Component{
  render(){
    return(
      <div>
        <ScrollBox ref = {(ref) => this.scrollBox = ref}/>
        <button onClick = {() => this.scrollBox.scrollToBottom()}>
          맨 밑으로
        </button>
      </div>
    )
  }
}

export default App;
```
scrollTop, scrollHeight, clientHeight : DOM 노드가 가진 값



❗️ onClick = {this.scrollBox.scrollToBottom} 과 같이 작성시 문법상 오류는 없지만 컴포넌트 처음 렌더링시 this.scrollBox는 undefined이므로 해당 코드 값을 읽어오는 과정에서 
오류가 발생한다. 오류를 방지하기 위해 새로운 함수를 정의하고 값을 읽어오는 방식으로 코드를 작성해야 한다.

참고. 리액트를 다루는 기술
