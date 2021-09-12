import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import "../../styles/Group/Paymenter.css";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { Menu } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import EditPayment from "./EditPayment";
import PaymentAdapter from "../../adapters/paymentAdapter";
import { useAuth } from "../../contexts/AuthContext";

function Paymenter({ payment }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [clicked, setClicked] = useState(false);
  const [edit, setEdit] = useState(false);
  const currentUser = useAuth();
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setClicked(true);
  };
  const handleEdit = () => {
    setEdit(true);
    handleClose();
  };

  const handleRemove = () => {
    PaymentAdapter.deletePayment(currentUser, payment.paymentId);
    handleClose();
  };
  return (
    <div>
      {edit ? <EditPayment payment={payment} /> : null}
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
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: 20 * 4.5,
                width: "20ch",
              },
            }}
          >
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={handleRemove}>Remove</MenuItem>
          </Menu>
        </CardActions>
      </Card>
    </div>
  );
}

export default Paymenter;
