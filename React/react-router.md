## react-router

### react-router 구현하기

```yarn add react-router-dom```

- BrowserRouter : 웹 애플리케이션에 HTML5의 History API를 사용하여 페이지를 새로고침하지 않고도 주소를 변경하고, 현재 주소에 관련된 정보를 props로 쉽게 조회하거나 사용할 수 있게 해주는 컴포넌트
```
import { BrowserRouter } from 'react-router-dom';

return(
	<BrowserRouter>
    	...
	</BrowserRouter>
)
```

- Route : 사용자의 현재 경로에 따라 다른 컴포넌트를 보여주는 컴포넌트, 설정해준 주소규칙에 맞게 해당 컴포넌트를 전달해줌
```
// 사용 방법
import { Route } from 'react-router-dom';

<Route path="주소규칙" component={컴포넌트} />

// example
<Route path"/" component={Home} />
```

▶ 모든 경로에는 '/'가 포함된다. '/' 외에도 여러가지 주소규칙 중에 겹치는 부분이 있을경우 예상과 다르게 여러 컴포넌트가 화면에 보여질 수 있다. 이를 방지하기 위해 exact라는 props를 전달해주면 된다. 그러면 주소규칙에 정확히 일치하는 컴포넌트만 보여준다.

✅ props 값을 생략하면 자동으로 true값을 전달해준다. 즉, 아래 코드는 exact만 작성하는 것과 동일하다.

```<Route path="/" component={Home} exact={true} />```

▶ Route 하나에 여러개의 path를 설정하는 방법 : path props를 배열로 설정

```<Route path={['/about','/info']} component={About} />```

- Link : 클릭하면 다른 주소로 이동시켜 주는 컴포넌트

HTML의 a태그와 동일한 역할을 하지만 리액트 라우터에서는 a태그를 직접 사용하면 안된다. a태그는 페이지를 전환할 때 페이지를 새로 불러오기 때문에 애플리케이션이 들고 있는 상태를 모두 날려버린다. 
즉, 다시 처음부터 렌더링하는 것이다. 이와 다르게 Link 컴포넌트는 페이지를 전환해도 페이지를 새로 불러오지 않고 애플리케이션을 그래도 유지한채로 HTML History API를 사용하여 페이지의 주소만 변경해준다.
결론적으로, Link컴포넌트는 a태그와 동일한 역할을 하지만 페이지 전환을 방지하는 기능이 포함되어있다. 

```
// 사용방식
import { Link } from 'react-router-dom';

<Link to="주소">내용</Link>

// example
<Link to="/about">소개</Link>
```

**[페이지 주소에 유동적인 값 전달하는 방법]**

일반적으로 파라미터는 특정 아이디 또는 이름을 사용하여 조회할 때 사용, 쿼리는 어떤 키워드를 검색하거나 필요한 옵션을 전달할 때 사용

1. URL 파라미터

/profile/name 의 형식으로 뒷부분에 유동적인 값을 전달

```
// Profile.js

import React from "react";

const data = {
    first : {
        name : "김철수",
        description : "개발자"
    },
    second : {
        name : "홍길동",
        description : "디자이너"
    }
};

const Profile = ({ match }) => {
    const { username } = match.params;
    const profile = data[username];
    if(!profile) {
        return <div>존재하지 않는 사용자</div>;
    }
    return(
        <div>
            <h3>
                {username}({profile.name})
            </h3>
            <p>{profile.description}</p>
        </div>
    );
};

export default Profile;
```
```
// App.js

...

<Route path='/profile/:username' component={Profile} />
...
```

라우트로 사용되는 컴포넌트에서 받아오는 match라는 객체 안의 params 값을 참조한다. match 객체 안에는 현재 컴포넌트가 어떤 경로 규칙에 의해 보이는지에 대한 정보가 포함되어있다. 



2. URL 쿼리

/about?details=true

쿼리는 location 객체에 들어있는 search값에서 조회할 수 있다. location객체는 라우터로 사용된 컴포넌트에게 props로 전달되고 웹 애플리케이션의 현재 주소에 대한 정보를 가지고 있다. 

위 주소규칙에 대한 location객체는 다음과 같다.

{
   "pahtname" : "/about",
   "search" : "?detail=true",
   "hash : ""
}

url 쿼리를 사용할 때는 위 객체에서 search 값을 확인해야 한다. search 값은 문자열로 되어있고 여러 가지 값을 설정해 줄 수 있다. 
search 값에서 특정 값을 읽어오기 위해서는 문자열을 객체로 변환해주어야 하는데 이따 'qs' 라는 라이브러리를 사용한다.

```yarn add qs```

```
import React from "react";
import qs from "qs";

const About = ({location}) => {
    const query = qs.parse(location.search, {
        ignoreQueryPrefix : true
    });
    const showDetail = query.detail === "true";
    return(
        <div>
            <h1>소개</h1>
            <p>소개 페이지</p>
            {showDetail && <p>detil = true</p>}
        </div>
    )
}

export default About;
```

❗️쿼리에서 문자열을 객체로 파싱한 결과값은 문자열이다. '?value=1' 또는 '?value=true' 와 같이 숫자나 boolean형으로 전달해도 '1' 또는 'true' 와 같이 문자열 형태로 전달된다. 



- 서브 라우트 : 라우트 내부에 또 라우트를 정의하는 것 -> 라우트를 사용하는 컴포넌트 내부에 라우트 컴포넌트를 또 사용하면 된다. 
```
// Profiles.js

import React from "react";
import { NavLink, Route } from "react-router-dom";
import Profile from "./Profile";

const Profiles = () => {
    const activeStyle = {
        background : "black",
        color : "white"
    }
    return (
        <div>
            <h3>사용자 목록 : </h3>
            <ul>
                <li>
                    <NavLink activeStyle = {activeStyle} to ="/profiles/first">first</NavLink>
                </li>
                <li>
                    <NavLink activeStyle = {activeStyle} to = "/profiles/second">second</NavLink>
                </li>
            </ul>

            <Route 
                path="/profiles"
                exact
                render={() => <div>사용자 선택</div>}
            />
            <Route path="/profiles/:username" component={Profile} />
        </div>
    )
}

export default Profiles;
```
```
// App.js

import React from "react";
import { Route, Link } from "react-router-dom";
import Home from "./Home"
import About from "./About";
import Profiles from "./Profiles";

const App = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
        <li>
          <Link to="/profiles">프로필</Link>
        </li>
      </ul>
        <hr />
        <Route path = "/" component = {Home} exact = {true}/>
        <Route path = {["/about", "/info"]} component = {About}/>
        <Route path = "/profiles" component={Profiles}/>
    </div>
  )
}

export default App;
```
- history 객체 : 라우터로 사영된 컴포넌트에 match, location과 함께 전달되는 props 중 하나, 
컴포넌트 내에 구현하는 메서드에서 라우터API 호출 가능(뒤로 가기, 로그인 후 화면전환, 다른 페이지로의 이탈 방지 등)

```
import React, {Component} from "react";

class HistorySimple extends Component{

    handleGoBack = () => {
        this.props.history.goBack();
    };

    handleGoHome = () => {
        this.props.history.push("/");
    }

    componentDidMount(){
        this.unblock = this.props.history.block("나가기");
    }

    componentWillUnmount(){
        if(this.unblock){
            this.unblock();
        }
    }

    render(){
        return(
            <div>
                <button onClick = {this.handleGoBack}>뒤로</button>
                <button onClick = {this.handleGoHome}>홈으로</button>
            </div>
        )
    }
}

export default HistorySimple;
```

- withRouter 함수 : HOC(Higher-order Component), 라우터로 사용된 컴포넌트가 아니어도 match, location, history객체를 접근할 수 있게 해준다. 

```
import React from "react";
import { withRouter } from "react-router-dom";

const WithRouterSample = ({location, match, history}) => {
    return(
        <div>
            <h4>location</h4>
            <textarea 
                value = {JSON.stringify(location, null, 2)}
                rows = {7}
                readOnly = {true}
            />
            <h4>match</h4>
            <textarea 
                value={JSON.stringify(match, null, 2)}
                rows={7}
                readOnly={true}
            />
            <button onClick = {() => history.push("/")}>홈으로</button>
        </div>
    )
}

export default withRouter(WithRouterSample);
```

- Switch 컴포넌트 : 여러 Route를 감싸고 그 중 일치하는 단 하나의 라우만을 렌더링, 해당하는 주소가 아닐 경우 NOT FOUND 페이지 구현 가능, exact props를 사용하지 않아도 된다.
```
import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import Home from "./Home"
import About from "./About";
import Profiles from "./Profiles";
import HistorySimple from "./HistorySimple";

const App = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
        <li>
          <Link to="/profiles">프로필</Link>
        </li>
        <li>
          <Link to="/history">History 예제</Link>
        </li>
      </ul>
        <hr />
        <Switch>
        <Route path = "/" component = {Home} exact = {true}/>
        <Route path = {["/about", "/info"]} component = {About}/>
        <Route path = "/profiles" component={Profiles}/>
        <Route path = "/history" component={HistorySimple}/>
        <Route 
          render = {({location}) => (
            <div>
              <h2>존재하지 않는 페이지</h2>
              <p>{location.pathname}</p>
            </div>
          )}
        />
      </Switch>
    </div>
  )
}

export default App;
```

- NavLink : 현재 경로와 Link에서 사용하는 경로가 일치하는 경우 특정 스타일 혹은 CSS 클래스를 적용할 수 있는 컴포넌트

  activeStyle : NavLink에서 링크가 활성화되었을 때의 스타일을 적용

  activeClassName : CSS 클래스 적용
  
```
import React from "react";
import { NavLink, Route } from "react-router-dom";
import Profile from "./Profile";

const Profiles = () => {
    const activeStyle = {
        background : "black",
        color : "white"
    }
    return (
        <div>
            <h3>사용자 목록 : </h3>
            <ul>
                <li>
                    <NavLink activeStyle = {activeStyle} to ="/profiles/first">first</NavLink>
                </li>
                <li>
                    <NavLink activeStyle = {activeStyle} to = "/profiles/second">second</NavLink>
                </li>
            </ul>

            <Route 
                path="/profiles"
                exact
                render={() => <div>사용자 선택</div>}
            />
            <Route path="/profiles/:username" component={Profile} />
        </div>
    )
}

export default Profiles;
```

참고.  
[REACT ROUTER](https://reactrouter.com/web/api/)   
리액트를 다루는 기술
