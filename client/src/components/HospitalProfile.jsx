import React, { useState, useEffect, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import { Paper, Icon } from "@material-ui/core";
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

export default function LetterAvatars({ match }) {
  const [state, dispatch] = useContext(Context);
  const [reviewComment, setReviewComment] = useState("");
  const [profileLoading, setProfileLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const [commentData2, setCommentData] = useState([]);
  const [error, setError] = useState();
  const [getcomment, setGetComment] = useState(false);

  const submit = () => {
    if (!state.isAuth) {
      alert("You need to login first");
      return;
    }
    if (state.isHospital) {
      alert("You need to login as a User to review");
      return;
    }
    const reviewobj = {
      message: reviewComment,
      hospitalID: profile.data._id,
      userID: state.userData._id,
      userName: state.userData.name,
    };
    axios
      .post("/review/reviewpost", reviewobj)
      .then((response) => {
        if (response.status !== 200) {
          setError(response.data.message);
          return;
        }
        setCommentLoading(true);
        setGetComment(getcomment ? false : true);
        setReviewComment("");
      })
      .catch((err) => {
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.message
        )
          setError(err.response.data.message);
      });

    window.scrollTo({
      top: 100,
      left: 100,
      behavior: "smooth",
    });
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
      id: match.params.id,
    };
    axios
      .post(`/review/getreviews`, i)
      .then((res) => {
        if (res.status !== 200) return;
        setCommentData(res.data.reviews.reverse());
        setCommentLoading(false);
      })
      .catch((err) => console.error(err));
  }, [getcomment]);

  // console.log(state);

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
            marginLeft: 80
          }}
        >
          {/* <CircularProgress /> */}
          <Skeleton variant="text" width={350} />
          <Skeleton variant="circle" width={40} height={40} />
          <Skeleton variant="rect" width={350} height={118} />
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
              {state.isHospital ? null : (
                <BookAnAppointment
                  props={{
                    hospitalID: match.params.id,
                    userID: state.userData ? state.userData._id : "",
                  }}
                />
              )}
              <HospitalInfo props={profile} />
            </div>
          </div>
        </Paper>
      )}
      {/* https://api.adorable.io/avatars/282/${v.name}.png */}
      {profileLoading ? (
        <div
          style={{
            width: "350px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginLeft: 80,
            marginTop: 40,
          }}
        >
          <Skeleton variant="text" width={350} height={18} />
          <Skeleton variant="text" width={350} height={18} />
          <Skeleton variant="text" width={350} height={18} />
          <Skeleton variant="text" width={350} height={18} />
          <Skeleton variant="text" width={350} height={18} />
          <Skeleton variant="text" width={350} height={18} />
          <Skeleton variant="text" width={350} height={18} />
          <Skeleton variant="text" width={350} height={18} />
          <Skeleton variant="text" width={350} height={18} />
          <Skeleton variant="text" width={350} height={18} />
        </div>
      ) : commentData2.length > 0 ? (
        commentData2.map((v, i) => {
          var downVote = v.voteArray.filter((v) => v.vote == false);
          var upVote = v.voteArray.filter((v) => v.vote == true);
          return (
            <Paper
              key={i}
              style={{
                padding: "20px 3vw",
                marginTop: 60,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  padding: "3px 20px",
                  borderRight: "0.5px solid #0000005e",
                }}
              >
                <Avatar
                  style={{
                    backgroundColor: "#5b9bd5",
                    width: "55px",
                    height: "55px",
                  }}
                  src={`https://api.adorable.io/avatars/282/${v.userName}.png`}
                />
                <Typography variant="subtitle2">{v.userName}</Typography>
                <Typography variant="subtitle2">{v.date}</Typography>
              </div>
              <div>
                <Typography
                  style={{
                    padding: "3px 10px",
                  }}
                  variant="subtitle1"
                >
                  {v.message}
                </Typography>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    onClick={() => {
                      axios
                        .post("/review/updateVote", {
                          userName: state.userData.name,
                          reviewId: v._id,
                          hospitalID: match.params.id,
                          by: state.userData._id,
                          vote: true,
                        })
                        .then((res) => {
                          if (res.status == 200) {
                            console.log(res);
                            setGetComment(getcomment ? false : true);
                          }
                        })
                        .catch((err) => console.error(err));
                    }}
                  >
                    <Upvote />
                    {upVote.length}
                  </Button>
                  <Button
                    onClick={() => {
                      axios
                        .post("/review/updateVote", {
                          userName: state.userData.name,
                          reviewId: v._id,
                          hospitalID: match.params.id,
                          by: state.userData._id,
                          vote: false,
                        })
                        .then((res) => {
                          if (res.status == 200) {
                            console.log(res);
                            setGetComment(getcomment ? false : true);
                          }
                        })
                        .catch((err) => console.error(err));
                    }}
                  >
                    <Downvote />
                    {downVote.length}
                  </Button>
                </div>
              </div>
            </Paper>
          );
        })
      ) : null}
      <Paper
        style={{
          padding: "20px 3vw",
          margin: "60px 0px",
        }}
      >
        <TextField
          id="outlined-number"
          label="Review"
          type="textarea"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          variant="outlined"
          value={reviewComment}
          onChange={(e) => setReviewComment(e.target.value)}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
          }}
        >
          <Button color="#64b5f6" variant="contained" onClick={submit}>
            Review
          </Button>
        </div>
      </Paper>
    </div>
  );
}
