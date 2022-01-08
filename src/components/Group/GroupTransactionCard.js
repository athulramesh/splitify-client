import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Avatar, Fade } from "@material-ui/core";
import "../../styles/Group/GroupTransactionCard.css";
import NumberFormat from "react-number-format";

export default function GroupTransactionCard({ groupTransactions }) {
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
            <Typography variant="h6" component="h5">
              {name}
            </Typography>
          </div>
        </CardContent>
        <CardActions>
          <div className="transactiondetails">
            <Typography className="Amount" variant="body1">
              {fromAmount > 0 ? (
                <NumberFormat
                  value={fromAmount}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₹"}
                  decimalScale={2}
                  fixedDecimalScale={true}
                />
              ) : null}
            </Typography>
            <Typography
              className="Amount"
              variant="body1"
              color="secondary"
              style={{ marginLeft: "10px" }}
            >
              {toAmount > 0 ? (
                <NumberFormat
                  value={toAmount}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₹"}
                  decimalScale={2}
                  fixedDecimalScale={true}
                />
              ) : null}
            </Typography>
          </div>
        </CardActions>
      </Card>
    </Fade>
  );
}
