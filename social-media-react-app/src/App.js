import { Route,Switch } from "react-router";
import React from "react";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import Settings2 from "./components/Settings/Settings2";
import SignInSide from "./components/Login/SignInSide";
import SideNav from "./components/SideNav/SideNav";
// import TopNav from "./components/TopNav/TopNav";
import Chat from "./components/Chat/Chat";
import { Flex, MainWrapper } from "./App.styles";
import Follow from "./components/Follow/Follow";
import AddPost from "./components/AddPost/AddPost";
import Register from "./components/Login/Register";
import Login from "./components/Login/Login";
// import TopNav3 from "./components/Topnav/TopNav3";

/**
 * 
 
// Class for utilizing state
class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/register" component={Register}/>
          <Route path="/login" component={Login}/>
          <Route exact path="*" component={Register}/>
        </Switch>
      </BrowserRouter>
    );
  }
}
// End remove
*/

function App() {
  //const [token, setToken]=useState("");
  return (
    <>
      <Switch>
        <Route exact path="/signin" component={SignInSide} />
        <Route exact path="/register" component={Register} />
        <Route path="/login" component={Login} />
        
        <Flex>
          <SideNav />
          <MainWrapper>
            <Route exact path="/" component={Home} />
            <Route exact path="/add" component={AddPost}/>
            <Route path="/profile/:id?" component={Profile} />
            <Route exact path="/follow" component={Follow} />
            <Route exact path="/settings" component={Settings2} />
            <Route exact path="/chat" component={Chat} />
            {/* <Route exact path='/TEST' component={TEST}/> */}
          </MainWrapper>
        </Flex>
        <Route exact path="*" component={Register} />
      </Switch>
    </>
  );
}

export default App;
