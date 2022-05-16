## 원형 큐 구현

### leetcode 622. Design Circular Queue  

구현해야 하는 함수는 총 6개다.  
**Front()** : 원형큐의 가장 앞에 있는 값 출력, 없으면 -1  
**Rear()** : 원형큐의 가장 뒤에 있는 값 출력, 없으면 -1  
**enQueue(x)** : 값 x를 원형큐에 추가 -> True 출력  
**deQueue()** : 원형큐에서 (맨앞에 있는)값 삭제 -> True 출력  
**isEmpty()** : 비어있는지 출력, Boolean  
**isFull()** : 꽉차있는지 출력, Boolean  

[**문제 풀이 해석**]  
1. 원형의 큐이기 때문에 먼저 얼만큼의 크기를 갖을지 정의한다.  
1. 값으로 바로 비교하지 말고 인덱스를 이용해서 값을 비교한다.  
1. 원형으로 되어있기 때문에 어떤 값이 가장 앞에 있는 값이고 가장 뒤에 있는 값인지 구별하기 어렵다.  
  -> frontIndex와 backIndex를 설정해둔다.
    * enQueue => 값이 뒤로 들어오기 때문에 frontIndex는 영향을 받지 않고 backIndex값이 바뀐다.
    * deQueue => 값이 앞에서 빠지기 때문에 banckIndex는 바뀌지 않고 frontIndex값만 빠진 값의 그 다음 값으로 지정한다.
    ```
    self.frontIndex = (self.frontIndex + 1) % self.maxlen
    ```
1. frontIndex와 backIndex는 원형큐의 크기 이상의 값을 가지면 안된다. 만약 값을 넘어서게 되면 다시 처음의 값으로 돌아가야 한다.  
   전가산기 구현할 때 했던 것처럼 원형큐의 크기로 나누게 되면 max값(원형큐 크기)를 넘었을 때 어떤 인덱스값으로 돌아가야 하는지 나머지를 보고 지정해줄 수 있다.
   * backIndex는 마지막에 들어온 값의 인덱스의 그 다음 인덱스로 미리 설정
   ```
   self.backIndex = (self.backIndex + 1) % self.maxlen
   ```
1. frontIndex 과 backIndex가 동일한 값을 갖게 되면 리스트가 비어있거나 꽉 찼거나
   비어있을 경우) frontIndex나 backIndex에 해당하는 queue의 값이 None이어야 함 <-> 꽉차있을 경우) 값을 가져야 함  
   ```
    def isEmpty(self):
            return self.frontIndex == self.backIndex and self.queue[self.frontIndex] is None

    def isFull(self):
        return self.frontIndex == self.backIndex and self.queue[self.frontIndex] is not None
    ```


[**문제 오답 풀이**]  
조건문에서 아래와 같이 값이 있는지 확인하는 부분을
```
if self.queue[self.backIndex] is None:
```
아래와 같이 작성해서 Wrong Answer 뜸
```
if not self.queue[self.backIndex]:
```
오답처럼 not을 이용해서 확인하게 되면 값이 None일 때 뿐만 아니라 0일 때도 조건문을 충족하게 된다. 이 풀이의 경우 아예 값이 없으면 None으로 보고 0은 false값이 아니라 숫자값으로 
인식해야 하기 때문에 아래와 같이 작성하면 안됨!  



**최종답**
   
```
class MyCircularQueue(object):

    def __init__(self, k):
        self.queue = [None for i in range(k)]
        self.maxlen = k
        self.frontIndex = 0
        self.backIndex = 0
        

    def enQueue(self, value):
        if self.queue[self.backIndex] is None:
            self.queue[self.backIndex] = value
            self.backIndex = (self.backIndex + 1) % self.maxlen
            return True
        else:
            return False
        

    def deQueue(self):
        if self.queue[self.frontIndex] is None:
            return False
        else:
            self.queue[self.frontIndex] = None
            self.frontIndex = (self.frontIndex + 1) % self.maxlen
            return True
        

    def Front(self):
        if self.queue[self.frontIndex] is None:
            return -1
        else:
            return self.queue[self.frontIndex]
        

    def Rear(self):
        if self.queue[self.backIndex - 1] is None:
            return -1
        else:
            return self.queue[self.backIndex - 1]
        

    def isEmpty(self):
        return self.frontIndex == self.backIndex and self.queue[self.frontIndex] is None
        

    def isFull(self):
        return self.frontIndex == self.backIndex and self.queue[self.frontIndex] is not None
        
```

참고 풀이: 파이썬 알고리즘 인터뷰




문제: https://leetcode.com/problems/design-circular-queue/