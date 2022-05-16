## 전가산기 구현

### leetcode 2. Add Two Numbers  

역순으로 이어져 있는 연결리스트 두개를 더해서 결과 출력  

연결리스트 각 자리 수끼리 더하되 올림하는 수가 있을경우 그 다음 자리수를 더할 때 함께 더해준다. => 전가산기랑 동일한 작동방식  

각자리수의 값을 더하여 그 값이 두자리수일 경우 10으로 나누면 몫과 나머지를 구할 수 있다. 즉, 나머지를 냅두고 몫은 다음 자리수 합할 때 함께 더해주면 된다.  
몫과 나머지를 한번에 출력해주는 파이썬 내장함수 **divmod()** 를 이용 -> divmod(x,y) : x를 y로 나눈 몫과 나머지를 tuple의 형태로 반환해줌  
(divmod() 대신 사용할 수 있는 방법 : 몫 = x//y, 나머지 x % y)  

* 헷갈리는 부분  
 
```
root = head = ListNode()
```
head는 결과 값을 연결리스트로 이어줄 때 사용, 결국 root나 head나 같은 연결리스트를 바라보고 있기 때문에 head는 계속 이동하지만 root는 전체리스트를 처음부터 바라보고 있다. 따라서 답은 root로 반환 


```
return root.next
```
의미있는 값은 root와 head의 next값부터 연결되기 때문에 최종 답은 root.next로 반환


**최종 답**  
```
class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        root = head = ListNode()
        
        carry = 0
        while l1 or l2 or carry:
            sum = 0
            
            if l1:
                sum += l1.val
                l1 = l1.next
            if l2:
                sum += l2.val
                l2 = l2.next
            
            carry, val = divmod(sum+carry, 10)
            head.next = ListNode(val)
            head = head.next
        
        return root.next
```

참고 풀이: 파이썬 알고리즘 인터뷰




문제: https://leetcode.com/problems/add-two-numbers/