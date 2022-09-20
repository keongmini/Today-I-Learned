## AWS Simple Email Service

### AWS 이메일 서비스를 이용하여 사용자에게 메일 전송 

* [**SES**](https://aws.amazon.com/ko/ses/) : 사용자의 이메일 주소와 도메인을 사용해 이메일을 보내고 받기 위한 경제적이고 손쉬운 방법을 제공하는 이메일 플랫폼  

  - 사용자에게 주기적으로 홍보메일을 전송하거나 알림용 메일을 전송할 경우 등등에 활용할 수 있는 서비스(나는 사용자가 비밀번호를 까먹었을 때 임시 비밀번호 전송을 위해 사용하고자 했다.)  
  - 이메일 자동 발송을 별도의 구현 없이 간다하게 이용 가능 (이메일 서버 관리, 네트워크 구성, IP 주소 신뢰도 등의 인프라 문제 등 별도로 해결할 필요 없음)
  - 전송 내역이 기록되어 모니터링 가능
  - 초기 비용 없이 효율적인 비용으로 사용 가능 

* SES 작동 방식  
<p>
  <img src="https://docs.aws.amazon.com/ko_kr/ses/latest/dg/images/arch_overview-diagram.png" height="350" /><br/>
</p>

<p>
  <img src="https://user-images.githubusercontent.com/88446465/191182071-0f8b4a97-816f-4752-abd1-748578f303a0.png" height="350" /><br/>
  <em>출처: https://docs.aws.amazon.com/ko_kr/ses/latest/dg/send-email-concepts-process.html </em>
</p>



* 사용방법
