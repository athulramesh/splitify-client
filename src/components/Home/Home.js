import React, { useEffect, useState } from "react";
import "../../styles/Home/Home.css";
import TransactionAdapter from "../../adapters/transactionAdapter";
import { useAuth } from "../../contexts/AuthContext";
import GroupTransactionCard from "../Group/GroupTransactionCard";
import { Typography } from "@material-ui/core";
import Summary from "./Summary";
import { Link } from "react-router-dom";
function Home({ handleCallBackHome }) {
  const { currentUser } = useAuth();
  const [transaction, setTransaction] = useState();

  function getAllTransactions() {
    TransactionAdapter.getGroupWiseTransactions(currentUser).then((data) => {
      setTransaction(data.data);
    });
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
        {transaction?.groupTransaction?.length > 0 && (
          <Typography variant="h6" style={{ marginLeft: "20px" }}>
            {"Groups"}
          </Typography>
        )}
        {transaction?.groupTransaction?.map((f) => (
          <Link
            to={`/group/${f.groupId}`}
            style={{ textDecoration: "none" }}
            key={f?.groupId}
          >
            <GroupTransactionCard groupTransactions={f} key={f?.groupId} />
          </Link>
        ))}
        {transaction?.nonGroupTransaction?.length > 0 && (
          <Typography variant="h6" style={{ marginLeft: "20px" }}>
            {"Friends"}
          </Typography>
        )}
        {transaction?.nonGroupTransaction?.map((g) => (
          <Link
            to={{
              pathname: `friend/${g.groupId}`,
              state: {
                friend: {
                  groupId: g?.groupId,
                  firstName: g?.user?.firstName,
                  lastName: g?.user?.lastName,
                },
              },
            }}
            style={{ textDecoration: "none" }}
          >
            <GroupTransactionCard groupTransactions={g} key={g?.groupId} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
