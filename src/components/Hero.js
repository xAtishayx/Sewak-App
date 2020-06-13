import React from "react";

import { Alert } from "reactstrap";

const Hero = () => (
  <div className="text-center hero my-5">
    <img className="mb-3 app-logo" src={require("../assets/logo.jpg")} alt="React logo" width="120" />
    <h1 className="mb-4">Sewak App</h1>
    <Alert color="primary">
     Sewak provides support by medical centers around the country and will be able to provide critical up-to-date information of hospitals.
    </Alert>

  </div>
);

export default Hero;
