import { FormControlLabel, Typography } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import GroupAdapter from "../../adapters/groupAdapter";
import ExpenseAdapter from "../../adapters/expenseAdapter";
import PaymentAdapter from "../../adapters/paymentAdapter";
import { useAuth } from "../../contexts/AuthContext";
import "../../styles/Group/GroupDetails.css";
import AddExpense from "./AddExpense";
import AddMember from "./AddMember";
import AddPayment from "./AddPayment";
import GroupMemberDetails from "./GroupMemberDetails";
import TransactionAdapter from "../../adapters/transactionAdapter";
import IndividualTransactionCard from "./IndividualTransactionCard";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import mergerSort from "./mergesort";
import { useParams } from "react-router-dom";
import { MenuItem } from "@material-ui/core";
import { Menu } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Button } from "@material-ui/core";
import { DialogActions } from "@material-ui/core";
import { DialogContentText } from "@material-ui/core";
import { DialogTitle } from "@material-ui/core";
import { DialogContent } from "@material-ui/core";
import { TextField, Dialog } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";

function GroupDetails() {
  let { id } = useParams();
  const { currentUser } = useAuth();
  const [group, setGroup] = useState();
  const [expenses, setExpenses] = useState([]);
  const [payments, setpayments] = useState([]);
  const [transactions, setTransactions] = useState();
  const [sortedList, setSortedList] = useState();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [clicked, setClicked] = useState(false);
  const [editGroup, setEditGroup] = useState(false);
  const groupNameRef = useRef();
  const [simplify, setSimplify] = useState(true);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setClicked(true);
  };

  const memberDelete = (deletedMember) => {
    let idx;
    let memberList = group?.groupMemberList;
    for (let i in memberList) {
      if (memberList[i].id === deletedMember) {
        idx = i;

        break;
      }
    }
    memberList.splice(idx, idx);
    setGroup({ ...group, groupMemberList: memberList });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleRemove = () => {
    GroupAdapter.deleteGroup(currentUser, id).then((data) => {});
    handleClose();
  };
  const handleEdit = () => {
    setEditGroup(true);
    handleClose();
  };
  const handleClickOk = () => {
    GroupAdapter.updateGroup(currentUser, id, {
      groupName: groupNameRef?.current?.value,
      simplify: simplify,
    }).then(() =>
      setGroup({ ...group, groupName: groupNameRef?.current?.value })
    );
    handleEditClose();
    setEditGroup(false);
  };
  const handleEditClose = () => {
    setEditGroup(false);
  };
  const open = Boolean(anchorEl);

  function getGroupDetails() {
    GroupAdapter.getGroupDetails(currentUser, id).then((data) => {
      setGroup(data.data);
    });
  }
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  let expenseCall = () => {
    getAllExpenseDetails();
    getIndividualTransaction();
  };
  function getAllExpenseDetails() {
    ExpenseAdapter.getUserExpenses(currentUser, id).then((data) => {
      if (data.data.expenses.length === 0) {
        setSortedList([]);
      }
      if (data.data.expenses.length > 0) {
        let onDate = formatDate(data.data.expenses[0].onDate);
        PaymentAdapter.getPaymentsDetails(currentUser, id, onDate).then(
          (res) => {
            setpayments(res.data.payments);
            setSortedList(mergerSort(expenses, payments));
          }
        );
      }
      setExpenses(data.data.expenses);
    });
  }
  function getIndividualTransaction() {
    TransactionAdapter.getIndividualTransaction(currentUser, id).then(
      (data) => {
        setTransactions(data.data.individualTransaction);
      }
    );
  }

  useEffect(() => {
    getGroupDetails();
    getAllExpenseDetails();
    getIndividualTransaction();
  }, []);

  useEffect(() => {
    setSortedList(mergerSort(expenses, payments));
  }, [payments]);

  let memCall = (childData) => {
    setGroup({
      ...group,
      groupMemberList: [...group.groupMemberList, childData],
    });
  };
  const handleChange = () => {
    setSimplify((prev) => !prev);
  };
  return (
    <div className="group_details">
      <div className="group_transaction_details">
        <div className="group_details_header">
          <Typography
            variant="h3"
            component="h2"
            className="groupMemberHeading"
          >
            {group?.groupName}
          </Typography>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
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
            <MenuItem onClick={handleRemove}>Delete</MenuItem>
          </Menu>
        </div>
        <div>
          <Dialog open={editGroup} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit Group</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Allows you to change the group name
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Group Name"
                type="text"
                fullWidth
                inputRef={groupNameRef}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={simplify}
                    onChange={handleChange}
                    color="primary"
                  />
                }
                label="Simplify"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEditClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleClickOk} color="primary">
                Ok
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <div className="actions">
          <AddExpense
            groupId={id}
            groupMemberList={group?.groupMemberList}
            expenseCallback={expenseCall}
          />
          <AddPayment
            groupId={id}
            groupMemberList={group?.groupMemberList}
            expenseCallback={expenseCall}
          />
        </div>
        <div>
          {sortedList?.length === 0 ? (
            <div className="settled">
              <div className="message">
                <div className="settled-text">
                  <Typography
                    variant="h6"
                    component="h6"
                    style={{ color: "#218380" }}
                  >
                    {`You are all settled!!`}
                  </Typography>
                </div>
                <CheckCircleIcon
                  style={{ height: "250px", width: "250px", color: "#64b6ac" }}
                />
              </div>
            </div>
          ) : null}
        </div>
        <div>
          {transactions?.map((t) => (
            <IndividualTransactionCard
              key={t?.person?.firstName}
              individualTransaction={t}
            />
          ))}
        </div>
        <div className="expenseDetails">{sortedList?.map((t) => t)}</div>
      </div>
      <div className="group_member_details">
        <div className="member_header">
          <Typography
            variant="h5"
            component="h2"
            className="groupMemberHeading"
          >
            Group members
          </Typography>
          <AddMember
            groupMemberList={group?.groupMemberList}
            groupId={id}
            addMemCallBack={memCall}
          />
        </div>
        {group?.groupMemberList?.map((g) => (
          <GroupMemberDetails
            key={g?.id}
            value={g}
            groupId={id}
            callBackDelete={memberDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default GroupDetails;
