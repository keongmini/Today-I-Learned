## Git Flow 방식

### git branch 정책: git flow 도입

<img width="400" alt="gitflow" src="https://techblog.woowahan.com/wp-content/uploads/img/2017-10-30/git-flow_overall_graph.png">


git flow 방식을 도입하지만 우리 프로젝트에 맞게 branch명을 수정

**main / release / develop / hotfix / issue**

main branch: 당장 사용 가능한 코드, release branch에서 배포 후 사용해본 후 전혀 문제가 없음을 충분히 확인 후 해당 브랜치에 올림

release branch: 실사용 배포용 코드

develop: task branch에서 작업한 내용을 pr하는 브랜치, user story 기반 개발이 완료된 코드

hotfix: 급하게 수정이 필요한 버그 픽스용 브랜치

issue: 각자 작업하는 브랜치

기존에는 task별로 브랜치를 각자 만들고 main에 바로 pr을 올려서 바로 배포되는 방식이었다. 하지만 이런 방식은 테스트하기 위험하고 또 오류가 있어도 바로 배포가 되기 때문에 문제 없이 사용할 수 있는 코드를 따로 보관하기 힘들다. 그래서 git에서 권장하고 있는 branch modeling를 도입하여 브랜치 정책을 수정했다. 

이 외에 추가로 정해진 팀 내 git 관련 정책은

branch 네이밍은 issue 번호로 하고 commit message를 자세히 적기로!

commit message에 issue 번호를 넣으려다가 그럼 commit 할때마다 적어야 하므로 번거로울 것이라고 생각하여 브랜치 이름에 표시하고 commit message에는 따로 작성하지 않기로 함.

**참고** 우아한형제들 - 기술 블로그 : [우린 Git-flow를 사용하고 있어요](https://techblog.woowahan.com/2553/)


* 논의가 되어야할 부분
1. test phase에 대해서도 branch를 생성하는게 어떨지?  
  개발하다보면 각자 자유롭게 현재 개발 상태를 배포하여 확인해보고 싶을 수 있기 때문에 개발자들이 자유롭게, 쉽게 쓸 수 있는 branch가 있으면 test해볼 수 있고 좋음  
2. machine을 어떤 branch에 설정할지?  
3. db와 관련된 phase도 필요하지 않을까?  