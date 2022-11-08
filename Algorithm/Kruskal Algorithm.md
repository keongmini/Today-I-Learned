## Kruskal Algorithm 크루스칼 알고리즘

### 크루스칼 알고리즘과 MST(최소 신장 트리)

1. 크루스칼 알고리즘: 최소 신장 트리 알고리즘 중 하나

> 신장트리(Spanning tree): 그래프의 모든 정점 포함, 정점 간 연결은 있지만 사이클은 없는 그래프  
> -> 정점 개수 n개, 간선 개수 n-1개  
> 최소 신장 트리(MST, Minimum Spanning Tree): 간선에 가중치가 다 다를 때, 가중치의 합이 최소가 되는 신장 트리

2. 크루스칼 알고리즘 과정  
  - 가중치를 기준으로 간선 정보 정렬
  - 정렬 순서대로 확인하되 사이클이 생기는 경우 뛰어넘기
  - 모든 간선을 확인할 때까지 진행

3. 사이클 여부 판단 - [Union-Find](https://github.com/keongmini/Today-I-Learned/blob/master/Algorithm/Union-Find.md) 사용
  

참고.  
[알고리즘 - 크루스칼 알고리즘(Kruskal Algorithm), 최소 신장 트리(MST)](https://chanhuiseok.github.io/posts/algo-33/)
