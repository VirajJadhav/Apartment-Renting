import React from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  makeStyles,
  Container,
} from "@material-ui/core";

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

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Building Details
        </Typography>
        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="building_name"
                variant="outlined"
                required
                fullWidth
                value={props.building_name}
                onChange={props.handleChange}
                label="Building Name"
                autoFocus
                error={props.errorBuildingName}
                helperText={props.errorBuildingName ? props.helperField : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="total_floors"
                variant="outlined"
                required
                fullWidth
                type="number"
                value={props.total_floors}
                onChange={props.handleChange}
                label="Total Floors"
                error={props.errorTotalFloors}
                helperText={props.errorTotalFloors ? props.helperField : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="flats_each"
                variant="outlined"
                required
                type="number"
                fullWidth
                value={props.flats_each}
                onChange={props.handleChange}
                label="Flats per floor"
                error={props.errorFlatsEach}
                helperText={props.errorFlatsEach ? props.helperField : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="building_street"
                label="Address"
                fullWidth
                value={props.building_street}
                onChange={props.handleChange}
                multiline
                rows={3}
                required
                variant="outlined"
                error={props.errorBuildingStreet}
                helperText={props.errorBuildingStreet ? props.helperField : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="building_pincode"
                label="Pincode"
                variant="filled"
                type="number"
                fullWidth
                required
                onChange={props.handleChange}
                value={props.building_pincode}
                InputLabelProps={{
                  shrink: true,
                }}
                error={props.errorBuildingPincode}
                helperText={props.errorBuildingPincode ? props.helperField : ""}
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
  );
}
