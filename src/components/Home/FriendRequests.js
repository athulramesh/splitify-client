import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { Button, Divider } from "@material-ui/core";
import FriendAdapter from "../../adapters/friendAdapter";
import { useAuth } from "../../contexts/AuthContext";
import { useFriends } from "../../contexts/FriendsContext";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function FriendRequets({ requests }) {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const { setFriend } = useFriends();

  const acceptRequest = (value) => {
    console.log(value.connectionId);
    FriendAdapter.acceptRequest(currentUser, {
      connectionId: value.connectionId,
    }).then((res) => {
      value.groupId = res.data;
      setFriend(value);
    });
  };
  return (
    <List dense className={classes.root}>
      {requests.map((value) => {
        const labelId = `checkbox-list-secondary-label-${value.fromId}`;
        return (
          <div>
            <ListItem key={value.id} button>
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>
              <ListItemText
                id={labelId}
                primary={`${value.firstName} ${value.lastName}`}
              />
              <ListItemSecondaryAction>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => acceptRequest(value)}
                >
                  Accept
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider light />
          </div>
        );
      })}
    </List>
  );
}
