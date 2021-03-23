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
  );
}

export default App;
