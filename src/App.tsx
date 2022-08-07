import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';
import HomePage from './pages/HomePage';
import HandleRedirect from "./pages/HandleRedirect";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <HomePage/>
        </Route>
        <Route exact path='/:shortId'>
          <HandleRedirect/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
