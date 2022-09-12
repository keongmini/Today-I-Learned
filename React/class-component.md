## 클래스 컴포넌트

컴포넌트 선언하는 두가지 방식 : 함수형 컴포넌트 / 클래스형 컴포넌트
```
// 함수형 컴포넌트
import React from "react";
function App() {
  const name = "React";
  return <div className="react">{name}</div>
}

// 클래스형 컴포넌트
import React, {Component} from "react";
class App extends Component{
  render(){
    const name = "react";
    return <div className = "react">{name}</div>
  }
}
```
클래스 컴포넌트는 render함수가 꼭 있어야 하고 그 안에서 JSX 반환한다.



▶ 클래스형 컴포넌트에서 props 사용하기

   render함수에서 this.props을 사용하여 전달 받은 값 호출

```
import React,{Component} from "react";
import PropTypes from "prop-types"

class MyComponent extends Component{
    render(){
        const {name, number, children} = this.props;        // 비구조화 할당
        return (
            <div>
                name : {name}<br />
                children : {children}<br />
                number : {number}<br />
            </div>
        )
    }
}

MyComponent.defaultProps = {
  name: "default name",
};

MyComponent.propTypes = {
    name: PropTypes.string,
    number : PropTypes.number.isRequired
  };

export default MyComponent;
```

참고. 리액트를 다루는 기술
