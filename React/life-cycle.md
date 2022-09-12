## 라이프 사이클

### 라이프 사이클 이해하고 사용법 익히기

● 컴포넌트의 라이프사이클(수명 주기) : 페이지에서 렌더링되기 전부터 페이지에서 사라질 때까지

    1. 마운트 : DOM이 생성되고 웹 브라우저 상에 나타나는 것

        ---  호출하는 메서드 순서  ---

          constructor 컴포넌트를 새로 만들때마다 호출되는 클래스 생성자 메서드

          getDerivedStateFromProps props에 있는 값을 state에 넣을 때 사용하는 메서드

          render 컴포넌트 내용 렌더링하는 메서드

          componentDidMount 컴포넌트가 웹 브라우저상에 나타난 후 호출하는 메서드



    2. 업데이트 : props/state가 바뀔때 , 부모 컴포넌트가 렌더링될 때, this.forceUpdate로 강제로 렌더할 때 

        ---  호출하는 메서드 순서  ---

          getDerivedStateFromProps props의 변화로 state값에도 변화를 주고 싶을 때 사용

          shouldComponentUpdate 컴포넌트의 리렌더링 여부 결정해주는 메서드, true(다음 라이프사이클로 이동) / false(작업 중지 - 렌더링 X)

          render 컴포넌트 리렌더링

          getSnapshotBeforeUpdate 컴포넌트 변화를 DOM에 반영하기 바로 전에 호출하는 메서드

          componentDidUpdate 컴포넌트의 업데이트 작업이 끝난 후 호출하는 메서드



    3. 언마운트 : 컴포넌트를 DOM에서 제거하는 것(마운트의 반대과정) 

          componentWillUnmount 컴포넌트가 웹 브라우저상에서 사라지기 전에 호출하는 메서드



● 라이프사이클 메서드 : 클래스형 컴포넌트에서만 사용 가능(함수형 컴포넌트는 hooks 사용)

    Will 접두사 메서드 : 어떤 작업을 작동하기 전에 실행되는 메서드

    Did 접두사 메서드 : 어떤 작업을 작동한 후 실행되는 메서드



1. render( ) 함수 : 컴포넌트 내용 정의, 라이플사이클 중 유일한 필수 메서드, 리액트 요소 반환

```render(){ ... }```
❗️ render 내에 이벤트 설정이 아닌 곳에서 setState 사용, 브라우저 DOM에 접근 안됨(해당 작업은 componentDidMount에서 처리)



2. constructor 메서드 : 컴포넌트의 생성자 메서드, 초기 state 설정 가능

```constructor(props){ ... }```
3. getDerivedStateFromProps 메서드 : props로 받아온 값을 state에 동기화할 때 사용, 마운트 & 업데이트시 사용



4. componentDidMount 메서드 : 컴포넌트 생성하고 첫 렌더링한 후 실행, 라이브러리, 프레임워크 호출, 이벤트 등록 등의 작업 처리

```componentDidMount(){ ... }```
5. shouldComponentUpdate 메서드 : props 또는 state 값을 변경했을 때 리렌더링 여부 결정하는 메서드, 기본값은 true

```shouldComponentUpdate(nextProps, nextState){ ... }```
6. getSnapshotBeforeUpdate 메서드 : render의 내용이 브라우저에 실제로 반영되기 전에 호출, 해당 메서드에서 반환하는 값은 componentDidUpdate에서 snapshot값으로 전달받을 수 있음, 주로 업데이트 하기 직전의 값을 참고할 때 사용



7.  componentDidUpdate 메서드 : 리렌더링 후 실행

```componentDidUpdate(prevProps, prevState, snapshot){ ... }```
8. componentWillUnmount 메서드 : 컴포넌트를 DOM에서 제거할 때 실행

```componentWillUnmount(){ ... }```
9. componentDidCatch 메서드 : 컴포넌트 렌더링 도중 에러가 발생했을 때 오류 내용을 반환하는 메서드
```
componentDidCatch(error, info){
	this.setState({
    	error : true
    });
}
```
error : 발생한 에러의 종류 / info : 에러가 발생한 코드의 위치 

참고. 리액트를 다루는 기술
