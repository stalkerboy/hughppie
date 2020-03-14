import React from "react";
import { Paper, Chip, Avatar } from "@material-ui/core";
import * as Icon from "@material-ui/icons";

export const ActionDay = props => {
  const { actions, setActions } = props;
  const handleDelete = acToDelete => () => {
    setActions(actions => actions.filter(ac => ac.key !== acToDelete.key));
  };

  return (
    <Paper>
      {actions.map(ac => {
        const chipConf = {};
        switch (ac.type) {
          case "fight":
            chipConf.icon = <Icon.Gavel />;
            chipConf.label = ac.regionNo;
            chipConf.color = "secondary";
            break;
          case "patrol":
            chipConf.color = "primary";
            switch (ac.typeDesc) {
              case "normal":
                chipConf.icon = <Icon.Motorcycle />;
                chipConf.label = "일반";
                break;
              case "knight":
                chipConf.icon = <Icon.Favorite />;
                chipConf.label = ac.target;
                break;
              case "scena":
                chipConf.icon = <Icon.Eco />;
                chipConf.label = "시나";
                break;
              case "score":
                chipConf.icon = <Icon.TrendingUp />;
                chipConf.label = "점수";
                break;
              default:
                chipConf.icon = <Icon.BugReport />;
                chipConf.label = "오류";
            }
            break;
          case "develop":
            chipConf.icon = <Icon.Build />;
            chipConf.label = ac.regionNo;
            break;
          case "build":
            chipConf.icon = <Icon.AccountBalance />;
            chipConf.label = ac.typeDesc;
            break;
          default:
            throw new Error(`unexpected ac.type: ${ac.type}`);
        }

        return <Chip label={ac.type} key={ac.key} onDelete={handleDelete(ac)} icon={chipConf.icon} label={chipConf.label} color={chipConf.color} />;
      })}
    </Paper>
  );
};
