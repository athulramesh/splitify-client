import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Avatar, Fade } from "@material-ui/core";
import "../../styles/Group/GroupTransactionCard.css";

export default function IndividualTransactionCard({ individualTransaction }) {
  console.log(individualTransaction);
  const name = `${individualTransaction?.person?.firstName}  ${individualTransaction?.person?.lastName}`;
  const color = individualTransaction.isToPay ? "secondary" : "green";
  return (
    <Fade in={true}>
      <Card className="groupLister">
        <CardContent className="groupList">
          <Avatar className="groupAvatar">{name[0].toUpperCase()}</Avatar>
          <div className="groupName">
            <Typography variant="caption" component="h6">
              {name}
            </Typography>
          </div>
        </CardContent>
        <CardActions>
          <div className="transactiondetails">
            <Typography variant="caption" component="h6" color={color}>
              {individualTransaction?.amount}
            </Typography>
          </div>
        </CardActions>
      </Card>
    </Fade>
  );
}
