## LRU Cache

* **Cache** : 연산에 필요한 데이터, 값을 미리 저장해두는 임시 메모리
   * CPU 옆에 있어 물리적으로 거리가 매우 짧아 접근 비용이 매우 적음  
      -> 자주 사용되는 값 or 사용될 예정인 값을 미리 캐시에 적재하여 참조시간을 줄이고 성능 up

    [동작 방식]  
    CPU는 어떤 값이 필요할 때 가장 먼저 캐시를 방문  
    -> 캐시에 원하는 값이 있을 경우 이를 사용 <-> 없다면 주기억 장치를 방문  
    CPU가 자주 사용하는 값, 필요로 하는 값을 적절히 캐시에 배치 -> 캐시 히트율높여 성능 up

캐시의 용량은 한정적이고 자주 사용되는 값도 자주 바뀜 -> cache에 저장된 내용을 계속 바꿔줘야 하지만 자주 바꾸게 되면 캐시 히트율을 높게 유지 할 수 없음 -> 성능 악화  
캐시 히트율을 높게 유지하는 메모리 교체 알고리즘 필요! -> 그 중 하나가 **LRU Cache**

* **LRU Cache**
  - LRU = Least Recently Used : 가장 오랫동안 사용되지 않은 페이지를 교체
  - 캐시에 공간이 부족할 때 가장 오랫동안 사용하지 않은 데이터를 제거, 새로운 데이터를 배치

다음 그림과 같이 Cache 공간이 꽉 차있을 경우, 가장 오래 전에 사용한 데이터를 제거하고 새로운 데이터를 넣어주는 방식(시간 복잡도 O(N))  
<img src="https://www.interviewcake.com/images/svgs/lru_cache__chocolate_cake_recipe_second_request_response.svg?bust=210" />
출처: 참고에 있음  

* **LRU Cache Implementation**  : 이중 연결리스트를 사용하여 가장 최근에 사용한 데이터를 Head, 가장 오래 전에 사용한 데이터를 Tail -> 시간복잡도 O(1)  

<img src="https://www.interviewcake.com/images/svgs/lru_cache__most_and_least_recently_used_items.svg?bust=210" />


참고.  
[LRU Cache 이해하기](https://velog.io/@haero_kim/LRU-Cache-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0)  
[LRU Cache Data Structure](https://www.interviewcake.com/concept/java/lru-cache)
