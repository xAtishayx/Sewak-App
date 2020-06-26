import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InfoIcon from "@material-ui/icons/Info";

export default function FormDialog({ props }) {
  const { data } = props;
  const [open, setOpen] = React.useState(false);
  console.log(data);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ marginLeft: 10 }}>
      <Button
        variant="contained"
        color="#66bb6a"
        endIcon={<InfoIcon />}
        onClick={handleClickOpen}
      >
        Info
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{data.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
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
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Request"
            type="textarea"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Book Appointment
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
