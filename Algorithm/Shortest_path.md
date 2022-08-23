## 최단 경로 알고리즘

### 최단 경로 문제 풀이 방법

1. **다익스트라 최단 경로**  
  여러 개의 노드가 있는 그래프에서 *특정 노드에서 출발하여 다른 노드로 가는 각각 최단 경로* 구하기 
  - 음의 간선이 없을 때 동작 
  - 그리디 알고리즘 중 하나 
  - '각 노드에 대한 현재까지의 최단 거리' 정보를 1차원 배열에 저장 -> 처리하고 있는 노드를 기준으로 최단 거리 정보를 이용하여 리스트 계속 갱신 

[다익스트라 문제 풀이 방법]
1. 초기 상태에서 노드 사이 거리를 무한의 숫자로 초기화(ex. 9999999, int(1e9))
2. 출발 노드와 다른 노드 사이의 거리로 리스트 갱신
3. 출발 노드와 연결되어있는 다른 노드 중 최단거리가 가장 짧은 노드로 기준점을 이동 -> 새로운 기준점에서 다른 노드까지의 거리 + 새로운 기준점과 출발노드 사이의 거리 를 구해 해당 값이 더 작으면 리스트 갱신
4. 위의 과정을 반복
5. 끝!

* 방문하지 않은 노드 중에서 가장 최단거리가 짧은 노드 선택 - 이때 선택된 노드는 최단거리 픽스  
  -> 한 단계당 하나의 노드에 대한 최단 거리를 확실히 찾는 것!
  
1) 간단한 다익스트라 알고리즘 풀이
```
import sys

input = sys.stdin.readline
INF = int(1e9)      # 초기값 - 무한 

n, m = map(int, input().split())        # n, m = 노드 개수, 연결 정보 개수 

start = int(input())                    # 출발 노드 

graph = [[] for i in range(n+1)]        # 연결 정보 저장 리스트 

visited = [False] * (n+1)               # 방문 여부 저장 리스트

distance = [INF] * (n+1)                # 최단 거리 저장 리스트(result)

# 연결 정보 리스트에 저장 
for _ in range(m):
    a,b,c = map(int, input().split())
    graph[a].append((b,c))

# 현재 기준인 노드에서 가장 최단 거리인 노드 찾는 함수
def get_smallest_node():
    min_value = INF
    index = 0
    for i in range(1, n+1):
        if distance[i] < min_value and not visited[i]:
            min_value = distance[i]
            index = i
    return index

def dijkstra(start):
    # 출발 노드 방문 처리, 출발노드와 연결되어있는 노드 거리 저장 
    distance[start] = 0
    visited[start] = True
    for j in graph[start]:
        distance[j[0]] = j[1]
    
    # 출발 노드와 최단 거리인 노드 찾아서 기준점 설정 후 다른 노드와의 최단거리 갱신 
    for i in range(n-1):
        now = get_smallest_node()
        visited[now] = True

        for j in graph[now]:
            cost = distance[now] + j[1]

            if cost < distance[j[0]]:
                distance[j[0]] = cost

dijkstra(start)

for i in range(1, n+1):
    if distance[i] == INF:
        print('infinity')
    else:
        print(distance[i])
 ```
 -> 시간 복잡도 O(n^2), n = 노드 개수 - 노드가 10000개를 넘어가면 time out 발생
 
2) 개선된 다익스트라 알고리즘 풀이  
  - 최악의 경우에도 시간복잡도 O(ElogN) 보장, E = 간선개수, N = 노드개수
  - **힙 자료구조** : 우선순위가 가장 높은 데이터를 가장 먼저 삭제 
    > 파이썬 힙 라이브러리: PriorityQueue, heapq 중 heapq가 더 빠름   
    > heapq 라이브러리는 최소힙이 디폴트이기 때문에 최단 경로 문제에 사용하기 적합  
    > 큐에 데이터 묶음을 넣으면 첫번째 원소를 기준으로 정렬

[우선순위 큐를 이용한 다익스트라 알고리즘 작동방식]
1. 우선순위큐에 값을 (거리, 노드) 형태의 데이터 묶음으로 저장 -> 여러개의 데이터가 들어올 경우 자동으로 거리가 작은 순서대로 정렬
2. 큐 앞에서부터 값을 하나씩 꺼내옴 -> 거리가 작은 순서대로 과정 반복 
3. 현재 최단거리보다 큰 거리의 값이 나오면 해당 원소 무시
4. 끝!

```
import sys
import heapq

input = sys.stdin.readline
INF = int(1e9)

n, m = map(int, input().split())

start = int(input())

graph = [[] for i in range(n+1)]

distance = [INF] * (n+1)

for _ in range(m):
    a,b,c = map(int, input().split())
    graph[a].append((b,c))

def dijkstra(start):
    q = []
    
    # 출발노드 방문 처리 
    heapq.heappush(q, (0, start))
    distance[start] = 0

    while q:
        # 최단거리를 갖는 거리와 노드 - 기준점으로 설정
        dist, now = heapq.heappop(q)
        
        # 기준점 노드의 현재 거리가 더 짧을 경우 무시 
        if distance[now] < dist:
            continue
        
        # 기준점 노드의 연결 정보를 돌면서 최단거리 갱신 + 큐에 정보 저장 
        for i in graph[now]:
            cost = dist + i[1]

            if cost < distance[i[0]]:
                distance[i[0]] = cost
                heapq.heappush(q, (cost, i[0]))

dijkstra(start)

for i in range(1, n+1):
    if distance[i] == INF:
        print('infinity')
    else:
        print(distance[i])
```
-> 간단한 다익스트라 알고리즘과 비교하면, 최단 거리인 노드를 찾는 get_smallest_node() 함수 과정이 필요하지 않음 -> 우선순위 큐로 해결!


1. **플로이드 워셜 알고리즘**  
  *모든 지점에서 다른 모든 지점까지의 최단경로* 구하는 문제 
  - 거쳐가는 노드를 기준으로 처리 하지만 매번 방문하지 않은 노드 중에서 최단거리를 찾을 필요x
  - 시간 복잡도 O(n^3):  노드 개수 N개 일 때 단계마다 O(N^2)의 연산 처리 
  - 2차원 리스트에 최단거리 정보 저장 
  - 다이나믹 프로그래밍 중 하나
  - 노드와 노드 사이에 바로 이동하는 거리와 특정 노드를 거쳐서 이동하는 거리를 비교

[플로이드 워셜 문제 풀이 방법]
1. 초기 상태에서 2차원 배열에 연결되어있는 노드는 거리를 저장, 연결되어있지 않은 노드는 무한의 값 저장 
2. 1번노드를 거쳐가는 최단거리로 갱신
3. 2번노드를 거쳐가는 최단거리로 갱신
4. 위의 과정을 노드 개수만큼 반복  

```
INF = int(1e9)

n = int(input())        # 노드 개수 
m = int(input())        # 연결 정보 개수 

graph = [[INF] * (n + 1) for _ in range(n + 1)]        # 무한 값으로 2차원 배열 설정 

# 자기 자신과의 거리 = 0 
for a in range(1, n+1):
    for b in range(1, n+1):
        if a == b:
            graph[a][b] = 0

# 연결정보 저장 함수 
for _ in range(m):
    a, b, c = map(int, input().split())
    graph[a][b] = c

# 플로이드 워셜 알고리즘
for k in range(1, n+1):             # 거쳐가는 노드 
    for a in range(1, n+1):         # 출발 노드 
        for b in range(1, n+1):     # 도착 노드 
            graph[a][b] = min(graph[a][b], graph[a][k] + graph[k][b])

# 2차원 배열 형태로 출력 
for a in range(1, n+1):
    for b in range(1, n+1):
        if graph[a][b] == INF:
            print("INFINITY")
        else:
            print(graph[a][b], end=" ")
    print()
```



참고: 이것이 취업을 위한 코딩테스트다




 
