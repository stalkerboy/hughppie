import React, { useState } from "react";
import { Container } from "@material-ui/core";
import { ActionItem } from "./actionitem";
import { ActionDay } from "./actionday";
import { ActionResult } from "./actionresult";

export const Simulater = () => {
  const [curAction, setCurAction] = useState({});
  const [actions, setActions] = useState([]);
  const [allActions, setAllActions] = useState([]);
  const world = [];

  const addAction = action => {
    if (!actions.length || actions.length > 11) return;
    const max = actions.reduce((acc, action) => (acc >= action.key ? acc : action.key), 0) + 1;
    setActions([...actions, { ...action, key: max }]);
  };

  // const addDay = actions => {
  //   if (!actions.length || actions.length > 11) return;
  //   const max = actions.reduce((acc, action) => (acc >= action.key ? acc : action.key), 0) + 1;
  //   setActions([...actions, { ...action, key: max }]);
  // };

  return (
    <Container maxWidth="lg">
      <ActionItem curAction={curAction} setCurAction={setCurAction} addAction={addAction} />
      <br />
      <ActionDay actions={actions} setActions={setActions} />
      <ActionResult />
    </Container>
  );
};
