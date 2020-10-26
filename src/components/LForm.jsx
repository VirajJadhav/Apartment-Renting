import React from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  makeStyles,
  Container,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

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

export default function BForm(props) {
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
