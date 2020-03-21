import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import { ActionResult } from "./actionresult";
import lodash from "lodash";

export default function ConditionDialog(props) {
  const { curWorld, actions, transact } = props;
  const [open, setOpen] = React.useState(false);
  const [curState, setCurState] = React.useState({
    day: 0,
    hour: 0,
    spirit: 0,
    science: 0,
    information: 0,
    knights: [],
    region: []
  });

  const handleClickOpen = () => {
    if (!actions.length) return;

    const tempWorld = lodash.cloneDeep(curWorld);
    const tempActions = lodash.cloneDeep(actions);

    transact(tempWorld, tempActions);

    setCurState({
      day: tempWorld.getDay(),
      hour: tempWorld.getHour(),
      spirit: tempWorld.getSpirit(),
      science: tempWorld.getScience(),
      information: tempWorld.getInformation(),
      knights: tempWorld.getKnight(),
      region: tempWorld.getRegion()
    });

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <FormControl style={{ display: "flex" }}>
        <Button color="primary" size="large" onClick={handleClickOpen}>
          현재상태확인
        </Button>
      </FormControl>
      <Dialog open={open} onClose={handleClose} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <DialogTitle id="scroll-dialog-title">현재상태확인</DialogTitle>
        <DialogContent dividers={true}>
          <ActionResult curState={curState} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
