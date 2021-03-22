import { Route } from 'react-router';
import { Layout } from './components/Layout/Layout';
import Home from './components/Home/Home';

function App() {
  return (
    <Layout>
      <Route exact path='/' component = {Home}/>
    </Layout>
  );
}

export default App;
