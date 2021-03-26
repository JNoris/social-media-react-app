import { Route, Router, Switch } from "react-router";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import SignUp from "./components/Login/SignUp";
import Settings from "./components/Settings/Settings";
import SignInSide from "./components/Login/SignInSide";
import SideNav from "./components/SideNav/SideNav";
// import TopNav from "./components/TopNav/TopNav";
import Chat from "./components/Chat/Chat";
import { Flex, MainWrapper } from "./App.styles";
import Follow from "./components/Follow/Follow";
import AddPost from "./components/AddPost/AddPost";
// import TopNav3 from "./components/Topnav/TopNav3";

function App() {
  // const [token, setToken] = useState("");
  return (
    <>
      <Switch>
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignInSide} />

        <Flex>
          <SideNav />
          <MainWrapper>
            {/* <TopNav3 /> */}
            <Route exact path="/" component={Home} />
            <Route exact path="/add" component={AddPost} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/follow" component={Follow} />
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/chat" component={Chat} />
          </MainWrapper>
        </Flex>
      </Switch>
    </>
  );
}

export default App;
