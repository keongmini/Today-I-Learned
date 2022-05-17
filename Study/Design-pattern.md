## MVC패턴, MVVM패턴 정의 및 비교

### MVC 패턴
모델-뷰-컨트롤러(model - view - controller) 패턴으로 관심분야를 명확히 구분하고 관심분야에 맞게 다른 일을 하도록 하는 패턴  
이러한 '관심사 분리'는 관리를 더 쉽게 할 수 있도록 도와준다.  
이 패턴은 크게 **모델**, **뷰**, **컨트롤러** 세가지 부분으로 구성되어있다.  

<p>
   <img src="https://user-images.githubusercontent.com/88446465/161510771-ae7b1cf2-62aa-44e6-b4b3-983edd4e2baa.png" width="400" height="400" /><br/> 
   <em>출처: 모델-뷰-컨토롤러 (위키백과)</em>
</p>


1. **Models**  
데이터가 무엇인지 정의, 데이터의 상태가 변경되면 모델을 뷰 또는 컨트롤러에 알려줌  
basically objects or a part of code that is responsible for 
   - representing data in code.
   - allowing to work with data. (e.g. save, fetch)

2. **Views**  
데이터를 보여주는 방식, UI에 어떻게 보여줄지 정의하는 부분  
responsible for 
   - what the user sees in the end : rendering the right content in our html doc and sending that back to the users.
   - decoupled from application code and just having some light or minor integrations : regarding the data inject into templating engine to generate these views.

3. **Controllers**  
입력에 대한 응답, 모델을 업데이트하는 부분 
   - the connection point between the models and views.
      - working with models : saving that data and triggering that save process ..
      - working with views : the part where then pass that data that was fetched to views  
   - **So,** the controller is the middleman

4. (additional) **Routes**
   - the things which define upon which path for which http method which controller code should execute



### MVVM 패턴
모델-뷰-뷰모델(model-view-viewmodel) 패턴으로 모델, 뷰는 위에서 언급한 MVC패턴의 뷰, 모델과 동일하다.
   
<p>
   <img src="https://user-images.githubusercontent.com/88446465/161512078-3a6af8da-1355-4c0c-bb12-7efe5a0b5321.png" /><br/> 
   <em>출처: Model-View-ViewModel 패턴 (microsoft Docs)</em>
</p>

**View Model**  
뷰가 데이터를 바인딩할 수 있는 속성 및 명령을 구현하고 상태 변경 내용을 뷰에 알린다.  
뷰모델에서 제공하는 메서드와 필드는 UI에서 제공할 기능을 정의하지만 해당 기능을 어떻게 보여줄지는 뷰에서 결정한다.  

**ref.**  
[MVC](https://developer.mozilla.org/ko/docs/Glossary/MVC)  
[NodeJS - The Complete Guide](https://www.udemy.com/course/nodejs-the-complete-guide/)
[MVVM 패턴](https://velog.io/@k7120792/Model-View-ViewModel-Pattern)



---
파트너사 페이지 개발하기 전에 mvvm패턴을 도입할지 결정하기 위해 공부했다. 현재는 mvc 패턴을 이용하는 중

mvvm패턴을 완벽히 이해한건 아니지만(mvc패턴도 여러번 공부할 때 이해가 안됐지만 막상 써보니까 이해가 됐다.) 개발에 도입하려고 여러개 찾아보다보니까 결론은 redux를 사용하면 굳이 사용하지 않아도 된다는 거였다. 

mvvm패턴과 리액트를 같이 설명하는 블로그 글에 나온 예시를 보면 결국 dispatch, useSelector 역할을 뷰모델이 해주는거였는데 지금 RTK로 충분히 쓰고 있어서 도입하지 않기로 했다. 

또한, observer 패턴이 필요해서 RX, mvvm패턴 등의 얘기가 나온거라고 그랬는데..(맞는지 모르겠다..) redux에서도 observer 패턴을 제공하고 있다.

**참고.** [[****Observer pattern in React using Redux]****](https://medium.com/@jackwong_60367/observer-pattern-in-react-using-redux-ca9998e885b0)
