## express-validator - validationResult

### validationResult 사용해서 유효성 검사하기

**Trouble:** express-validator의 validationResult에서 error가 제대로 잡히지 않는 것을 확인함  

의도한 코드: create하는 api에서 req에 값이 없을 경우 error 반환하도록  

하지만 req body나 path에 아무 값이 없어도 error가 처리되지 않음을 확인  

```jsx
const errors = validationResult(req)
if (!errors.isEmpty()) {
    const error = new Error('Validation Failed, entered data is incorrect.')
    error.statusCode = 422
    throw error;
}
```

→ 기존 코드에는 위 코드만 선언되어있었음, 하지만 위 코드처럼 validation을 검증하려면 어떤 조건으로 검증할지 선언해줬어야함  
따라서 router에 아래와 같이 어떤 부분을 확인하고 검증할 것인지 선언하는 코드 추가해줌  

```jsx
router.post('/',[
    **body('id').exists().isEmail(),**
    validationCheck
], createUser);
```

어떤 내용을 create하는 api에서 validation을 체크하고 오류를 반환하는 방식은 동일하고 api 기능을 하기 전에 미리 처리되어야 하기 때문에 middleware로 구현(validationCheck)  

**참고:** [[express] 유효성 검사를 위한 express-validator 사용하기](https://charming-kyu.tistory.com/14)