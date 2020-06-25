import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { Paper, Icon } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Rating, Skeleton } from "@material-ui/lab";
import { Button } from "@material-ui/core";
import AddIcCallIcon from "@material-ui/icons/AddIcCall";

export default function LetterAvatars() {
  return (
    <div className="profile-page-wrapper">
      <Paper style={{ padding: 20 }}>
        <div className="profile-page-header">
          <Avatar
            style={{
              backgroundColor: "#5b9bd5",
              width: "55px",
              height: "55px",
            }}
          >
            H
          </Avatar>
          <Typography style={{ color: "#000000b5" }} variant="h5">
            Hospital for Physically challenged
          </Typography>
        </div>
        <div className="profile-page-body">
          <div className="profile-page-body-subheading">
            {" "}
            <Typography variant="h6">About the Hospital</Typography>{" "}
            <Rating name="read-only" value={4} readOnly />
          </div>
          <Typography variant="subtitle1">
            Ullamco esse anim nisi ullamco labore amet dolore exercitation qui
            nisi in occaecat pariatur.
          </Typography>
          <div className="profile-btn">
            <Button
              variant="contained"
              color="#66bb6a"
              endIcon={<AddIcCallIcon />}
            >
              Book an Appointment
            </Button>
          </div>
        </div>
      </Paper>
      <Paper style={{ padding: 20, marginTop: 60 }}>
        <Skeleton />
        <Skeleton animation={false} />
        <Skeleton animation="wave" />
      </Paper>
      <Paper style={{ padding: 20, marginTop: 30 }}>
        <Skeleton />
        <Skeleton animation={false} />
        <Skeleton animation="wave" />
      </Paper>
      <Paper style={{ padding: 20, marginTop: 30 }}>
        <Skeleton />
        <Skeleton animation={false} />
        <Skeleton animation="wave" />
      </Paper>
      <Paper style={{ padding: 20, marginTop: 30 }}>
        <Skeleton />
        <Skeleton animation={false} />
        <Skeleton animation="wave" />
      </Paper>
    </div>
  );
}
