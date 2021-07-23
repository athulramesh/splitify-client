import React from "react";
import moment from "moment";
import "../../styles/Group/DateField.css";
import { Typography } from "@material-ui/core";
function DateField({ onDate }) {
  return (
    <div className="date">
      <Typography variant="h7" component="h7">
        {moment(onDate).format("MMMM Do")}
      </Typography>
    </div>
  );
}

export default DateField;
