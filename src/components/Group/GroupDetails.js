import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import GroupAdapter from "../../adapters/groupAdapter";
import ExpenseAdapter from "../../adapters/expenseAdapter";
import { useAuth } from "../../contexts/AuthContext";
import "../../styles/Group/GroupDetails.css";
import AddExpense from "./AddExpense";
import AddMember from "./AddMember";
import AddPayment from "./AddPayment";
import GroupMemberDetails from "./GroupMemberDetails";
import ExpenseDetailsAccordion from "./ExpenseDetailsAccordion";
import TransactionAdapter from "../../adapters/transactionAdapter";
import IndividualTransactionCard from "./IndividualTransactionCard";

function GroupDetails({ id }) {
  const { currentUser } = useAuth();
  const [group, setGroup] = useState();
  const [expenses, setExpenses] = useState();
  const [transactions, setTransactions] = useState();
  function getGroupDetails() {
    GroupAdapter.getGroupDetails(currentUser, id).then((data) => {
      setGroup(data.data);
      console.log(data.data);
    });
  }
  function getAllExpenseDetails() {
    ExpenseAdapter.getUserExpenses(currentUser, id).then((data) => {
      setExpenses(data.data.expenses);
      console.log(data.data.expenses);
    });
  }
  function getIndividualTransaction() {
    TransactionAdapter.getIndividualTransaction(currentUser, id).then(
      (data) => {
        setTransactions(data.data.individualTransaction);
        console.log(data.data.individualTransaction);
      }
    );
  }

  useEffect(() => {
    getGroupDetails();
    getAllExpenseDetails();
    getIndividualTransaction();
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
        <div>
          <Typography
            variant="h5"
            component="h2"
            className="groupMemberHeading"
          >
            Individual Transactions
          </Typography>
          {transactions?.map((t) => (
            <IndividualTransactionCard key={id} individualTransaction={t} />
          ))}
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
