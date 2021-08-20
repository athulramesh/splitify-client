import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import NumberFormat from "react-number-format";
import "../../styles/Home/Summary.css";

function Summary({ from, to }) {
  return (
    <div className="summary">
      <Card style={{ backgroundColor: "#15616d", color: "#FFFFFF" }}>
        <CardContent className="summary-content">
          <div className="heading">
            <Typography variant="h6" component="h6">
              {`Your Dashboard`}
            </Typography>
          </div>
          <div className="transactions">
            <div className="owe">
              <Typography variant="h6" component="h6">
                {`You are owed`}
              </Typography>
              <Typography
                variant="h4"
                component="h4"
                style={{ color: "#06d6a0" }}
              >
                {from ? (
                  <NumberFormat
                    value={from}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₹"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                  />
                ) : (
                  0
                )}
              </Typography>
            </div>
            <div className="owe">
              <Typography variant="h6" component="h6">
                {`You owe`}
              </Typography>
              <Typography
                variant="h4"
                component="h4"
                style={{ color: "#ff686b" }}
              >
                {to ? (
                  <NumberFormat
                    value={to}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₹"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                  />
                ) : (
                  0
                )}
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Summary;
