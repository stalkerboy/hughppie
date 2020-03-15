import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
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
    console.log("curWorld", curWorld);
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

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <>
      <FormControl style={{ display: "flex" }}>
        <Button color="primary" size="large" onClick={handleClickOpen}>
          현재상태확인
        </Button>
      </FormControl>
      <Dialog open={open} onClose={handleClose} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}>
            <ActionResult curState={curState} />
          </DialogContentText>
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
