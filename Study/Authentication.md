## server 인증 방식

### 인증방식 알아보고 jwt 이해하기

1. 세션 기반 인증
- 서버에서 사용자 정보 기억
- 사용자가 인증 후 해당 정보 저장(session)
- 서버가 클라이언트 상태 보존(stateful)
- 트래픽 증가로 서버 변경되면 이전 내용이 유지 되지 않는다는 단점이 있음

**시스템 규모가 커지게 되면서 나온 방식**

2. 토큰 기반 인증
- 인증 후 토큰 발급
- Header에 토큰 함께 전달
- 서버는 요청오면 토큰 유효성 검사 후 응담해주는 비교적 단순한 역할
- 클라이언트와의 세션 정보 저장x (stateless)


### Node.js로 토큰 기반 인증 구현하기 [JWT]
```
JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.
```
[How jwt works]

<img alt="jwt" src="https://imgs.developpaper.com/imgs/3096164588-5de44f232510d_articlex.png">


이미지 출처: https://developpaper.com/implementation-details-of-jwt-in-spring-security-framework/


jwt는 xxxxx.yyyyy.zzzzz 다음과 같은 모양인데 Header, Payload, Signature 로 구성되어있다.
* Header: How will we calculate JWT?
* Payload: What do we want to store in JWT?
* Signature: where we use the Hash Algorithm?

> 참고:   
> https://www.bezkoder.com/node-js-jwt-authentication-mysql/  
> https://jwt.io/

