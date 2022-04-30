import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Restaurants from "./Restaurants";

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Restaurants />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
