import React from "react";
import { Paper, Chip } from "@material-ui/core";

export const ActionDay = props => {
  const { actions, setActions } = props;
  const handleDelete = acToDelete => () => {
    setActions(actions => actions.filter(ac => ac.key !== acToDelete.key));
  };

  return (
    <Paper>
      {actions.map(ac => {
        return <Chip label={ac.type} key={ac.key} onDelete={handleDelete(ac)} />;
      })}
    </Paper>
  );
};
