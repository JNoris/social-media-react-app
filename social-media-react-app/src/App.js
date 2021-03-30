import React from "react";
import { Route, Switch, Redirect } from "react-router";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import Settings2 from "./components/Settings/Settings2";
import SideNav from "./components/SideNav/SideNav";
// import TopNav from "./components/TopNav/TopNav";
import Chat from "./components/Chat/Chat";
import { Flex, MainWrapper } from "./App.styles";
import Follow from "./components/Follow/Follow";
import AddPost from "./components/AddPost/AddPost";
import Register from "./components/Login/Register";
import Login from "./components/Login/Login";
// import TopNav3 from "./components/Topnav/TopNav3";

function App() {
  const isAuth = !!localStorage.getItem("token");

  //const [token, setToken] = useState("");
  if (isAuth) {
    return (
      <Switch>
        <Flex>
          <SideNav />
          <MainWrapper>
            <Route exact path="/" component={Home} />
            <Route exact path="/add" component={AddPost} />
            <Route path="/profile/:id?" component={Profile} />
            <Route path="/follow/:id?" component={Follow} />
            <Route exact path="/settings" component={Settings2} />
            <Route exact path="/chat" component={Chat} />
            {/* <Route render={() => <Redirect to="/" />} /> */}
            {/* <Route exact path='/TEST' component={TEST}/> */}
          </MainWrapper>
        </Flex>
      </Switch>
    );
  }
  else {
    return (
      <>
        <Switch>
          <Route path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route render={() => <Redirect to="/login" />} />
        </Switch>
      </>
    );
  }
}

export default App;
