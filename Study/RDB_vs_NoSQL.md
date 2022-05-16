## RDB, NoSQL 정의 및 비교

### RDB
관계형 데이터베이스 : 2차원 테이블 형식으로 키와 값들의 간단한 관계를 테이블화시킨 데이터베이스
- 정형화된 데이터 저장
- SQL 쿼리 사용
- Oracle, MySQL, Maria DB, ...
- 장점
  - 데이터의 분류, 정렬, 탐색 속도가 빠름
  - 데이터 표준화 가능 -> 접근 용이
  - 일관성, 무결성, 보안성 유지 가능
- 단점
  - 비용 부담
  - 데이터 처리에 대한 부하 발생시, 처리 어려움
  - 시스템의 복잡성, 스키마 규격에 맞춰서만 데이터를 다룰 수 있음

### NoSQL
Not Only SQL : 전통적인 관계형 데이터베이스 보다 덜 제한적인 일관성 모델 제공, 기존 DBMS 뿐 아니라 다른 특성도 지원
- 관계형 모델을 사용하지 않으며 테이블간 조인x
- 비SQL 인터페이스를 통한 데이터 액세스
- mongo DB, Redis, ...
- 장점
  - 데이터의 스키마와 속성들을 다양하게 수용 및 동적 정의
  - 복잡도가 떨어짐 -> 대용량 데이터 저장 및 처리 가능
  - 유연성, 확장성, 고성능, 고기능성
- 단점
  - 관계형베이스의 데이터 처리 완결성 보장x
  - 데이터에 대한 규격화x(일관성x)
  - 데이터 중복 발생

- NoSQL 데이터베이스 유형

<p>
  <img src="https://user-images.githubusercontent.com/88446465/161523898-267bed17-8b2f-466a-a75e-e08bff4c02c9.png" /><br/>
  <em>출처: 관계형 마이닝 모델과 NoSQL 데이터 비교 (microsoft docs) </em>
</p>


1. Document 모델
   - 문서 전체를 컬렉션이라 불리는 그룹으로 구성
   - 키-값 데이터 베이스의 개념 확장
   - 중첩된 키-값 쌍 지원, 문서 내 모든 속성에 대한 쿼리 허용
   - JSON 유사 형식의 문서로 데이터 저장 및 쿼리 -> 개발자들이 애플리케이션 코드에서 사용하는 것과 동일한 형식을 사용하여 보다 쉽게 데이터 베이스 쿼리 가능
```
[
    {
        "year" : 2013,
        "title" : "Turn It Down, Or Else!",
        "info" : {
            "directors" : [ "Alice Smith", "Bob Jones"],
            "release_date" : "2013-01-18T00:00:00Z",
            "rating" : 6.2,
            "genres" : ["Comedy", "Drama"],
            "image_url" : "http://ia.media-imdb.com/images/N/O9ERWAU7FS797AJ7LU8HN09AMUP908RLlo5JF90EWR7LJKQ7@@._V1_SX400_.jpg",
            "plot" : "A rock band plays their music at high volumes, annoying the neighbors.",
            "actors" : ["David Matthewman", "Jonathan G. Neff"]
        }
    },
    {
        "year": 2015,
        "title": "The Big New Movie",
        "info": {
            "plot": "Nothing happens at all.",
            "rating": 0
        }
    }
]
```
출처. https://aws.amazon.com/ko/nosql/document/

2. Key-Value 모델
   - 해시테이블을 이용하여 키와 값의 쌍을 저장
   - 키는 알려졌지만 값은 공개되지 않은 경우에 적합
   - 분할성이 커서 다른 유형의 데이터 베이스로는 불가능한 범위까지 수평확장 가능

3. Column 모델

<p>
  <img src="https://user-images.githubusercontent.com/88446465/161526494-a42bf46d-0c47-4d42-87ef-136f5b0ac0fc.png" width="400" height="350" /><br/>
  <em>출처: https://studio3t.com/knowledge-base/articles/nosql-database-types/ </em>
</p>

   - 와이드 열, 열 패밀리 데이터베이스라고도 함
   - 희소 데이터 행에 걸쳐 데이터와 쿼리를 효율적으로 저장
   - 데이터베이스의 특정 열에 대한 쿼리 실행시 이점 제공

4. Graph  

<p>
  <img src="https://user-images.githubusercontent.com/88446465/161525890-a29286a0-429a-4a1e-8f73-66ac97f174ef.png" width="400" height="350" /><br/>
  <em>출처: 그래프 데이터베이스 (위키백과) </em>
</p>

   - 노드 및 에지 기반 모델을 바탕으로 상호 연결된 데이터 표현
   - 고도로 연결된 데이터세트를 사용하는 애플리케이션을 쉽게 구축하고 실행



**ref.**  
[RDBMS와 NoSQL의 차이점 완벽 정리](https://universitytomorrow.com/26)  
[RDBMS 이해](https://www.fun-coding.org/mysql_basic1.html)  
[NoSQL이란 무엇인가?](https://www.samsungsds.com/kr/insights/1232564_4627.html)  
[NoSQL 데이터베이스 - NoSQL이란?](https://azure.microsoft.com/ko-kr/overview/nosql-database/)  
[NoSQL이란?](https://aws.amazon.com/ko/nosql/)