## 성능 최적화

### 리액트 컴포넌트 성능 최적화

1. 필요한 경우에만 리렌더링하기



▶ React.memo : 컴포넌트의 props가 바뀌지 않았다면 리렌더링하지 않도록 설정(함수형 컴포넌트의 리렌더링 성능 최적화)

export 코드에서 컴포넌트 명을 React.memo로 감싸줌으로써 간단하게 사용할 수 있다.

```
...
    
export default React.memo(App);
```

React.memo를 이용해서 props값이 변경되지 않을 경우 렌더링하는 것을 방지할 수 있지만 어떤 state가 변경되었을 때 해당 state를 참조하고 있는 함수나 컴포넌트의 리렌더링을 막아주지는 않는다. 이런 상황을 방지하는 방법은 두가지가 있다.



ⓐ useState의 함수형 업데이트

: state값을 변경할 때 새로운 상태를 매개변수로 넣어주는 대신 상태 업데이트를 어떻게 할지 정의해주는 업데이트 함수를 넣어주는 방법

```
const [number, setNumber] = useState('');

// setNumber(number + 1) 대신 아래처럼 함수 전달

const onIncrease = useCallback(
	() => setNumber(prevNumber => prevNumber + 1),
    [],
);

// prevNumber : 현재 number값
```

useCallback의 두번째 배열에 변경되는 값을 전달해주어야 하지만 위와 같이 함수형 업데이트를 사용할 경우 배열에 값을 주지 않아도 된다. 



(useCallback 함수의 경우 두번째 매개변수인 배열에 주는 값에 따라 해당 값이 변경될 때마다 함수를 실행하는데 배열에 값을 주지 않고 첫번째 매개변수 안에 변화가 일어나는 함수에 작성하게 되면 값이 변경될 때마다 렌더링 되는 게 아니라 해당 함수를 호출할 때만 실행되게 되므로 불필요한 렌더링 방지가 가능하다.)



ⓑ useReducer

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

두번째 매개변수로 'undefined'를 전달하고 세번째 매개변수에 초기상태를 생성해주는 함수(createBulkTodos)를 정의하여 전달해준다. 이럴 경우 컴포넌트가 맨 처음 렌더링될 때만 createBulkTodos 함수를 호출해준다.

useReducer를 사용하면 기존 코드를 많이 수정해야 하지만 대신 상태를 업데이트하는 로직을 컴포넌트 밖에 선언할 수 있다는 장점이 있다.



위 두가지 방법 모두 성능상으로는 비슷하다.



▶ 불변성 유지 : 값을 수정할 때 기존 데이터를 직접 수정하지 않고 새로운 데이터를 생성하여 새로운 값 저장 후 교체해주는 것

컴포넌트에서 상태를 업데이트할 때 불변성을 유지하는 것이 중요하다.

```
const array = [1,2,3,4,5];

const nextArrayBad = array; 	// 똑같은 배열
nextArrayBad[0] = 100;
console.log(array === nextArrayBad)		// true

// ------------------------------------------------

const nextArrayGood = [...array];  // 배열 값 복사(다른 배열)
nextArrayGood[0] = 100;
console.log(array === nextArrayGood)	// false
```

불변성을 유지하지 않으면 객체 내부의 값이 바뀌어도 감지할 수 없다. 그럼 React.memo에서 비교 후 최적화하는 것이 불가능하다.

전개연산자( ... ) 를 사용할 경우 내부값을 완전히 복사하는 것이 아닌 가장 바깥쪽에 있는 값만 복사하는 얕은 복사를 하게 된다. 내부의 값이 객체 또는 배열이라면 내부의 값까지 복사해주어야 하고 불변성을 지키면서 새 값을 할당해야 한다. 이때 immer 라이브러리를 사용하면 간단하게 작업할 수 있다. (나중에 알아보도록 한다.)





2. react-virtualized : 화면에 보이는 부분만 렌더링
```
// TodoList

import React, { useCallback } from "react";
import {List} from "react-virtualized";
import TodoListItem from "./TodoListItem";
import "./TodoList.scss"

const TodoList = ({todos, onRemove, onToggle}) => {
    const rowRenderer = useCallback(
        ({index, key, style}) => {
            const todo = todos[index];
            return (
                <TodoListItem 
                    todo = {todo}
                    key = {key}
                    onRemove = {onRemove}
                    onToggle = {onToggle}
                    style = {style}
                />
            )
        },
        [onRemove, onToggle, todos]
    )
    return (
        <List 
            className = "TodoList"
            width={512}
            height={513}
            rowCount={todos.length}
            rowHeight={57}
            rowRenderer={rowRenderer}
            list={todos}
            style={{outline : "none"}}
        />
    );
};

export default React.memo(TodoList);
```

위 코드에서 rowRenderer는 react-virtualized의 List 컴포넌트에서 각 TodoItem을 렌더링할 때 사용하고 이 함수를 List 컴포넌트의 props로 설정해주어야 한다. 매개변수로 index, key, style을 객체 타입으로 전달받아 사용한다.

▷ List 컴포넌트 사용할 때는 해당 리스트의 전체 크기, 각 항목의 높이, 렌더링할 때 사용하는 함수, 배열을 props로 전달해주고 컴포넌트에서는 전달받은 props를 사용하여 자동으로 최적화를 진행한다.

참고. 리액트를 다루는 기술
