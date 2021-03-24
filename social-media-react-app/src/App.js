import { Route, Router, Switch } from "react-router";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import SignUp from "./components/Login/SignUp";
import Settings from "./components/Settings/Settings";
import SignInSide from "./components/Login/SignInSide";
import SideNav from "./components/SideNav/SideNav";
import TopNav from "./components/TopNav/TopNav";
import { Flex } from "./App.styles";

function App() {
  return (
    <>
      <TopNav />
      <Switch>
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignInSide} />
        <Route exact path="/settings" component={Settings} />

        <Flex>
          <SideNav />
          <Route exact path="/" component={Home} />
          <Route exact path="/profile" component={Profile} />
        </Flex>
      </Switch>
    </>
  );
}

export default App;
