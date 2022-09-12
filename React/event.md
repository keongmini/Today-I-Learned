## 이벤트

### 이벤트 구현 방법

● Event : 사용자가 웹 브라우저에서 DOM 요소들과 상호작용하는 것(버튼 클릭, 버튼에 마우스 커서 올리기 ...)



Event 사용법은 HTML과 유사하지만 주의할 사항이 있다.

1. 이벤트명은 카멜표기법으로 작성한다.

   onclick -> onClick, onkeyup -> onKeyUp

2. 이벤트값으로 함수 형태의 값을 전달한다.

3. DOM요소에만 이벤트를 설정할 수 있다.

   직접 만든 컴포넌트에는 이벤트 요소를 적용할 수 없다. button, div,... 등만 가능)



▷ onChange 이벤트 핸들링
```
import { Component } from "react";

class EventPractice extends Component{
    render() {
        return (
            <div>
                <h1>이벤트 연습</h1>
                <input 
                    type = "text"
                    name = "message"
                    placeholder = "입력하세요."
                    onChange = {
                        (e) => {
                            console.log(e);
                            console.log(e.target.value);
                            // 인풋 값을 콘솔에서 확인
                        }
                    }
                />
            </div>
        );
    }
}

export default EventPractice;
```

console.log 값으로 전달한 e객체는 SyntheticEvent로 웹 브라우저의 네이티브 이벤트(기본 이벤트)를 감싸는 객체이다. 

SyntheticEvent : 이벤트 핸들러는 모든 브라우저에서 이벤트를 동일하게 처리하기 위한 이벤트 래퍼, 네이티브 이벤트와 달리 이벤트가 끝나고 나면 이벤트가 초기화되므로 정보를 참조할 수 없다. 



  - state에 input값 저장

```
import { Component } from "react";


class EventPractice extends Component{

    state = {
        message : ''
    }

    render() {
        return (
            <div>
                <h1>이벤트 연습</h1>
                <input 
                    type = "text"
                    name = "message"
                    placeholder = "입력하세요."
                    value = {this.state.message}
                    onChange = {
                        (e) => {
                            this.setState({
                                message : e.target.value
                            })
                            console.log(this.state)
                        }
                    }
                />
            </div>
        );
    }
}

export default EventPractice;
```

  - state 값 입력 후 공백 처리

```
import { Component } from "react";

class EventPractice extends Component{

    state = {
        message : ''
    }

    render() {
        return (
            <div>
                <h1>이벤트 연습</h1>
                <input 
                    type = "text"
                    name = "message"
                    placeholder = "입력하세요."
                    value = {this.state.message}
                    onChange = {
                        (e) => {
                            this.setState({
                                message : e.target.value
                            })
                        }
                    }
                />
                <button onClick = {
                    () => {
                        alert(this.state.message)
                        this.setState({
                            message : ''
                        });
                    }
                }>확인</button>
            </div>
        );
    }
}

export default EventPractice;
```

▷ 임의의 메서드 설정

이벤트 처리 시 함수를 전달하는 대신 함수를 미리 정의한 후 정의된 변수명으로 전달할 수 있다. 성능적으로는 차이가 없지만 가독성이 좋아진다.

```
import { Component } from "react";


class EventPractice extends Component{

    state = {
        message : ''
    }

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(e){
        this.setState({
            message : e.target.value
        });
    }

    handleClick(e){
        alert(this.state.message)
        this.setState({
            message : ''
        });
    }

    render() {
        return (
            <div>
                <h1>이벤트 연습</h1>
                <input 
                    type = "text"
                    name = "message"
                    placeholder = "입력하세요."
                    value = {this.state.message}
                    onChange = {this.handleChange}
                />
                <button onClick = {this.handleClick}>확인</button>
            </div>
        );
    }
}

export default EventPractice;
```

함수 호출시 this는 호출부에 따라 결정되기 때문에 클래스의 임의 메서드가 특정 html 요소의 이벤트로 등록되는 과정에서 메서드와 this의 관계가 끊어진다. 이 때문에 임의 메서드가 이벤트로 등록되어도 this를 컴포넌트 자신으로 제대로 가리키기 위해서는 메서드를 this와 바인딩(binding)해주어야 한다. 바인딩 해주지 않으면 this는 undefined를 가리킨다.



  - 위 코드처럼 메서드 바인딩은 생성자 메서드에서 하는 것이 정석이다. 하지만 새 메서드 생성할 경우 매번 생성자를 변경해야 하기 때문에 불편하므로 바벨의 transform-class-properties 문법을 사용하여 화살표 함수형태로 메서드를 정의해서 사용할 수 있다.

바벨 : a toolchain that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in current and older browsers or environments(자바스크립트 컴파일러)

```
import { Component } from "react";


class EventPractice extends Component{

    state = {
        message : ''
    }

    handleChange = (e) => {
        this.setState({
            message : e.target.value
        });
    }

    handleClick = (e) => {
        alert(this.state.message)
        this.setState({
            message : ''
        });
    }

    render() {
        return (
            <div>
                <h1>이벤트 연습</h1>
                <input 
                    type = "text"
                    name = "message"
                    placeholder = "입력하세요."
                    value = {this.state.message}
                    onChange = {this.handleChange}
                />
                <button onClick = {this.handleClick}>확인</button>
            </div>
        );
    }
}

export default EventPractice;
```

▷ input 여러개 다루기

메서드를 여러개 만들어서 처리할 수 있지만 대신 event 객체를 활용할 수 있다. 

```
import { Component } from "react";


class EventPractice extends Component{

    state = {
        username : '',
        message : ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    handleClick = () => {
        alert(this.state.username + " : "+this.state.message);
        this.setState({
            username : '',
            message : ''
        });
    }

    render() {
        return (
            <div>
                <h1>이벤트 연습</h1>
                <input 
                    type = "text"
                    name = "username"
                    placeholder = "username"
                    value = {this.state.username}
                    onChange = {this.handleChange}
                />
                <input 
                    type = "text"
                    name = "message"
                    placeholder = "message"
                    value = {this.state.message}
                    onChange = {this.handleChange}
                />
                <button onClick = {this.handleClick}>확인</button>
            </div>
        );
    }
}

export default EventPractice;
```

e.target.name 인풋의 name

handleChange에서 [ ]으로 감싸준 값이 key값으로 사용된다.



▷ onKeyPress : 키를 눌렀을 때 발생하는 이벤트 

```
import { Component } from "react";


class EventPractice extends Component{

    state = {
        username : '',
        message : ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    handleClick = () => {
        alert(this.state.username + " : "+this.state.message);
        this.setState({
            username : '',
            message : ''
        });
    }

    handleKeyPress = (e) => {
        if(e.key === "Enter"){
            this.handleClick();
        }
    }

    render() {
        return (
            <div>
                <h1>이벤트 연습</h1>
                <input 
                    type = "text"
                    name = "username"
                    placeholder = "username"
                    value = {this.state.username}
                    onChange = {this.handleChange}
                />
                <input 
                    type = "text"
                    name = "message"
                    placeholder = "message"
                    value = {this.state.message}
                    onChange = {this.handleChange}
                    onKeyPress = {this.handleKeyPress}
                />
                <button onClick = {this.handleClick}>확인</button>
            </div>
        );
    }
}

export default EventPractice;
```

message 인풋값 작성 후 [enter]를 누르게 되면 handleClick 함수가 실행된다.









▶ 위 과정을 함수형 컴포넌트로 작성

```
import { Component, useState } from "react";


const EventPractice = () => {
    const [form, setForm] = useState({
        username : "",
        message : ""
    })
    const {username, message} = form;
    const onChange = e => {
        const nextForm = {
            ...form,
            [e.target.name] : e.target.value
        };
        setForm(nextForm);
    }
    const onClick = () => {
        alert(username + ' : ' + message)
        setForm({
            username : '',
            message : ''
        })
    }
    const onKeyPress = e => {
        if (e.key === "Enter"){
            onClick();
        }
    };
    return (
        <div>
            <h1>이벤트 연습</h1>
            <input 
                type = "text"
                name = "username"
                placeholder = "username"
                value = {username}
                onChange = {onChange}
            />
            <input 
                type = "text"
                name = "message"
                placeholder = "message"
                value = {message}
                onChange = {onChange}
                onKeyPress = {onKeyPress}
            />
            <button onClick = {onClick}>확인</button>
        </div>
    )
}

export default EventPractice;
```

참고. 리액트를 다루는 기술
