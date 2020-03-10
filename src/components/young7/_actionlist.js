import React, { useState, useEffect } from "react";
import { Select, MenuItem, Container, FormControl, TextField, InputLabel, Chip } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { RegionData, KnightData } from "./simulater";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1)
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export const ActionList = props => {
  const classes = useStyles();
  //   const { setAction } = props;

  //{ type: "patrol", typeDesc: "knight", target: "카지", knights: ["와타리", "카지", "우류"], regionNo: 1 },

  const [regionNo, setRegionNo] = useState(0);
  const [knights, setKnights] = useState([]);

  const [type, setType] = useState("");
  const [typeDesc, setTypeDesc] = useState("");
  const [target, setTarget] = useState("");

  const [typeItems, setTypeItems] = useState("");
  const [typeDescItems, setTypeDescItems] = useState("");
  const [targetItems, setTargetItems] = useState("");

  const knightsNames = Object.keys(KnightData);
  const typeList = { 전투: "fight", 순찰: "patrol", 건설: "build", 개발: "develop" };
  const typeDescList = { build: {}, patrol: { 일반순찰: "normal", 신기사공략: "knight", 시나리오: "scena", 점수용: "score" }, develop: {} };

  const regionNames = RegionData.map(region => region.name);

  const onTypeChange = event => {
    setType(event.target.value);
    switch (event.target.value) {
      case "fight":
        setTypeDescList({});
        break;
      case "patrol":
        setTypeDescList();
        break;
      case "build":
        setTypeDescList({});
        break;
      case "develop":
        setTypeDescList({});
        break;
      default:
    }
  };

  const onTypeDescChange = event => {
    setTypeDesc(event.target.value);
    console.log("typedescchange", event.target.value);
    if (event.target.value === "knight") {
      setTargetList(knights);
    } else {
      setTargetList([]);
    }
  };

  useEffect(() => {
    const action = {};
    action.regionNo = regionNo;
    action.knights = knights;
    action.type = type;
    action.typeDesc = typeDesc;
    action.target = target;
    console.log(action);
  }, [regionNo, knights, type, typeDesc, target]);

  return (
    <div>
      <Container maxWidth="lg">
        <FormControl className={classes.formControl} style={{ width: 30 }}>
          {props.index}
        </FormControl>
        <br />
        <FormControl variant="outlined" className={classes.formControl} style={{ width: 150 }}>
          <InputLabel id="select-action-regionNo" style={{ background: "white" }}>
            지역
          </InputLabel>
          <Select
            labelId="select-action-regionNo"
            id="regionNo"
            value={regionNo}
            onChange={event => {
              setRegionNo(event.target.value);
            }}
          >
            {regionNames.map((name, i) => (
              <MenuItem key={i} value={i}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className={classes.formControl} style={{ width: 400 }}>
          <Autocomplete
            multiple
            id="tags-outlined"
            options={knightsNames}
            getOptionLabel={option => option}
            defaultValue={[]}
            filterSelectedOptions
            onChange={(_, value) => {
              setKnights(value);
            }}
            renderTags={(value, getTagProps) => value.filter((v, i) => i < 3).map((option, index) => <Chip label={option} {...getTagProps({ index })} />)}
            renderInput={params => <TextField {...params} variant="outlined" label="신기사" placeholder="신기사" />}
          />
        </FormControl>
        <br />
        <FormControl variant="outlined" className={classes.formControl} style={{ width: 150 }}>
          <InputLabel id="select-action-type" style={{ background: "white" }}>
            타입
          </InputLabel>
          <Select labelId="select-action-type" id="type" value={type} onChange={onTypeChange}>
            {Object.keys(typeList).map(key => (
              <MenuItem key={key} value={Types[key]}>
                {key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl} style={{ width: 192 }}>
          <InputLabel id="select-action-typedesc" style={{ background: "white" }}>
            타입 상세
          </InputLabel>
          <Select labelId="select-action-typedesc" id="typeDesc" value={typeDesc} onChange={onTypeDescChange}>
            {Object.keys(typeDescList).map((name, i) => (
              <MenuItem key={i} value={typeDescList[name]}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="outlined" className={classes.formControl} style={{ width: 192 }}>
          <InputLabel id="select-action-target" style={{ background: "white" }}>
            대상
          </InputLabel>
          <Select
            labelId="select-action-target"
            id="target"
            value={target}
            onChange={event => {
              setTarget(event.target.value);
            }}
          >
            {targetList.map(name => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Container>
    </div>
  );
};

export const ActionItem = props => {};
