## 연결리스트 이해하기

### leetcode 24. Swap Nodes in Pairs

앞에서부터 두개의 값(한 쌍)끼리 자리 바꿔주기  

연결리스트는 놔두고 값만 교환해주면서 쉽게 푸는 방법이 있지만 연결리스트 특성을 살려서 좀 더 의미있게 풀어보고자 한다. 
연결리스트이기 때문에 두개의 값의 자리를 바꿔주려면 연결된 값을 바꿔주어야 한다. 반복문 내에서 아래 부분이 값들의 연결을 바꿔주는 부분이다.
```
b = head.next
head.next = b.next
b.next = head
```

이 문제 풀이에서 헷갈린 점은 아래 부분이다.
```
prev.next = b
```
반복문 가장 윗부분 코드를 돌고 나면 b에는 한쌍 내에 두 값이 바뀐 결과가 저장된다.  
예를들어, [1,2,3,4] -> [2,1,3,4] 이렇게 자리가 바뀐 값이 b에 저장되게 되면 이 값을 prev의 next값으로 연결한다. 이때 prev의 값을 None이라고 하면 prev = [None,1,2,3,4] 가 된다.
처음에는 이렇게 하는 이유를 root가 연결리스트 전체를 바라볼 수 있도록 하는 것이라고 이해했는데 이것보다 더 중요한 이유는 그 다음 쌍의 값이 자리를 바꾸게 되면 이전 쌍과 다시 연결되어야 하기 때문이다.
맨 앞의 쌍이 자리를 바꿔서 [2,1,3,4]가 되면 그 다음으로 [3,4] 쌍의 자리를 바꾸게 된다. 반복문의 가장 위에 있는 코드를 통해 [4,3]으로 자리를 바꾸는 것 까지 끝나면 이전 쌍의 마지막 값인 1이 4와 
연결되어야 하는데 이 부분을 해당 코드를 통해 수행하는 것이다. 반복문의 가장 아래 코드에서 prev는 그 다음 다음 값을 가리키도록 하는데 이때 prev는 자리를 바꾼 쌍의 마지막 값을 지목하는 것과 연결되는 코드이다. 

**최종코드**

```
class Solution:
    def swapPairs(self, head: Optional[ListNode]) -> Optional[ListNode]:
        root = prev = ListNode(None)
        prev.next = head
        
        while head and head.next:
            b = head.next
            head.next = b.next
            b.next = head
            
            prev.next = b
            
            head = head.next
            prev = prev.next.next
        
        return root.next
```

참고 풀이: 파이썬 알고리즘 인터뷰




문제: https://leetcode.com/problems/swap-nodes-in-pairs/