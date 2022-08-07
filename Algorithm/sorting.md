## 정렬 알고리즘

### 정렬 알고리즘 문제 풀이

* **정렬**: 데이터를 특정한 기준에 따라서 순서대로 나열

1. **선택정렬**: 매번 가장 작은 것을 선택
   가장 작은 데이터를 맨 앞에 있는 데이터와 바꾸고 그 다음으로 작은 데이터를 맨 앞에서 두번째 있는 데이터와 바꾸는 방식을 반복하는 방법

```
array = [7, 5, 9, 0, 3, 1, 6, 2, 4, 8]

for i in range(len(array)):
    min_index = i
    for j in range(i+1, len(array)):
        if array[min_index] > array[j]:
            min_index = j
    array[i], array[min_index] = array[min_index], array[i]   # 스와프 방식: 특정한 리스트가 주어졌을 때 두 변수의 위치를 변경하는 작업 

print(array)
```

-> 시간복잡도 O(n^2): 다른 정렬 라이브러리에 비해 비효율적이지만 가장 작은 데이터를 찾을 때 사용해야함

2. **삽입정렬**: 특정한 데이터를 적당한 위치에 삽입, 모드 원소를 비교 후 위치 변경x
   특정 위치를 선택, 선택한 위치의 앞에 있는 값들은 정렬이 되어있다고 가정 후 정렬되어 있는 값들과 비교하면서 적절한 위치에 값을 넣어줌(데이터가 거의 정렬되어있을 때 효율적)

```
array = [7, 5, 9, 0, 3, 1, 6, 2, 4, 8]

for i in range(len(array)):
    for j in range(i, 0, -1):
        if array[j] < array[j - 1]:
            array[j], array[j - 1] = array[j - 1], array[j]
        else:             # 더 작은 데이터를 만나면 확인할 필요x -> 더 작은 데이터들은 이미 정렬되어있다고 가정하기 때문에 
            break

print(array)
```

-> 시간복잡도 O(n^2): 선택정렬과 동일하게 이중 반복문을 쓰기 때문에 시간복잡도는 동일하지만 만약 거의 정렬되어있는 리스트를 만날 경우 O(n)이 됨
-> 삽입정렬이 비효율적이거나 정렬이 거의 되어있는 상황에서는 퀵정렬 알고리즘보다 강력

3. **퀵정렬**: (가장 많이 사용) 기준을 설정한 다음 큰 수와 작은 수를 교환 후 리스트를 반으로 나누는 동작 방식
   * pivot(피벗): 큰수와 작은수를 교환하기 위한 기준
   * 분할방식:
      1) 리스트의 첫번째 값을 피벗으로 설정
      2) 리스트 왼쪽에서부터 피벗보다 큰 데이터를 선택
      3) 리스트 오른쪽에서부터 피벗보다 작은 데이터를 선택
      4) 위에서 선택한 두가지 데이터의 위치를 변경
      5) 위 과정을 반복하다가 오른쪽에서 찾는 데이터와 왼쪽에서 찾는 데이터의 위치가 엇갈리는 상황 발생 -> 작은 데이터와 **피벗**의 자리를 변경
      6) 피벗을 기준으로 왼쪽에는 작은 데이터들, 오른쪽에는 큰 데이터들만 남게 됨 -> 각 데이터에 대해 다시 정렬 진행
   * 재귀함수와 동작 원리 동일 -> 재귀함수로 간결한 코드 구현 가능
   * 퀵정렬이 끝나는 조건: 데이터의 개수가 1개일때

<p>
  <img src="https://mkblog.co.kr/wp-content/uploads/2018/05/quickSortStep_modifed-1.png" height="350" /><br/>
  <em>출처: https://mkblog.co.kr/c-c-plus-quick-sort-algorithm/ </em>
</p>

```
# 풀이 1
array = [5, 7, 9, 0, 3, 1, 6, 2, 4, 8]

def quick_sort(array, start, end):
    if start >= end: # 종료조건: 데이터가 1개 남았을때
        return

    pivot = start
    left = start + 1
    right = end

    while left <= right:
        while left <= end and array[left] <= array[pivot]:  # 피벗보다 더 큰 값을 찾을 때까지
            left += 1

        while right > start and array[right] >= array[pivot]:  # 피벗보다 더 작은 값을 찾을 때까지
            right -= 1

        if left > right:   # 엇갈린 경우
            array[right], array[pivot] = array[pivot], array[right]
        else:
            array[right], array[left] = array[left], array[right]
    
    quick_sort(array, start, right - 1)   # 피벗 기준 작은 데이터들끼리 정렬
    quick_sort(array, right + 1, end)     # 피벗 기준 큰 데이터들끼리 정렬

quick_sort(array, 0, len(array) - 1)
print(array)
```

```
# 풀이 2
array = [5, 7, 9, 0, 3, 1, 6, 2, 4, 8]

def quick_sort(array):
    if len(array) <= 1:
        return array

    pivot = array[0]
    tail = array[1:]

    left_side = [x for x in tail if x <= pivot]
    right_side = [x for x in tail if x > pivot]

    return quick_sort(left_side) + [pivot] + quick_sort(right_side)

print(quick_sort(array))
```

-> 시간복잡도 O(nlogn): 데이터가 많을수록 다른 방법에 비해 효율적(분할의 횟수가 기하급수적으로 감소하기 때문), 하지만 최악의경우, O(n^2)의 시간복잡도를 갖게됨
-> 무작위로 입력된 경우 퀵정렬, 이미 데이터가 어느정도 정렬되어있는 경우 삽입정렬

4. **계수정렬**: 별도의 리스트 선언 후 그 안에 정렬에 대한 정보를 담음(비교기반 정렬 알고리즘x)
   * 선언한 리스트를 (가장 큰 값 - 가장 작은 값 + 1)의 크기로 선언 -> 데이터를 하나씩 확인하면서 각 값들이 몇개 있는지 리스트에 기록 -> 가장 작은 값부터 개수만큼 출력  
   * 특정한 조건 충족시에만 사용 가능
      1) 데이터 크기를 정수형태로 표현할 수 있을 때만 사용가능
      2) 가장 큰 데이터와 가장 작은 데이터의 차이가 너무 크지 않을 때(모든 범위를 담을 수 있는 크기의 리스트를 선언해야 하기 때문)

```
array = [7, 5, 9, 0, 3, 1, 6, 2, 9, 1, 4, 8, 0, 5, 2]

count = [0] * (max(array) + 1)

for i in range(len(array)):
    count[array[i]] += 1

for i in range(len(count)):
    for j in range(count[i]):
        print(i, end=" ")
```

-> 시간복잡도: O(n + k)
-> 공간복잡도: O(n + k), 하지만 모두 다른 값을 갖는 데이터에 적용한다면 데이터 크기만큼의 리스트를 선언해야 하기 때문에 비효율적 -> 동일한 값을 갖는 데이터에 적용하기 적절


- - -

[파이썬 정렬 라이브러리]

* ```sorted()``` 퀵정렬보다는 느리지만 최악의 경우에도 O(nlogn)을 보장하는 병합정렬을 기반으로 생성, 집합, 딕셔너리, 리스트 모두 가능하지만 출력 결과는 리스트
* ```sort()``` 리스트 내부 원소를 바로 정렬, 별도의 리스트 반환x

위 두가지 방법 모두 key 매개변수 사용 가능 -> 정렬기준 설정

-> 시간복잡도: O(nlogn)

- - -

[안정 정렬 vs 불안정 정렬]
* 안정 정렬: 입력값이 유지 - a 기준으로 정렬 후 b 기준으로 재정렬할 때, a 기준으로 정렬한 형태가 남아있음  
  <-> 불안정 정렬: 입력값 유지x - a 기준으로 정렬 후 b 기준으로 재정렬하면 기존 정렬된 형태를 무시함

* 퀵정렬 - 불안정 정렬

참고: 이것이 취업을 위한 코딩테스트다, 파이썬 알고리즘 인터뷰 
