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