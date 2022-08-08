## node.js 개발 전 알아둘 내용

1. node version 관리  
로컬과 서버의 버전 맞춰주기 -> 동작 오류를 없애기 위해  
관리툴: nvm(Node version manager) - 설정하기 어려움 / tj/n - nvm 툴(간단사용가능)

2. node.js 설치 -> npm 자동설치  
다양한 package manager가 있기 때문에 성능적인 측면 따져서 선택 가능 (ex. yarn)

3. npm init -y : package.json 생성 

4. package.json  
패키지의 메타 데이터를 포함하는 파일, 프로젝트에서 사용하는 의존성 나열
package.json 내용 중 scripts: 프로젝트 관리하면서 자주 사용하게 되는 스크립트들 간단하게 호출할 수 있도록 정리해놓은 모음

5. package-lock.json  
설치된 패키지가 어떤 것인지 관리 / 실제로 설치된 버전 표시(패키지 버전관리)


참고) [패스트캠퍼스 한번에 끝내는 node.js 웹 프로그래밍](https://fastcampus.co.kr/dev_online_node)