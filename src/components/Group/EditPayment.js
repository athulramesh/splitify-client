import React, { useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Grid, InputAdornment, makeStyles } from "@material-ui/core";
import PaymentAdapter from "../../adapters/paymentAdapter";
import { useAuth } from "../../contexts/AuthContext";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
export default function EditPayment({ payment }) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const amountRef = useRef();
  const { currentUser } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handlePayment = () => {
    PaymentAdapter.updatePayment(currentUser, payment.paymentId, {
      receivedBy: payment?.receivedBy?.id,
      groupId: payment?.groupId,
      paidBy: payment?.paidBy?.id,
      createdBy: currentUser.userDetails.id,
      amount: Number(amountRef.current.value),
      onDate: selectedDate,
    });
    handleClose();
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Payment</DialogTitle>
        <DialogContent>
          <DialogContentText>Add payments to settle expenses</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Amount"
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">₹</InputAdornment>
              ),
            }}
            fullWidth
            inputRef={amountRef}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justifyContent="space-around">
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date picker inline"
                value={selectedDate}
                onChange={handleDateChange}
                autoOk={true}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <TextField
            autoFocus
            disabled={true}
            margin="dense"
            id={payment?.paidBy?.id}
            label="Paid By"
            type="text"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">₹</InputAdornment>
              ),
            }}
            fullWidth
            value={payment?.paidBy?.firstName}
          />
          <TextField
            autoFocus
            disabled={true}
            margin="dense"
            id={payment?.receivedBy?.id}
            label="Recieved By"
            type="text"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">₹</InputAdornment>
              ),
            }}
            fullWidth
            value={payment?.receivedBy?.firstName}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handlePayment} color="primary">
            Edit Payment
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
