import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Restaurants from "./Restaurants";
import Login from "./Login";

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/Home">
          <Restaurants />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
