## 환경변수 관리하기

### config 사용 방법

* 환경 변수 관리해야 하는 이유
  1. port, db, third-party 등과 관련된 중요 정보가 노출되지 않기 위해
  2. 단계(개발, 운영, QA 등)별로 각각의 환경변수를 저장해놓기 위해
  3. 값이 변경되는 경우 일관적으로 적용하여 오류를 줄이기 위헤
  4. 등등

위와 같은 이유로 환경변수를 관리하는 것은 매우 중요하다.

[config를 사용하지 않은 경우]
```
const db_host = 'localhost'
const db_port = 3306
const db_name = 'mysql'

const express = require('express')

const app = express()
const port = 3000
app.listen(port)
```

[config 간단 사용]
```
// config.json
{
  "db": {
    "db_host": "localhost",
    "db_port": 3306, 
    "db_name": "mysql"
  },
  "local": {
    "port": 3000
  }
}

// app.js
const config = require('./config')

const db_host = config.db.db_host
const db_port = config.db.db_port
const db_name = config.db.db_name

const express = require('express')

const app = express()
const port = config.local.port
app.listen(port)
```
-> 다음과 같이 중요한 정보를 추출하여 분리해서 관리

* local, staging, operation 단계를 분리 할 경우 각각의 경우에 맞게 작성(파일을 분리하기도 함)   
```
{
  "local": {
    ...
  },
  "staging": {
    ...
  },
  "operation: {
    ...
  }
}
```

* node.js에서 node_env 사용하기 
```
const environment = process.env.NODE_ENV
```
-> 원하는 환경으로 쉽게 설정 가능 

node에서 환경변수 설정하기   
1. 터미널에서 설정하기  
```export 키=값``` (맥)  
```set 키=값``` (윈도우)

2. dotenv 사용하기  
환경변수 관리를 위한 .env 파일을 사용하기 위한 라이브러리

```npm install dotenv```

[.env] 파일 생성
```
NODE_ENV='local'
DB_PORT=3306
DB_NAME='mysql'
```

.env에 환경변수를 설정해놓은 경우, 환경 변수를 불러오는 파일 상단에 아래 코드를 추가해주어야 함

```require("dotenv").config();```


참고
[How to Easily Set-up Node Config Following These Best Practices](https://codingsans.com/blog/node-config-best-practices)
