## component - state

● state : 컴포넌트 내부에서 바뀔 수 있는 값

props : 컴포넌트가 사용되는 과정에서 부모컴포넌트가 설정하는 값, 해당 props를 읽기 전용으로만 사용 가능(props 변경은 부모 컴포넌트에서만 가능)

두가지 state : 클래스형 컴포넌트가 지니고 있는 state / 함수형 컴포넌트에서 useState라는 함수를 통해 사용하는 state



1. 클래스형 컴포넌트의 state
```
import React, { Component } from 'react'

class Counter extends Component{
    constructor(props){
        super(props);
        this.state = {
            number : 0
        };
    }

    render(){
        const{number} = this.state;
        return (
            <div>
                <h1>{number}</h1>
                <button
                onclick = {() => {
                    this.state({number : number + 1});
                }}
                >
                    + 1
                </button>
            </div>
        )
    }
}

export default Counter;
```

state 설정시 constructor 메서드를 사용하여 설정한다.

constructor 컴포넌트의 생성자 메서드

constructor 작성시 super(props)를 반드시 호출해주어야 한다. 

super(props) extends로 상속받고 있는 Component 클래스가 지닌 생성자 함수를 호출해준다.

this.state 초깃값 설정(객체형식)

render함수 내에서 현재 state를 조회할 경우 this.state사용

this.setState( ) state값 변경시 사용 



▷ state 객체 안에 여러 값이 있을 경우

```
import React, { Component } from 'react'

class Counter extends Component{
    constructor(props){
        super(props);
        this.state = {
            number : 0,
            fixedNumber : 0
        };
    }

    render(){
        const{number, fixedNumber} = this.state;
        return (
            <div>
                <h1>{number}</h1>
                <h2>fixedNumber : {fixedNumber}</h2>
                <button
                onClick = {() => {
                    this.setState({number : number + 1});
                }}
                >
                    + 1
                </button>
            </div>
        )
    }
}

export default Counter;
```

▷ 초기값 설정하는 다른 방식
```
import React, { Component } from 'react'

class Counter extends Component{
    state = {
        number :0,
        fixedNumber : 0
    };

    render(){
    	...
    }
```

state값을 업데이트할 경우 비동기적으로 진행된다. this.setState을 여러줄에 걸쳐 진행해도 state값이 바로 바뀌지 않기 때문에 원하는 업데이트 값을 얻을 수 없다. 

➡️ this.setState에 객체 대신 함수를 인자로 넣어주면 이 문제를 해결할 수 있다. 

```
this.setState((prevState, props) => {
	return {
     // 업데이트할 내용
    }
})
```

prevState(임의의 이름)는 기존 상태, props는 현재 지니고 있는 props (업데이트 과정에서 props가 필요하지 않다면 생략 가능)

```
import React, { Component } from 'react'

class Counter extends Component{
    state = {
        number :0,
        fixedNumber : 0
    };

    render(){
        const{number, fixedNumber} = this.state;
        return (
            <div>
                <h1>{number}</h1>
                <h2>fixedNumber : {fixedNumber}</h2>
                <button
                onClick = {() => {
                    this.setState(prevState => {
                        return {
                            number : prevState.number + 1
                        };
                    });
                    
                    // 위와 같은 기능을 수행, 함수에서 바로 객체를 반환한다는 의미
                    
                    this.setState(prevState => ({
                        number : prevState.number + 1
                    }))
            }}
                >
                    + 1
                </button>
            </div>
        )
    }
}

export default Counter;
```

위와 같이 코드 작성시 값이 2씩 증가하는 것을 확인할 수 있다. 



▷ setState값을 업데이트 하고 난 후 특정 작업 수행 : setState의 두번째 매개변수로 콜백함수 등록

```
import React, { Component } from 'react'

class Counter extends Component{
    state = {
        number :0,
        fixedNumber : 0
    };

    render(){
        const{number, fixedNumber} = this.state;
        return (
            <div>
                <h1>{number}</h1>
                <h2>fixedNumber : {fixedNumber}</h2>
                <button
                onClick = {() => {
                    this.setState(
                        {
                            number : number + 1
                        },
                        () => {
                            console.log("setState")
                            console.log(this.state)
                        }
                    )
            }}
                >
                    + 1
                </button>
            </div>
        )
    }
}

export default Counter;
```

2. 함수형 컴포넌트 useState
```
import { useState } from "react"

const Say = () => {
    const [message, setMessage] = useState('');
    const onClickEnter = () => setMessage("in")
    const onClickLeave = () => setMessage("out")

    return(
        <div>
            <button onClick = {onClickEnter}>in</button>
            <button onClick = {onClickLeave}>out</button>
            <h1>{message}</h1>
        </div>
    )
}

export default Say;
```

useState함수에 상태의 초기값을 작성해주어야 한다. 값의 형태는 상관없다. 배열의 첫번째 원소(message)는 현재 상태, 두번째 요소(setMessage)는 상태를 바꾸어 주는 함수이다.(setter함수라 한다.) 





❗️ 컴포넌트 유형과 상관없니 state값은 새터함수로만 변경가능하다.

    배열이나 객체 업데이트를 원할 경우 사본을 만들고 사본 값을 업데이트한 후 사본 전체를 새터함수를 통해 업데이트해주어야 한다. 



props는 부모컴포넌트가 설정하고 state는 컴포넌트 자체적으로 지닌 값으로 컴포넌트 내부에서 값을 변경한다. 

참고. 리액트를 다루는 기술
