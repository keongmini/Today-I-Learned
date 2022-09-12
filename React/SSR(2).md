## SSR(2)

### 데이터 로딩

● 데이터 로딩 : API 요청

    자동으로 리렌더링 되지 않음(renderToString함수를 이용하여 한번 더 호출), componentDidMount 같은 라이프사이클 API 사용X

  → 해결 : redux-thunk, redux-saga 미들웨어 사용

참고. 리액트를 다루는 기술
