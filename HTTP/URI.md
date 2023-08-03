## URI
Uniform Resource Identifier

URI는 로케이터(locator)와 이름(name) 두가지로 분리할 수 있다.
- URL: Resource Locator  
  ```http://naver.com```  
  리소스가 있는 위치 지정
- URN: Resource Name  
  ```urn:example:animal:nose```  
  리소스에 이름 부여

위치는 변할 수 있지만 이름은 변하지 않음 / 하지만, URN 이름만으로 실제 리소스를 찾을 수 있는 방법이 보편화되지 않음 - 거의 URL만 사용!

**URI**  
Uniform: 리소스 식별하는 통일된 방식  
Resource: 자원, URI로 식별할 수 있는 모든 것(제한 x)  
Indentifier: 다른 항목과 구분하는데 필요한 정보

[전체 문법]  
schema://[userinfo@]host[:port][/path][?query][#fragment]
- 프로토콜(https)  
  scema는 주로 프로토콜 사용  
  프로토콜: 어떤 방식으로 자원에 접근할지 하는 약속 규칙  
  http = 80 / https = 443 주로 사용, 포트 생략 가능  
- 호스트명(www.google.com)  
  호스트명: 도메인명 or IP주소
- 포트 번호(443)
- 패스(/search)  
  리소스 경로, 계층적 구조
- 쿼리 파라미터(q=hello&hl=ko)  
  key=value 형태
  ?로 시작, &로 추가    
  보통 쿼리 파라미터, 쿼리 스트링으로 불림


## 웹 브라우저 요청 흐름
웹브라우저가 DNS 조회 - IP와 PORT 정보 기반으로 HTTP 요청 메시지 작성 - Socket 라이브러리를 통해 TCP/IP 연결 후 데이터 전달 - TCP/IP 패킷 생성 후 전달 - HTTP 메시지 해석 - HTTP 응답 메시지 생성(HTML 포함) 후 전달 - 웹 브라우저에서 HTML 렌더링



