import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  makeStyles,
  Container,
} from "@material-ui/core";
import { LockOutlined as LockOutlinedIcon } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import Navbar from "../components/Navbar";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();

  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (event) => {
    if (event.target.name === "email") setEmail(event.target.value);
    else if (event.target.name === "password") setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.persist();
    const data = {
      user_email: email,
      user_password: password,
    };
    axios
      .post(BACKEND_URL + "/auth/login", data)
      .then((response) => {
        const res = response.data;
        if (!res.error) {
          localStorage.setItem("user", res.result.user_email);
          if (res.result.user_type === "O") history.push("/owner");
          else if (res.result.user_type === "T") history.push("/tenant");
        } else {
          alert(res.result);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div>
      <Navbar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <form className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              type="email"
              required
              fullWidth
              label="Email Address"
              name="email"
              value={email}
              onChange={handleChange}
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              value={password}
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              onChange={handleChange}
              autoComplete="current-password"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Log In
            </Button>
            <Grid
              container
              justify="center"
              direction="row"
              alignItems="center"
            >
              <Grid item>
                <Link to="/signup" style={{ textDecoration: "none" }}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
}
