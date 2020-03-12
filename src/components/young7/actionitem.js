import React, { useReducer } from "react";
import { Paper, TextField, Button } from "@material-ui/core";

const initialActionState = {
  regionNo: "",
  knights: "",
  type: "",
  typeDesc: "",
  target: ""
};

const actionReducer = (state, action) => {
  switch (action.name) {
    case "reset":
      return initialActionState;
    case "setRegionNo":
      return { ...state, regionNo: action.regionNo };
    case "setKnights":
      return { ...state, knights: action.knights };
    case "setType":
      return { ...state, type: action.type };
    case "setTypeDesc":
      return { ...state, typeDesc: action.typeDesc };
    case "setTarget":
      return { ...state, target: action.target };
    default: {
      throw new Error(`unexpected action.name: ${action.name}`);
    }
  }
};

export const ActionItem = props => {
  const [action, dispatchAction] = useReducer(actionReducer, initialActionState);
  const { curAction, setCurAction, addAction } = props;

  return (
    <Paper>
      <TextField id="outlined-regionNo" label="regionNo" variant="outlined" onChange={e => dispatchAction({ name: "setRegionNo", regionNo: e.target.value })} />
      <TextField id="outlined-knights" label="knights" variant="outlined" onChange={e => dispatchAction({ name: "setKnights", knights: e.target.value })} />
      <TextField id="outlined-type" label="type" variant="outlined" onChange={e => dispatchAction({ name: "setType", type: e.target.value })} />
      <TextField id="outlined-typeDesc" label="typeDesc" variant="outlined" onChange={e => dispatchAction({ name: "setTypeDesc", typeDesc: e.target.value })} />
      <TextField id="outlined-target" label="target" variant="outlined" onChange={e => dispatchAction({ name: "setTarget", target: e.target.value })} />
      <Button onClick={() => addAction(action)}>ADD</Button>
    </Paper>
  );
};
