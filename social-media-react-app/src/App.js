//Author: Edvin Lin
import React, {useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router";
import axios from 'axios';
import { Flex, MainWrapper } from "./App.styles";

import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import Settings from "./components/Settings/Settings";
import SideNav from "./components/SideNav/SideNav";
import Chat from "./components/Chat/Chat";
import Follow from "./components/Follow/Follow";
import AddPost from "./components/AddPost/AddPost";
import Register from "./components/Login/Register";
import Login from "./components/Login/Login";
import Error from './components/Error/Error';
import SearchBar from "./components/TopNav/TopNavComponents/SearchBar";

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
  })

  if(error)
  {
    return(
      <Error/>
    );
  }
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
            <Route exact path="/explore" component={SearchBar} />
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/chat" component={Chat} />
            <Route exact path="/error" component={Error}/>
            <Route exact path="/login">
              <Redirect to="/"/>
            </Route>
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
          <Route exact path="/error" component={Error}/>
          <Route render={() => <Redirect to="/login" />} />
        </Switch>
      </>
    );
  }
}

export default App;
