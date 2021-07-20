import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useAuth } from "../../contexts/AuthContext";
import ReceiptIcon from "@material-ui/icons/Receipt";
import { List } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { ListItemText } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import "../../styles/Group/ExpenseDetailsAccordion.css";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  column: {
    flexBasis: "33.33%",
    width: "60%",
  },
}));

export default function ExpenseDetailsAccordion({ expense }) {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const [expenseState, setExpanseState] = useState(expense);

  console.log(expense);
  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <ReceiptIcon />
          <div className={classes.column}>
            <Typography>{expense.expenseName}</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <List dense className={classes.root}>
            {console.log(expenseState?.amount)}
            <Typography>{`Total Expense Amount ${expenseState?.amount}`}</Typography>

            {expenseState?.share?.map((e) => {
              return (
                <div className="list_expense_shares">
                  <ListItem key={e.groupId}>
                    <Avatar>{e.ownerId.firstName[0].toUpperCase()}</Avatar>
                    <ListItemText
                      primary={`${e.ownerId.firstName} ${e.ownerId.lastName} owes ${expenseState?.paidBy.firstName} ${expenseState?.paidBy.lastName} ₹ ${e.amount}
`}
                    />
                  </ListItem>
                </div>
              );
            })}
          </List>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
