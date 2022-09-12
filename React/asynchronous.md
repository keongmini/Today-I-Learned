## 비동기 처리

### 비동기 처리 이해하고 구현하기

- 비동기 처리  
작업이 즉시 처리되지 않고 응답을 기다리는 경우나 작업 처리가 늦어지는 경우 해당 작업을 비동기적으로 처리한다. 
동기적으로 처리하게 되면 이전 요청이 끝날 때까지 기다렸다가 다음 작업을 진행해야 한다. 하지만 비동기로 처리하게 되면 웹 애플리케이션이 멈추지 않기 때문에 동시에 여러 작업을 처리할 수 있다.

<p>
  <img src="https://i.imgur.com/hh3Mawr.png" height="350" /><br/>
  <em>출처: https://learnjs.vlpt.us/async/ </em>
</p>

비동기 작업할 때 흔히 사용되는 방법은 콜백함수를 이용하는 것이다. 

콜백함수 : 어떤 함수의 인자로 전달되는 함수

```
function increase(number, callback){
    setTimeout(() => {
        const result = number + 10;
        if(callback){
            callback(result)
        }
    },1000)
}

console.log("작업 시작")
increase(0,result => {
    console.log(result);
    increase(0,result => {
        console.log(result);
        increase(0,result => {
            console.log(result);
            increase(0,result => {
                console.log(result);
                console.log("작업 완료")
            });
        });
    });
});

'''
작업 시작
10
20
30
40
작업 완료
'''
```

콜백함수를 여러번 호출하여 작업을 여러번 해야 하는 경우 콜백 안에 콜백을 넣어서 구현할 수 있는데 이를 콜백지옥이라 한다.

콜백 지옥을 피하기 위해 사용할 수 있는 기능이 있다.



1. Promise

Promise 기본 사용 방식은 다음과 같다.
```
const promise = new Promise((resolve, reject) => {
  // ...
})

promise.then(() => {
  // ...
});
```

Promise가 성공하면 resolve를, 실패하면 reject를 호출해준다. 수행하는 작업 다음에 할 작업은 .then을 붙여 선언해주면 된다.

위에 콜백지옥에 빠진 코드를 Promise를 이용해 수정하면 다음과 같다.
```
function increase(number){
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            const result = number + 10;
            if(result > 50){
                const e = new Error('NumberTooBig');
                return reject(e);
            }
            resolve(result);
        },1000);
    });
    return promise;
}

increase(0)
    .then(number => {
        console.log(number);
        return increase(number);
    })
    .then(number => {
        console.log(number);
        return increase(number);
    })
    .then(number => {
        console.log(number);
        return increase(number);
    })
    .then(number => {
        console.log(number);
        return increase(number);
    })
    .catch(e => {
        console.log(e);
    });
```

2. async/await

Promise 함수를 더 쉽게 사용할 수 있게 해주는 문법이다. 이 문법을 사용하려는 함수 앞에 'async'를 작성하고 해당 함수 내부에서 Promise 앞에 'await'를 작성하면 된다.

```
function increase(number){
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            const result = number + 10;
            if(result > 50){
                const e = new Error('NumberTooBig');
                return reject(e);
            }
            resolve(result);
        },1000);
    });
    return promise;
}

async function runTaskes(){
    try{
        let result = await increase(0);
        console.log(result);
        result = await increase(0);
        console.log(result);
        result = await increase(0);
        console.log(result);
        result = await increase(0);
        console.log(result);
        result = await increase(0);
        console.log(result);
        result = await increase(0);
        console.log(result);
    } catch(e){
        console.log(e);
    }
}
```

참고. 리액트를 다루는 기술
