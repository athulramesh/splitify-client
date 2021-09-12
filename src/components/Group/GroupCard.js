import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Avatar, Grow } from "@material-ui/core";
import "../../styles/Group/GroupCard.css";

export default function GroupCard({ groupName }) {
  return (
    <Grow in={true}>
      <Card className="groupCard">
        <CardContent className="groupList">
          <Avatar className="groupAvatar">{groupName[0].toUpperCase()}</Avatar>
          <div className="groupName">
            <Typography variant="h5" component="h2">
              {groupName}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </Grow>
  );
}
