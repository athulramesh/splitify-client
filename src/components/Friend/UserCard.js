import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FriendAdapter from "../../adapters/friendAdapter";
import { useAuth } from "../../contexts/AuthContext";
import { Grow } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    display: "flex",
    justifyContent: "space-between;",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  margin: {
    margin: 10,
  },
});

export default function UserCard({ firstName, lastName, userName, id }) {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const [sendStatus, setSendStatus] = useState(false);
  async function handle(e) {
    e.preventDefault();
    try {
      await FriendAdapter.sendFriendRequest(currentUser, {
        targetUserId: id,
      }).then(setSendStatus(true));
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Grow in={true}>
      <Card className={classes.root} elevation={4}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {userName}
          </Typography>
          <Typography variant="h5" component="h2">
            {`${firstName} ${lastName}`}
          </Typography>
        </CardContent>
        <CardActions>
          {sendStatus ? (
            <Button size="small" color="secondary" className={classes.margin}>
              Cancel Request
            </Button>
          ) : (
            <Button
              size="small"
              color="primary"
              className={classes.margin}
              onClick={handle}
            >
              Send Request
            </Button>
          )}
        </CardActions>
      </Card>
    </Grow>
  );
}
