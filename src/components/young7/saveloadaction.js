import React, { useState } from "react";
import { TextField, Paper, DialogTitle, DialogContent, Dialog, Button, DialogActions } from "@material-ui/core";
import * as Icon from "@material-ui/icons";

export function SaveLoadAction(props) {
  const { actions, gifts, loadData } = props;

  const [open, setOpen] = React.useState(false);
  const [btnType, setbtnType] = React.useState("save");

  const [textValue, setTextValue] = useState("");

  const handleClickOpen = type => {
    if (type === "save") {
      setTextValue(JSON.stringify({ gifts: gifts, actions }));
    } else {
      setTextValue("");
    }
    setbtnType(type);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onClickLoad = strData => {
    const vaild = loadData(strData);
    setOpen(true);
  };

  return (
    <div>
      <Paper style={{ display: "flex", justifyContent: "center" }}>
        <Button variant="contained" color="primary" startIcon={<Icon.Save />} style={{ margin: 20, width: 160 }} onClick={() => handleClickOpen("save")}>
          Save
        </Button>
        <Button variant="contained" color="primary" startIcon={<Icon.CloudUpload />} style={{ margin: 20, width: 160 }} onClick={() => handleClickOpen("load")}>
          Load
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
          <DialogTitle id="scroll-dialog-title">현재상태확인</DialogTitle>
          <DialogContent dividers={true}>
            {btnType === "save" ? (
              <TextField
                label="Multiline"
                multiline
                rows="20"
                value={textValue}
                variant="outlined"
                InputProps={{
                  readOnly: true
                }}
                // style={{ width: 400 }}
                fullWidth
              />
            ) : (
              <div>
                <TextField label="Multiline" multiline rows="20" variant="outlined" onChange={e => setTextValue(e.target.value)} />
                <div>
                  <Button variant="contained" color="primary" startIcon={<Icon.CloudUpload />} style={{ margin: 20, width: 160 }} onClick={() => onClickLoad(textValue)}>
                    Load LOAD
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              닫기
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </div>
  );
}
