## git bash 터미널로 로그인하기

### git bash에서 다른 계정으로 로그인하는 방법

devops에서 github로 마이그레이션 하고 새로운 repository가 생성되어 clone해와야 했음  

git clone [url] 입력 후 아래 오류 발생  

```jsx
remote: Repository not found.
```

→ git config가 설정되어있지 않음, 나의 다른 계정의 git user 정보가 global로 설정되어있기 때문에 새로운 계정으로 참여한 repo에는 접근이 되지 않는게 맞다!  

→ git config 설정 후 시도했으나 해결x  
    내 컴퓨터(mac) 키체인에 github가 내 개인 github정보로 들어가있어서 그런것으로 추정....  

→ **다른 방법 시도**

```
git clone https://[user name]:[user password]@github.com/[남은 주소 - repo명]
```

위와 같이 접근 권한이 있는 github 계정의 user name과 password 입력 후 clone하면 성공!

아마 git에서 제공해주는 로그인 방식? 

```
remote: Support for password authentication was removed on August 13, 2021. Please use a personal access token instead.
```

위와 같은 오류 발생하면 개인 토큰(Personal Access Token) 발급받아서 user password 자리에 비밀번호 대신 넣어준 후 시도하면 된다.