## axios - error handling 방식

### axios의 error hanlding과 js를 이용한 상태 처리

비밀번호 validate, update api 의 response값을 받아오는 과정에서 오류가 발생해서 비밀번호의 유효성 검사를 제대로 처리하지 못하고 수정도 안되는 상황

1. api에는 문제가 없음

2. api에서 respose 해주는 값을 프론트 코드에서 정확하게 처리하고 있음

3. 프론트에서 axios로 api를 호출하고 response값에 맞게 상태를 반환해주는 함수에서 return하는 값(boolean)이 제대로 반환되고 있지 않음  

→ axios 에러 핸들링 하는 방법에 문제가 있음을 발견!  
axios는 catch문사용하여 에러 핸들링 하는 방식을 권장하고 있다.   
**참고:** [Axios - Handling Errors](https://axios-http.com/docs/handling_errors)  

→ 이를 수정했음에도 값이 제대로 return 되지 않음: 에러가 발생하지 않으면 response의 상태에 맞게 결론적으로 함수에서 boolean 타입으로 값을 반환해주어야 하는데 이 값이 return 되지 않음

**최종적으로 해결한 방법**   
api에서 에러가 발생할 경우 이는 axios의 에러핸들링 방식을 이용하여 catch문으로 처리
api에서 에러가 발생하지 않은 경우, response값에 따른 에러핸들링은 js 조건문으로 처리 (then 사용x)

이때! 주의할 사항: catch로 axios에서 반환하는 에러를 처리해준 후 해당 함수가 끝나는 게 아님! -> catch로 에러 처리 후 ```return false```와 같이 코드를 추가하여 함수를 끝내주어야 에러가 발생할 경우 그 뒤의 코드를 실행하지 않는다. 