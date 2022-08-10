## JavaScript 이론 

### spread syntax

```
const a = {
  name = 'a',
  age = 12
}

const b = {
  nickname = 'b'
}

const c = {
  ...a
  ...b
}         // 내용 모두 포함
```

* 기존에 있던 키와 같은 키 값이 들어온다면 덮어쓰게 됨 -> 순서 중요! - 가장 마지막에 선언된 값으로 덮어짐 

```
const user = {
  name = 'hh',
  age = '22',
  email = 'hh@gmail.com'
}

const {name, ...personalData} = user
console.log(personalData) // {age:22, email:'hh@gmail.com'}
```

* object, 배열에 사용 가능




참고) [패스트캠퍼스 한번에 끝내는 node.js 웹 프로그래밍](https://fastcampus.co.kr/dev_online_node)
