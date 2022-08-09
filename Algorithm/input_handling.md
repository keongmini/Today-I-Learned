## 파이썬 입력처리

### 입력할 데이터가 많을 경우, 입력 처리 방법

* 데이터의 개수가 많은 문제에 input() 을 사용하면 시간초과 발생
* **sys 라이브러리 사용**

```
import sys

input_data = sys.stdin.readline().rstrip()
```

readline() 후에 엔터를 공백으로 처리 -> rstrip() 으로 공백 제거 필수!!

