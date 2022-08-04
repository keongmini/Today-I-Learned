## DFS, BFS 문제풀이 방법

### DFS

> [그래프를 표현하는 방식]
> * 인접행렬: 2차원 배열로 그래프의 연결관계를 표현 - 파이썬의 2차월 리스트로 구현 가능
> * 인접리스트: 리스트로 그래프의 연결 관계를 표현 - 연결리스트로 구현

* **DFS**: 깊이우선탐색, 그래프에서 깊은 부분을 우선적으로 탐색하는 알고리즘

**[스택을 이용한 BFS 동작과정]**
1. 번호가 낮은 숫자를 시작노드로 설정 - 스택에 삽입(방문처리)
2. 시작노드의 인접 노드 중에서 숫자가 낮은 노드 스택에 삽입
3. 2번에서 선택한 노드의 인접 노드 중에서 또 숫자가 낮은 노드 스택에 삽입
4. 위의 과정을 반복하다 인접 노드가 없는 경우 스택에 삽입한 노드를 제거 - 다시 이전 노드로 돌아감
5. 현재 노드의 또 다른 인접 노드 스택에 삽입

-> 데이터 개수가 N개인 경우, O(N)의 시간복잡도를 갖는다.
-> 스택을 이용하는 알고리즘이기 때문에 재귀함수로도 간결하게 구현가능

```
def dfs(graph, v, visited):
    visited[v] = True

    for i in graph[v]:
        if not visited[i]:
            dfs(graph, i, visited)

graph = [
    [],
    [2,3,8],
    [1,7],
    [1,4,5],
    [3,5],
    [3,4],
    [7],
    [2,6,8],
    [1,7]
]

visited = [False] * 9

dfs(graph, 1, visited)
```


### BFS

* **BFS**: 너비우선탐색, 가까운 노드부터 탐색하는 알고리즘 <-> DFS: 가장 멀리 있는 노드부터 탐색

**[큐를 이용한 BFS 동작방식]**
1. 시작노드를 큐에 삽입(방문처리)
2. 시작노드 큐에서 삭제 -> 시작노드의 인접 노드들을 모두 큐에 삽입
3. 삽입한 노드 중 맨 앞에 있는 노드 삭제 -> 삭제한 노드의 인접 노드 삽입
4. 위 과정을 반복

-> 큐에 기초하여 구현 - collections.deque 사용
-> O(N)의 시간복잡도 소요

```
from collections import deque

def bfs(graph, start, visited):
    queue = deque([start])
    visited[start] = True

    while queue:
        v = queue.popleft()

        for i in graph[v]:
            if not visited[i]:
                queue.append(i)
                visited[i] = True

graph = [
    [],
    [2,3,8],
    [1,7],
    [1,4,5],
    [3,5],
    [3,4],
    [7],
    [2,6,8],
    [1,7]
]

visited = [False] * 9

bfs(graph, 1, visited)
```

참고: 이것이 취업을 위한 코딩테스트다.