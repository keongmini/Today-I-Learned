## setState

### setState 추가 이해하기

```
incrementCount() {
  this.setState({count: this.state.count + 1});
}

handleSomething() {
  // `this.state.count`가 0에서 시작한다고 해봅시다.
  this.incrementCount();
  this.incrementCount();
  this.incrementCount();
}
```

위와 같이 setState를 두번 작성해도 number값은 1씩 증가한다.(원하는 값을 얻을 수 없다.)



setState가 비동기적인 이유 : setState를 이벤트 핸들러 내에서 비동기적으로 작동한다. setState를 이벤트 내에서 사용한다면 react는 브라우저 이벤트가 끝날 시점에 state를 일괄적으로 업데이트 시키기 때문에 변경한 값을 바로 반영하지 않는다.(위 코드의 경우 부모, 자식 모두 이벤트애서 setState를 호출해도 자식 컴포넌트를 두번 리렌더링하지 않는다.) 이런 과정 때문에 불필요한 렌더링을 하지 않아서 성능을 향상시킬 수 있다는 장점이 있다.



▷ setState( ) : state 객체의 값을 업데이트하는 역할을 하고 즉각적인 명령이 아닌 요청이다. 



React에서 리렌더링 대신 즉시 this.state값에 업데이트 내용을 반영하지 않는 이유:

1. props와 state 사이의 일관성을 방해할 수 있고 디버깅에 문제가 생길 수 있기 때문

  state가 업데이트한 값을 바로 반영한다고 해도 props는 그러지 못한다. props는 부모 컴포넌트를 업데이트했을 경우에만 확인할 수 있기 때문이다.

2. 현재 작업 중인 새로운 기능 구현이 어려워질 수 있기 때문





➡️ setState에 객체 대신 함수를 인자로 주면 이 문제를 해결할 수 있다. 


```
incrementCount() {
  this.setState((state) => {
    return {count: state.count + 1}
  });
}

handleSomething() {
  // `this.state.count`가 0에서 시작한다고 해봅시다.
  this.incrementCount();
  this.incrementCount();
  this.incrementCount();
}
```

함수의 결과는 state에 얕게 병합된다. setState 두번째 매개변수 props를 줄 수 있는데 이 매개변수는 setState의 실행이 완료되고 리렌더링된 후에 실행될 함수에 대한 콜백이다.(생략가능)


참고. 리액트를 다루는 기술
