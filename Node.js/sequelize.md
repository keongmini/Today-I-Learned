## sequelize 

### sequelize 스터디 (sync vs migration vs auto)

* **sequelize**  
  Postgres, mysql, mariadb, sqlite 등에 사용하는 현재 가장 많이 사용되고 있는 node.js promis-based ORM 도구  
  > [What is ORM?](https://stackoverflow.com/questions/1279613/what-is-an-orm-how-does-it-work-and-how-should-i-use-one)  
  > 객체 지향 패러다임을 사용하여 db에서 데이터를 쿼리하고 조작할 수 있는 기술 -> 객체 관계형 매핑 기술  
  > SQL 대신 선택한 프로그래밍 언어로 된 라이브러리 사용  

1. sequelize 설치

```npm install sequelize sequelize-cli```

2. mysql 설치

```npm install mysql2```

> mysql2: the mysql connetor library used by Seqeulize to connect to the mysql db server  
> mysql보다 더 많은 기능 제공, promise 기반으로 작동 가능 -> promise 기반인 sequelize와 함께 사용하기 적합  
> 참고: [What is the difference between MySQL & MySQL2 considering NodeJS](https://stackoverflow.com/questions/25344661/what-is-the-difference-between-mysql-mysql2-considering-nodejs)

3. sequelize 초기 세팅

```npx seqeulize init```

명령어 실행시, config, models, seeders 폴더 생성

4. config/config.json
phase 별로 
