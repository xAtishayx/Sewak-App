import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import Store from "./Store";
import Home from "./components/Home";
import withAuth from "./withAuth";

class App extends Component {
  render() {
    return (
      <Store>
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
      </Store>
    );
  }
}

export default App;
