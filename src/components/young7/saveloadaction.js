import React, { useState } from "react";
import { TextField, DialogTitle, DialogContent, Dialog, Button, DialogActions } from "@material-ui/core";
import * as Icon from "@material-ui/icons";
import { ActionAlert } from "./actionalert";

export function SaveLoadAction(props) {
  const { actions, gifts, ramen, loadData } = props;

  const [open, setOpen] = React.useState(false);
  const [btnType, setbtnType] = React.useState("save");

  const [textValue, setTextValue] = useState("");
  const [snackOpen, setSnackOpen] = React.useState(false);

  const handleClickOpen = type => {
    if (type === "save") {
      setTextValue(JSON.stringify({ gifts: gifts, actions, ramen }));
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
    if (loadData(strData)) {
      setOpen(false);
    } else {
      setSnackOpen(true);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Button variant="outlined" color="primary" startIcon={<Icon.Save />} style={{ margin: 20, width: 160 }} onClick={() => handleClickOpen("save")}>
        Save
      </Button>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<Icon.CloudUpload />}
        style={{ margin: 20, width: 160 }}
        onClick={() => handleClickOpen("load")}
      >
        Load
      </Button>
      <ActionAlert alertOpen={snackOpen} setAlertOpen={setSnackOpen} text="잘못된 데이터 파일입니다." />

      <Dialog open={open} onClose={handleClose} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <div style={{ width: 500 }} />
        <DialogTitle id="scroll-dialog-title">{btnType === "save" ? "저장하기" : "불러오기"}</DialogTitle>
        <DialogContent dividers={true}>
          {btnType === "save" ? (
            <TextField
              label="저장할데이터"
              multiline
              rows="40"
              value={textValue}
              variant="outlined"
              InputProps={{
                readOnly: true
              }}
              fullWidth
            />
          ) : (
            <div>
              <TextField label="불러올데이터" multiline rows="40" variant="outlined" onChange={e => setTextValue(e.target.value)} fullWidth />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          {btnType !== "save" ? (
            <Button onClick={() => onClickLoad(textValue)} color="primary">
              LOAD
            </Button>
          ) : null}

          <Button onClick={handleClose} color="primary">
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
