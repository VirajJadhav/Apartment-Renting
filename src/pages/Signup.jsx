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
import { Link } from "react-router-dom";

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

  const [user_name, setUserName] = useState("");
  const [user_email, setUserEmail] = useState("");
  const [user_password, setUserPassword] = useState("");
  const [user_type, setUserType] = useState("");
  const [user_pincode, setUserPincode] = useState(0);
  const [user_contact, setUserContact] = useState("");
  const [user_address, setUserAddress] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    switch (event.target.name) {
      case "user_name":
        setUserName(value);
        break;
      case "user_type":
        setUserType(value);
        break;
      case "user_pincode":
        if (value >= 0) setUserPincode(value);
        break;
      case "user_contact":
        setUserContact(value);
        break;
      case "user_address":
        setUserAddress(value);
        break;
      case "email":
        setUserEmail(value);
        break;
      case "password":
        setUserPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.persist();
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
  };

  return (
    <Container component="main" maxWidth="xs">
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
                rows={4}
                required
                variant="outlined"
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
          <Grid container justify="center" direction="row" alignItems="center">
            <Grid item>
              <Link to="/login" style={{ textDecoration: "none" }}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
