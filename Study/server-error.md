## Server Error 422 vs 400

### 422 error와 400 error의 차이

api 설계하다보니까 request에 아무런 값을 담지 않은 채 api를 호출할 경우 어떤 에러를 반환해줘야할지 명시해주어야 했다.  

이 경우 사용할 수 있는 server error코드 두가지를 찾았는데 422와 400이다.

* 422
  Unprocessable Entity(처리할 수 없는 개체): 요청을 잘 받았으나 문법 오류로 인하여 무언가를 응답할 수 없을때 사용되는 코드

* 400
  Bad Request(잘못된 요청): 요청 자체가 잘못되었을 때 사용하는 코드

req에 값이 없을 경우 요청은 됐지만 문법에 오류가 있다고 봐야할지 요청 자체가 잘못된 것인지 고민이 되어 관련 내용을 더 찾아보았다.  

[HTTP status codes when errors in request body](https://stackoverflow.com/questions/49648442/http-status-codes-when-errors-in-the-request-body)

[HTTP Status Codes For Invalid Data: 400 vs. 422](https://www.bennadel.com/blog/2434-http-status-codes-for-invalid-data-400-vs-422.htm)

위 두가지 자료를 참고하여 422 에러를 반환하기로 결정!  
결국, 요청이 들어온 것에는 문제가 없지만 request에 담긴 값에 오류가 있는 것이기 때문에 422가 더 적절하다고 판단했다.  

