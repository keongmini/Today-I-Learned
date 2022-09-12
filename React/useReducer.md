## useReducer

### 리액트를 다루는 기술 8.3 useReducer / 11.5.2 useReducer하기

8장에서 다룬 useReducer 내용은 아래와 같다.

● useReducer : useState보다 더 다양한 컴포넌트 상황에 따라 다양한 상태를 다른 값으로 업데이트해주고 싶을 때 사용하는 hook

▷ 리듀서 : 현재상태(state)와 업데이트를 위해 필요한 정보를 담은 action을 전달받아 새로운 상태를 반환해주는 함수

(리듀서는 redux를 배우면서 더 자세히 살펴볼 예정)

▷ reducer 함수에서는 불변성 유지를 해야한다.

▷ action 값은 주로 아래와 같은 형태로 사용한다. redux에서 액션이 어떤 값인지 알려주는 type필드가 꼭 포함되어야 하지만 현재 사용하는 useReducer에서는 type이 필수는 아니다. 객체가 아니라 다른 데이터 타입이어도 괜찮다.

```
{
	type : "INCREMENT"
}
```

```
import { useReducer } from "react";

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

useReducer의 첫번째 매개변수 값으로 리듀서 함수를, 두번째 매개변수 값으로 리듀서의 초기값을 전달해준다. useReducer 사용할 때 받아오는 값 중 state는 현재 상태이고 dispatch는 액션을 발생시키는 함수이다. dispatch안에 액션값을 전달해주면 리듀서 함수가 호출되면서 해당하는 값을 반환해준다. 



useReducer를 사용하면 컴포넌트 업데이트 로직을 컴포넌트 밖에 선언할 수 있다는 장점이 있다.





11장에서 useReducer를 사용한 방법은 아래와 같다.



useState 대신 useReducer를 사용했기 때문에 setState대신 dispatch를 이용해서 action값을 전달해준다.

```
import React, { useCallback, useReducer, useRef, useState } from "react";
import TodoTemplate from "./components/TodoTemplate";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";

function createBulkTodos(){
  const array = [];
  for(let i =1 ; i <= 2500; i++){
    array.push({
      id : i,
      text : `할일 ${i}`,
      checked : false
    })
  }
  return array;
}

function todoReducer(todos, action){
  switch (action.type){
    case "INSERT":
      return todos.concat(action.todo);
    
    case "REMOVE":
      return todos.filter(todo => todo.id !== action.id);

    case "TOGGLE":
      return todos.map(todo => 
        todo.id === action.id ? {...todo, checked: !todo.checked} : todo);
    
    default:
      return todos;
  }
}

const App = () => {
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);

  const nextId = useRef(2501);

  const onInsert = useCallback(
    text => {
      const todo = {
        id : nextId.current,
        text,
        checked : false,
      };
      dispatch({type : "INSERT", todo})
      nextId.current += 1
    },
    [],
  )

  const onRemove = useCallback(
    id => {
      dispatch({type : "REMOVE", id})
    },
    []
  )

  const onToggle = useCallback(
    id => {
      dispatch({type : "TOGGLE", id})
    },
    [],
  )

  return (
    <TodoTemplate>
      <TodoInsert onInsert = {onInsert}/>
      <TodoList todos = {todos} onRemove = {onRemove} onToggle = {onToggle}/>
    </TodoTemplate>
  );
};

export default App;
```

8장에서 배웠던 것처럼 useReducer의 두번째 매개변수 값은 초기값을 전달해주어야 하지만 해당 코드에서는 두번째 매개변수로 'undefined'를 전달하고 세번째 매개변수에 초기상태를 생성해주는 함수(createBulkTodos)를 정의하여 전달해준다. 이럴 경우 컴포넌트가 맨 처음 렌더링될 때만 createBulkTodos 함수를 호출해준다.





useReducer를 사용하는 방법에 추가 학습을 하고자 공식 문서를 찾아보았다.



● useReducer : useState의 대체함수, 다수의 하윗값을 포함하는 복잡한 정적 로직을 만드는 경우나 다음 state가 이전 state에 의존적인 경우에 useReducer를 사용
```
const [state, dispatch] = useReducer(reducer, initialArg, init);
```


**[useReducer함수의 state를 초기화 하는 방법 두가지]**

1. 초기 state를 두번째 인자로 전달

```
const [state, dispatch] = useReducer(
    reducer,
    {count: initialCount}
  );
```

Redux에서는 초기값을 'state = initialState'와 같이 나타낸다. 하지만 Reducer에서는 해당 방법을 사용하지 않는다. 만약 초기값을 나타내는 것이 정말 필요하



2. 초기 state를 지연해서 생성

init 함수를 세번째 인자로 전달하고 초기 state는 init(initialArg)에 설정 -> reducer 외부에서 초기 state를 계산하는 로직 추출 가능, 이후에 어떤 행동에 대해 state를 재설정할 때 유용하게 사용 가능

```
function init(initialCount) {
  return {count: initialCount};
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    case 'reset':
      return init(action.payload);
    default:
      throw new Error();
  }
}

function Counter({initialCount}) {
  const [state, dispatch] = useReducer(reducer, initialCount, init);
  return (
    <>
      Count: {state.count}
      <button
        onClick={() => dispatch({type: 'reset', payload: initialCount})}>
        Reset
      </button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

기본적으로 useReducer를 사용하는 방법은 위와 같다.

- - -

Q. 11장에서 useReducer를 사용하는 방법이 이해가 되지 않았다. (책에 설명이 부족하게 느껴짐)

A. 11장에서 useReducer를 사용한 방법은 위 방법 중 두번째 방법으로 사용한 것 같다. 
두번째 방법 예시에서는 useReducer의 세번째 매개변수 값으로 init함수를 전달해줬는데 이때 init함수는 어떤 값을 받아서 실행되는 함수이다. 
하지만 11장에서 사용한 코드에서 세번째 매개변수값으로 전달해준 createBulkTodos함수는 어떤 값을 받아야 하는 함수가 아니다. 
따라서 useReducer의 두번째 매개변수 값으로 undefined를 전달해주었고 컴포넌트가 처음 렌더링될 때 createBulkTodos함수가 실행되는 것으로 생각해볼 수 있다.

참고.  
[React - useReducer](https://ko.reactjs.org/docs/hooks-reference.html#usereducer)  
참고. 리액트를 다루는 기술
