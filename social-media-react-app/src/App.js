import { Route, Switch } from 'react-router';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import SignUp from './components/Login/SignUp';
import SignInSide from './components/Login/SignInSide';
import SideNav from './components/SideNav/SideNav';
import { Flex } from './App.styles';
import Settings from './components/Settings/Settings';
import Follow from './components/Follow/Follow';
function App() {
  return (
    <>
      <Switch>
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignInSide} />  
        <Flex>
          <SideNav />
          <Route exact path="/" component={Home} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/follow" component={Follow}/>
          <Route exact path="/settings" component={Settings} />
        </Flex>
      </Switch>
    </>
  );
}

export default App;
