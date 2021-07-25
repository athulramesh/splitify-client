import React, { useState, useRef } from "react";
import ExpenseAdapter from "../../adapters/expenseAdapter";
import { useAuth } from "../../contexts/AuthContext";
import "../../styles/Group/GroupDetails.css";
import "../../styles/Group/AddExpense.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ReceiptIcon from "@material-ui/icons/Receipt";
import DateFnsUtils from "@date-io/date-fns";
import {
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

import SplitEqually from "./SplitEqually";
import SplitUnequally from "./SplitUnequally";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  textField: {
    maxWidth: 150,
  },
}));

function AddExpense({ groupId, groupMemberList, expenseCallback }) {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const [paidBy, setPaidBy] = useState();
  const [open, setOpen] = React.useState(false);
  const expenseNameRef = useRef();
  const expenseAmountRef = useRef();
  const [expenseAmountState, setExpenseAmountState] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [share, setShare] = useState({});
  let handleCallBack1 = (childData) => {
    setShare(childData);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChangePaidBy = (event) => {
    setPaidBy(event.target.value);
  };
  const handleExpense = () => {
    let temp = [];
    for (const i in share) {
      if (share[i] > 0 && Number(i) !== paidBy) {
        temp.push({ ownerId: i, amount: parseFloat(share[i]).toFixed(2) });
      }
    }
    let req = {
      expenseName: expenseNameRef.current.value,
      groupId: groupId,
      paidBy: paidBy,
      createdBy: currentUser.userDetails.id,
      amount: Number(expenseAmountRef.current.value),
      onDate: selectedDate,
      share: temp,
    };
    ExpenseAdapter.recordExpense(currentUser, req).then(() =>
      expenseCallback()
    );
    handleClose();
  };

  return (
    <div>
      <Button
        variant="contained"
        className="add"
        size="small"
        style={{ backgroundColor: "#6c757d", color: "#FFFFFF" }}
        startIcon={<ReceiptIcon />}
        onClick={handleClickOpen}
      >
        Add Expense
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Expense</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add your expenses in this group here
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Expense Name"
            type="text"
            fullWidth
            inputRef={expenseNameRef}
          />
          <TextField
            className={classes.textField}
            autoFocus
            margin="dense"
            id="amount"
            label="Expense Amount"
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">₹</InputAdornment>
              ),
            }}
            fullWidth
            inputRef={expenseAmountRef}
            onBlur={() =>
              setExpenseAmountState(Number(expenseAmountRef.current.value))
            }
          />
          <FormControl className={classes.formControl}>
            <InputLabel id="paidBy">PaidBy</InputLabel>
            <Select
              labelId="paidBy"
              id="paidBy-select"
              value={paidBy}
              onChange={handleChangePaidBy}
            >
              {groupMemberList?.map((g) => (
                <MenuItem
                  value={g?.id}
                >{`${g?.firstName} ${g?.lastName} `}</MenuItem>
              ))}
            </Select>
          </FormControl>
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
          <div className="split_strategy ">
            <SplitEqually
              groupMemberList={groupMemberList}
              amount={expenseAmountState}
              parentCallBack={handleCallBack1}
            />
            <SplitUnequally
              groupMemberList={groupMemberList}
              amount={expenseAmountState}
              parentCallBack={handleCallBack1}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleExpense} color="primary">
            Create Expense
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddExpense;
