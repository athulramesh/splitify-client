import { colors, Typography } from "@material-ui/core";
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
import TransactionAdapter from "../../adapters/transactionAdapter";
import IndividualTransactionCard from "./IndividualTransactionCard";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import mergerSort from "./mergesort";
import { useParams } from "react-router-dom";

function GroupDetails() {
  let { id } = useParams();
  const { currentUser } = useAuth();
  const [group, setGroup] = useState();
  const [expenses, setExpenses] = useState([]);
  const [payments, setpayments] = useState([]);
  const [transactions, setTransactions] = useState();
  const [sortedList, setSortedList] = useState();
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
  return (
    <div className="group_details">
      <div className="group_transaction_details">
        <Typography variant="h3" component="h2" className="groupMemberHeading">
          {group?.groupName}
        </Typography>
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
            <IndividualTransactionCard key={id} individualTransaction={t} />
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
          <GroupMemberDetails value={g} />
        ))}
      </div>
    </div>
  );
}

export default GroupDetails;
