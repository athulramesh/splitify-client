import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import GroupAdapter from "../../adapters/groupAdapter";
import { useAuth } from "../../contexts/AuthContext";
import "../../styles/Group/GroupDetails.css";
import AddExpense from "./AddExpense";
import AddPayment from "./AddPayment";

function FriendGroupDetails() {
  let location = useLocation();
  let friend = location?.state?.friend;
  const { currentUser } = useAuth();
  const [group, setGroup] = useState();
  function getGroupDetails() {
    GroupAdapter.getGroupDetails(currentUser, friend?.groupId).then((data) => {
      setGroup(data.data);
    });
  }

  useEffect(() => {
    getGroupDetails();
  }, []);
  return (
    <div className="group_details">
      <Typography variant="h3" component="h2" className="groupMemberHeading">
        {`${friend?.firstName} ${friend?.lastName}`}
      </Typography>
      <div className="group_transaction_details">
        <AddExpense
          groupId={friend?.groupId}
          groupMemberList={[friend, currentUser?.userDetails]}
        />
        <AddPayment
          groupId={friend?.groupId}
          groupMemberList={[friend, currentUser?.userDetails]}
        />
      </div>
    </div>
  );
}

export default FriendGroupDetails;
