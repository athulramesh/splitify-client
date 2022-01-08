import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { Badge, IconButton } from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import FriendAdapter from "../../adapters/friendAdapter";
import { useAuth } from "../../contexts/AuthContext";
import FriendRequets from "./FriendRequests";

const useStyles = makeStyles((theme) => ({
  typography: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    // width: "40%",
  },
  pop: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
}));

export default function Notification() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { currentUser } = useAuth();
  const [friendRequests, setFriendRequests] = useState();
  const [clicked, setClicked] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setClicked(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function getFriendRequests() {
    FriendAdapter.getFriendRequests(currentUser).then((data) => {
      setFriendRequests(data.data);
      setClicked(friendRequests?.length);
    });
  }
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  useEffect(() => {
    getFriendRequests();
  }, []);
  return (
    <div>
      <IconButton aria-label="cart" onClick={handleClick}>
        <Badge
          badgeContent={!clicked ? friendRequests?.length : 0}
          color="secondary"
        >
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <div className={classes.pop}>
          <div className={classes.typography}>
            {friendRequests?.length === 0 ? (
              <Typography>No notifications</Typography>
            ) : (
              <Typography>Your friend requests</Typography>
            )}
          </div>
          <FriendRequets requests={friendRequests} />
        </div>
      </Popover>
    </div>
  );
}
