## 재귀 구조로 연결한 연결리스트 풀이

### leetcode 21. Merge Two Sorted Lists

두 연결 리스트를 하나로 합하여 작은 숫자부터 연결한 리스트 출력

연결리스트 두개를 앞에서부터 차례대로 비교하면서 작은순서대로 다시 연결하는 간단한 방법도 있다. 하지만 연결리스트의 특성을 이용하여 재귀로 풀어보고자 한다.  

**재귀구조**     
기준을 list1로 잡고 작은 숫자부터 list1에 연결하고자 한다.
list1과 list2의 value값을 뒤바꿔주는 경우는 두가지가 있다.
1. list1에 더이상 값이 없을 경우 -> list2에 남은 값을 가져와서 연결해야하기 때문에
1. list2에 값이 있고 list1의 value값이 list2의 value값보다 클 경우 -> 작은 값부터 연결해야하기 때문에 더 작은 값으로 바꿔야 한다.  

위의 과정을 거치게 되면 비교 값 중 작은 값이 list1의 next값으로 할당된다. 그 다음에 또 list1의 next값과 list2 값을 다시 비교하고 이는 또 그 다음 list1의 next값이 된다. 이런 식으로 재귀 호출을 계속 진행하다보면 list1과 list2를 모두 돌아 결국 null에 도달하게 되고 함수는 output을 차례대로 return한다.  

아래 그림은 debug을 통해 코드가 어떤 순서대로 진행되는지, 재귀가 어떻게 작동하는지 이해하기 위해 작성하였다.  


<img src="https://user-images.githubusercontent.com/88446465/163574711-631d44c3-0d06-413a-beac-fb49a272aee0.jpg" width="500" height="700" /><br/>

```
class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        if (not list1) or (list2 and list1.val > list2.val):
            list1, list2 = list2, list1
        if list1:
            list1.next = self.mergeTwoLists(list1.next, list2)
        
        return list1
```

참고 풀이: 파이썬 알고리즘 인터뷰




문제: https://leetcode.com/problems/merge-two-sorted-lists/