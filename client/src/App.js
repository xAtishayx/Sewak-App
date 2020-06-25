import React, { useEffect, useContext, useState } from "react";
import { Link, Route, Switch } from "react-router-dom";
import axios from "axios";
import Home from "./components/Home";
import UserAuth from "./components/UserAuth";
import HospitalAuth from "./components/HospitalAuth";
import withAuth from "./withAuth";
import Navbar from "./components/Navbar";
import HospitalProfile from "./components/HospitalProfile";

import { Context } from "./Store";

export default function App() {
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    axios
      .get("/api/checktoken", { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          dispatch({
            type: "VERIFY_AUTH",
            payload: {
              isAuth: true,
              userData: res.data.user,
              isHospital: res.data.isHospital,
            },
          });
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/user/auth" exact component={UserAuth} />
        <Route path="/hospital/auth" exact component={HospitalAuth} />
        <Route path="/hospital/profile/:id" exact component={HospitalProfile} />
      </Switch>
    </>
  );
}
