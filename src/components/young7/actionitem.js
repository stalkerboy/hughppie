import React, { useReducer } from "react";
import { Select, MenuItem, FormControl, TextField, InputLabel, Chip, Paper, Button } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import * as Icon from "@material-ui/icons";
import { RegionData, KnightData, BuildingData } from "./simulater/data";
import { makeStyles } from "@material-ui/core/styles";
import GiftDialog from "./giftdialog";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1)
  }
}));

const initialActionState = {
  regionNo: "",
  knights: [],
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
      if (action.knights.length > 3) return { ...state };
      return { ...state, knights: action.knights };
    case "setType":
      return { ...state, type: action.type, typeDesc: "", target: "" };
    case "setTypeDesc":
      return { ...state, typeDesc: action.typeDesc, target: "" };
    case "setTarget":
      return { ...state, target: action.target };
    default: {
      throw new Error(`unexpected action.name: ${action.name}`);
    }
  }
};
const typeList = { 전투: "fight", 순찰: "patrol", 건설: "build", 개발: "develop" };
const typeDescList = {
  fight: {},
  patrol: { 일반순찰: "normal", 신기사공략: "knight", 시나리오: "scena", 점수: "score" },
  build: { science: [], spirit: [], information: [], other: [] },
  develop: {}
};

const knightsNames = Object.keys(KnightData);
const regionNames = RegionData.map(region => region.name);
Object.keys(BuildingData).map(key => typeDescList.build[BuildingData[key].type].push(key));

export const ActionItem = props => {
  const classes = useStyles();

  const [action, dispatchAction] = useReducer(actionReducer, initialActionState);
  const { addAction, curWorld, setCurKnights, setRequiredStat } = props;

  const requiredDevelop = [10, 14, 22, 30];

  const onClickAdd = () => {
    if (!action.type || (action.regionNo !== 0 && !action.regionNo) || !action.knights) {
      return;
    }
    if (action.type === "build" && !action.typeDesc) return;
    if (action.type === "patrol" && !action.typeDesc) return;
    if (action.typeDesc === "knight" && !action.target) return;
    addAction(action);
  };
  return (
    <Paper>
      <div style={{ width: 400 }} />

      <div style={{ display: "flex" }}>
        <FormControl className={classes.formControl} style={{ display: "flex", width: 300, marginRight: 0 }}>
          <Autocomplete
            multiple
            id="tags-outlined"
            options={knightsNames.sort()}
            getOptionLabel={option => option}
            getOptionSelected={name => {
              if (action.knights.length >= 3 || action.knights.includes(name)) return true;
            }}
            defaultValue={[]}
            filterSelectedOptions
            onChange={(_, value) => {
              dispatchAction({ name: "setKnights", knights: value });
              setCurKnights(value);
              return true;
            }}
            renderTags={(value, getTagProps) => value.filter((v, i) => i < 3).map((option, index) => <Chip variant="outlined" color="primary" label={option} {...getTagProps({ index })} />)}
            renderInput={params => <TextField {...params} variant="outlined" label="신기사" placeholder="신기사" />}
          />
        </FormControl>
        <GiftDialog curWorld={curWorld} />
      </div>

      <div style={{ display: "flex" }}>
        <FormControl variant="outlined" className={classes.formControl} style={{ width: 260, display: "flex" }}>
          <InputLabel id="select-action-regionNo" style={{ background: "white" }}>
            지역
          </InputLabel>
          <Select
            labelId="select-action-regionNo"
            id="regionNo"
            value={action.regionNo}
            onChange={e => {
              setRequiredStat({ develop: requiredDevelop[curWorld.regions[e.target.value].buildingMax - 4] });
              return dispatchAction({ name: "setRegionNo", regionNo: e.target.value });
            }}
          >
            {regionNames.map((name, i) => (
              <MenuItem key={i} value={i}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl} style={{ width: 260, display: "flex" }}>
          <InputLabel id="select-action-type" style={{ background: "white" }}>
            타입
          </InputLabel>
          <Select labelId="select-action-type" id="type" value={action.type} onChange={e => dispatchAction({ name: "setType", type: e.target.value })}>
            {Object.keys(typeList).map(key => (
              <MenuItem key={key} value={typeList[key]}>
                {key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {action.type === "build" || action.type === "patrol" ? (
        <div style={{ display: "flex" }}>
          <FormControl variant="outlined" className={classes.formControl} style={{ width: 260, display: "flex" }}>
            <InputLabel id="select-action-typedesc" htmlFor="grouped-select" style={{ background: "white" }}>
              타입 상세
            </InputLabel>
            <Select native labelId="select-action-typedesc" id="typeDesc" value={action.typeDesc} onChange={e => dispatchAction({ name: "setTypeDesc", typeDesc: e.target.value })}>
              <option key={0} label={""}></option>
              {action.type === "patrol"
                ? Object.keys(typeDescList[action.type]).map((name, i) => (
                    <option key={i} value={typeDescList[action.type][name]}>
                      {name}
                    </option>
                  ))
                : action.type === "build"
                ? Object.keys(typeDescList[action.type]).map(type => (
                    <optgroup key={type} label={type}>
                      {typeDescList[action.type][type].map(name => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))}
                    </optgroup>
                  ))
                : null}
            </Select>
          </FormControl>
          {action.typeDesc === "knight" ? (
            <FormControl variant="outlined" className={classes.formControl} style={{ width: 260, display: "flex" }}>
              <InputLabel id="select-action-target" style={{ background: "white" }}>
                대상
              </InputLabel>
              <Select labelId="select-action-target" id="target" value={action.target} onChange={e => dispatchAction({ name: "setTarget", target: e.target.value })}>
                {action.typeDesc === "knight"
                  ? action.knights.map(name => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))
                  : null}
              </Select>
            </FormControl>
          ) : (
            <div style={{ width: 260, display: "flex" }} />
          )}
        </div>
      ) : null}
      {action.regionNo > -1 &&
      action.knights.length &&
      action.type &&
      (action.type === "fight" ||
        action.type === "develop" ||
        (action.type === "build" && action.typeDesc) ||
        (action.type === "patrol" && (action.target || (action.typeDesc && action.typeDesc !== "knight")))) ? (
        <FormControl variant="outlined" className={classes.formControl} style={{ display: "flex" }}>
          <Button variant="outlined" color="primary" startIcon={<Icon.ControlPoint />} onClick={onClickAdd}>
            더하기
          </Button>
        </FormControl>
      ) : null}
      <br />
    </Paper>
  );
};
