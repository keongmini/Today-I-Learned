## apidoc

### apidoc 사용해서 api 문서화하기

* apidoc 사용하는 이유  
node.js 파일 안에서 쉽게 api를 문서화 할 수 있음, swagger에 비해 가볍고 사용이 쉬움  

1. apidoc 설치  
```
npm install apidoc -g
```

2. apidoc.json 생성  
가장 최상위 폴더에 apidoc.json 파일 생성 후 아래와 같은 config 정의  
이때 version이 1.0.0 이하일 경우 무한로딩이 걸리므로 주의 필요! 
```
{
  "name": "example",
  "version": "0.1.0",
  "description": "apiDoc basic example",
  "title": "Custom apiDoc browser title",
  "url" : "https://api.github.com/v1"
}
```

3. api 문서화  
정의되어있는 api 위에 정해진 형식에 맞는 내용 추가  
[example.js](https://apidocjs.com/#param-api-define)
```
/**
 * @api {get} /user/:id Request User information
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "firstname": "John",
 *       "lastname": "Doe"
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */
```

더 많은 옵션 - 공식문서 참고

4. apidoc 적용
```
apidoc -i [문서화 내용이 작성된 폴더] -o [문서 생성 경로]
```
example) 
```
apidoc -i controllers/ -o apidoc/
```

  * 문서 생성 경로에 존재하지 않는 폴더명 입력시 자동으로 폴더 생성 후 문서 생성됨
  * apidoc 내용이 수정 또는 추가된 후 해당 명령어를 입력해야 적용됨 - 작성시 자동 적용x

5. apidoc 확인
```
serve apidoc/
```


참고.  
[apidoc](https://apidocjs.com/)
[APIDoc 으로 REST API 문서화 하기](https://www.lesstif.com/software-architect/apidoc-rest-api-rest-api-documentation-1-98926722.html)
