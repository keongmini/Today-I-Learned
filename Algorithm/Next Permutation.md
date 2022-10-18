## Next Permutation Algorithm

  **[Next Permutation Algorithm]**  
  
  참고 [Next lexicographical permutation algorithm](https://www.nayuki.io/page/next-lexicographical-permutation-algorithm)  
  
  시간복잡도 O(N) 알고리즘으로 현재 순열의 다음 순열을 구하는 알고리즘  
  가장 간단한 예시 : [1,2,3] -> [1,3,2] -> [2,1,3] -> [2,3,1] -> [3,1,2] -> [3,2,1]
  
  오름차순 순열부터 내림차순 순열까지 하나씩 자리가 바뀌는 과정을 쭉 나열했을 때 현재 순열의 다음 순열을 구하는 알고리즘
  
  <img src="https://www.nayuki.io/res/next-lexicographical-permutation-algorithm/next-permutation-algorithm.svg" width="400" height="400">  
  
  다음 순열이 없는 경우 가장 작은 순열로 돌아감, 해당 문제의 경우 새로운 변수 선언하면 안되고 기존 변수를 수정해야함 
