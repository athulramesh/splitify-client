import React, { useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import {
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
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
export default function AddPayment({
  groupId,
  groupMemberList,
  expenseCallback,
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const amountRef = useRef();
  const { currentUser } = useAuth();
  const [paidBy, setPaidBy] = useState("");
  const [receivedBy, setReceivedBy] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handlePayment = () => {
    PaymentAdapter.recordPayment(currentUser, {
      receivedBy: receivedBy,
      groupId: groupId,
      paidBy: paidBy,
      createdBy: currentUser.userDetails.id,
      amount: Number(amountRef.current.value),
      onDate: selectedDate,
    }).then(() => expenseCallback());
    handleClose();
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handlePaidByChange = (e) => {
    setPaidBy(e.target.value);
  };
  const handleReceivedChange = (e) => {
    setReceivedBy(e.target.value);
  };

  return (
    <div>
      <Button
        variant="contained"
        className="add"
        size="small"
        style={{
          backgroundColor: "#0db39e",
          color: "#FFFFFF",
          marginLeft: "10px",
        }}
        startIcon={<AttachMoneyIcon />}
        onClick={handleClickOpen}
      >
        Add Payment
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Payment</DialogTitle>
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

          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Paid By</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={paidBy}
              onChange={handlePaidByChange}
            >
              {groupMemberList?.map((g) => (
                <MenuItem
                  value={g.id}
                >{`${g.firstName} ${g.lastName} `}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Received By</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={receivedBy}
              onChange={handleReceivedChange}
            >
              {groupMemberList?.map((g) => (
                <MenuItem
                  value={g.id}
                >{`${g.firstName} ${g.lastName} `}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handlePayment} color="primary">
            Create Payment
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
