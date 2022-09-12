## Hooks

## Hooks 종류와 사용법

● Hooks : 함수형 컴포넌트에서도 상태관리를 위한 useState, 렌더링 직후 작업을 설정하는 useEffect 등의 기능을 제공하여 기존에 클래스형 컴포넌트에서만 이용 가능하던 작업을 할 수 있게 해주는 기능



1. useState : 상태관리를 위한 기능

useState를 사용하기 위해서는 아래와 같이 import해와야 사용가능하다.

```import { useState } from "react";```

useState함수의 매개변수로는 초기값을 넣어준다. 선언한 배열에서 첫번째 원소는 상태 값, 두번째 원소는 상태를 변경할 때 사용하는 함수이다. 
두번째 원소 즉, 상태를 변경하는 함수에 변경하고자 하는 값을 매개변수로 입력하게 되면 해당 매개변수로 값이 변경된 후 리렌더링된다. 

```
const Counter = () => {
    const [value, setValue] = useState(0);

    return(
        <div>
            <p>
                count : <b>{value}</b>
            </p>
            <button onClick = {() => setValue(value + 1)}>+1</button>
            <button onClick = {() => setValue(value - 1)}>-1</button>
        </div>

    )
}

export default Counter;
```

2. useEffect : 컴포넌트가 렌더링될 때마다 특정 작업을 수행하도록 하는 기능

클래스형 컴포넌트의 componentDidMount + componentDidUpdate 인 형태

useEffect도 동일하게 import해와야 사용가능하다.

```import { useEffect, useState } from "react"```

```
const Info = () => {
    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");
    
    useEffect(() => {
        console.log("렌더링 완료");
        console.log({
            name,
            nickname
        });
    });


    const onChangeName = e => {
        setName(e.target.value);
    };

    const onChangeNickname = e => {
        setNickname(e.target.value);
    };

    return (
        <div>
            <div>
                <input value = {name} onChange = {onChangeName}></input>
                <input value = {nickname} onChange = {onChangeNickname}></input>
            </div>
            <div>
                <div><b>이름 : </b> {name}</div>
                <div><b>닉네임 : </b> {nickname}</div>
            </div>
        </div>
    )
}

export default Info;
```

위 코드는 name, nickname의 input값을 변경할 때마다 리렌더링되기 때문에 useEffect가 실행된다. input창에 값을 입력할 때마다 console 창에 '렌더링 완료' 가 출력됨을 알 수 있다. 



▶ 마운트될 때 실행 : useEffect값으로 전달한 함수를 컴포넌트가 화면에 처음 렌더링될 때만 실행(업데이트시에는 실행X)

useEffect의 두번째 매개변수 값으로 빈배열을 전달해주면 된다.

```
useEffect(() => {
	console.log("마운트 완료");
}, []);
```

▶ 특정값 업데이트시에만 실행

```
// 클래스형 컴포넌트에서 실행하는 방법
componentDidUpdate(prevProps, prevState) {
	if(prevProps.value !== this.props.value) {
    	doSomething();
    }
}
```
클래스형 컴포넌트에서 해당 기능 수행을 원할 경우 위 코드와 같이 사용하면 된다. 이를 함수형 컴포넌트에서 useEffect로 수행하는 방법은 아래와 같다.

```
useEffect(() => {
	console.log(name);
}, [name]);
```

위 코드는 name에 전달해주는 값이 변경될 때마다 useEffect가 실행되는 코드이다. 두번째 파라미터인 배열 안에는 useState를 통해 관리하는 상태, props로 전달받은 값 모두 입력 가능하다.



▶ 컴포넌트가 언마운트, 업데이트 되기 전에 특정작업을 실행 : 뒷정리(cleanup) 함수 사용

```
// App.js
import { useState } from "react";
import Info from "./info";

const App = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <button onClick = {() => {
        setVisible(!visible)
      }}>{visible ? "숨기기" : "보이기"}</button>
      <hr />
      {visible && <Info />}
    </>
  )
}

export default App;
```

- 특정값(name)이 변경될 경우, 언마운트될 경우 useEffect 실행

```
// info.js
import { useEffect, useState } from "react"

const Info = () => {
    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");
    
    useEffect(() => {
        console.log("effect")
        console.log(name);
        return () => {
            console.log("clean up")
            console.log(name)
        }
    }, [name]);


    const onChangeName = e => {
        setName(e.target.value);
    };

    const onChangeNickname = e => {
        setNickname(e.target.value);
    };

    return (
        <div>
            <div>
                <input value = {name} onChange = {onChangeName}></input>
                <input value = {nickname} onChange = {onChangeNickname}></input>
            </div>
            <div>
                <div><b>이름 : </b> {name}</div>
                <div><b>닉네임 : </b> {nickname}</div>
            </div>
        </div>
    )
}


export default Info;
```

- 언마운트될 경우에만 useEffect 실행

```
import { useEffect, useState } from "react"

const Info = () => {
    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");
    
    useEffect(() => {
        console.log("effect")
        return () => {
            console.log("clean up")
        }
    }, []);


    const onChangeName = e => {
        setName(e.target.value);
    };

    const onChangeNickname = e => {
        setNickname(e.target.value);
    };

    return (
        ...
    )
}


export default Info;
```


➡️ useEffect는 기본적으로 렌더링된 후 실행되는 코드이고 두번째 매개변수인 배열에 어떤 값을 주는지에 따라 수행하는 기능이 달라진다. 



3. useReducer : useState 보다 더 다양한 컴포넌트 상황에 따라 업데이트하고 싶을 때 사용하는 기능



○ reducer : 현재 상태와 업데이트를 위해 필요한 정보를 담은 액션값을 전달받아 새로운 상태를 반환하는 함수(불변성 유지)

```
function reducer(state, action) {
	return { ... };	 // 불변성 유지하며 업데이트한 새로운 상태 반환
}
```

액션의 형태는 다음과 같다. useReducer에서는 action이 type을 반드시 가져야 하는 것은 아니고, 객체가 아닌 다른 타입으로도 작성 가능하다.

```
{
	type : "...",
    ...
}
```

useReducer를 사용하기 위해 아래와 같은 코드를 사용하면 된다.

```import { useReducer } from "react";```

useReducer의 첫번째 매개변수로 reducer 함수를 전달하고 두번째 함수로 해당 리듀서의 기본값을 전달한다. 배열 안에 state는 현재 가리키고 있는 상태이고 dispatch는 action을 발생시키는 함수이다.

```
function reducer(state, action){
    // action.type 값에 따라 다른 작업 수행
    switch(action.type){
        case "INCREMENT":
            return {value : state.value + 1};
        case "DECREMENT":
            return {value : state.value - 1};
        // 해당하는 조건이 없을 경우 상태 반환
        default:
            return state;
    }

}

const Counter = () => {
    const [state, dispatch] = useReducer(reducer, {value : 0});

    return(
        <div>
            <p>
                count : <b>{state.value}</b>
            </p>
            <button onClick = {() => dispatch({type : "INCREMENT"})}>+1</button>
            <button onClick = {() => dispatch({type : "DECREMENT"})}>-1</button>
        </div>

    )
}

export default Counter;
```

4. useMemo : 컴포넌트 내부에서 발생하는 연산 최적화, 렌더링시에 특정값이 바뀌었을 때만 연산 실행, 특정 값이 변경되지 않으면 이전 결과를 다시 사용

참고. 리액트를 다루는 기술
