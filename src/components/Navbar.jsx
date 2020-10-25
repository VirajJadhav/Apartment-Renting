import React from "react";
import {
  Button,
  Typography,
  Toolbar,
  AppBar,
  makeStyles,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  const history = useHistory();

  const logout = () => {
    if (localStorage.getItem("user") !== null) {
      localStorage.removeItem("user");
    }
    history.push("/");
  };

  const authRoutes = (
    <div>
      <Link to="/" style={{ textDecoration: "none", color: "white" }}>
        <Button color="inherit">Login</Button>
      </Link>
      <Link to="/signup" style={{ textDecoration: "none", color: "white" }}>
        <Button color="inherit">Sign Up</Button>
      </Link>
    </div>
  );

  const roleRoutes = (
    <div>
      <Button onClick={logout} color="inherit">
        Log Out
      </Button>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Apartment Renting
          </Typography>
          {localStorage.getItem("user") ? roleRoutes : authRoutes}
        </Toolbar>
      </AppBar>
    </div>
  );
}
