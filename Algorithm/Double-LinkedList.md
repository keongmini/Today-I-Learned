## 이중 연결리스트 이해하기

### leetcode 641. Design Circular Deque

원형 데크 구현하기

**데크** : 양쪽으로 모두 삽입과 삭제가 가능한 자료형  
아래와 같이 collections 모듈에서 deque함수를 불러다 사용할 수 있다.  collections.deque()는 이중연결리스트로 구현되어있다. 
```
import collections
dq = collections.deque()
```

아래 코드는 이중연결리스트를 구현하여 원형데크를 직접 구현한 풀이이다. 양쪽에서 동일하게 삽입과 삭제를 하므로 _add, _del 함수로 각 기능을 미리 정의하여 사용했다.  
처음 연결리스트는 아래와 같이 연결되어있다.  
```head <-> tail```  
1. insertFront(1)을 하면 아래와 같이 head의 right와 원래 head의 right였던 tail의 left가 새로운 값(1)과 연결된다.   
```head <-> 1 <-> tail```   
2. insertLast(2)를 하면 아래와 같이 tail의 left와 원래 tail의 left였던 1의 right가 새로운 값(2)과 연결된다.  
```head <-> 1 <-> 2 <-> tail```   

-> 양쪽으로 삽입하는 과정은 동일하게 연결리스트의 기존 연결을 끊고 새로운 값과 재연결하는 방식이고 해당 과정은 _add에서 수행한다.

3. deleteFront()를 하면 head의 right의 right인 2의 left가 head가 되고 head의 right는 2가 된다. 따라서, 1은 제거된다.  
```head <-> 2 <-> tail```   
4. deleteLast()을 하면 tail의 left의 left인 head의 right가 tail이 되고 tail의 left는 head가 된다. 따라서, 2는 제거된다.  
```head <-> tail```   

-> 양쪽에서 삭제하는 과정도 동일하게 연결리스트의 연결을 재연결하는 방식이기 때문에 해당 과정은 _del에서 수행한다.

**=> head와 tail은 각각 앞뒤에 고정되어있고 값들의 left와 right가 어떤 node와 연결되는지를 이용하여 이중연결리스트를 구현했다.**

**최종코드**

```
class MyCircularDeque:

    def __init__(self, k: int):
        self.head, self.tail = ListNode(None), ListNode(None)
        self.k, self.len = k, 0
        self.head.right, self.tail.left = self.tail, self.head
    
    def _add(self, node: ListNode, new: ListNode):
        n = node.right
        node.right = new
        new.left, new.right = node, n
        n.left = new
        
    def _del(self, node: ListNode):
        n = node.right.right
        node.right = n
        n.left = node

    def insertFront(self, value: int) -> bool:
        if self.len == self.k:
            return False
        self.len += 1
        self._add(self.head, ListNode(value))
        return True

    def insertLast(self, value: int) -> bool:
        if self.len == self.k:
            return False
        self.len += 1
        self._add(self.tail.left, ListNode(value))
        return True

    def deleteFront(self) -> bool:
        if self.len == 0:
            return False
        self.len -= 1
        self._del(self.head)
        return True

    def deleteLast(self) -> bool:
        if self.len == 0:
            return False
        self.len -= 1
        self._del(self.tail.left.left)
        return True

    def getFront(self) -> int:
        return self.head.right.val if self.len else -1

    def getRear(self) -> int:
        return self.tail.left.val if self.len else -1

    def isEmpty(self) -> bool:
        return self.len == 0

    def isFull(self) -> bool:
        return self.len == self.k
```

참고 풀이: 파이썬 알고리즘 인터뷰




문제: https://leetcode.com/problems/design-circular-deque/