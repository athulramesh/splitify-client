import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import GroupAdapter from "../../adapters/groupAdapter";
import { useAuth } from "../../contexts/AuthContext";
import "../../styles/Group/GroupDetails.css";
import AddExpense from "./AddExpense";
import AddMember from "./AddMember";
import AddPayment from "./AddPayment";
import GroupMemberDetails from "./GroupMemberDetails";

function GroupDetails({ id }) {
  const { currentUser } = useAuth();
  const [group, setGroup] = useState();
  function getGroupDetails() {
    GroupAdapter.getGroupDetails(currentUser, id).then((data) => {
      setGroup(data.data);
      console.log(data.data);
    });
  }

  useEffect(() => {
    getGroupDetails();
  }, []);
  return (
    <div className="group_details">
      <Typography variant="h3" component="h2" className="groupMemberHeading">
        {group?.groupName}
      </Typography>
      <div className="group_transaction_details">
        <AddExpense groupId={id} groupMemberList={group?.groupMemberList} />
        <AddPayment groupId={id} groupMemberList={group?.groupMemberList} />
        <AddMember groupMemberList={group?.groupMemberList} groupId={id} />
      </div>
      <div className="group_member_details">
        <Typography variant="h5" component="h2" className="groupMemberHeading">
          Group members
        </Typography>
        {group?.groupMemberList?.map((g) => (
          <GroupMemberDetails value={g} />
        ))}
      </div>
    </div>
  );
}

export default GroupDetails;
