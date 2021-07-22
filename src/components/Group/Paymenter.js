import { Typography } from "@material-ui/core";
import React from "react";

function Paymenter({ payment }) {
  return (
    <div>
      <Typography variant="h6" component="h6" style={{ color: "#6c757d" }}>
        {`${payment?.paidBy?.firstName} ${payment?.receivedBy?.firstName}  ${payment.amount}`}
      </Typography>
    </div>
  );
}

export default Paymenter;
