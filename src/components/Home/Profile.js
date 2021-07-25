import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { Avatar, Button, IconButton } from "@material-ui/core";
import { useAuth } from "../../contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  section: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: 500,
    minWidth: 300,
  },
  sign_out: {
    marginRight: "10px",
  },
}));

export default function Profile() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { currentUser, signOut } = useAuth();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  useEffect(() => {}, []);
  return (
    <div>
      <IconButton style={{ marginTop: "-10px", marginBottom: "-10px" }}>
        <Avatar button onClick={handleClick}>
          {currentUser?.userDetails?.firstName[0].toUpperCase()}
        </Avatar>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        style={{ maxWidth: 500, minWidth: 300 }}
        className={classes.popover}
      >
        <div className={classes.section}>
          <Typography
            className={classes.typography}
            variant="h6"
            component="h6"
          >
            {`${currentUser?.userDetails?.firstName} ${currentUser?.userDetails?.lastName}`}
          </Typography>
          <Button className={classes.sign_out} onClick={() => signOut()}>
            sign out
          </Button>
        </div>
      </Popover>
    </div>
  );
}
