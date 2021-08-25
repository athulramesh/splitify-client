import React, { useEffect, useState } from "react";
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
import { IconButton } from "@material-ui/core";
import { Menu } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import GroupAdapter from "../../adapters/groupAdapter";
import EditExpense from "./EditExpense";
import ExpenseAdapter from "../../adapters/expenseAdapter";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: "5px",
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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [clicked, setClicked] = useState(false);
  const [edit, setEdit] = useState(false);
  const open = Boolean(anchorEl);
  const [group, setGroup] = useState();

  function getGroupDetails() {
    GroupAdapter.getGroupDetails(currentUser, expense.groupId).then((data) => {
      setGroup(data.data);
    });
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setClicked(true);
  };

  const handleEdit = (event) => {
    setEdit(true);
  };
  const handleDelete = () => {
    ExpenseAdapter.deleteExpense(currentUser, expense.expenseId);
  };

  useEffect(() => {
    getGroupDetails();
  }, []);
  let expenseCall = (req) => {
    // TODO
    setExpanseState(req);
  };
  return (
    <div className={classes.root}>
      {edit ? (
        <EditExpense
          key={expense?.expenseId}
          expenseId={expense?.expenseId}
          groupId={group?.groupId}
          groupMemberList={group?.groupMemberList}
          expenseCallback={expenseCall}
        />
      ) : null}
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
            <div className="accordion_header">
              <div>
                <Typography variant="subtitle2">{`Created By : ${expenseState?.createdBy?.firstName} ${expenseState?.createdBy?.lastName} `}</Typography>
                <Typography variant="body1">{`Total Expense Amount ₹${expenseState?.amount}`}</Typography>
                <Typography variant="body1">{`Pending Amount ₹${expenseState?.settledAmount}`}</Typography>
              </div>
              <IconButton
                aria-label="more"
                // aria-controls="long-menu"
                // aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: 20 * 4.5,
                    width: "20ch",
                  },
                }}
              >
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
              </Menu>
            </div>

            {expenseState?.share?.map((e) => {
              return (
                <div className="list_expense_shares">
                  <ListItem key={e.groupId}>
                    <Avatar>{e?.ownerId?.firstName?.[0].toUpperCase()}</Avatar>
                    <ListItemText
                      primary={`${e?.ownerId?.firstName} ${e?.ownerId?.lastName} owes ${expenseState?.paidBy?.firstName} ${expenseState?.paidBy?.lastName} ₹${e?.remainingAmount}
`}
                      secondary={`Settled Amount  ₹${e?.settledAmount}`}
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
