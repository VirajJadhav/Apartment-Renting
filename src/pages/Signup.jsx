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
  MenuItem,
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Signup() {
  const classes = useStyles();

  const history = useHistory();

  const [user_name, setUserName] = useState("");
  const [errorUserName, setErrorUserName] = useState(false);
  const [user_email, setUserEmail] = useState("");
  const [errorUserEmail, setErrorUserEmail] = useState(false);
  const [user_password, setUserPassword] = useState("");
  const [errorUserPassword, setErrorUserPassword] = useState(false);
  const [user_type, setUserType] = useState("");
  const [errorUserType, setErrorUserType] = useState(false);
  const [user_pincode, setUserPincode] = useState("");
  const [errorUserPincode, setErrorUserPincode] = useState(false);
  const [user_contact, setUserContact] = useState("");
  const [errorUserContact, setErrorUserContact] = useState(false);
  const [user_address, setUserAddress] = useState("");
  const [errorUserAddress, setErrorUserAddress] = useState(false);

  const [helperField, setHelperField] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    switch (event.target.name) {
      case "user_name":
        if (errorUserName) {
          setHelperField("");
          setErrorUserName((prevState) => !prevState);
        }
        setUserName(value);
        break;
      case "user_type":
        if (errorUserType) {
          setHelperField("");
          setErrorUserType((prevState) => !prevState);
        }
        setUserType(value);
        break;
      case "user_pincode":
        if (errorUserPincode) {
          setHelperField("");
          setErrorUserPincode((prevState) => !prevState);
        }
        if (value >= 0) setUserPincode(value);
        break;
      case "user_contact":
        if (errorUserContact) {
          setHelperField("");
          setErrorUserContact((prevState) => !prevState);
        }
        setUserContact(value);
        break;
      case "user_address":
        if (errorUserAddress) {
          setHelperField("");
          setErrorUserAddress((prevState) => !prevState);
        }
        setUserAddress(value);
        break;
      case "email":
        if (errorUserEmail) {
          setHelperField("");
          setErrorUserEmail((prevState) => !prevState);
        }
        setUserEmail(value);
        break;
      case "password":
        if (errorUserPassword) {
          setHelperField("");
          setErrorUserPassword((prevState) => !prevState);
        }
        setUserPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.persist();
    if (user_name === "") {
      setHelperField("This field is required !");
      setErrorUserName((prevState) => !prevState);
      return;
    }
    if (user_type === "") {
      setHelperField("This field is required !");
      setErrorUserType((prevState) => !prevState);
      return;
    }
    if (user_address === "") {
      setHelperField("This field is required !");
      setErrorUserAddress((prevState) => !prevState);
      return;
    }
    if (user_pincode === "") {
      setHelperField("This field is required !");
      setErrorUserPincode((prevState) => !prevState);
      return;
    }
    if (user_contact === "") {
      setHelperField("This field is required !");
      setErrorUserContact((prevState) => !prevState);
      return;
    }
    if (user_email === "") {
      setHelperField("This field is required !");
      setErrorUserEmail((prevState) => !prevState);
      return;
    }
    if (user_password === "") {
      setHelperField("This field is required !");
      setErrorUserPassword((prevState) => !prevState);
      return;
    }
    const data = {
      user_email,
      user_password,
      user_type,
      user_contact,
      user_pincode,
      user_address,
      user_name,
    };
    // console.log(data);
    axios
      .post(BACKEND_URL + "/auth/signup", data)
      .then((response) => {
        const res = response.data;
        if (!res.error) {
          history.push("/");
        } else {
          setHelperField(res.result);
          setErrorUserEmail((prevState) => !prevState);
          // alert(res.result);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div>
      <Navbar />
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="user_name"
                  name="user_name"
                  variant="outlined"
                  required
                  fullWidth
                  value={user_name}
                  onChange={handleChange}
                  label="Full Name"
                  autoFocus
                  error={errorUserName}
                  helperText={errorUserName ? helperField : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="user_type"
                  select
                  fullWidth
                  label="Select"
                  value={user_type}
                  onChange={handleChange}
                  helperText="Please select your role"
                  error={errorUserType}
                >
                  <MenuItem value="O">Owner</MenuItem>
                  <MenuItem value="T">Tenant</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="user_address"
                  label="Address"
                  fullWidth
                  value={user_address}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  required
                  variant="outlined"
                  helperText={errorUserAddress ? helperField : ""}
                  error={errorUserAddress}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="user_pincode"
                  label="Pincode"
                  variant="filled"
                  type="number"
                  fullWidth
                  required
                  onChange={handleChange}
                  value={user_pincode}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  helperText={errorUserPincode ? helperField : ""}
                  error={errorUserPincode}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="user_contact"
                  variant="outlined"
                  required
                  fullWidth
                  value={user_contact}
                  onChange={handleChange}
                  label="Contact Number"
                  helperText={errorUserContact ? helperField : ""}
                  error={errorUserContact}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  value={user_email}
                  onChange={handleChange}
                  autoComplete="email"
                  helperText={errorUserEmail ? helperField : ""}
                  error={errorUserEmail}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  value={user_password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  helperText={errorUserPassword ? helperField : ""}
                  error={errorUserPassword}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            <Grid
              container
              justify="center"
              direction="row"
              alignItems="center"
            >
              <Grid item>
                <Link to="/" style={{ textDecoration: "none" }}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
}
