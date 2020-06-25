import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import Store from "./Store";
import Home from "./components/Home";
import UserAuth from "./components/UserAuth";
import HospitalAuth from "./components/HospitalAuth";
import withAuth from "./withAuth";
import Navbar from "./components/Navbar";

class App extends Component {
  render() {
    return (
      <Store>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/user/auth" exact component={UserAuth} />
          <Route path="/hospital/auth" exact component={HospitalAuth} />
        </Switch>
      </Store>
    );
  }
}

export default App;
