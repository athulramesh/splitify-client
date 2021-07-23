import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@material-ui/core";
import React from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import "../../styles/Group/Paymenter.css";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
function Paymenter({ payment }) {
  return (
    <div>
      <Card
        className="payment_root"
        elevation={10}
        style={{ backgroundColor: "#f5f3f4", color: "#2f3e46" }}
      >
        <CardContent className="payment_content">
          <AttachMoneyIcon />
          <Typography
            variant="h7"
            component="h7"
            className="payment_memberName"
          >
            {`${payment?.paidBy?.firstName} ${payment?.paidBy?.lastName} paid ${payment?.receivedBy?.firstName} ${payment?.receivedBy?.lastName} ${payment.amount}`}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton size="small" fontSize="small">
            <MoreVertIcon size="small" />
          </IconButton>
        </CardActions>
      </Card>
      {/* <Typography variant="h6" component="h6" style={{ color: "#6c757d" }}>
        {`${payment?.paidBy?.firstName} ${payment?.receivedBy?.firstName}  ${payment.amount}`}
      </Typography> */}
    </div>
  );
}

export default Paymenter;
