import React from "react";
import { Route, Switch, Redirect } from "react-router";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import Settings from "./components/Settings/Settings";
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
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/chat" component={Chat} />
            <Route exact path="/login">
              <Redirect to="/"/>
            </Route>
            {/* <Route render={() => <Redirect to="/" />} /> */}

          </MainWrapper>
        </Flex>
      </Switch>
    );
  } else {
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
