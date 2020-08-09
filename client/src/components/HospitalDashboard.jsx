import React, { useState, useEffect, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import { Paper, Icon, Tab } from "@material-ui/core";
import { Typography, TextField } from "@material-ui/core";
import { Rating, Skeleton } from "@material-ui/lab";
import { Button } from "@material-ui/core";
import Upvote from "@material-ui/icons/ArrowUpward";
import Downvote from "@material-ui/icons/ArrowDownward";
import BookAnAppointment from "./BookAnAppointemnt";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import HospitalInfo from "./HospitalInfo";
import { Context } from "../Store";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

export default function LetterAvatars({ match }) {
  const [state, dispatch] = useContext(Context);
  const [profileLoading, setProfileLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState();
  const [getBookings, setGetBookings] = useState(false);
  const [value, setValue] = React.useState(0);
  const [len, setLen] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    axios
      .get(`/api/hospital/profile/${match.params.id}`)
      .then((res) => {
        if (res.status !== 200) return;
        const profile = res.data;
        setProfile(profile);
        setTimeout(() => {
          setProfileLoading(false);
        }, 1000);
      })
      .catch((err) => console.error(err));

    var i = {
      hospitalID: match.params.id,
    };
    axios
      .post(`/api/booking/all`, i)
      .then((res) => {
        if (res.status !== 200) return;
        console.log(res.data);
        setBookings(res.data.bookings);
        setBookingLoading(false);
      })
      .catch((err) => console.error(err));
  }, [getBookings]);

  return (
    <div className="profile-page-wrapper">
      {profileLoading ? (
        <div
          style={{
            width: "350px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: 40,
          }}
        >
          {/* <CircularProgress /> */}
          <Skeleton variant="text" width={210} />
          <Skeleton variant="circle" width={40} height={40} />
          <Skeleton variant="rect" width={210} height={118} />
        </div>
      ) : (
        <Paper style={{ padding: 20 }}>
          <div className="profile-page-header">
            <Avatar
              style={{
                backgroundColor: "#5b9bd5",
                width: "55px",
                height: "55px",
              }}
            >
              {profile.data.name[0]}
            </Avatar>
            <Typography style={{ color: "#000000b5" }} variant="h5">
              {profile.data.name}
            </Typography>
          </div>
          <div className="profile-page-body">
            <div className="profile-page-body-subheading">
              <Typography variant="h6">About the Hospital</Typography>{" "}
              <Rating name="read-only" value={4} readOnly />
            </div>
            <Typography variant="subtitle1">
              {profile.data.description}
            </Typography>
            <div className="profile-btn">
              {/* <BookAnAppointment props={{hospitalID: match.params.id, userID: state.userData._id}} /> */}
              <HospitalInfo props={profile} />
            </div>
          </div>
        </Paper>
      )}
      {/* https://api.adorable.io/avatars/282/${v.name}.png */}
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab label="Upcoming" {...a11yProps(0)} />
          <Tab label="Confirmed" {...a11yProps(1)} />
          <Tab label="Denied" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      {profileLoading ? (
        <div
          style={{
            width: "350px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: 40,
          }}
        >
          <Skeleton variant="text" width={210} height={18} />
          <Skeleton variant="text" width={210} height={18} />
          <Skeleton variant="text" width={210} height={18} />
          <Skeleton variant="text" width={210} height={18} />
          <Skeleton variant="text" width={210} height={18} />
          <Skeleton variant="text" width={210} height={18} />
          <Skeleton variant="text" width={210} height={18} />
          <Skeleton variant="text" width={210} height={18} />
          <Skeleton variant="text" width={210} height={18} />
          <Skeleton variant="text" width={210} height={18} />
        </div>
      ) : bookings.length > 0 ? (
        bookings.map((v, i) => {
          console.log(v);
          console.log("sadasd");
          var date = new Date(v.bookingDate);
          date = date.toLocaleDateString();
          if (value == 0) if (v.status != 0) return null;
          if (value == 1) if (v.status != 1) return null;
          if (value == 2) if (v.status != -1) return null;
          return (
            <Paper
              key={i}
              style={{
                padding: "20px 10px",
                marginTop: 60,
                display: "flex",
                // justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  padding: "3px 10px",
                  borderRight: "0.5px solid #0000005e",
                }}
              >
                <Avatar
                  style={{
                    backgroundColor: "#5b9bd5",
                    width: "55px",
                    height: "55px",
                  }}
                >
                  {v.userName[0]}
                </Avatar>
              </div>
              <div
                style={{
                  padding: "3px 10px",
                  display: "flex",
                  justifyContent: "space-around",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Typography className="booking-body-element" variant="body1">
                  Name: {v.userName}
                </Typography>
                <Typography className="booking-body-element" variant="body1">
                  Booking Date: {date}
                </Typography>
                <Typography className="booking-body-element" variant="body1">
                  Booking Time: {v.bookingTime}
                </Typography>
                {value == 0 ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      marginTop: 10,
                      width: "100%",
                    }}
                  >
                    <Button
                      onClick={() => {
                        axios
                          .post("/api/booking/update", {
                            id: v._id,
                            status: -1,
                          })
                          .then((res) => {
                            console.log(res.status);
                            setGetBookings(getBookings ? false : true);
                          })
                          .catch((err) => console.log(err));
                      }}
                      variant="contained"
                      color="secondary"
                    >
                      Deny
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        axios
                          .post("/api/booking/update", {
                            id: v._id,
                            status: 1,
                          })
                          .then((res) => {
                            console.log(res.status);
                            setGetBookings(getBookings ? false : true);
                          })
                          .catch((err) => console.log(err));
                      }}
                    >
                      Confirm
                    </Button>
                  </div>
                ) : null}
              </div>
            </Paper>
          );
        })
      ) : null}
      {/*len == 0 ? (
        <Paper
          style={{
            padding: "20px 10px",
            marginTop: 60,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Nothing to show</Typography>
        </Paper>
      ) : null */}
    </div>
  );
}
