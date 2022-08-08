## JavaScript 이론 

### event loop

* 자바스크립트 동시성 모델, 실행 모델 - event loop, call stack, callback queue 등

1. event loop  
여러 스레드 사용를 사용하는데 그 중 우리가 작성한 js 코드가 실행되는 스레드 - 메인스레드  
node.js 프로세스에서 메인스레드는 한개고 한순간에 한줄씩만 실행  
그 외의 일을 하는 워커스레드는 여러개 - 파일 입출력, 네트워크로 전달 등

2. call stack
지금 시점까지 호출된 함수들의 스택, 함수가 호출될 때마다 쌓이고 리턴될 때마다 빠짐
  * Run To Completion  
  콜스택은 빈상태에서 출발 - callback 함수 실행 - 함수 모두 실행 모두 return 완료 - 빈상태 -> 반복  
  다음 콜백을 처리하려면 현재 처리 중인 콜백의 실행이 끝나야함 = 빈상태가 되어야만 다음 콜백 처리 가능 = 콜백을 처리하는동안 또다른 콜백을 처리할 수 없음
  
3. callback queue
(메시지큐)앞으로 실행할 콜백을 쌓아두는 큐  
(실행되고 있는 곳에 따라) 브라우저나 node에서 어떤 일(event)가 발생하면 메인스레드에 알려주기 위해 사용 - 파일처리의 완료, 타이머 호출 등

위 내용이해하기! ex)
```
console.log('1')

setTimeout(() => {
  console.log('2')
}, 0)

console.log('3')
```
'1', '3' 이 모두 출력된 후에 빈 상태가 되므로 이때 콜백함수를 실행하여 '2' 출력
--> 1 3 2

```
setInterval(() => {
  console.log('hey!')
  while(true) {}
}, 1000)
```
'hey!'는 딱 한번만 실행됨 -> while(true)가 계속 콜 스택에 있기 때문에 빈상태가 되지 않음 -> **event loop block한다.**

> 브라우저나 node에서, web api나 node api의 동작이 끝나면 callback queue에 등록   
> 브라우저나 Node가 요청받은 일을 하고 있는동안(메인스레드와 별도로) 메인스레드나 이벤트루프에는 영향을 주지 않음    
> **결론** 이를 offloading이라 하고 node 서버의 메인 스레드가 하나임에도 불구하고 빠르게 동작할 수 있는 이유이다.  



참고) [패스트캠퍼스 한번에 끝내는 node.js 웹 프로그래밍](https://fastcampus.co.kr/dev_online_node)
