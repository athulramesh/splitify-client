import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Avatar, IconButton } from "@material-ui/core";
import "../../styles/Group/GroupMemberDetails.css";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Menu } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { useAuth } from "../../contexts/AuthContext";
import GroupAdapter from "../../adapters/groupAdapter";

export default function GroupMemberDetails({ value, groupId, callBackDelete }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { currentUser } = useAuth();
  const [clicked, setClicked] = useState(false);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const ITEM_HEIGHT = 20;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setClicked(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleRemove = (event) => {
    // setAnchorEl(null);
    GroupAdapter.removeGroupMember(currentUser, groupId, {
      userId: value.id,
    }).then(callBackDelete(value.id));
    handleClose();
  };
  return (
    <Card className="root">
      <CardContent className="content">
        <Avatar
          className="memberAvatar"
          style={{ height: "30px", width: "30px" }}
        >
          {value?.firstName[0].toUpperCase()}
        </Avatar>
        <Typography variant="h7" component="h7" className="memberName">
          {`${value.firstName} ${value.lastName}`}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "20ch",
            },
          }}
        >
          <MenuItem onClick={handleRemove}>Remove</MenuItem>
        </Menu>
      </CardActions>
    </Card>
  );
}
