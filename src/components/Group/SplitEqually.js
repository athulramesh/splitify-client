import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  Checkbox,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import NumberFormat from "react-number-format";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "250px",
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SplitEqually({
  groupMemberList,
  amount,
  parentCallBack,
}) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const amountDetails = {};
  const [checkedModify, setCheckedModify] = useState(amountDetails);
  const [checked, setChecked] = useState(groupMemberList?.length);
  useEffect(() => {
    setChecked(groupMemberList?.length);
    for (let i = 0; i < checked; i++) {
      amountDetails[groupMemberList[i]?.id] = amount / checked;
    }
    setCheckedModify(amountDetails);
  }, [amount, open]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  let handleCallback2 = () => {
    parentCallBack(checkedModify);
    handleClose();
  };

  function handleToggle(value) {
    const newHash = { ...checkedModify };
    let amountUpdated2;
    if (newHash[value] < 0) {
      amountUpdated2 = amount / (checked + 1);
      newHash[value] = amountUpdated2;
      setChecked((prev) => prev + 1);
    } else {
      amountUpdated2 = amount / (checked - 1);
      setChecked((prev) => prev - 1);
      newHash[value] = -1;
    }
    for (const i in newHash) {
      if (newHash[i] !== -1) {
        newHash[i] = amountUpdated2;
      }
    }

    setCheckedModify(newHash);
  }
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        split equally
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className={classes.rooter}
      >
        <DialogTitle id="form-dialog-title">Split Equally</DialogTitle>
        <DialogContent>
          <List dense className={classes.root}>
            {groupMemberList?.map((value) => {
              const labelId = `checkbox-list-secondary-label-${value.id}`;
              return (
                <ListItem key={value.id} button>
                  <Checkbox
                    edge="start"
                    onChange={() => handleToggle(value.id)}
                    checked={checkedModify[value.id] >= 0}
                    inputProps={{ "aria-labelledby": labelId }}
                    color="primary"
                  />

                  <ListItemText
                    id={labelId}
                    primary={`${value.firstName} ${value.lastName} `}
                  />
                  <ListItemSecondaryAction>
                    {checkedModify[value.id] >= 0 ? (
                      <NumberFormat
                        value={checkedModify[value.id]}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₹"}
                        decimalScale={2}
                        fixedDecimalScale={true}
                      />
                    ) : (
                      0
                    )}
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCallback2} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
