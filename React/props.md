## component - props

● props : 컴포넌트 속성을 설정할 때 사용하는 요소, 해당 컴포넌트를 불러와서 사용하는 부모 컴포넌트에서 props 값 설정 가능
```
// MyComponent.js
import React from "react";

const MyComponent = (props) => {
  return <div>new Component {props.name}</div>;
};

export default MyComponent;
```
```
// App.js
import MyComponent from "./MyComponent";

const App = () => {
  return <MyComponent name="React" />;
};

export default App;
```

▷ defaultProps : props 값을 지정해주지 않았을 때 나타나는 기본값 설정(기본값을 설정하지 않으면 아무내용도 추가되지 않은 채로 출력된다, 에러 발생하지 않음)
```
import React from "react";

const MyComponent = (props) => {
  return <div>new Component {props.name}</div>;
};

MyComponent.defaultProps = {
  name: "default name",
};

export default MyComponent;
```

▷ chidren : 컴포넌트 태그 사이의 내용을 보여주는 props 
```
// MyComponent.js
import React from "react";

const MyComponent = (props) => {
  return (
    <div>
      name : {props.name}
      <br />
      children : {props.children}
    </div>
  );
};

MyComponent.defaultProps = {
  name: "default name",
};

export default MyComponent;
```
```
// App.js
import MyComponent from "./MyComponent";

const App = () => {
  return <MyComponent>리액트</MyComponent>;
};

export default App;
```

▷ 비구조화 할당(구조 분해 문법)을 이용하여 props 내부 값 추출
```
// 1
import React from "react";

const MyComponent = (props) => {
    const {name, children} = props
  return (
    <div>
      name : {name}
      <br />
      children : {children}
    </div>
  );
};

MyComponent.defaultProps = {
  name: "default name",
};

export default MyComponent;
```
```
// 2
import React from "react";

const MyComponent = ({name, children}) => {
  return (
    <div>
      name : {name}<br />
      children : {children}
    </div>
  );
};

MyComponent.defaultProps = {
  name: "default name",
};

export default MyComponent;
```

▷ propTypes : 컴포넌트의 필수 props를 지정하거나 props 타입을 지정할 때 사용
```
import React from "react";
import PropTypes from "prop-types"

const MyComponent = ({name, children}) => {
  return (
    <div>
      name : {name}<br />
      children : {children}
    </div>
  );
};

MyComponent.defaultProps = {
  name: "default name",
};

MyComponent.propTypes = {
    name: PropTypes.string
  };

export default MyComponent;
```

위와 같이 propTypes를 사용하여 타입 설정시 해당 props는 설정해준 타입 형태로만 전달해야 한다. 설정해준 타입과 다른 타입으로 작성시 개발자도구에 경고창이 뜨는 것을 확인할 수 있다. 

  - propTypes를 지정하지 않았을 경우(필수적으로 지정해야 하는 경우) 경고 메세지 출력 방법 : isRequired 사용

```
import React from "react";
import PropTypes from "prop-types"

const MyComponent = ({name, number, children}) => {
  return (
    <div>
      name : {name}<br />
      children : {children}<br />
      number : {number}
    </div>
  );
};

MyComponent.defaultProps = {
  name: "default name",
};

MyComponent.propTypes = {
    name: PropTypes.string,
    number : PropTypes.number.isRequired
  };

export default MyComponent;
```

위와 같이 작성시 개발자도구에 warning이 뜨는 것을 확인할 수 있다. number에 값을 주지 않았기 때문이다. 
```
import MyComponent from "./MyComponent";

const App = () => {
  return (
    <MyComponent name = "React" number = {1}>
      리액트
    </MyComponent>
  )
};

export default App;
```

값을 주게 되면 warning이 사라지는 것을 확인할 수 있다. 



✅  클래스형 컴포넌트에서 props 사용하기 https://kkmin-phase.tistory.com/26


참고. 리액트를 다루는 기술
