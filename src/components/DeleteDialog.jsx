import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

export default function DeleteDialog(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={props.deleteOpen}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Delete this tenant from your rent list?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Once this action done cannot be reversed. This tenant will be
            permanently removed from your list.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleDeleteModal} color="primary">
            Cancel
          </Button>
          <Button onClick={props.handleDeleteSubmit} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
