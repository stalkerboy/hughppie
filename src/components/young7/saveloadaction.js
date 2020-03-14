import React, { useState } from "react";
import PropTypes from "prop-types";
import { TextField, Paper, DialogTitle, DialogContent, DialogContentText, Dialog, Button } from "@material-ui/core";
import * as Icon from "@material-ui/icons";

function SimpleDialog(props) {
  const { onClose, open, btnType, actions, loadActions } = props;

  const [textValue, setTextValue] = useState("");

  const handleClose = () => {
    onClose();
  };

  const onClickLoad = textValue => {
    onClose();
    loadActions(textValue);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="scroll-dialog-title" open={open} style={{ flexWrap: "wrap" }}>
      <DialogTitle id="scroll-dialog-title">{btnType}</DialogTitle>
      <DialogContent dividers={true}>
        <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
          {btnType === "save" ? (
            <TextField
              label="Multiline"
              multiline
              rows="20"
              defaultValue={JSON.stringify(actions)}
              variant="outlined"
              InputProps={{
                readOnly: true
              }}
              fullWidth
            />
          ) : (
            <div>
              <TextField label="Multiline" multiline rows="20" variant="outlined" onChange={e => setTextValue(e.target.value)} />
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Icon.CloudUpload />}
                  style={{ margin: 20, width: 160 }}
                  onClick={() => onClickLoad(textValue)}
                >
                  Load LOAD
                </Button>
              </div>
            </div>
          )}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export function SaveLoadAction(props) {
  const [open, setOpen] = React.useState(false);
  const [btnType, setbtnType] = React.useState("save");

  const handleClickOpen = type => {
    setbtnType(type);
    setOpen(true);
  };

  const handleClose = value => {
    setOpen(false);
  };

  return (
    <div>
      <Paper style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Icon.Save />}
          style={{ margin: 20, width: 160 }}
          onClick={() => handleClickOpen("save")}
          disabled
        >
          Save
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Icon.CloudUpload />}
          style={{ margin: 20, width: 160 }}
          onClick={() => handleClickOpen("load")}
          disabled
        >
          Load
        </Button>
        <SimpleDialog open={open} onClose={handleClose} btnType={btnType} actions={props.actions} loadActions={props.loadActions} />
      </Paper>
    </div>
  );
}
