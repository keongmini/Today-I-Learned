## Redux-toolkit

### Redux-toolkit으로 redux 쉽게 구현하기

**Redux 도입배경**  
여러 페이지에서 필요한 데이터를 전역적으로 관리하기 위함, 전역적으로 데이터를 한번만 불러와서 사용으로써 코드의 반복을 줄이고 좀 더 쉬운 코드 관리가 가능해짐
ex) 유저 정보, 장바구니에 담은 상품 등

### [Redux toolkit](http://blog.hwahae.co.kr/all/tech/tech-tech/6946/)

Redux를 사용하기 위해 필요한 여러 패키지를 한번에 제공해줌(따로 설치할 필요x), 리덕스 모듈을 더 간단하게 구현 가능

1. 설치

```
npm install @reduxjs/toolkit

yarn add @reduxjs/toolkit
```

2. Create a Redux Store
```
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {},
})
```
**configureStore** : 기본적으로 미들웨어(redux-thunk) 제공
> redux-thunk : the most commonly used middleware for working with both synchronous and async logic outside of components

3. Provide the Redux Store to React

Once the store is created, we can make it available to our React components by putting a React-Redux <Provider>
```
import App from './App'
import { store } from './app/store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

4. Create a Redux State Slice

requires
  * a string name to identify the slice
  * an initial state value
  * one or more reducer functions to define how the state can be updated

**createSlice**는 immer를 내장하고 있어서 객체를 복사하고 새로운 데이터로 업데이트하는 방식을 사용하지 않아도 데이터의 불변성을 유지할 수 있음

```
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer
```

5. Add Slice Reducers to the Store

need to import the reducer function from the counter slice and add it to our store.

reducer안에 정의함으로써 store에게 slice reducer를 모든 업데이트를 처리할 때 사용할 수 있도록 해줌 
```
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
})
```

6. combineReducers

helper function turns an object whose values are different reducing functions into a single reducing function you can pass to createStore.
```
import { combineReducers } from 'redux'
import todos from './todos'
import counter from './counter'

export default combineReducers({
  todos,
  counter
})
```

7. Simplifying Reducers with createReducer

**createReducer**는 immer를 내장하고 있어서 객체를 복사하고 새로운 데이터로 업데이트하는 방식을 사용하지 않아도 데이터의 불변성을 유지할 수 있음
```
const todosReducer = createReducer([], (builder) => {
  builder
    .addCase('ADD_TODO', (state, action) => {
      state.push(action.payload)
    })
    .addCase('TOGGLE_TODO', (state, action) => {
      const todo = state[action.payload.index]
      todo.completed = !todo.completed
    })
    .addCase('REMOVE_TODO', (state, action) => {
      return state.filter((todo, i) => i !== action.payload.index)
    })
})
```

8. Async Requests with **createAsyncThunk**

API 요청시에 정의해놓은 action type과 콜백함수에 맞게 작업을 처리할 수 있도록 미들웨어를 제공하고 비동기 처리 수행
```
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { userAPI } from './userAPI'

// 1. create the thunk

const fetchUserById = createAsyncThunk(
  'users/fetchByIdStatus',
  async (userId, thunkAPI) => {
    const response = await userAPI.fetchById(userId)
    return response.data
  }
)

// 2. handle actions in your reducers

const usersSlice = createSlice({
  name: 'users',
  initialState: { entities: [], loading: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.entities.push(action.payload)
    })
  },
})
```

> [**extraReducers**(createSlice  파라미터)](https://redux-toolkit.js.org/api/createSlice#extrareducers) : allows createSlice to respond to other action types besides the types it has generated.(Add reducers for additional action types here)
