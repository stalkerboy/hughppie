import React, { useState } from "react";
import { Container } from "@material-ui/core";
import { ActionItem } from "./actionitem";
import { ActionDay } from "./actionday";

export const Simulater = () => {
  const [curAction, setCurAction] = useState({});
  const [actions, setActions] = useState([]);
  // const [allActions, setAllActions] = useState([]);

  const addAction = action => {
    action.key = 0;
    let max = 0;
    if (actions.length > 0) max = actions.reduce((acc, action) => (acc >= action.key ? acc : action.key), 0) + 1;

    console.log("action.key:", max);
    console.log("actions:", actions);
    if (actions.filter(acc => acc.key === max).length) return;
    else action.key = max;
    setActions([...actions, action]);
  };

  // useEffect(() => {
  //   console.log(actions);
  // }, actions);

  return (
    <Container maxWidth="lg">
      <ActionItem curAction={curAction} setCurAction={setCurAction} addAction={addAction} />
      <br />
      <ActionDay actions={actions} setActions={setActions} />
    </Container>
  );
};
