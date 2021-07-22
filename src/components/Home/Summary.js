import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import "../../styles/Home/Summary.css";

function Summary({ from, to }) {
  return (
    <div className="summary">
      <Card style={{ backgroundColor: "#15616d", color: "#FFFFFF" }}>
        <CardContent className="summary-content">
          <Typography variant="h6" component="h6" className="heading">
            {`Your Dashboard`}
          </Typography>
          <div className="transactions">
            <div className="owe">
              <Typography variant="h6" component="h6">
                {`You are owed.`}
              </Typography>
              <Typography
                variant="h4"
                component="h4"
                style={{ color: "#06d6a0" }}
              >
                {from ? `${from}` : 0}
              </Typography>
            </div>
            <div className="owe">
              <Typography variant="h6" component="h6">
                {`You owe.`}
              </Typography>
              <Typography
                variant="h4"
                component="h4"
                style={{ color: "#ff686b" }}
              >
                {to ? `${to}` : 0}
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Summary;
