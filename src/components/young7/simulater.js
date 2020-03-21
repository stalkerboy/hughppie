import React, { useState } from "react";
import { Container, Typography, Chip, Paper, Badge, Tooltip } from "@material-ui/core";
import { ActionItem } from "./actionitem";
import { ActionDay } from "./actionday";
import { ActionAlert } from "./actionalert";
import { ActionResult } from "./actionresult";
import { World } from "./simulater/world";
import * as Icon from "@material-ui/icons";

import ConditionDialog from "./conditiondialog";

import lodash from "lodash";
import { SaveLoadAction } from "./saveloadaction";
import { KnightData, BuildingData } from "./simulater/data";

export const Simulater = () => {
  const [curWorld, setCurWorld] = useState(new World());
  const [actions, setActions] = useState([]);
  const [allActions, setAllActions] = useState([]);
  const [curState, setCurState] = useState({
    day: curWorld.getDay(),
    spirit: curWorld.getSpirit(),
    science: curWorld.getScience(),
    information: curWorld.getInformation(),
    knights: curWorld.getKnight(),
    region: curWorld.getRegion()
  });
  const [storeWorld, setStoreWorld] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [curAction, setCurAction] = useState({ knights: [], type: "", typeDesc: "", target: "" });

  const [worlds, setWorlds] = useState([new World()]);
  const addAction = action => {
    if (actions.length > 11) return;

    const max = actions.reduce((acc, action) => (acc >= action.key ? acc : action.key), 0) + 1;

    let tempWorld = lodash.cloneDeep(curWorld);
    const tempActions = [...actions, { ...action, key: max }];
    const isNotVaild = tempActions.map(action => tempWorld.processAction(action)).includes(false);

    setAlertOpen(isNotVaild);
    if (isNotVaild) return;

    setActions([...actions, { ...action, key: max }]);
  };

  const calcDay = (actions, ramenKnights) => {
    if (actions.length + curWorld.getHour() > 12) return false;
    if (transact(curWorld, actions)) {
      curWorld.eatRamen(ramenKnights);
      curWorld.processDay();
      setWorlds([...worlds, lodash.cloneDeep(curWorld)]);

      setCurState({
        day: curWorld.getDay(),
        spirit: curWorld.getSpirit(),
        science: curWorld.getScience(),
        information: curWorld.getInformation(),
        knights: curWorld.getKnight(),
        region: curWorld.getRegion()
      });

      setAllActions([...allActions, ...actions]);
      setActions([]);
      setStoreWorld([...storeWorld, curWorld.getDay() - 1]);
    }
  };

  const transact = (world, actions) => {
    let tempWorld = lodash.cloneDeep(world);
    const isNotVaild = actions.map(action => tempWorld.processAction(action)).includes(false);

    if (!isNotVaild) {
      actions.map(action => world.processAction(action)).includes(false);
      return true;
    } else return false;
  };

  const backDay = day => {
    setCurWorld(lodash.cloneDeep(worlds[day]));
    setWorlds(worlds.filter((_, i) => i <= day));

    setCurState({
      day: curWorld.getDay(),
      spirit: curWorld.getSpirit(),
      science: curWorld.getScience(),
      information: curWorld.getInformation(),
      knights: curWorld.getKnight(),
      region: curWorld.getRegion()
    });
    setActions(allActions.slice(12 * day, 12 * (day + 1)));
    setAllActions(allActions.filter((_, i) => i < day * 12));
    setStoreWorld(storeWorld.filter((_, i) => i < day));
  };

  const loadData = strData => {
    try {
      const { actions, gifts, ramen } = JSON.parse(strData);

      const tempWorld = new World();
      const tempWorlds = [new World()];

      Object.keys(gifts).map(name => (tempWorld.knights[name].gifts = gifts[name]));

      const day = parseInt(actions.length / 12);
      // const hour = actions.length % 12;

      const isVaild = ![...Array(day)]
        .map((_, i) => {
          if (transact(tempWorld, [...actions].splice(i * 12, (i + 1) * 12))) {
            tempWorld.ramenHistory.push(ramen[i]);
            tempWorld.eatRamen(tempWorld.ramenHistory[i]);
            tempWorld.processDay();
            tempWorlds.push(lodash.cloneDeep(tempWorld));
            return true;
          }
          return false;
        })
        .includes(false);
      if (isVaild) {
        setCurWorld(tempWorld);
        setWorlds(tempWorlds);
        setAllActions([...actions]);
        setActions(actions.splice(12 * day, actions.length));
        setCurState({
          day: tempWorld.getDay(),
          spirit: tempWorld.getSpirit(),
          science: tempWorld.getScience(),
          information: tempWorld.getInformation(),
          knights: tempWorld.getKnight(),
          region: tempWorld.getRegion()
        });
        setStoreWorld([...Array(day)].map((_, i) => i + 1));
        return true;
      }
      return false;
    } catch (e) {
      console.log("parsing error" + e);
      return false;
    }
  };

  // const saveData = async () => {
  //   return JSON.stringify({ gifts, actions: [...allActions, ...actions], ramen });
  // };

  const requiredPatrol = [10, 10, 10, 14, 14, 22, 22, 30, 36, 42, 50, 50];
  const requiredDevelop = [10, 14, 22, 30];
  const patrolcount = curWorld.dayPatrolCount + actions.filter(action => action.type === "patrol").length;
  const developList = curWorld.regions.map((region, i) => region.buildingMax - 4 + actions.filter(action => action.regionNo === i && action.type === "develop").length);

  const requiredBuild = curAction.type === "build" && curAction.typeDesc ? BuildingData[curAction.typeDesc].requiredBuild : null;

  let tempWorld = lodash.cloneDeep(curWorld);
  actions.map(action => tempWorld.processAction(action)).includes(false);

  return (
    <Container maxWidth="sm">
      <br />
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex", marginLeft: 150 }} />
        <img alt="환력" src="/img/spirit.jpg" />
        <Typography component="h6" variant="h6">
          &nbsp;{tempWorld.getSpirit()}&nbsp;&nbsp;
        </Typography>
        <img alt="과학력" src="/img/science.jpg" />
        <Typography component="h6" variant="h6">
          &nbsp;{tempWorld.getScience()}&nbsp;&nbsp;
        </Typography>
        <img alt="정보력" src="/img/inform.jpg" />
        <Typography component="h6" variant="h6">
          &nbsp;{tempWorld.getInformation()}&nbsp;&nbsp;
        </Typography>
      </div>
      <br />
      <div style={{ display: "flex" }}>
        필요 &nbsp;
        <Tooltip title="순찰">
          <Badge color="secondary" badgeContent={requiredPatrol[patrolcount]}>
            <Icon.Motorcycle color="primary" />
          </Badge>
        </Tooltip>
        &nbsp;&nbsp;&nbsp;
        <Tooltip title="건설">
          <Badge color="secondary" badgeContent={requiredBuild}>
            <Icon.AccountBalance color="primary" />
          </Badge>
        </Tooltip>
        &nbsp;&nbsp;&nbsp;
        <Tooltip title="개발">
          <Badge color="secondary" badgeContent={requiredDevelop[developList[curAction.regionNo]]}>
            <Icon.Build color="primary" />
          </Badge>
        </Tooltip>
        &nbsp;&nbsp; &nbsp;합계 &nbsp;
        <Tooltip title="순찰">
          <Badge color="secondary" badgeContent={curAction.knights.reduce((acc, name) => acc + KnightData[name].patrol, 0)}>
            <Icon.Motorcycle color="primary" />
          </Badge>
        </Tooltip>
        &nbsp;&nbsp;&nbsp;
        <Tooltip title="건설">
          <Badge color="secondary" badgeContent={curAction.knights.reduce((acc, name) => acc + KnightData[name].build, 0)}>
            <Icon.AccountBalance color="primary" />
          </Badge>
        </Tooltip>
        &nbsp;&nbsp;&nbsp;
        <Tooltip title="개발">
          <Badge color="secondary" badgeContent={curAction.knights.reduce((acc, name) => acc + KnightData[name].develop, 0)}>
            <Icon.Build color="primary" />
          </Badge>
        </Tooltip>
      </div>
      <ActionItem addAction={addAction} curWorld={curWorld} setCurAction={cur => setCurAction({ ...curAction, ...cur })} />
      <ActionDay actions={actions} setActions={setActions} calcDay={calcDay} />
      <Paper>
        <ConditionDialog allActions={[...allActions, ...actions]} />
      </Paper>
      <ActionResult curState={curState} />
      <br />
      {storeWorld.length ? "일차 되돌리기" : null}
      <Paper>
        {storeWorld.map(i => (
          <Chip key={i} onClick={() => backDay(i - 1)} style={{ maxWidth: 80, justifyContent: "center", margin: 15 }} label={i + "일차"} />
        ))}
      </Paper>
      <ActionAlert alertOpen={alertOpen} setAlertOpen={setAlertOpen} text="실행할수 없는 행동" />
      <SaveLoadAction loadData={loadData} curWorld={curWorld} allActions={[...allActions, ...actions]} />
    </Container>
  );
};
