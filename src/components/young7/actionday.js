import React, { useEffect } from "react";
import { Paper } from "@material-ui/core";
import { useState } from "react";

export const ActionDay = props => {
  const { actions, setActions } = props;

  // useEffect(() => {
  //   setDayActions(actions);
  // }, [actions]);

  const [dayActions, setDayActions] = useState([]);

  return (
    <Paper>
      actions <br />
      {actions}
    </Paper>
  );
};
