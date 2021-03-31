import React, {useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router";
import axios from 'axios';
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
import SearchBar from "./components/TopNav/TopNavComponents/SearchBar";
// import TopNav3 from "./components/Topnav/TopNav3";

function App() {
  const isAuth = !!localStorage.getItem("token");
  const userStored = !!localStorage.getItem("username");
  const [error, setError] = useState(false);
  axios.defaults.headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
  function getLoggedInUser(){
    if(isAuth && !userStored)
    {
      axios.get("https://localhost:5001/getcurrentuserdetails")
      .then(res => localStorage.setItem("username",res.data.userName))
      .catch(err => setError(true) && console.log(err));
    }
  }
  useEffect(() => {
    getLoggedInUser();
  }, [isAuth])

  if(error)
  {

  }
  if (isAuth && userStored) {
    return (
      <Switch>
        <Flex>
          <SideNav />
          <MainWrapper>
            <Route exact path="/" component={Home} />
            <Route exact path="/add" component={AddPost} />
            <Route path="/profile/:id?" component={Profile} />
            <Route path="/follow/:id?" component={Follow} />
            <Route exact path="/explore" component={SearchBar} />
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
