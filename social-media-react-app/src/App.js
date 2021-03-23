import { Route } from 'react-router';
import { Layout } from './components/Layout/Layout';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import SignUp from './components/Login/SignUp';
import SignInSide from './components/Login/SignInSide';
function App() {
  return (
    <Layout>
      <Route exact path='/' component = {Home}/>
      <Route path='/profile' component = {Profile}/>
      <Route path='/registration' component = {SignUp}/>
      <Route path='/signin' component = {SignInSide}/>
    </Layout>
  );
}

export default App;
