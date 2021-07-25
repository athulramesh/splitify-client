import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ExpenseAdapter from "../../adapters/expenseAdapter";
import GroupAdapter from "../../adapters/groupAdapter";
import PaymentAdapter from "../../adapters/paymentAdapter";
import { useAuth } from "../../contexts/AuthContext";
import "../../styles/Group/GroupDetails.css";
import AddExpense from "./AddExpense";
import AddPayment from "./AddPayment";
import TransactionAdapter from "../../adapters/transactionAdapter";
import mergerSort from "./mergesort";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import IndividualTransactionCard from "./IndividualTransactionCard";

function FriendGroupDetails() {
  let location = useLocation();
  let friend = location?.state?.friend;
  let id = friend?.groupId;
  const { currentUser } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [payments, setpayments] = useState([]);
  const [transactions, setTransactions] = useState();
  const [sortedList, setSortedList] = useState();

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
    getAllExpenseDetails();
    getIndividualTransaction();
  }, []);

  useEffect(() => {
    setSortedList(mergerSort(expenses, payments));
  }, [payments]);
  return (
    <div className="group_details">
      <div className="group_transaction_details">
        <Typography variant="h3" component="h2" className="groupMemberHeading">
          {`${friend?.firstName} ${friend?.lastName}`}
        </Typography>
        <div className="actions">
          <AddExpense
            groupId={friend?.groupId}
            groupMemberList={[friend, currentUser?.userDetails]}
            expenseCallback={expenseCall}
          />
          <AddPayment
            groupId={friend?.groupId}
            groupMemberList={[friend, currentUser?.userDetails]}
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
    </div>
  );
}

export default FriendGroupDetails;
