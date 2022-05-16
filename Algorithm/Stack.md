## Stack 이용한 풀이

### leetcode 739. Daily Temperatures  

매일의 온도가 나열되어있는 리스트가 주어졌을 때 더 따뜻해지려면 며칠을 더 기다려야하는지 출력  
이 문제를 '더 큰 숫자가 나오기 전까지 얼마만큼의 인덱스를 이동해야하는지'로 이해하면 좀 더 풀기 쉽다.  
그럼 결국 구하고자 하는 차이는 인덱스의 차이만큼이다. 예를들어, 첫번째 리스트 값 73보다 더 큰 숫자가 나오려면 그 바로 다음 값인 74까지만 이동하면 된다. 즉, 1칸 이동하므로 기다린 날짜가 1일이다.

이 문제에서 활용할 점  
1. 리스트 인덱스를 이용해서 자리마다 값 업데이트 해주기  
   **answer** 는 주어진 리스트만큼의 크기를 갖는 리스트이다. 해당 온도마다 기다려야 하는 날짜를 같은 인덱스의 자리에 넣어주게 되면 반복문을 전체 다 돌았을 때 원하는 값을 반환해준다.  
   반복문을 통해 그 다음값으로 이동하고 그 다음값이 해당 인덱스값보다 클 경우 '이동한 값의 인덱스 - 해당 값의 인덱스'는 기다려야 하는 날짜고 anwer에서 해당 값의 인덱스 자리에 넣어주면 된다.
1. 스택을 이용하는 방법
   지금 비교하고자 하는 온도 값의 인덱스를 stack에 저장해놨다가 그 다음 값을 돌았을 때 그 값의 인덱스와 비교하여 답을 구한다. 스택을 이용하는게 의미 있는 이유는 결국 더 큰 값이 나오게 되면 가장 먼저 
   비교가 필요한 값은 바로 전에 있던 값이다. 그 값보다도 크면 이전에 스택에 저장해놨던 값보다는 당연히 클 수 밖에 없기 때문에. 스택은 더 늦게 들어온 값이 가장 빨리 나가기 때문에 이 경우에 이용하는 게 
   적절하다. 만약 그냥 리스트를 사용한다면 굳이 비교하지 않아도 되는 값까지 비교하여 runtime이 늘어나게 될 것이다.  


**주의**  
for문 내에서 조건을 확인할 때 if문 말고 while문 사용!  
이유는 stack에 있는 값 모두 온도를 비교해줘야 하기 때문에  



```
class Solution:
    def dailyTemperatures(self, temperatures: List[int]) -> List[int]:
        answer = [0 for i in temperatures]
        stack = []
        for i, cur in enumerate(temperatures):
            while stack and cur > temperatures[stack[-1]]:
                last = stack.pop()
                answer[last] = i - last
            stack.append(i)
        
        return answer
```

참고 풀이: 파이썬 알고리즘 인터뷰




문제: https://leetcode.com/problems/daily-temperatures/