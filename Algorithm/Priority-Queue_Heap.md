## heapq를 이용하여 우선순위 큐 풀기

### leetcode 23. Merge k Sorted Lists

heapq 알고리즘을 이용하여 우선순위 큐 구현하기  

* **우선순위 큐** : 우선순위가 높은 원소가 먼저 출력되는 추상적 자료형  
  우선순위 값을 먼저 출력해주면 되므로 직접 우선순위가 높은 값을 찾아서 출력하거나 제거해주어도 된다. 하지만 input값이 많아질수록 이 과정은 비효율적이다.  
  => 힙을 이용하여 효율적으로 구현하자!  

**[문제 풀이]**  

lists는 k개의 연결리스트를 갖고 있다. 각 연결리스트를 heap에 추가하는 과정이다.  
이때 튜플을 이용하여 (연결리스트 첫번째 노드의 value값, lists에서 해당 연결리스트의 인덱스값, 연결리스트 전체)를 heap에 push한다.
```
for i in range(len(lists)):
    if lists[i]:
        heapq.heappush(heap, (lists[i].val, i, lists[i]))
```


heap에 값이 있을 때까지 반복문을 도는데 이때 heap에서 가장 작은 값을 제거하여 node에 저장한다.(heapq는 최소힙을 기본적으로 제공하기 때문에 heappop()을 하게 되면 가장 작은 값을 자동으로 반환해준다.)  
* node = heap에서 가장 작은 값(heap에 튜플을 저장하고 있으므로 튜플의 가장 첫번째값으로 우선순위 구현)  
* idx = lists에서 해당 연결리스트의 인덱스값   
* result.next = 연결리스트 전체  


```
node = heapq.heappop(heap)
idx = node[1]
result.next = node[2]
```


result에는 result의 next값이 들어오는데 이 값은 이미 heappop()을 할 때 비교를 통해 나온 값이다. 따라서 다음으로 전달 할 때는 해당 노드(result.next)의 next값을 저장해주어야 한다. 아래에 heappush해주는 튜플은 위에 for문에서 push해줬던 튜플과 결국 동일하다. 단지 연결리스트에서 이미 확인한 값, 즉 연결리스트의 앞에 있는 노드 값을 제외하고 넣어주는 것이다.
* result.next.val = 연결리스트에서 이미 확인한 값 제외 후 첫번째 노드의 value값
* idx = lists에서 해당 연결리스트의 인덱스값   
* result.next = 연결리스트에서 이미 확인한 값을 제외한 전체  


```
result = result.next
if result.next:
    heapq.heappush(heap, (result.next.val, idx, result.next))
```


위 과정을 반복하게 되면 heappop()에서 자동으로 작은 값을 반환하고 제거하게 되므로 heap에 있는 연결리스트의 모든 값을 확인하게 되고 전체 값이 heap에서 제거되면 즉, 모든 값을 다 확인하고 나면 최종 답을 return 한다. 



**최종코드**

```
class Solution:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        root = result = ListNode(None)
        heap = []
        
        for i in range(len(lists)):
            if lists[i]:
                heapq.heappush(heap, (lists[i].val, i, lists[i]))
        
        while heap:
            node = heapq.heappop(heap)
            idx = node[1]
            result.next = node[2]
            
            result = result.next
            if result.next:
                heapq.heappush(heap, (result.next.val, idx, result.next))
                
        return root.next
```

참고 풀이: 파이썬 알고리즘 인터뷰




문제: https://leetcode.com/problems/merge-k-sorted-lists/