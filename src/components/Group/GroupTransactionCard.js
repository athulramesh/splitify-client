import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Avatar, Fade } from "@material-ui/core";
import "../../styles/Group/GroupTransactionCard.css";

export default function GroupTransactionCard({ groupTransactions }) {
  console.log(groupTransactions);
  const name = groupTransactions?.groupName
    ? groupTransactions?.groupName
    : `${groupTransactions?.user?.firstName}  ${groupTransactions?.user?.lastName}`;
  const fromAmount = groupTransactions?.transaction?.fromAmount;
  const toAmount = groupTransactions?.transaction?.toAmount;
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
            <Typography className="Amount" variant="body2">
              {fromAmount > 0 ? fromAmount : null}
            </Typography>
            <Typography className="Amount" variant="body2" color="secondary">
              {toAmount > 0 ? toAmount : null}
            </Typography>
          </div>
        </CardActions>
      </Card>
    </Fade>
  );
}
