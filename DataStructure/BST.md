## 이진탐색

### 이진탐색(검색)과 이진탐색트리(BST)

> * 순차탐색: 리스트 안에 있는 특정한 데이터를 찾기 위해 앞에서부터 데이터를 하나씩 차례대로 확인하는 방법  
> -> 정렬되지 않은 리스트에서 데이터를 찾아야할 때 사용  <-> 이진탐색 
> 데이터개수 N개 -> 시간 복잡도 O(N)

* **이진탐색(이진검색)**  
  배열 내부의 데이터가 정렬되어있어야만 사용 가능(정렬된 배열에서 타겟을 찾는 알고리즘)  
  위치를 나타내는 변수 3개 사용 -> 시작점, 끝점, 중간점 -> 찾으려는 데이터와 중간점 위치에 있는 데이터를 반복적으로 비교(이진탐색과정)  
  
> 이진검색트리와 이진검색은 유사한 점이 많지만 이진검색트리는 정렬된 구조를 탐색하는 자료구조이고 이진 검색은 정렬된 배열에서 값을 찾는 알고리즘이라는 점에서 차이가 있음  
> -> 시간복잡도 O(log n)
  
```
# 재귀 풀이
def binary_search(array, target, start, end):
    if start > end:
        return None
    mid = (start + end) // 2

    if array[mid] == target:
        return mid
    elif array[mid] > target:
        return binary_search(array, target, start, mid-1)
    else:
        return binary_search(array, target, mid+1, end)

# 반복문 풀이
def binary_search(arrary, target, start, end):
    while start <= end:
        mid = (start + end) // 2

        if arrary[mid] == target:
            return mid
        elif arrary[mid] > target:
            end = mid - 1
        else:
            start = mid + 1

    return None

n, target = [10, 7]
array = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]

result = binary_search(array, target, 0, n-1)
if result == None:
    print('원소가 존재하지 않습니다.')
else:
    print(result+1)     # 값의 위치 = 4
```

- - -

* 이진트리 : 정렬여부와 관계없이 모든 노드가 둘 이하의 자식을 갖는 단순 트리 형태
* **이진탐색트리** : 정렬된 트리, 노드의 왼쪽 서브트리에는 그 노드의 값보다 작은 값들을 지닌 노드 & 오른쪽 서브트리에는 그 노드의 값과 같거나 큰 값을 지닌 노드로 이루어진 트리
  -> **장점** 시간복잡도: O(log n)
  
  
<p>
  <img src="https://i.imgur.com/po0R4GB.png" height="350" /><br/>
  <em>출처: https://ratsgo.github.io/data%20structure&algorithm/2017/10/22/bst/ </em>
</p>

예시1) 19를 찾고 싶을 때  
1. 루트노드(22)와 비교 -> 더 작은 숫자이므로 왼쪽
2. 15와 비교 -> 더 큰 숫자이므로 오른쪽
3. 18과 비교 -> 오른쪽
4. 20과 비교 -> 왼쪽
끝!

예시2) 13을 찾고 싶을 때
1. 루트노드(22)와 비교 -> 더 작은 숫자이므로 왼쪽
2. 15와 비교 -> 더 작은 숫자이므로 왼쪽
3. 7과 비교 -> 더 큰 숫자이므로 오른쪽 
4. 10과 비교 -> 더 큰 숫자이므로 오른쪽 
5. null 이므로 존재하지 않는 숫자임을 확인
끝!

**문제점** 랜덤으로 생성해도 대부분 균형이 맞는 트리가 표현되지만 최악의 경우 균형이 깨진 트리가 생성될 수 있음 
  -> 시간복잡도: O(n), 
  이 경우 연결리스트와 다르지 않기 때문에 균형을 맞춰줄 필요가 있음 -> 자가 균형 이진 트리
  
* **자가 균형 이진 탐색 트리** : 삽입, 삭제시 자동으로 높이를 작게 유지하는 노드 기반의 이진 탐색 트리, 


<p>
  <img src="https://velog.velcdn.com/images%2Fchanghee09%2Fpost%2F42c23045-a4d5-481a-ba55-596288b7338f%2Fimage.png" height="350" /><br/>
  <em>출처: https://velog.io/@changhee09/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0-%ED%8A%B8%EB%A6%AC </em>
</p>

불균형 트리의 경우 숫자 7을 찾으려면 7번의 연산이 필요 <-> 균형 트리의 경우 숫자 7을 찾으려면 2번의 연산으로 가능  
-> 성능의 차이가 크기 때문에 트리 높이의 균형을 맞추는 것이 중요

**참고** 파이썬 알고리즘 인터뷰, 이것이 취업을 위한 코딩테스트다. 

