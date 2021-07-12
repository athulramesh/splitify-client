import React, { useEffect, useState } from "react";
import GroupAdapter from "../../adapters/groupAdapter";
import { useAuth } from "../../contexts/AuthContext";
import "../../styles/Group/GroupDetails.css";
import AddPayment from "./AddPayment";

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
    <div>
      <h1>GroupDetails</h1>
      <AddPayment groupId={id} groupMemberList={group?.groupMemberList} />
    </div>
  );
}

export default GroupDetails;
