import React, { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  makeStyles,
  Container,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LForm(props) {
  const classes = useStyles();

  const building_info = props.building_info;
  const tenant_info = props.tenant_info;

  return (
    <Grid container direction="row" justify="space-around" alignItems="center">
      <Grid item xs={12} md={6}>
        <Container component="main" maxWidth="sm">
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Choose Tenant
            </Typography>
            <div className={classes.form}>
              <Autocomplete
                id="tenant-info"
                options={tenant_info}
                getOptionLabel={(option) => option.tenant_name}
                fullWidth
                onChange={props.handleChangeAutoComplete}
                renderInput={(params) => (
                  <TextField {...params} label="Tenants" variant="outlined" />
                )}
              />
            </div>
          </div>
        </Container>
      </Grid>
      <Grid item xs={12} md={6}>
        <Container component="main" maxWidth="sm">
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Building Details
            </Typography>
            <form className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Autocomplete
                    id="building-info"
                    options={building_info}
                    getOptionLabel={(option) => option.building_name}
                    fullWidth
                    onChange={props.handleChangeAutoComplete}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Building Name"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="floor_number"
                    label="Floor Number"
                    variant="filled"
                    type="number"
                    fullWidth
                    required
                    onChange={props.handleChange}
                    value={props.floor_number}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="flat_number"
                    label="Flat Number"
                    variant="filled"
                    type="number"
                    fullWidth
                    required
                    onChange={props.handleChange}
                    value={props.flat_number}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="rent_amount"
                    label="Rent Amount"
                    variant="filled"
                    type="number"
                    fullWidth
                    required
                    onChange={props.handleChange}
                    value={props.rent_amount}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      margin="normal"
                      id="date-picker-dialog-1"
                      label="Start Rent Date"
                      format="yyyy-MM-dd"
                      fullWidth
                      value={props.start_date}
                      onChange={props.handleStartDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      margin="normal"
                      id="date-picker-dialog-2"
                      label="Expected Due Date"
                      format="yyyy-MM-dd"
                      fullWidth
                      value={props.due_date}
                      onChange={props.handleDueDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={props.handleSubmit}
              >
                Submit
              </Button>
            </form>
          </div>
        </Container>
      </Grid>
    </Grid>
  );
}
