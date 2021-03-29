import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
<<<<<<< HEAD
import Settings2 from "./components/Settings/Settings2";
import SignInSide from "./components/Login/SignInSide";
=======
import Settings from "./components/Settings/Settings";
>>>>>>> 5a94387fde7ab53c06fe75cecabd8bec36c303f7
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
            <Route exact path="/follow" component={Follow} />
            <Route exact path="/settings" component={Settings2} />
            <Route exact path="/chat" component={Chat} />
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
          <Route exact path="*" component={Login} />
        </Switch>
      </>
    );
  }
}

export default App;
