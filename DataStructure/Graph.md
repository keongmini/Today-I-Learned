## 그래프 탐색 자료구조

### 그래프 탐색 자료구조: DFS vs BFS

**그래프 순회(그래프 탐색):** 그래프의 각 정점을 방문하는 과정  
1. DFS 깊이 우선 탐색
    
    주로 스택, 재귀로 구현
    
2. BFS 너비 우선 탐색
    
    주로 큐로 구현, 그래프의 최단 경로를 구하는 문제에서 사용
    


**그래프를 표현하는 방법:** 인접행렬 / 인접리스트

> 인접리스트 : (딕셔너리)출발노드를 키, 도착 노드를 값으로 표현, 이때 도착 노드는 여러개가 될 수 있으니까 리스트로 표현

**DFS**

1. 재귀로 구현
    
    ```python
    def recursive_dfs(v, discovered=[]):
    	discovered.append(v)
    	for w in graph[v]:
    		if w not in discovered:
    			discovered = recursive_dfs(w, discovered)
    	return discovered
    ```
    

1. 스택으로 구현(반복구조)
    
    ```python
    def iterative_dfs(start_v):
    	discovered = []
    	stack = [start_v]
    	while stack:
    		v = stack.pop()
    		if v not in discovered:
    			discovered.append(v)
    			for w in graph[v]:
    				stack.append(w)
    	return discovered
    ```
    

재귀와 스택의 차이: 재귀는 사전식 순서로 방문, 스택은 역순으로 방문

**BFS**

DFS보다는 적게 쓰이지만 최단경로를 찾는 다익스트라 알고리즘에서 유용하게 사용

1. 큐로 구현(반복구조)
    
    ```python
    def iterative_bfs(start_v):
    	discovered = [start_v]
    	queue = [start_v]
    	while queue:
    		v = queue.pop(0)
    		for w in graph[v]:
    			if w not in discovered:
    				discovered.append(w)
    				queue.append(w)
    	return discovered
    ```
    

* BFS는 재귀로 구현 불가 


* 백트래킹  
해결책에 대한 후보를 구출해 나아가다 가능성이 없다고 판단되는 즉시 후보를 포기해 정답을 찾아가는 범용적 알고리즘  
DFS와 함께 등장, DFS와 같은 방식으로 탐색하는 모든 방법, DFS는 백트래킹의 골격을 이루는 알고리즘  
백트래킹은 가보고 되돌아오는 것을 반복함, 운이 좋으면 적은 시행착오로 목적지에 도착할 수 있지만 최악의 경우 모든 경우를 다 확인해야함 → 브루타포스와 유사하지만 한번 방문 후 가능성이 없으면 포기한다는 차이점이 있음


**참고:** 파이썬 알고리즘 인터뷰