node version 관리 : 로컬과 서버의 버전 맞춰주기 -> 동작 오류를 없애기 위해
  관리툴 : nvm(Node version manager) - 설정하기 어려움 / tj/n - nvm 툴(간단사용)

node.js 설치 -> npm 자동설치 / package manager 성능적인 문제로 선택 가능 

npm init -y : package.json 생성 
package.json : 패키지의 메타 데이터를 포함하는 파일, 프로젝트에서 사용하는 의존성 나열
  중 scripts: 프로젝트 관리하면서 자주 사용하게 되는 스크립트들 간단하게 호출할 수 있도록 정리해놓은 모음
  
package-lock.json : 설치된 패키지가 어떤 것인지 관리 / 실제로 설치된 버전 표시(패키지 버전관리)

```
npm install --save-dev prettier
```

prettier 적용할 내용 작성 -> 
```
{
    "semi": false,
    "singleQuote": true
}
```

vscode -> setting.json ->
```
{
    "[javascript]": {
        "editor.formatOnSave": true,        // 자동으로 prettier 적용
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    }
}
```

eslint 플러그인 : airbnb javascript
```
npm install --save-dev eslint-config-airbnb-base eslint-plugin-import
```

eslint와 prettier 사이의 에러가 발생하지 않도록 도와줌 
```
npm install --save-dev eslint-config-prettier
```

eslint 파일
```
module.exports = {
  extends: ['airbnb-base', 'prettier'],
}
// prettier 가 맨뒤에 와야함!
```
```
/* eslint-disable-next-line no-console */  // 이 부분은 eslint 적용안하겠다. (no-console 문제만 끄겠다.)
console.log('Hello, world!')
```

prettierㅗㅇ
`ㅇ
