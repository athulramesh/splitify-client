import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import GroupAdapter from "../../adapters/groupAdapter";
import ExpenseAdapter from "../../adapters/expenseAdapter";
import PaymentAdapter from "../../adapters/paymentAdapter";
import { useAuth } from "../../contexts/AuthContext";
import "../../styles/Group/GroupDetails.css";
import AddExpense from "./AddExpense";
import AddMember from "./AddMember";
import AddPayment from "./AddPayment";
import GroupMemberDetails from "./GroupMemberDetails";
import ExpenseDetailsAccordion from "./ExpenseDetailsAccordion";

function GroupDetails({ id }) {
  const { currentUser } = useAuth();
  const [group, setGroup] = useState();
  const [expenses, setExpenses] = useState();
  const [payments, setpayments] = useState();
  function getGroupDetails() {
    GroupAdapter.getGroupDetails(currentUser, id).then((data) => {
      setGroup(data.data);
      console.log(data.data);
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
  function getAllExpenseDetails() {
    ExpenseAdapter.getUserExpenses(currentUser, id).then((data) => {
      console.log("expense ");
      console.log(data.data.expenses);
      if (data.data.expenses.length > 0) {
        let onDate = formatDate(data.data.expenses[0].onDate);
        console.log(onDate);
        PaymentAdapter.getPaymentsDetails(currentUser, id, onDate).then(
          (res) => {
            setpayments(res.data.payments);
          }
        );
      }
      setExpenses(data.data.expenses);
      console.log(data.data.expenses);
    });
  }
  useEffect(() => {
    getGroupDetails();
    getAllExpenseDetails();
  }, []);

  let memCall = (childData) => {
    setGroup({
      ...group,
      groupMemberList: [...group.groupMemberList, childData],
    });
  };
  return (
    <div className="group_details">
      <div className="group_transaction_details">
        <Typography variant="h3" component="h2" className="groupMemberHeading">
          {group?.groupName}
        </Typography>
        <div className="actions">
          <AddExpense groupId={id} groupMemberList={group?.groupMemberList} />
          <AddPayment groupId={id} groupMemberList={group?.groupMemberList} />
        </div>
        <div className="expenseDetails">
          {expenses?.map((f) => (
            <ExpenseDetailsAccordion key={f.groupId} expense={f} />
          ))}
        </div>
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
          <GroupMemberDetails value={g} />
        ))}
      </div>
    </div>
  );
}

export default GroupDetails;
