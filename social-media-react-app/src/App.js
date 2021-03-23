import { Route } from 'react-router';
import { Layout } from './components/Layout/Layout';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile'
function App() {
  return (
    <Layout>
      <Route exact path='/' component = {Home}/>
      <Route path='/profile' component = {Profile}/>
    </Layout>
  );
}

export default App;
