import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GroupAdapter from "../../adapters/groupAdapter";
import { useAuth } from "../../contexts/AuthContext";
import "../../styles/Group/GroupDetails.css";

function GroupDetails() {
  let { id } = useParams();
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
    </div>
  );
}

export default GroupDetails;
