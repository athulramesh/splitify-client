import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Avatar, IconButton } from "@material-ui/core";
import "../../styles/Group/GroupMemberDetails.css";
import MoreVertIcon from "@material-ui/icons/MoreVert";

export default function GroupMemberDetails({ value }) {
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
        <IconButton size="small" fontSize="small">
          <MoreVertIcon size="small" />
        </IconButton>
      </CardActions>
    </Card>
  );
}
