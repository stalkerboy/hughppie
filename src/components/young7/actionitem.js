import React, { useReducer, useEffect } from "react";
import { Paper, TextField, Button } from "@material-ui/core";

export const ActionItem = props => {
  const { action, dispatchAction, addAction } = props;

  return (
    <Paper>
      <TextField id="outlined-regionNo" label="regionNo" variant="outlined" onChange={dispatchAction({ name: setRegionNo })} />
      <TextField id="outlined-knights" label="knights" variant="outlined" onChange={dispatchAction({ name: setKnights })} />
      <TextField id="outlined-type" label="type" variant="outlined" onChange={dispatchAction({ name: setType })} />
      <TextField id="outlined-typeDesc" label="typeDesc" variant="outlined" onChange={dispatchAction({ name: setTypeDesc })} />
      <TextField id="outlined-target" label="target" variant="outlined" onChange={dispatchAction({ name: setTarget })} />
      <Button onClick={() => setCurAction(action)}>ADD</Button>
    </Paper>
  );
};
