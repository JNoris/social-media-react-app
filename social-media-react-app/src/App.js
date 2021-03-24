<<<<<<< Updated upstream
import { Route } from "react-router";
import { Layout } from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import SignInSide from "./components/Login/SignInSide";
import SignUp from "./components/Login/SignUp";

function App() {
  return (
    // <Layout>
    //   {/* <Route exact path="/" component={Home} />
    //   <Route path="/profile" component={Profile} /> */}

    //   {/* path can be registration */}
    //   <Route path="/signup" component={SignUp} />
    //   <Route path="/signin" component={SignInSide} />
    // </Layout>
    <div className="App">
      <SignInSide />
    </div>
=======
import { Route, Router, Switch } from "react-router";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import SignUp from "./components/Login/SignUp";
import Settings from "./components/Settings/Settings";
import SignInSide from "./components/Login/SignInSide";
import SideNav from "./components/SideNav/SideNav";
import { Flex } from "./App.styles";

function App() {
  return (
    <>
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
>>>>>>> Stashed changes
  );
}

export default App;
