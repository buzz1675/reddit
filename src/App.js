import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Components/Login/login';
import Home from './Features/Home/home';
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/home" component={Home} />
        {/* Add more routes for other components */}
      </Switch>
    </Router>
  );
}

export default App;