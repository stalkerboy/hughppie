import React, { useReducer, useEffect } from "react";
import { Paper, TextField } from "@material-ui/core";

const initialYoungActionState = {
  regionNo: "",
  knights: "",
  type: "",
  typeDesc: "",
  target: ""
};

const youngActionReducer = (state, action) => {
  switch (action.name) {
    case "reset":
      return initialYoungActionState;
    case "onRegionNoChange":
      return { ...state, regionNo: action.regionNo };
    case "onKnightsChange":
      return { ...state, knights: action.knights };
    case "onTypeChange":
      return { ...state, type: action.type };
    case "onTypeDescChange":
      return { ...state, typeDesc: action.typeDesc };
    case "onTagetChange":
      return { ...state, target: action.target };
    default: {
      throw new Error(`unexpected action.type: ${action.type}`);
    }
  }
};

export const YoungActionItem = () => {
  const [youngAction, dispatchYoungAction] = useReducer(youngActionReducer, initialYoungActionState);

  useEffect(() => console.log(youngAction), [youngAction]);

  const onRegionNoChange = event => dispatchYoungAction({ name: "onRegionNoChange", regionNo: event.target.value });
  const onKnightsChange = event => dispatchYoungAction({ name: "onKnightsChange", knights: event.target.value });
  const onTypeChange = event => dispatchYoungAction({ name: "onTypeChange", type: event.target.value });
  const onTypeDescChange = event => dispatchYoungAction({ name: "onTypeDescChange", typeDesc: event.target.value });
  const onTagetChange = event => dispatchYoungAction({ name: "onTagetChange", target: event.target.value });

  return (
    <Paper>
      <TextField id="outlined-regionNo" label="regionNo" variant="outlined" onChange={onRegionNoChange} />
      <TextField id="outlined-knights" label="knights" variant="outlined" onChange={onKnightsChange} />
      <TextField id="outlined-type" label="type" variant="outlined" onChange={onTypeChange} />
      <TextField id="outlined-typeDesc" label="typeDesc" variant="outlined" onChange={onTypeDescChange} />
      <TextField id="outlined-target" label="target" variant="outlined" onChange={onTagetChange} />
    </Paper>
  );
};
