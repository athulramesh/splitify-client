import React from "react";
import Typography from "@material-ui/core/Typography";
import { Fade } from "@material-ui/core";
import "../../styles/Group/IndividualCard.css";

export default function IndividualTransactionCard({ individualTransaction }) {
  const name = `${individualTransaction?.person?.firstName}  ${individualTransaction?.person?.lastName}`;
  const color = individualTransaction.isToPay ? "#ff686b" : "#06d6a0";
  const style = { color: color };
  const direction = individualTransaction.isToPay ? " owed you " : " owes you ";
  return (
    <Fade in={true}>
      <div className="rooter">
        <div className="contenter">
          <div className="memberName">
            <Typography
              variant="h6"
              component="h6"
              style={{ color: "#6c757d" }}
            >
              {`${name} ${direction} `}
            </Typography>
          </div>
          <div className="amountDetails">
            <Typography variant="h6" component="h6" style={style}>
              {individualTransaction?.amount}
            </Typography>
          </div>
        </div>
      </div>
    </Fade>
  );
}
