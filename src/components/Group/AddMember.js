import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import { List } from "@material-ui/core";
import GroupMemberList from "./GroupMemberList";
import { useFriends } from "../../contexts/FriendsContext";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import "../../styles/Group/AddMember.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));
export default function AddMember({
  groupMemberList,
  groupId,
  addMemCallBack,
}) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const { friends, getUserFriends } = useFriends();
  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);

  useEffect(() => {
    getUserFriends();
  }, []);

  return (
    <div>
      <Button
        variant="contained"
        className="add"
        size="small"
        style={{
          backgroundColor: "#335c67",
          color: "#FFFFFF",
          marginRight: "20px",
        }}
        startIcon={<PersonAddIcon />}
        onClick={handleClickOpen("paper")}
      >
        Add Member
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Add Member</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {
              <List dense className={classes.root}>
                {friends?.map((g) => (
                  <GroupMemberList
                    value={g}
                    groupId={groupId}
                    addMemCallBack2={addMemCallBack}
                  />
                ))}
              </List>
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
