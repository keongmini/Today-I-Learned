## bcrypt 정확하게 사용하기

### bcrypt를 이용한 해시된 비밀번호 비교 오류 해결

# (기존 코드)비밀번호를 평문으로 db에 저장 -> 비밀번호를 hash와 salt를 통해 안전하게 관리하고자 함
### [bcriptjs](https://yarnpkg.com/package/bcryptjs) 라이브러리 이용
> bcrypt 라이브러리 :  **node-pre-gyp ERR!** 발생*  
> bcriptjs 라이브러리로 수정 후 해결(사용법 동일)*


**발생한 문제**   
회원가입할 때 입력한 비밀번호와 로그인할 때 입력한 비밀번호가 똑같은데 다른 해시값이 반환되는 문제를 해결하고자 함

**문제 추적**   
 - 프론트 코드에서 비밀번호 해시화하는 코드를 확인해보니 salt 적용되고 있음
 - salt값 때문에 해시값이 변하는 거라고 생각하여 salt값을 제외하고 hash하고자 했으나 bcrypt 라이브러리 자체가 salt를 꼭 포함해야 사용 가능
 - bcrypt 라이브러리에서 제공하는 방법을 통해 salt and hash된 비밀번호를 비교해야함
`bcrypt.compareSync(myPlaintextPassword, hash);`

**해결**  
로그인 시 입력한 비밀번호와 db에 저장되어있는 해시된 비밀번호를 ```compareSync```를 사용하여 비교하도록 코드 수정

[참고]  
[What are Salt Rounds and how are Salts stored in Bcrypt?](https://stackoverflow.com/questions/46693430/what-are-salt-rounds-and-how-are-salts-stored-in-bcrypt)  
[동일한 메시지는 동일한 다이제스트(hash값)를 갖는다.](https://st-lab.tistory.com/100)
