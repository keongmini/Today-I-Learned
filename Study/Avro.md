## Avro

* Avro
  - Apache에서 만든 프레임워크
  - 원격 프로시저 호출(RPC) 및 데이터 직렬화 기능 제공
  - Json과 비슷한 형식이지만 스키마 존재
  - 언어 중립적인 데이터 직렬화 시스템 = 프로그래밍 언어와 상관없이 직렬화/역직렬화 가능
  - Kafka에서 Avro 사용
  - 장점: 프로듀서가 새로운 스키마로 전환하게 되어도 컨슈먼는 변경없이 처리 가능