## api - error handling 방식

### api의 error hanlding 정확하게 하기


* 기존 상태
1. 에러 핸들링 방식이 다양한 방식으로 혼재되어있음
1. 제대로 에러가 처리되지 않아서 에러가 발생했음에도 정상적으로 response됨
1. request로 들어온 값이 존재하는 값인지 확인없이 바로 db값 찾아서 반환
   예를들어, 유저의 아이디를 이용하여 유저 정보를 불러올때, 해당 아이디가 존재하는지 먼저 확인 후 아이디로 정보를 검색해야하지만 이 과정이 빠져있음
1. api 접근권한을 설정해두지 않아 누구든 api 작동방식만 알면 접근 가능

-> **수정** 
1. 에러 발생시, 정확한 server error 반환
- body나 query로 전달되는 값이 유효한지 확인하는 코드 추가
  유효하지 않을 경우 → 422 Unprocessable Entity(서버가 요청을 이해하고 요청 문법도 맞지만 요청을 수행할 수 없음)
- 조회했으나 일치하는 값이 없는 경우 → 404 Not Found
- 아예 값을 찾지 못하거나 이외에 에러 발생시 → 500 Internal Server Error
- update시에 올바르지 않은 req 전달할 경우 → 400 Bad Request
- 로그인시에 잘못된 비밀번호 입력시 → 401 Unauthorized
- 중복확인시  
  중복인 경우 → 409 Conflict (현재 있는 값과 입력한 값 사이에서 충돌이 나는 것이기 때문에)  
  중복되지 않은경우 → 202 Accepted

2. api 접근권한 설정
유저 / 파트너 / 관리자  접근 권한을 나누어 사용자별로 각 권한에 맞게 발급  
api 요청시 권한을 먼저 확인한 후 접근할 수 있도록 코드 변경(middleware 설정)  
권한 없을 경우 → 403 Frobidden


**고려해볼만한 서비스**  
[Sentry JavaScript Document](https://docs.sentry.io/platforms/javascript/)  
에러 트래킹 서비스 - 클라이언트 오류 발생시 메일이나 슬랙으로 내용 전달  
참고: [프론트엔드 에러 로그 시스템 Sentry 적용기](https://urbanbase.github.io/dev/2021/03/04/Sentry.html)