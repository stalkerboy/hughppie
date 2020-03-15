import React, { useState } from "react";
import { Paper, Chip, Button, TextField, FormControl } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import * as Icon from "@material-ui/icons";
import { KnightData, RegionData } from "./simulater/data";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1)
  }
}));

const knightsNames = Object.keys(KnightData);
const regionNames = RegionData.map(region => region.name);

export const ActionDay = props => {
  const classes = useStyles();
  const { actions, setActions, calcDay } = props;
  const handleDelete = acToDelete => () => setActions(actions.filter(ac => ac.key !== acToDelete.key));

  const [ramenKnights, setRamenKnights] = useState([]);

  return actions.length ? (
    <Paper>
      <FormControl className={classes.formControl} style={{ display: "inline-block" }}>
        {actions.map(ac => {
          const chipConf = {};
          switch (ac.type) {
            case "fight":
              chipConf.icon = <Icon.Gavel />;
              chipConf.label = regionNames[ac.regionNo];
              chipConf.color = "secondary";
              break;
            case "patrol":
              chipConf.color = "primary";
              switch (ac.typeDesc) {
                case "normal":
                  chipConf.icon = <Icon.Motorcycle />;
                  chipConf.label = regionNames[ac.regionNo];
                  break;
                case "knight":
                  chipConf.icon = <Icon.Favorite />;
                  chipConf.label = ac.target;
                  break;
                case "scena":
                  chipConf.icon = <Icon.Eco />;
                  chipConf.label = regionNames[ac.regionNo] + ":시나";
                  break;
                case "score":
                  chipConf.icon = <Icon.TrendingUp />;
                  chipConf.label = regionNames[ac.regionNo] + ":점수";
                  break;
                default:
                  chipConf.icon = <Icon.BugReport />;
                  chipConf.label = regionNames[ac.regionNo] + ":오류";
              }
              break;
            case "develop":
              chipConf.icon = <Icon.Build />;
              chipConf.label = regionNames[ac.regionNo];
              break;
            case "build":
              chipConf.icon = <Icon.AccountBalance />;
              chipConf.label = regionNames[ac.regionNo] + ":" + ac.typeDesc;
              break;
            default:
              throw new Error(`unexpected ac.type: ${ac.type}`);
          }

          return (
            <Chip key={ac.key} onDelete={handleDelete(ac)} icon={chipConf.icon} label={chipConf.label} color={chipConf.color} style={{ margin: 2 }} />
          );
        })}
      </FormControl>
      <br />
      {actions.length === 12 ? (
        <div>
          <FormControl className={classes.formControl} style={{ display: "flex" }}>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={knightsNames}
              getOptionLabel={option => option}
              getOptionSelected={name => ramenKnights.length >= 3 || ramenKnights.includes(name)}
              defaultValue={[]}
              filterSelectedOptions
              onChange={(_, value) => setRamenKnights(value)}
              renderTags={(value, getTagProps) =>
                value
                  .filter((_, i) => i < 3)
                  .map((option, index) => <Chip variant="outlined" color="primary" label={option} {...getTagProps({ index })} />)
              }
              renderInput={params => <TextField {...params} variant="outlined" label="라면가게" placeholder="라면가게" />}
            />
          </FormControl>
          <FormControl className={classes.formControl} style={{ display: "flex" }}>
            <Button variant="outlined" color="primary" startIcon={<Icon.CheckCircle />} onClick={() => calcDay(actions, ramenKnights)}>
              계산
            </Button>
            <br />
          </FormControl>
        </div>
      ) : null}
    </Paper>
  ) : null;
};
