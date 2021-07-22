import React, { useState } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { Button, Divider } from "@material-ui/core";
import GroupAdapter from "../../adapters/groupAdapter";
import { useAuth } from "../../contexts/AuthContext";
import "../../styles/Group/GroupMemberList.css";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

export default function GroupMemberList({ value, groupId, addMemCallBack2 }) {
  const { currentUser } = useAuth();
  const [added, setAdded] = useState(false);

  const acceptRequest = () => {
    GroupAdapter.addGroupMember(currentUser, groupId, {
      userId: value.id,
    }).then(addMemCallBack2(value));
    setAdded(true);
  };
  return (
    <div>
      <ListItem key={value.id} button>
        <div className="item">
          <div className="name">
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText
              id={value.id}
              primary={`${value.firstName} ${value.lastName}`}
            />
            <div className="button-area">
              {added ? (
                <CheckCircleOutlineIcon className="icon" />
              ) : (
                <Button
                  size="small"
                  color="primary"
                  onClick={acceptRequest}
                  disabled={added}
                  className="button_"
                >
                  Add
                </Button>
              )}
            </div>
          </div>
        </div>
      </ListItem>
      <Divider light />
    </div>
  );
}
