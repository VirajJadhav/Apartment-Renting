import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
  Grid,
  TextField,
  Container,
  MenuItem,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

export default function EditDialog(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={props.open}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Update Tenant Details
        </DialogTitle>
        <DialogContent>
          <Container maxWidth="sm">
            <Grid container spacing={2}>
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
                <TextField
                  name="paid"
                  select
                  fullWidth
                  label="Select"
                  value={props.paid}
                  onChange={props.handleChange}
                  helperText="Please select rent paid status"
                >
                  <MenuItem value="Y">Yes</MenuItem>
                  <MenuItem value="N">No</MenuItem>
                </TextField>
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
          </Container>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={props.handleModal} color="primary">
            Cancel
          </Button>
          <Button onClick={props.modalSubmit} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
