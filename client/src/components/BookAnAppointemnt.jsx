import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcCallIcon from "@material-ui/icons/AddIcCall";

// import "@dat";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import MomentUtils from "@date-io/moment";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Axios from "axios";

export default function FormDialog({ props }) {
  console.log(props);
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [time, setTime] = React.useState("");
  const [date, setDate] = React.useState("");
  const [remark, setRemark] = React.useState("");

  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const submitBooking = () => {
    Axios.post("/api/booking/new", {
      bookingTime: time,
      hospitalID: props.hospitalID,
      userID: props.userID,
      userName: name,
      remark,
      bookingDate: new Date(date),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log("Error"));
  };
  const handleClose = () => {
    setOpen(false);
  };
  console.log(name, time, remark, selectedDate);
  return (
    <div>
      <Button
        variant="contained"
        color="#66bb6a"
        endIcon={<AddIcCallIcon />}
        onClick={handleClickOpen}
      >
        Book an Appointment
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Book an appointment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Let the hospital know if you have any special request.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          {/* <MuiPickersUtilsProvider utils={MomentUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date picker inline"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date picker dialog"
                format="MM/dd/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Time picker"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider> */}
          <TextField
            autoFocus
            margin="dense"
            id="date"
            label="Date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="time"
            label="Time"
            type="time"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Request"
            type="textarea"
            fullWidth
            value={remark}
            onChange={(e) => {
              setRemark(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              submitBooking();
              handleClose();
            }}
            color="primary"
          >
            Book Appointment
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
