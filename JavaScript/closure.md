## JavaScript 이론 

### closure

* closure = function + environment(변수를 포함한)
  함수가 하나씩 생길때마다 하나씩 생김

  * environment : 함수를 둘러싼 접근할 수 있는 모든 scope

```
function and(x){
  return function print(y){
    return x + ' and ' + y
  }
}

const saltAnd = and('salt')
console.log(saltAnd('pepper'))    # salt and pepper
console.log(saltAnd('sugar'))     # salt and sugar
```
saltAnd 의 closure = 함수: print() & 환경: x -> 'salt'

closure의 특징) higher-order function 고차원 함수 를 만드는 데에 유용

참고) [패스트캠퍼스 한번에 끝내는 node.js 웹 프로그래밍](https://fastcampus.co.kr/dev_online_node)
