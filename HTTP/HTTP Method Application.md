# HTTP 메서드 활용

## 클라이언트에서 서버로 데이터 전송

1. 쿼리 파라미터를 통한 데이터 전송
   - GET
   - 정렬 필터 (검색어)

1. 메시지 바디를 통한 데이터 전송
   - POST, PUT, PATCH
   - 회원가입, 상품 주문, 리소스 등록, 변경
  
#### [4가지 상황]
1. 정적 데이터 조회        
   - 이미지, 정적 텍스트 문서
   - GET 사용
   - 단순하게 URI 경로(리소스 경로)로 접근하면 데이터를 받을 수 있음, 추가적 데이터 필요 x - 쿼리 파라미터 미사용

1. 동적 데이터 조회        
   - 검색, 게시판 목록에서 정렬, 필터
   - 조회 조건을 줄여주는 필터, 조회 결과를 정렬하는 정렬 조건
   - GET 사용
   - 쿼리 파라미터 사용해서 데이터 전달
  
1. HTML Form 데이터 전송      
   - POST 전송 - 저장: 회원가입, 상품 주문, 데이터 변경     
     form 내용을 메시지 바디를 통해서 전송(쿼리 파라미터 형식, key=value)     
     전송 데이터를 url encoding 처리
   - GET 전송 가능
   - multipart/form-data       
     파일 업로드 같은 바이너리 데이터 전송 시 사용      
     다른 종류의 파일과 form 내용 함께 전송 가능
   - HTML 전송 - GET, POST만 지원

1. HTTP API 데이터 전송
   - 서버 to 서버: 백엔드 시스템 통신시 사용
   - 앱, 웹 클라이언트 전송시 사용
   - POST, PUT, PATCH: 메시지 바디를 통해 데이터 전송
   - GET: 조회, 쿼리 파라미터로 데이터 전달
   - Content-Type: application/json 주로 사용

## HTTP API 설계 예시
1. 회원 관리 시스템 (**POST 기반** 등록)
   - 클라이언트는 등록될 리소스의 URI를 모름 (POST /members 로 접근)
   - 서버가 새로 등록된 리소스 URI를 생성 (/members/100)     
   -> 컬렉션: 서버가 관리하는 리소스 디렉토리(리소스의 URI를 생성하고 관리), /members -> 컬렉션

1. 파일 관리 시스템 (**PUT 기반** 등록)
   - 클라이언트가 리소스 URI를 알아야함 (PUT /files/star.jpg) -> 클라이언트갸 직접 리소스의 URI 지정      
   -> 스토어: 클라이언트가 관리하는 리소스 저장소(리소스의 URI를 알고 관리), /files -> 스토어

* 대부분 POST 기반 신규 자원 등록 위주로 사용!

1. HTML FORM 사용      
   -> 컨트롤 URI
      - GET, POS만 지원하기 때문에 제약이 있음 -> 제약을 해결하기 위해 동사로 된 리소스 경로 지정
      - /members/new, /members/edit, /members/delete -> POST의 /new, /edit, /delete가 컨트롤 URI
      - HTTP 메소드로 해결하기 애매한 경우에 사용 (실무에서 많이 사용)

* [참고] URI 설계 개녕
  1. 문서: 단일 개념(파일 하나, 객체 인스턴스, ...)         /members/100
  2. 컬렉션: 서버가 추구하는 리소스, 대부분 사용              /members
  3. 스토어: 클라이언트가 관리하는 저장소                    /files
  4. 컨트롤러: 문서, 컬렉션, 스토어로 해결하기 힘든 경우, 추가 프로세스 처리를 위해 사용, 동사 사용