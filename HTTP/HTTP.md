## HTTP
HyperText Transfer Protocol

모든 것을 HTTP 메시지에 담아서 전송

[HTTP 역사]  
- HTTP/0.9 1991년: GET 메서드만 지원, HTTP 헤더 x
- HTTP/1.0 1996년: 메서드, 헤드 추가
- **HTTP/1.1 1997년: 가장 많이 사용, 현재 가장 중요한 버전**
- HTTP/2, HTTP/3: 성능개선

[기반 프로토콜]  
TCP: HTTP/1.1, HTTP/2
UDP: HTTP/3

[특징]
1. 클라이언트 서버 구조
   - Request Response 구조
   - 클라이언트는 서버에 요청을 보내고 응답을 대기
   - 서버가 요청에 대한 결과를 만들어서 응답
   - 비즈니스로직과 데이터는 모두 서버에서 관리, 클라이언트는 UI에 집중 => 클라이언트와 서버 각각 진화
1. 무상태 프로토콜(stateless)
   - 서버가 클라이언트의 상태를 보존x
    > Stateful, Stateless 차이   
    > Stateful 상태에서 서버가 바뀌면? 이전 상태를 알 수 없음 => 이전 상태를 기억하고 있어야 함   
    > Stateless 상태에서 서버가 바뀌어도 필요한 데이터를 다 넘겨주기 때문에 문제 발생 x
    >
    > Stateful(상태 유지): 중간에 서버가 바뀌면 안됨, 바뀌게 되면 정보를 미리 넘겨줘야 함  
    > Stateless(무상태): 서버 바껴도됨, 응답 서버를 쉽게 변경 가능 -> 무한한 서버 증설 가능
    >  - 한계: 로그인과 같이 상태를 유지해야 하는 경우, 많은 데이터 전송
    >  - 그럼에도 상태유지는 최소한으로!
1. 비연결성
   필요한 작업 후에 연결을 유지하지 않으면? 서버는 자원을 최소한으로 줄일 수 있음
   - HTTP는 기본이 비연결성
   - 일반적으로 초 단위 이하의 빠른 속도로 응답
   - 1시간 동안 수천명이 서비스를 사용해도 실제 서버에서 동시에 처리하는 요청은 수십개 이하 -> 서버 자원 효율적 사용

      [한계]
    - TCP/IP 연결 다시 - 3 way handshake 시간 추가
    - 웹 브라우저로 사이트를 요청하면 HTML, CSS 등등 모든 자원 함께 다운로드  
    => HTTP 지속 연결(Persistent Connections)로 문제 해결 (내부적으로 연결할 시간 정함)
1. HTTP 메시지
   - state line 시작 라인  
     request line(요청 메시지): HTTP 메소드(Search, POST, PUT, DELETE) + 절대 경로 + HTTP 버전    
     status line(응답 메시지): HTTP 버전 + HTTP 상태코드 + 짧은 서버 상태 글
   - header 헤더  
     필드 이름: OWS 필드 내용   
     HTTP 전송에 필요한 모든 부가 정보 포함
   - empty line 공백 라인   
   - HTTP message body  
     실제 전송할 데이터, byte로 표현할 수 있는 모든 데이터
1. 단순함, 확장 가능
