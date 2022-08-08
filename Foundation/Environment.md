## 개발 환경 구축하기

* 노드 런타임에게 넘어가기 전에 문제를 잡아주는 기능 : Formatting, Linting, Type checking

1. Formatting: 미적인 것에 초점 (세미콜론 등등) -> Prettier

```
npm install --save-dev prettier
```

[.prettierrc]  
prettier 적용할 내용 작성
```
{
    "semi": false,
    "singleQuote": true
}
```

[.vscode/setting.json]
로컬에서 작업시 자동으로 prettier 적용될 수 있도록 설정 
```
{
    "[javascript]": {
        "editor.formatOnSave": true,
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    }
}
```

2. Linting: 에러가 날 수 있는 부분 예고 등 -> eslint

```
npm install --save-dev eslint
```

* eslint 플러그인

airbnb javascript  
```
npm install --save-dev eslint-config-airbnb-base eslint-plugin-import
```

eslint와 prettier 사이의 에러가 발생하지 않도록 도와줌 
```
npm install --save-dev eslint-config-prettier
```

node를 위한 eslint 플러그인 
```
npm install --save-dev eslint-plugin-node
```

[.eslintrc.js]  
플러그인 적용, prettier 가 맨뒤에 와야함
```
module.exports = {
  extends: ['airbnb-base', 'prettier'],
}
```

eslint가 적용되어 빨간줄이 그어진 코드 바로 위에 아래 명령문 입력시 해당 부분에 eslint 적용 x   
```
/* eslint-disable-next-line */   
```
(명령문 뒤에 어떤 에러만 적용하지 않을지 명시해주면 해당 에러에만 eslint 적용 x)  
```
/* eslint-disable-next-line no-console */   
```
--> no-console 문제만 끄겠다.

> **prettier와 eslint 사용하는 이유**  
> 코드를 짜는 중간에 피드백을 줌 -> 빨리 올바른 코딩 습관 형성, 여러 사람이 코드를 관리할 때 혼란없이 같은 규칙을 보면서 작업하기 위해, 룰만 봐도 베스트 프랙티스를 알 수 있음


3. Type checking  
js는 동적으로 타입 정의 - 다른 언어와 다르게 미리 타입을 체크 하지 않음  
-> 타입 에러 비교적 많이 발생 -> 실행시간 가야만 변수 타입을 알 수 있음, 컴파일 과정 거치지 않기 때문에 미리 에러가 발생하는지 알 수 없음(타입 에러가 있어도 실행되는 순간에서야 알 수 있음) -> TypeScript(js로 컴파일되는 언어, js에다가 타입 정의만 얹은 꼴)

```
npm install --save-dev typescript
```

node에서 주로 사용되는 객체에 대한 타입 정보 저장된 플러그인
```
npm install --save-dev @types/node
```

보통 타입스크립트 설정파일 - tsconfig.json  
하지만 js 프로젝트 안에 ts로 type checking만 할 경우 -> jsconfig.json  
해당 파일에 프로젝트마다 요구하는 엄격함에 맞게 설정되도록 정의  
[jsconfig.json]
```
{
    "compilerOptions": {
        "strict": true    // true = 코드를 매우 엄격하게 관리
    },
    "include": [
        "src/**/*"
    ]
}
```

=> **개발환경을 잘 꾸리는 것이 중요 - 실수를 미연에 방지, 계속 고쳐나가면서 실력향상**