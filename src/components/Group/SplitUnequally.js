import React, { useEffect, useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  InputAdornment,
  InputBase,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    margin: theme.spacing(1),
  },
  textField: {
    maxWidth: 150,
    margin: theme.spacing(1),
  },
}));
export default function SplitUnequally({
  groupMemberList,
  amount,
  parentCallBack,
}) {
  const [open, setOpen] = React.useState(false);
  const [balanceAmount, setBalanceAmount] = useState(amount);

  let amountDetails = {};
  for (let i in groupMemberList) {
    amountDetails[groupMemberList[i].id] = 0;
  }
  const [amountState, setAmountState] = useState(amountDetails);
  const amountRef = useRef();

  useEffect(() => {
    amountDetails = { ...amountState };
    setBalanceAmount(amount);

    for (let i in groupMemberList) {
      amountDetails[groupMemberList[i].id] = 0;
    }
    setAmountState(amountDetails);
  }, [amount, open]);

  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  let handleCallback3 = () => {
    parentCallBack(amountState);
    handleClose();
  };
  const handleAmount = (event) => {
    const temp = { ...amountState };
    const prevAmount = Number(amountState[event.target.id]);
    const newAmount = Number(event.target.value);
    const diff = prevAmount - newAmount;
    temp[event.target.id] = newAmount;
    setBalanceAmount((balanceAmount) => Number(balanceAmount) + diff);
    setAmountState(temp);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        split Unequally
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Split UnEqually</DialogTitle>
        <DialogContent>
          <div>
            <Typography variant="body2" color="textPrimary">
              {"Expense Amount : " + amount}
            </Typography>
            <List dense className={classes.root}>
              {groupMemberList.map((value) => {
                const labelId = `checkbox-list-secondary-label-${value.id}`;
                return (
                  <form>
                    <ListItem key={value.id}>
                      <ListItemText
                        id={labelId}
                        primary={`${value.firstName} ${value.lastName} `}
                      />

                      <TextField
                        className={classes.textField}
                        id={value.id}
                        label="Amount"
                        type="number"
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">₹</InputAdornment>
                          ),
                        }}
                        inputRef={amountRef}
                        onBlur={handleAmount}
                      />
                    </ListItem>
                  </form>
                );
              })}
            </List>
            <Typography variant="body2" color="secondary">
              {"Balance Amount : " + balanceAmount}
            </Typography>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCallback3} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
