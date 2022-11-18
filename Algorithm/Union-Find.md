## Union Find(합집합 찾기) 알고리즘

* Union Find: 대표적인 그래프 알고리즘, 서로소집합(Disjoint Set) 알고리즘 = 합집합 찾기 알고리즘  
  여러 개의 노드가 존재할 때 두 개의 노드를 선택해서 두 노드가 같은 그래프에 속하는지 판별
  
1. 연결성 표현: 연결되어있는 두 노드 중 더 작은 값을 부모로 설정(Union), 기본값은 자기 자신을 부모로 설정
   - 1과 2가 연결된 경우: 2의 부모는 1  
   - 2와 3이 연결된 경우: 3의 부모는 2  
   -> 부모 노드만 보고는 연결관계 한번에 파악 x => 재귀함수 이용해서 최상위 부모 노드를 찾아줘야 함(3의 부모는 1)

2. 같은 집합에 속하는지 확인(Find): 두개의 노드를 선택해서 노드의 부모가 동일할 경우 같은 그래프임

```python
def getParent(parent, x):
    if parent[x] == x:
        return x
    parent[x] = getParent(parent, parent[x])
    return parent[x]

def unionParent(parent, a, b):
    a = getParent(parent, a)
    b = getParent(parent, b)

    if a < b:
        parent[b] = a
    else:
        parent[a] = b

def findParent(parent, a, b):
    a = getParent(parent, a)
    b = getParent(parent, b)

    if a == b:
        return 1
    return 0

parent = [i for i in range(11)]
unionParent(parent, 1, 2)
unionParent(parent, 2, 3)
unionParent(parent, 3, 4)
unionParent(parent, 5, 6)
unionParent(parent, 6, 7)
unionParent(parent, 7, 8)
print(findParent(parent, 1, 5))     # 0
unionParent(parent, 1, 5)
print(findParent(parent, 1, 5))     # 1
```

참고.  
[Union-Find(합집합 찾기)](https://blog.naver.com/ndb796/221230967614)  
[18강 - 합집합 찾기(Union-Find) [ 실전 알고리즘 강좌(Algorithm Programming Tutorial) #18 ]](https://www.youtube.com/watch?v=AMByrd53PHM)

