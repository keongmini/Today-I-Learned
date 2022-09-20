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

1. SDK 발급
  자바스크립트용 SDK를 사용하여 이메일 주소와 도메인을 확인하기 때문에 발급필요  
  AWS > [IAM](https://us-east-1.console.aws.amazon.com/iamv2/home?region=ap-northeast-2#/home)  
  엑세스 관리 > 사용자 > 사용자 추가  
    - AWS 자격 증명 유형 선택 : 액세스 키 – 프로그래밍 방식 액세스  
    - 권한은 상황에 맞는 것으로 선택 - 그룹이 없었기 때문에 [기존 정책 직접 연결] 선택하여 해당하는 그룹으로 설정  
    - 태그 추가 : 선택사항이므로 pass  
    - 완료되면 엑세스키와 비밀엑세스키를 발급해줌(다시 확인할 수 없기 때문에 복사하여 저장해두어야 함)
    
2. awsconfig.json
  프로젝트 config 폴더 내에 awsconfig.json 파일 생성 후 아래 내용 작성  
  ```
  {
    "accessKeyId": "엑세스키",
    "secretAccessKey": "비밀엑세스키",
    "region": "ap-northeast-2"
  }
  ```
  
3. aws-sdk 설치
  ```npm install aws-sdk```

4. aws-sdk 구성 + 이메일 전송 내용 작성
  ```
  // Load the AWS SDK for Node.js
  var AWS = require('aws-sdk');
  
  AWS.config.loadFromPath('./config/awsconfig.json');

  // Create sendEmail params 
  var params = {
    Destination: { /* required */
      CcAddresses: [                  # 참고 메일 주소
        'EMAIL_ADDRESS',
        /* more items */
      ],
      ToAddresses: [                  # 수신 메일 주소 
        'EMAIL_ADDRESS',
        /* more items */
      ]
    },
    Message: { /* required */         # 메일 내용과 구성 
      Body: { /* required */
        Html: {
         Charset: "UTF-8",
         Data: "HTML_FORMAT_BODY"
        },
        Text: {
         Charset: "UTF-8",
         Data: "TEXT_FORMAT_BODY"
        }
       },
       Subject: {
        Charset: 'UTF-8',
        Data: 'Test email'            # 메일 제목 
       }
      },
    Source: 'SENDER_EMAIL_ADDRESS', /* required */      # 발신 메일 주소
    ReplyToAddresses: [                                 # 답장 받을 주소
       'EMAIL_ADDRESS',
      /* more items */
    ],
  };

  // Create the promise and SES service object
  var sendPromise = new AWS.SES({apiVersion: 'latest'}).sendEmail(params).promise();

  // Handle promise's fulfilled/rejected states
  sendPromise.then(
    function(data) {
      console.log(data.MessageId);
    }).catch(
      function(err) {
      console.error(err, err.stack);
    });
  ```
  
  5. 샌드박스 해제  
    AWS SES는 도용 및 침해를 방지하고 발신자의 평판을 보호하기 위해 신규 Amazon SES 계정에 대해 특정 제한을 적용 -> 샌드박스에 배치됨    
    다음과 같은 제한 적용 >    
    - 확인된 이메일 주소 및 도메인으로만 또는 Amazon SES 메일박스 시뮬레이터로만 메일을 전송할 수 있습니다.  
    - 24시간 동안 최대 200개의 메시지를 보낼 수 있습니다.  
    - 초당 최대 1개의 메시지를 보낼 수 있습니다.  
    
    수신자의 주소 또는 도메인이 확인 여부와 상관 없이 모든 수신자에게 이메일을 보내려면 샌드박스 해지 신청을 해야함! (임시 비밀번호를 발급할 때 매번 수신자의 주소와 도메인을 확인할 수 없으므로 해지를 신청하고자 함)
    
    SES > Account dashboard > Request Production Access  
      - Mail type : marketing(홍보용, 마케팅용으로 사용자의 요청과 상관없이 발송) / Transactional(비밀번호 발급 등 요청에 의해 발송)  
      - Website URL : 도메인 주소  
      - Use case description : SES 서비스의 용도, 샌드박스를 해지한 후 사용하고자 하는 방향 등을 자세하게 작성해야 함 - 해당 내용을 바탕으로 샌드박스 해지 여부 결정 

참고.   
[AWS SES 예제](https://docs.aws.amazon.com/ko_kr/sdk-for-javascript/v2/developer-guide/ses-examples.html)  
[AWS SES 샌드박스에서 나가기](https://docs.aws.amazon.com/ko_kr/ses/latest/dg/request-production-access.html)

  
