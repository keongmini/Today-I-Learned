## useMemo와 useCallback 차이

useMemo와 useCallback의 이론적인 내용은 이해를 했으나 둘의 차이가 무엇인지 정확히 알고자 추가 학습을 했다.

○ useMemo와 useCallback 모두 '리액트를 다루는 기술'에 나와있는 것으로 보면 렌더링 성능을 최적화하기 위해 사용한다고 한다. useMemo와 useCallback 둘다 크게 보면 굳이 렌더링이 필요하지 않을 때 렌더링을 하지 않고 작업을 수행할 수 있게 도와주는 hooks인 것 같다.

이때 둘의 차이점은 리액트 공식문서에 따르면, useMemo는 메모이제이션된 값을 반환하고 useCallback은 메모이제이션된 콜백을 반환한다고 한다.

 - 메모이제이션 : 동일한 작업을 반복적으로 진행할 때 이전 작업 내용을 메모리에 저장 후 반복적인 작업 수행을 제거해주는 기능



1. useMemo

리액트에서 component가 렌더링되는 조건은 여러가지가 있다. 그 중 하나가 state값이 변경되는 것이다. 하지만 state는 여러개 존재할 수 있고 여러 개의 state 중 변경되는 값이 있고 아닌 값이 있을 수 있는데 변경되지 않는 값까지 다시 렌더링하는 것은 불필요한 작업이다. 이 불필요한 작업을 생략하기 위해 useMemo를 이용해서 수행하고자 하는 함수와 그 함수에 의존하는 값을 전달해서 해당 값이 변경되었을 때만 진행하도록 한다.



useMemo로 전달하는 값은 '생성함수'와 해당함수의 '의존성 값의 배열'이다. (의존성 값의 배열을 빈배열로 전달할 경우 매번 새로운 값을 계산하게 된다.) 

아래 코드처럼 작성하게 되면 [a,b]값이 변경될 때만 생성함수(computeExpensiveValue)가 수행된다.

```const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);```
사용하는 용어가 어렵게 느껴지지만 결국 두번째 파라미터로 전달하는 배열 내에 있는 값이 변경될 경우 첫번째에 전달하는 함수에 해당값을 전달하여 해당 작업을 수행한다는 의미이다.



2. useCallback

메모이제이션된 콜백을 반환한다고 했는데 이때 콜백은 함수를 의미한다. useMemo와 동일하게 useCallback으로 전달해주는 배열 값이 변경되었을 때에만 작업이 진행된다. 
```
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);

```


결론

useMemo와 useCallback 모두 렌더링 성능 최적화를 위해 사용하는 것임은 동일하다. useMemo는 값을 전달하기 때문에 주로 문자열, 숫자 등을 다루는 일반적인 경우에 사용되고 useCallback은 함수를 전달하기 때문에 (좀 더 복잡한 내용이 있는) 함수를 전달할 경우 사용한다. 

'리액트를 다루는 기술' 10장에서는 props로 전달해야 하는 함수를 만들 때 useCallback 사용하는 것에 익숙해지기를 권장하고 있다.

참고.[Hooks API Reference](https://ko.reactjs.org/docs/hooks-reference.html)  
