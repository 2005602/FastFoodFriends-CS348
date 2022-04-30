import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Restaurants from "./Restaurants";
import ViewRestaurant from './ViewRestaurant';
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
        <Route path="/ViewRestaurant">
          <ViewRestaurant />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
