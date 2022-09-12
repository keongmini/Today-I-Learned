## app.js 파일 이해하기

react-app을 생성한 폴더 내에 src폴더가 생성되고 그 폴더 내에는 App.js파일이 생성된다. 이 파일에는 초기 코드가 작성되어있는 코드를 이해해보자.

```
// src/App.js
import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
```

import React from 'react';  리액트를 불러와서 사용할 수 있게 해주는 코드, 리액트 생성시 node_modules라는 폴더도 함께 생성되고 이 폴더 안에 react 모듈이 설치되어있음 이를 호출하여 사용하는 코드

▷ 모듈을 호출하는 기능은 브루우저에 없는 기능임, Node.js가 브라우저가 아닌 환경에서 자바스크립트를 사용할 수 있게 해주는 환경이기 때문에 사용가능해짐(import 대신 require이라는 구문 패키지 사용 가능)

위의 기능을 브라우저에서 사용하기 위해 번들러(bundler) 사용

  - 번들러 : 파일을 묶듯이 연결해주는 것, 웹팩, Parcel, browserify 등이 있음, 리액트에서는 주로 웹팩을 사용(편의성과 확장성이 뛰어남), 번들러 도구를 사용시 import(또는 require)로 모듈을 호출하면 불러온 모듈을 하나로 합쳐 하나의 파일 생성해줌



import logo from './logo.svg';
import './App.css'; 웹팩의 로더(loader)라는 기능을 통해 다른 파일 불러와서 사용가능, 로더에는 다양한 종류가 있지만 'create-react-app'시 한번에 작업 완료



function App( ){ ... } App이라는 컴포넌트 생성(함수형 컴포넌트), 컴포넌트 내용이 HTML처럼 보이지만 JSX코드를 사용함

참고. 리액트를 다루는 기술
