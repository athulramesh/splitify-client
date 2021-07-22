import React, { useEffect, useState } from "react";
import "../../styles/Home/Home.css";
import TransactionAdapter from "../../adapters/transactionAdapter";
import { useAuth } from "../../contexts/AuthContext";
import GroupTransactionCard from "../Group/GroupTransactionCard";
import { Typography } from "@material-ui/core";
import Summary from "./Summary";
function Home({ handleCallBackHome }) {
  const { currentUser } = useAuth();
  const [transaction, setTransaction] = useState();

  function getAllTransactions() {
    TransactionAdapter.getGroupWiseTransactions(currentUser).then((data) => {
      console.log(data.data);
      setTransaction(data.data);
    });
    console.log("here");
  }
  useEffect(() => {
    getAllTransactions();
  }, []);

  return (
    <div className="home">
      <div className="placeholder"></div>
      <Summary
        from={transaction?.fromAmount}
        to={transaction?.toAmount}
        className="summary"
      />
      <div className="groupLs">
        <Typography variant="body2">{"Group Transactions"}</Typography>
        {transaction?.groupTransaction?.map((f) => (
          <div
            onClick={() =>
              handleCallBackHome({ component: "group", groupId: f?.groupId })
            }
          >
            <GroupTransactionCard groupTransactions={f} />
          </div>
        ))}
        <Typography variant="body2">{"Non Group Transactions"}</Typography>
        {transaction?.nonGroupTransaction?.map((g) => (
          <div
            onClick={() =>
              handleCallBackHome({
                component: "friends",
                friend: {
                  groupId: g?.groupId,
                  firstName: g?.user?.firstName,
                  lastName: g?.user?.lastName,
                },
              })
            }
          >
            <GroupTransactionCard groupTransactions={g} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
