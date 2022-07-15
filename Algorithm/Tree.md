## 트리 이해하기

### leetcode 104. Maximum Depth of Binary Tree

**트리** : 계층형 트리 구조를 시뮬레이션 하는 추상 자료형으로, 루트값과 부모-자식 관계의 서브트리로 구성, 서로 연결된 노드의 집합

* 그래프와 트리의 차이점 : 트리는 순환구조를 갖지 않는 그래프 - 한번 연결된 노드가 다시 연결 x, 단방향 그래프, 하나의 부모만 갖음

* 이진트리 : 각 노드가 2개 이하의 자식을 갖는 트리(모든 노드의 차수가 2 이하)  
  1. 정이진트리 : 모든 노드가 0개 or 2개의 자식 노드를 갖는 트리
  2. 완전이진트리 : 마지막 레벨을 제외하고 모든 레벨이 완전히 채워져있으며 마지막 레벨의 노드가 왼쪽 부터 채워진 트리
  3. 포화이진트리 : 모든 노드가 2개의 자식을 갖고 있는 트리

**이진트리의 최대 깊이를 bfs로 구해보기!**

bfs는 재귀가 아닌 반복구조로 풀이해야 함  
이진트리의 깊이를 구하려면 루트 노드부터 자식 노드의 존재 여부를 확인해야 한다. -> bfs로 풀이 가능  

각 노드의 자식 노드 존재 여부 확인 후 해당 자식 노드의 자식 노드로 이동해야함, 각 노드마다 최대 두개씩 노드를 갖기 때문에 큐를 이용하여 하나씩 확인

레벨 하나씩 확인할 때마다 깊이가 하나씩 플러스됨 

왼쪽부터 확인하기 위해 데크로 변형 후 ```popleft()```를 사용함

```
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        if root is None:
            return 0 
        que = collections.deque([root])
        depth = 0
        
        while que:
            depth += 1
            
            for _ in range(len(que)):
                cur_root = que.popleft()
                if cur_root.left:
                    que.append(cur_root.left)
                if cur_root.right:
                    que.append(cur_root.right)
        
        return depth
```


참고 풀이: 파이썬 알고리즘 인터뷰




문제: https://leetcode.com/problems/maximum-depth-of-binary-tree/