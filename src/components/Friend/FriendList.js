import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  Grow,
  Typography,
} from "@material-ui/core";
import React from "react";
import "../../styles/Friend/FriendList.css";

function FriendList({ firstName, lastName }) {
  return (
    <Grow in={true}>
      <Card className="friendLister">
        <CardContent className="friendList">
          <Avatar className="friendAvatar">{firstName[0].toUpperCase()}</Avatar>
          <div className="friendName">
            <Typography variant="h5" component="h2">
              {`${firstName} ${lastName}`}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </Grow>
  );
}

export default FriendList;
