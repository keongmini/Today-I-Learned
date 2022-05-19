## How to keep password safely

### 적절한 방법으로 비밀번호 등 중요한 정보 안전하게 관리하는 방법

비밀번호는 평문으로 저장하면 안됨(바로 해킹 가능)

### 1. Encryption
* 가장 쉽게 생각할 수 있는 방법이지만 완벽하게 안전하다고 할 수 없음 
* 어디에 저장되어있는지에 따라 안전성이 달라짐 : 웹사이트에서 비밀번호를 저장하고 있을 경우 비교적 적은 노력으로 해킹 가능(이전에 사용한 비밀번호를 찾아서 복호화 -> That's why key databases are a massive target.
* 저장한 비밀번호가 내 서버와 동일할 곳에 있다면 평문과 다를 바 없음

> AES(Advanced Encryption Standard)
>> AES-128, AES-192, AES-256
>> 암호화 키의 길이에 따라 달리짐

### 2. Hashing
* 완전히 다른 조합으로 변경(숫자, 문자, 특수문자 포함), 복호화 불가
ex) MD5, Secure Hashing Algorithm (SHA)-1, or SHA-256
* 사용자가 로그인할 때 웹사이트는 해시와 데이터베이스에 접근하도록 허용해줌 : 해커가 **rainbow table** 을 업데이트할 수 있다는 의미 -> 운나쁘게 내 비밀번호가 테이블 목록에 있을 경우 해킹 가능

> rainbow table : 해시함수를 사용하여 변환 가능한 모든 해시값을 저장해놓은 표(해시화된 비밀번호를 통해 원래 비밀번호를 추출하는데에 사용)

### 3. Salting
* 비밀번호의 처음 또는 끝에 문자 추가(salting) 후에 해시화 -  좀더 복잡하고 긴 랜덤 데이터셋 사용으로 해킹 방어

### 4. HTTPS
* 소켓 통신에서 일반 텍스트 대신 SSL이나 TLS 프로토콜을 통해 세션 데이터 암호화 

> 소켓통신 : 서버와 클라이언트 양방향 통신

* HTTPS를 통해 암호화할 경우 평문으로 보내지만 궁극적으로는 TLS에 의해 암호화 되는 것임
* 해시화를 추가적으로 하면 더 강력하게 비밀번호 저장이 가능하지만 필수적이진 않음


사용한 라이브러리: [bcrypt](https://yarnpkg.com/package/bcryptjs)

참고 : 
[How Do Websites Keep Your Passwords Secure?](https://www.makeuseof.com/tag/websites-keep-passwords-secure/)

[Password Security](https://www.loginradius.com/blog/async/password-secure/)

[[React]Bcrypt로 비밀번호 암호화 하기](https://2ham-s.tistory.com/320)
