import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar(yo) {
  const classes = useStyles();
  useEffect(() => {
    console.log(window.location.pathname.includes("hospital"));
  }, []);
  return (
    <div className={classes.root + " nav-wrapper"}>
      <AppBar position="static" style={{ backgroundColor: "#007d38" }}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <NavLink to="/">Sewak</NavLink>
          </Typography>
          <NavLink to="/user/auth">
            <Button color="inherit">Login as User</Button>{" "}
          </NavLink>
          |
          <NavLink to="/hospital/auth">
            <Button color="inherit">Login as Hospital</Button>{" "}
          </NavLink>
        </Toolbar>
      </AppBar>
    </div>
  );
}
