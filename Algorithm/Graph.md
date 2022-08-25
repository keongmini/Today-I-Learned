## 그래프 알고리즘

### 추가적으로 알아둘 그래프 알고리즘

* 그래프 : 노드와 노드 사이에 연결된 간선의 정보를 가지고 있는 자료구조  
  '서로 다른 개체가 연결되어있다' => 그래프 알고리즘
  
[구현방법]  
- 인접행렬: 간선 정보를 저장하기 위해 O(N^2) 공간복잡도(N - 노드의 개수) - ex. 플로이드 워셜 알고리즘  
- 인접리스트: 간선의 개수만큼 O(E) 공간복잡도 

1. 서로소 집합 자료구조  
  서로소 부분 집합들로 나누어진 원소들의 데이터를 처리하기 위한 자료구조  
  > 서로소 집합: 공통 원소가 없는 두 집합  
  
  [서로소 집합 연산]  
    - union(합집합): 2개의 원소가 포함된 집합을 하나의 집합으로 합치는 연산   
    - find(찾기): 특정한 원소가 속한 집합이 어떤 집합인지 알려주는 연산 

  ```
  def find_parent(parent, x):
    if parent[x] != x:
        return find_parent(parent, parent[x])
    return x

  def union_parent(parent, a, b):
      a = find_parent(parent, a)
      b = find_parent(parent, b)
      if a < b:
          parent[b] = a
      else:
          parent[a] = b

  v, e = map(int, input().split())
  parent = [0] * (v + 1)

  for i in range(1, v+1):
      parent[i] = i

  for i in range(e):
      a, b = map(int, input().split())
      union_parent(parent, a, b)

  print('각 원소가 속한 집합: ', end="")
  for i in range(1, v+1):
      print(find_parent(parent, i), end=" ")

  print()

  print('부모 테이블: ', end="")
  for i in range(1, v+1):
      print(parent[i], end=" ")
  ```
  -> find함수 시간복잡도 O(N) -> 경로 압축 기법을 통해 시간복잡도 개선 가능
  
  ```
  def find_parent(parent, x):
    if parent[x] != x:
        parent[x] = find_parent(parent, parent[x])
    return parent[x]
  ```
  
  [사이클 판별 알고리즘]  
  무방향 그래프에서 사이클 판별하기!  
  ```
  def find_parent(parent, x):
    if parent[x] != x:
        parent[x] = find_parent(parent, parent[x])
    return parent[x]

  def union_parent(parent, a, b):
      a = find_parent(parent, a)
      b = find_parent(parent, b)
      if a < b:
          parent[b] = a
      else:
          parent[a] = b

  v, e = map(int, input().split())
  parent = [0] * (v + 1)

  for i in range(1, v+1):
      parent[i] = i

  cycle = False

  for i in range(e):
      a, b = map(int, input().split())
      if find_parent(parent, a) == find_parent(parent, b):
          cycle = True
          break
      else:
          union_parent(parent, a, b)

  if cycle:
      print('사이클 발생')
  else:
      print('사이클 발생x')
  ```
  
2. 신장 트리  
하나의 그래프가 있을 때 모든 노드를 포함하면서 사이클이 존재하지 않는 부분 그래프   

  - 크루스칼 알고리즘: 최소비용으로 만들 수 있는 신장트리를 찾는 알고리즘인 최소 신장 트리 알고리즘 중 하나(그리디 알고리즘)  
    가장 거리가 짧은 간선부터 차례대로 집합에 추가, 이때 사이클을 발생시키는 간선 제외  
    ```
    def find_parent(parent, x):
    if parent[x] != x:
        parent[x] = find_parent(parent, parent[x])
    return parent[x]

    def union_parent(parent, a, b):
        a = find_parent(parent, a)
        b = find_parent(parent, b)
        if a < b:
            parent[b] = a
        else:
            parent[a] = b

    v, e = map(int, input().split())
    parent = [0] * (v + 1)

    edges = []
    result = 0

    for i in range(1, v+1):
        parent[i] = i

    for _ in range(e):
        a, b, cost = map(int, input().split())
        edges.append((cost, a, b))

    edges.sort()

    for edge in edges:
        cost, a, b = edge

        if find_parent(parent, a) != find_parent(parent, b):
            union_parent(parent, a, b)
            result += cost

    print(result)
    ```
    -> O(ElogE) 시간복잡도, E 간선개수
    
3. 위상정렬   
방향 그래프의 모든 노드를 방향성에 맞게 순서대로 나열   

[작동 방식]
1. 진입차수가 0인 노드를 큐에 담기
    > 집입차수: 해당 노드를 가리키고 있는 간선의 개수
2. 큐에서 원소 하나를 꺼내서 해당 원소에서 출발하는 간선 제거
3. 진입차수 0인 노드 큐에 담기
4. 위의 과정 반복

```
from collections import deque

v, e = map(int, input().split())
indegree = [0] * (v+1)          # 진입차수
graph = [[] for i in range(v+1)]

for _ in range(e):
    a, b = map(int, input().split())
    graph[a].append(b)
    indegree[b] += 1

def topology_sort():
    result = []
    q = deque()

    for i in range(1, v+1):
        if indegree[i] == 0:
            q.append(i)

    while q:
        now = q.popleft()
        result.append(now)

        for i in graph[now]:
            indegree[i] -= 1

            if indegree[i] == 0:
                q.append(i)

    for i in result:
        print(i, end=" ")

topology_sort()
```
-> 시간복잡도 O(V + E) 

참고. 이것이 취업을 위한 코딩테스트다.
