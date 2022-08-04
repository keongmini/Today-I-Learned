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
      1) 리스트의 ㅇ

