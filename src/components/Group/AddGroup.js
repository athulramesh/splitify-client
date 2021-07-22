import React, { useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import { FormControlLabel } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import GroupAdapter from "../../adapters/groupAdapter";
import { useAuth } from "../../contexts/AuthContext";

export default function AddGroup({ addGroupCall }) {
  const [open, setOpen] = React.useState(false);
  const groupNameRef = useRef();
  const [simplify, setSimplify] = useState(true);
  const { currentUser } = useAuth();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = () => {
    setSimplify((prev) => !prev);
  };
  function addGroup() {
    let req = {
      groupName: groupNameRef.current.value,
      simplify: simplify,
    };
    GroupAdapter.addGroup(currentUser, req).then((res) => {
      req = { ...req, groupId: res.data.groupId };
      addGroupCall(req);
    });
    handleClose();
  }

  return (
    <div>
      <Button
        variant="contained"
        className="add"
        size="small"
        style={{ backgroundColor: "#6c757d", color: "#FFFFFF" }}
        startIcon={<GroupAddIcon />}
        onClick={handleClickOpen}
      >
        Add Group
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Group</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Groups let you handle expense easily
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Group Name"
            type="text"
            fullWidth
            inputRef={groupNameRef}
          />
          <FormControlLabel
            control={
              <Switch
                checked={simplify}
                onChange={handleChange}
                color="primary"
              />
            }
            label="Simplify"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addGroup} color="primary">
            Create Group
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
