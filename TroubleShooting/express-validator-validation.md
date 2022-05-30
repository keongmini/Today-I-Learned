## express-validator - validationResult

### 유효성 검사 케이스별로 나눠서 하기

express-validator를 사용하여 req값들의 유효성 검사를 진행하는데 하나의 값에 대해 여러 케이스를 나눠서 구현하고자 함  

**Trouble:**  
배송지 핸드폰번호의 필드 값이 배송이 없는 경우 null로 넘어감 / 배송이 있는 경우 핸드폰번호로 넘어감
be에서 express-validator의 isMobilePhone()을 이용하여 핸드폰 번호에 대한 유효성 검사를 하던 중 -> 값이 null로 넘어오면 오류 발생  
fe와 be 이중으로 핸드폰번호에 대한 유효성 검사를 진행하던 상황이라 be에서의 유효성 검사를 제거하려고 했으나 be에서도 유효성검사를 하는 것이 맞다고 판단하여 해당 문제를 다른 방법으로 해결하고자 함  

기존 코드  
```
body('contact').exists().isMobilePhone().bail()
```

수정 1. bail()은 하나의 값에 대해 여러가지 유효성 검사를 진행할 때 앞에 있는 검사를 통과하지 못하면 그 다음 검사를 진행하지 않도록 하는 함수  
여러가지 값을 각각 검사할 때 어떤 값에서 통과하지 못하면 다음 값에 대한 검사를 진행하지 않는 것으로 이해하여 잘못 사용함 -> 제거

<img src="https://user-images.githubusercontent.com/103486036/170899870-6e0ac394-4157-45e4-8ee6-bc5d5a72a5ed.png" />

수정 2. exists()는 값이 undefined인지 아닌지 확인해주는 함수인데 핸드폰번호가 아니면 기본값이 null이기 때문에 사용의 의미가 없다고 판단하여 제거

<img src="https://user-images.githubusercontent.com/103486036/170900763-bf0e7510-fe2e-42f7-b8e2-2d537e113617.png" />

수정 3. if()를 사용하여 값이 유효할 때만(null이 아닐때만) 핸드폰번호 validation 검사를 하고자 함

<img src="https://user-images.githubusercontent.com/103486036/170900948-894ae1a4-6f5c-440e-841f-8d68cf013e24.png" />

수정 코드  
```
body('contact').if((value) => value).isMobilePhone(),
```

코드를 수정한 후 핸드폰 번호가 있는 경우 / 없는 경우 나눠서 검사를 진행하고 정상 작동하는 것을 확인함
if()함수의 example 코드를 활용하면 비밀번호 수정시 이전 비밀번호와 동일한 비밀번호로 수정할 수 없도록 처리하는 로직도 쉽게 구현 가능할듯!

**참고:** [[express-validator] Validation Chain API](https://express-validator.github.io/docs/validation-chain-api.html)
