import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import { ActionTable } from "./actiontable";

export default function ConditionDialog(props) {
  const { allActions } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    if (!allActions.length) return;
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return allActions.length ? (
    <>
      <FormControl style={{ display: "flex" }}>
        <Button color="primary" size="large" onClick={handleClickOpen}>
          행동확인
        </Button>
      </FormControl>
      <Dialog open={open} onClose={handleClose} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <DialogTitle id="scroll-dialog-title">행동확인</DialogTitle>
        <DialogContent dividers={true}>
          <ActionTable allActions={allActions} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </>
  ) : null;
}
