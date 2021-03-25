//import React, {useState} from 'react'
import { Route, Switch } from 'react-router';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import SignUp from './components/Login/SignUp';
import SignInSide from './components/Login/SignInSide';
import SideNav from './components/SideNav/SideNav';
import { Flex, MainWrapper } from './App.styles';
import Settings2 from './components/Settings/Settings2';
import Follow from './components/Follow/Follow';
import Chat from "./components/Chat/Chat";
import AddPost from './components/AddPost/AddPost';



function App() {
  //const [token, setToken]=useState("");
  return (
    <>
      <Switch>
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignInSide} />
        <Flex>
          <SideNav />
          <MainWrapper>
            <Route exact path="/" component={Home} />
            <Route exact path="/add" component={AddPost}/>
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/follow" component={Follow} />
            <Route exact path="/settings" component={Settings2} />
            <Route exact path="/chat" component={Chat} />
          </MainWrapper>
        </Flex>
      </Switch>
    </>
  );
}

export default App;
