## npm과 npx

* 공부 배경   
node.js 개발환경에 sequelize를 설치하여 db를 관리 및 운영하고자 했다.  
  - 모듈 설치: ```npm install sequelize sequelize-cli```    
  - 필요한 폴더 및 파일을 자동 생성: ```npm sequelize init``` 

하지만, 다음과 같은 오류로 인해 sequelize 실행이 되지 않는 문제점이 발생!  
```Unknown command: "sequelize"```

해결방법 1. 모듈을 global로 설치 -> 해결 x  
```npm install -g sequelize-cli sequelize```

해결방법 2. npx를 이용한 설치 -> 해결!  
```npx sequelize init```

* npm 과 npx의 차이

**[npm]**   
Node Package Manager  
- javascript package manager로 node를 설치하면 기본적으로 설치됨
- 패키지를 로컬 또는 global하게 설치할 수 있도록 도와줌
- 다양한 라이브러리 사용 가능하게 해주는 cli tool
- npm만으로 패키지 실행x -> package.json에 명시해주어야 사용 가능 

**[npx]** 
Node Package eXecute  
- javascript package로 npm 5.2 버전부터 npx를 기본 패키지로 제공
- node package를 쉽게 설치하고 관리할 수 있게 도와주는 cli tool

[npx 사용하는 이유]  
npx는 결국 npm registry의 사용되는 dependencies를 쉽게 설치 및 관리 해주는 도구이기 때문에 npm으로 번거롭게
진행했던 과정들을 단순화해줌!


참고.  
[Difference between NPM and NPX](https://www.codingninjas.com/codestudio/library/difference-between-npm-and-npx)  
[npm vs npx — What’s the Difference?](https://www.freecodecamp.org/news/npm-vs-npx-whats-the-difference/)  
[npm과 npx의 차이에 대해서](https://ljh86029926.gitbook.io/coding-apple-react/undefined/npm-npx)  
[그래서 npx가 뭐길래?](https://geonlee.tistory.com/32)  
