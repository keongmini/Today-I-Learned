## Redux-persist

### Redux-persist 사용하여 값 유지하기

**도입배경**  
useSelector로 redux store 값을 가져올 경우, 페이지 새로고침시 값이 사라지는 현상 발생
-> redux 안에서 storage를 이용하여 값을 유지할 수 있도록 해주는 라이브러리 **redux-persist**를 이용하고자 함

1. 설치
```
yarn add redux-persist
```

2. 사용법

* persistConfig
```
import storage from 'redux-persist/lib/storage';                   // local storage
import storageSession from 'redux-persist/lib/storage/session'     // session storage

const persistConfig = {
    key: 'root',          // the key for the persist
    storage,              
    whitelist: [""],      // reducer 중 localstorage에 저장할 값
    blacklist: [""],      // reducer 중 localstorage에 제외할 값
  }
```
* Basic usage involves adding **persistReducer** and **persistStore** to your setup.

```
const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  let store = createStore(persistedReducer)
  let persistor = persistStore(store)
  return { store, persistor }
}

// in redux-toolkit
const store = configureStore({
    reducer: persistedReducer,
});
```

* Wrap your root component with **PersistGate**. This delays the rendering of your app's UI until your persisted state has been retrieved and saved to redux. 
```
import { PersistGate } from 'redux-persist/integration/react'

let persistor = persistStore(store);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootComponent />
      </PersistGate>
    </Provider>
  );
};
```
loading={<Loading />} 또는 null 로 설정 가능 

* storage에 저장한 값 제거
```
persistor.purge();
```




* 참고
[redux-toolkit with redux-persist](https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist)
[Redux Persist를 소개합니다.](https://gist.github.com/qkreltms/6b1b9a38eec677a07bad4557a9b9876d)

