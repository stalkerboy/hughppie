import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import { ActionItem } from "./actionitem";
import { ActionDay } from "./actionday";

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
    case "setTaget":
      return { ...state, target: action.target };
    default: {
      throw new Error(`unexpected action.type: ${action.type}`);
    }
  }
};

export const Simulater = () => {
  const [action, dispatchAction] = useReducer(actionReducer, initialActionState);
  //   const [curAction, setCurAction] = useState({});
  const [actions, setActions] = useState([]);
  const [allActions, setAllActions] = useState([]);

  const addAction = action => {
    setActions([...actions, action]);
  };

  useEffect(() => {
    console.log(actions);
  }, actions);

  return (
    <Container maxWidth="lg">
      <ActionItem action={action} dispatchAction={dispatchAction} addAction={addAction} />
      <br />
      <ActionDay actions={actions} setActions={setActions} />
    </Container>
  );
};
