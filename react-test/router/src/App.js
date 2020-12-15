// import './App.css';
// import { HashRouter, Route } from 'react-router-dom';
import HashRouter from './hashRouter';
import Route from './route';
import Home from './components/home'
import User from './components/user'
function App() {
  return (
    <HashRouter>
      <Route path="/home" component={Home}></Route>
      <Route path="/user" component={User}></Route>
    </HashRouter>
  );
}

export default App;
