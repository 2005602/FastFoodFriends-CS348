import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Restaurants from "./Restaurants";
import ViewRestaurant from './ViewRestaurant';

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/">
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
