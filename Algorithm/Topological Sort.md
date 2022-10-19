## 위상정렬(Topological Sort)


* 위상정렬
  - 순서가 있는 일을 차례대로 처리하는 처리해줄 때 사용하는 알고리즘  
  - 다양한 순서가 있을 수 있기 때문에 여러개의 답 존재  
  - **DAG(Directed Acyclic Graph, 비순환 그래프)** 에만 적용 가능, 위상정렬은 첫 시작이 존재 해야함 - 순환구조일 경우 시작이 존재 하지 않기 때문에 사용할 수 없음 

* 위상정렬 수행 방법
  > 스택과 큐 모두 사용 가능
  
  1. 진입차수가 0인 노드 찾기 (진입차수 : 해당 노드로 연결되는 노드의 개수)
  2. 노드에 연결되어있는 노드들의 진입차수 하나씩 제거 했을 때 0이 되는 노드들을 큐에 저장
  3. 큐에 저장된 노드를 하나씩 꺼내면서 2번 과정 반복
  4. 큐가 비었을 때 종료 - 이때 모든 노드를 방문하지 않았다면 사이클이 존재한다는 의미

<img src="https://logicmojo.com/assets/dist/new_pages/images/topoeg.png" width="500">
출처 : https://logicmojo.com/topological-sort-problem

**참고** [위상정렬](https://m.blog.naver.com/ndb796/221236874984)
