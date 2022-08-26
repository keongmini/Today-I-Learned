## sequelize 

### sequelize 사용법

* **sequelize**  
  Postgres, mysql, mariadb, sqlite 등에 사용하는 현재 가장 많이 사용되고 있는 node.js promis-based ORM 도구  
  sequelize-cli를 통해 필요한 기능 쉽게 사용 가능  
  > [What is ORM?](https://stackoverflow.com/questions/1279613/what-is-an-orm-how-does-it-work-and-how-should-i-use-one)  
  > 객체 지향 패러다임을 사용하여 db에서 데이터를 쿼리하고 조작할 수 있는 기술 -> 객체 관계형 매핑 기술  
  > SQL 대신 선택한 프로그래밍 언어로 된 라이브러리 사용  

#### 초기 세팅

1. sequelize 설치

```npm install sequelize sequelize-cli```

2. mysql 설치(db에 맞게)

```npm install mysql2```

> mysql2: the mysql connetor library used by Seqeulize to connect to the mysql db server  
> mysql보다 더 많은 기능 제공, promise 기반으로 작동 가능 -> promise 기반인 sequelize와 함께 사용하기 적합  
> 참고: [What is the difference between MySQL & MySQL2 considering NodeJS](https://stackoverflow.com/questions/25344661/what-is-the-difference-between-mysql-mysql2-considering-nodejs)

3. sequelize 초기 세팅

```npx seqeulize init```

명령어 실행시, config, models, seeders 폴더 생성

4. config/config.json

phase 별로 연결할 db 정보 환경설정 

5. models/index.js

환경변수 가지고 sequelize 연결


#### Model synchronization

db 설계하고 model을 생성한 후 해당 내용을 db에 동기화, 명령어 입력시 자동으로 sql 쿼리문을 실행

```Table name.sync()``` 존재하지 않는 table 생성(이미 존재하는 경우 변화x)  
```Table name.sync({ forcd: true })```  존재하던 내용 제거 후 생성  
```Table name.sync({ alter: true })```  table 상태 확인 후 필요한 변화만 실행  

**하지만! sync는 안전성이 보장되지 않아(table을 쉽게 제거, 변경할 수 있어 한번의 잘못된 사용으로 db를 날리는 위험이 있음) 운영단에서 사용하거나 협업시 사용하기에는 적합하지 않음(destructive operations)**


#### Migrations

안전하지 않은 sync 대신 더 개선된 migration을 이용한 동기화를 추천!  
- migration을 통해 db 변경사항 추적 가능  
- db를 다르게 수정할 수 도 있지만 이전 상태로 복원도 가능  
- 상태 변환 내용이 migration 폴더에 모두 저장  

1. model 생성

```sequelize model:generate --name 테이블명 --attributes 컬럼명:데이터타입,컬럼명:데이터타입,컬럼명:데이터타입, ...```

-> 테이블명으로 model 폴더안에 파일 생성, 해당 내용을 담은 migration 폴더 안에 파일 생성

2. migration 실행

```npx sequelize db:migrate```

실제 db에 해당 모델 생성

SequelizeMeta라는 Table 자동 생성(실행된 마이그레이션 기록) -> 실행되지 않은 마이그레이션 파일을 찾아서 실행 -> table 생성

3. migration 실행 취소

```npx sequelize db:migrate:undo```

가장 최근 실행한 마이그레이션 취소

```db:migrate:undo:all``` : 모든 마이그레이션 취소하여 초기 상태로 되돌림 

```npx sequelize db:migrate:undo:all --to 마이그레이션명``` : 특정 마이그레이션 취소

4. migration 파일
```
module.exports = {
  up: (queryInterface, Sequelize) => {
    // logic for transforming into the new state
  },
  down: (queryInterface, Sequelize) => {
    // logic for reverting the changes
  }
}
```
- up : db 새롭게 수정  
- down : 이전 실행 내용 취소  
- queryInterface : db 수정

```sequelize migration:create --name 마이그레이션 이름```



#### seeds

1. seed 생성  
= 데이터 삽입 (샘플, 테스트 데이터로 채우는데 사용)

```sequelize seed:generate --name 시드 이름```

seeders 폴더 내 해당 파일 생성

```
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'John',
      lastName: 'Doe',
      email: 'example@example.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
```

2. seed 실행

```npx sequelize db:seed:all```

해당하는 테이블에 시드 파일 삽입(migration과 달리 실행 기록 저장x)

3. seed 실행 취소

```npx sequelize db:seed:undo```

```npx sequelize db:seed:undo --seed 시드 이름``` 특정 시드 취소

```npx sequelize-cli db:seed:undo:all``` 모든 시드 취소 


참고. [seqeulzie documentation](https://sequelize.org/docs/v6/other-topics/migrations/)
