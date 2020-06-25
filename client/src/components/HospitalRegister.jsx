import React, { useRef, useEffect, useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useCookies } from "react-cookie";
import { TextField, Paper } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Context } from "../Store";
import image from "../assets/hospital_register.svg";

export default function AlertDialogSlide(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setname] = useState("");
  const [location, setlocation] = useState({ latitude: "", longitude: "" });
  const [address, setaddress] = useState("");
  const [telephone, settelephone] = useState("");
  const [error, setError] = useState(undefined);
  const [cookies, setCookie] = useCookies(["token"]);
  const [state, dispatch] = useContext(Context);

  useEffect(() => {}, []);

  const verifyLogin = () => {
    axios
      .post("/api/hospital/register", {
        email,
        password,
        name,
        location,
        address,
        telephone,
      })
      .then((response) => {
        if (response.status !== 200) {
          setError(response.data.message);
          return;
        }
        setCookie("token", response.data.token, { path: "/" });
        console.log(state);
        dispatch({
          type: "HOSPITAL_REGISTER",
          payload: {
            isAuth: true,
            hospital: response.data.hospital,
            isHospital: true,
          },
        });
        console.log(state);
        props.history.push(`/`);
      })
      .catch((err) => {
        // console.log(err);
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.message
        )
          setError(err.response.data.message);
      });
  };

  const onEmailInputChange = (event) => {
    setEmail(event.target.value);
  };
  const onPasswordInputChange = (event) => {
    setPassword(event.target.value);
  };

  const onNameInputChange = (event) => {
    setname(event.target.value);
  };
  const onlocationInputChange = (event) => {
    setlocation(event.target.value);
  };
  const onaddressInputChange = (event) => {
    setaddress(event.target.value);
  };
  const ontelephoneInputChange = (event) => {
    settelephone(event.target.value);
  };
  return (
    <div>
      <div className="absolute-center">
        <Paper
          style={{ borderRadius: "10px", padding: "20px 10px" }}
          variant="outlined"
        >
          <div className="create-form">
            <div className="create-form-element">
              <img src={image} alt="create svg" style={{ width: "25vw" }} />
            </div>
            {error ? (
              <div className="create-form-element">
                <Alert severity="error">{error}</Alert>
              </div>
            ) : null}
            <div className="create-form-element">
              <div className="hospital-register-input-wrapper">
                <TextField
                  value={email}
                  onChange={onEmailInputChange}
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                />
                <TextField
                  value={password}
                  onChange={onPasswordInputChange}
                  label="Password"
                  variant="outlined"
                  type="password"
                />
              </div>
            </div>
            <div className="create-form-element">
              <div className="hospital-register-input-wrapper">
                <TextField
                  value={name}
                  onChange={onNameInputChange}
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                />
                <TextField
                  value={address}
                  onChange={onaddressInputChange}
                  label="address"
                  variant="outlined"
                />
              </div>
            </div>
            <div className="create-form-element">
              <Button onClick={verifyLogin} color="primary">
                Register
              </Button>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
}
