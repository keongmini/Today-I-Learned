## Runner 기법을 이용한 연결리스트 풀이

### leetcode 234. Palindrome Linked List

앞뒤 대칭으로 똑같은 연결리스트일 경우 true, 아닐경우 false 출력

**Runner 기법**   
런너를 두개 설정 -> 빠른런너, 느린런너  
빠른런너는 두칸씩 앞으로 가고 느린런너는 한칸씩 앞으로 이동하면 빠른런너가 끝까지 모두 이동했을때 느린런너는 중간에 멈추게 됨  
이동하는 도중에 역순으로 가는 rev를 하나 설정하여 빠른런너와 느린런너가 이동할 때 rev도 하나씩 앞으로 이동하면서 next를 그전 rev를 가리키도록 설정

결국 끝까지 모두 돌았을때,  
fast: 가장 마지막에 도착(마지막 node 아니면 None)  
slow: 중간에 도착 - 중간을 기준으로 리스트의 뒷부분으로 연결  
rev: 중간에 도착 - 중간을 기준으로 리스트의 앞부분으로 연결  
 
=> slow와 rev를 하나씩 비교하면서 결과 출력  


<img src="https://user-images.githubusercontent.com/88446465/163287763-29507ab3-8945-4dd7-a9eb-b99c5ab86072.jpg" width="600" height="450" /><br/>


```
class Solution:
    def isPalindrome(self, head: Optional[ListNode]) -> bool:
        rev = None
        slow = fast = head
        
        while fast and fast.next:
            fast = fast.next.next
            rev, rev.next, slow = slow, rev, slow.next
        if fast:
            slow = slow.next
        
        while rev and rev.val == slow.val:
            slow, rev = slow.next, rev.next
        
        return not rev
```

참고 풀이: 파이썬 알고리즘 인터뷰


문제: https://leetcode.com/problems/palindrome-linked-list/ 
