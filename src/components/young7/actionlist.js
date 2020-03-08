import React, { useState, useEffect } from "react";
import { Select, MenuItem, Container, FormControl, TextField, InputLabel } from "@material-ui/core";
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

  const [type, setType] = useState("");
  const [regionNo, setRegionNo] = useState("");
  const [knights, setKnights] = useState([]);
  const [typeDesc, setTypeDesc] = useState([]);

  const knightsNames = Object.keys(KnightData);
  let typeDescList = [];

  const Types = { fight: "전투", patrol: "순찰", build: "건설", develop: "개발" };
  const regionNames = RegionData.map(region => region.name);

  useEffect(() => {
    const action = {};
    action.regionNo = regionNo;
    action.type = type;
    action.knights = knights;
    // action.knights = knights;
    console.log(action);
    // console.log(knightsNames);
  }, [regionNo, type, knights]);

  useEffect(() => {
    if (type === "fight") setTypeDesc([]);
    else if (type === "patrol") setTypeDesc([]);
    else if (type === "build") setTypeDesc([]);
    else if (type === "develop") setTypeDesc([]);
    else return;
    console.log(typeDesc);
  }, [type]);

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
        <FormControl variant="outlined" className={classes.formControl} style={{ width: 150 }}>
          <InputLabel id="select-action-type" style={{ background: "white" }}>
            타입
          </InputLabel>
          <Select
            labelId="select-action-type"
            id="type"
            value={type}
            onChange={event => {
              setType(event.target.value);
            }}
          >
            {Object.keys(Types).map(key => (
              <MenuItem key={key} value={key}>
                {Types[key]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {!!type.length ? (
          <FormControl variant="outlined" className={classes.formControl} style={{ width: 165 }}>
            <InputLabel id="select-action-typedesc" style={{ background: "white" }}>
              타입 상세
            </InputLabel>
            <Select
              labelId="select-action-typedesc"
              id="typeDesc"
              value={typeDesc}
              onChange={event => {
                setTypeDesc(event.target.value);
              }}
            >
              <MenuItem key={-1} value="" />
              {typeDescList.map((name, i) => (
                <MenuItem key={i} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : null}
        <br />
        <FormControl className={classes.formControl} style={{ width: 500 }}>
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
            renderInput={params => <TextField {...params} variant="outlined" label="신기사" placeholder="신기사" />}
          />
        </FormControl>
      </Container>
    </div>
  );
};

export const ActionItem = props => {};
