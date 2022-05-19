## 페이지별 접근권한 관리

### 접근권한별로 페이지 접근할 수 있도록 페이지 권한 설정하기

## 도입 배경
폐쇄형 페이지에 대한 우회 경로를 통한 접근 제한 필요
사용자가 어떤 상태인지에 따라 페이지별로 접근성과 권한에 차이가 있음
* 로그인x 사용자 : 메인페이지, 마이페이지 등 로그인 후에만 이용할 수 있는 페이지 접근 제한
* 로그인o 사용자 : 로그인, 회원가입 페이지 접근 제한
* 회원가입 - 이메일 인증하지 않은 사용자 : 회원가입 중간 과정 접근 제한

## 접근과 권한의 차이

### *접근*
= '이용 승인여부에 따른 상태'
로그인 된 회원은 본인 회사에 맞는 메인페이지에 접근이 승인된 상태 <-> 
로그인 하지 않은 회원은 메인페이지 접근이 승인되지 않은 상태

### *권한*
= '접근 금지여부에 따른 상태'
관리자 페이지는 이용자들에게 접근 금지된 페이지

## 페이지 접근 제한 방식

### 1. 세션 기반 인증 방식
사용자가 로그인시에 세션 서버에서 세션 ID 발급
-> 클라이언트에 해당 세션 ID를 보관했다가 필요시마다 HTTP 요청 헤더에 실어 보냄
-> 서버에서 세션 ID를 통해 유효성 검증하는 방식  

![Items](https://user-images.githubusercontent.com/103486036/168972053-5c83fa2e-7d2e-4301-acfb-a1b9b2e3fe2a.png)


* 장점 : 사용자마다 각자의 교유한 세션 ID를 발급받기 때문에 인증과정이 심플해짐
* 단점 : 
  * 사용자의 고유한 세션 ID가 노출되면 해당 ID로 해킹 가능(Session Hijacking)
  * 세션 ID 저장공간 필요

### 2. token 기반 인증 방식
사용자가 로그인시에 서버에서 보내주는 인증정보에 **access token**과 **refresh token** 포함해서 전달(jwt 이용)
-> token 정보를 클라이언트에 저장해뒀다가 유저 인증시에 header에 token값을 실어 보내어 유효성 검증
* access token : 일정 시간동안만 유효 - 로그인 여부 확인
* refresh token : 만료시간x - 자동로그인 또는 로그인 유지 구현시 사용

![Items (1)](https://user-images.githubusercontent.com/103486036/168972073-5cfcffa0-19d2-439c-a677-5e2318400bd1.png)


* 장점 : 
  * 별도의 저장소 필요하지 않음
  * token의 만료시간을 조절하여 안전성 확보 가능
* 단점 : token 만료시마다 새롭게 발급해야 하기 때문에 서버의 자원 낭비 발생 가능

### 3. React 라우터를 이용한 방식
React-router를 이용하여 권한별로 접근할 수 있는 컴포넌트 설정

```
const UserRoute = ({ component: Component, rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (Component) {
          return <Component {...props} />;
        }
      }}
    />;
  )
};
```

* * *
1. 로그인 페이지 / 메인 페이지(를 포함한 로그인이 필요한 모든 페이지) - 로그인 여부를 기준으로 접근 제한
  - 제한된 페이지 접속 시도시, *__401 Unauthorized__* 반환
  - 로그인 여부 확인 방법
  storage에 저장된 access token을 통해 서버에 유효성 검증
  -> 만료됐을 경우, 로그인 페이지로 이동
  -> 유효한 경우, 메인페이지로 이동

2. 회원가입 페이지 - 이메일 인증 여부를 기준으로 접근 제한
  - 제한된 페이지 접속 시도시, *__401 Unauthorized__* 반환
  - 이메일 인증 확인방법
  이메일 인증 후 [인증] 버튼 클릭시,
  이메일 인증 state를 props로 전달
  -> 인증o 경우, 다음페이지로 이동
  -> 인증x 경우, '인증번호 확인해주세요' 문구 띄우기



**참고** 
[로그인 인증방식](https://velog.io/@gusdnr814/%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%9D%B8%EC%A6%9D-4%EA%B0%80%EC%A7%80-%EB%B0%A9%EB%B2%95)
[프론트에서 안전하게 로그인 처리하기](https://velog.io/@yaytomato/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%90%EC%84%9C-%EC%95%88%EC%A0%84%ED%95%98%EA%B2%8C-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%B2%98%EB%A6%AC%ED%95%98%EA%B8%B0)
[React Router 권한 제어](https://ejko0911.medium.com/react-router-%EA%B6%8C%ED%95%9C-%EC%A0%9C%EC%96%B4-92ef817730b1)
[리액트 라우터를 활용한 권한별 라우팅 제어](https://jeonghwan-kim.github.io/dev/2020/03/20/role-based-react-router.html)
  

### 추가적으로 구현할 내용
express rate limit 구현(유저당 access token 재발급 받을 수 있는 횟수 관리)
