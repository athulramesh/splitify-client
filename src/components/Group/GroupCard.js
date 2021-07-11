import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Avatar, Fade, Grow } from "@material-ui/core";
import "../../styles/Group/GroupCard.css";

export default function GroupCard({ groupName }) {
  return (
    <Fade in={true}>
      <Card className="groupCard">
        <CardContent className="groupList">
          <Avatar className="groupAvatar">{groupName[0].toUpperCase()}</Avatar>
          <div className="groupName">
            <Typography variant="h5" component="h2">
              {groupName}
            </Typography>
          </div>
        </CardContent>
        <CardActions>
          <Button size="small" color="secondary">
            Remove
          </Button>
        </CardActions>
      </Card>
    </Fade>
  );
}
