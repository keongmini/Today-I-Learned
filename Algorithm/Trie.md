## 트라이(Trie) 이해하기

### leetcode 208. Implement Trie (Prefix Tree)

트라이 구현하기 

* **트라이**  
  검색트리, 키가 문자열이고 동적배열 or 연관배열을 저장하는 데 사용되는 정렬된 트리 자료구조이다.  
  이진트리가 아닌 다진트리(m-ary tree)의 형태  
  자연여 처리(NLP) 분야에서 문자열 탐색을 위한 자료구조로 많이 쓰임  
  문자열을 위한 트리의 형태 -> 문자 개수만큼 자식이 있음
  
<p>
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Trie_example.svg/500px-Trie_example.svg.png" width="450" height="350" /><br/>
  <em>출처: https://ko.wikipedia.org/wiki/%ED%8A%B8%EB%9D%BC%EC%9D%B4_%28%EC%BB%B4%ED%93%A8%ED%8C%85%29 </em>
</p>


트라이를 저장할 노드 따로 구현(TrieNode) - 코드의 간결성을 위해  
root node 부터 뒤로 이어지는 값을 children에 딕셔너리 형태로 저장{문자: TrieNode()} -> 찾고자 하는 값이 딕셔너리 키값에 있는지 확인하면 됨  
문자열에서 찾고자 하는 값이 딕셔너리에 없으면 해당 문자를 완성할 수 없으므로 False  


**최종코드**

```
class TrieNode:
    
    def __init__(self):
        self.word = False
        self.children = {}
        
class Trie:

    def __init__(self):
        self.root = TrieNode()    

    def insert(self, word: str) -> None:
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.word = True

    def search(self, word: str) -> bool:
        node = self.root
        for char in word:
            if char not in node.children:
                return False
            node = node.children[char]
        
        return node.word

    def startsWith(self, prefix: str) -> bool:
        node = self.root
        for char in prefix:
            if char not in node.children:
                return False
            node = node.children[char]
        return True
```

참고 풀이: 파이썬 알고리즘 인터뷰




문제: https://leetcode.com/problems/implement-trie-prefix-tree/
