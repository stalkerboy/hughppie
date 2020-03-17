import React from "react";
import { Snackbar } from "@material-ui/core";
import { Alert as MuiAlert } from "@material-ui/lab";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const ActionAlert = props => {
  const { alertOpen, setAlertOpen, text } = props;

  //   const handleClick = () => {
  //     setOpen(true);
  //   };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  return (
    <Snackbar open={alertOpen} autoHideDuration={1000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error">
        {text}
      </Alert>
    </Snackbar>
  );
};
