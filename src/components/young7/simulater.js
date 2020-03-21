import React, { useState } from "react";
import { Container, Typography, Chip, Paper, Avatar, Badge } from "@material-ui/core";
import { ActionItem } from "./actionitem";
import { ActionDay } from "./actionday";
import { ActionAlert } from "./actionalert";
import { ActionResult } from "./actionresult";
import { World } from "./simulater/world";

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

  let worlds = [lodash.cloneDeep(curWorld)];
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
      worlds.push(lodash.cloneDeep(curWorld));

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
    worlds = worlds.filter((_, i) => i <= day);

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
        worlds = tempWorlds;
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

  const saveData = () => {
    const gifts = Object.keys(curWorld.knights)
      .filter(name => curWorld.knights[name].gifts && curWorld.knights[name].gifts.length)
      .reduce((acc, name) => {
        acc[name] = curWorld.knights[name].gifts;
        return acc;
      }, {});
    const ramen = curWorld.ramenHistory;

    return JSON.stringify({ gifts, actions: [...allActions, ...actions], ramen });
  };

  const requiredPatrol = [10, 10, 10, 14, 14, 22, 22, 30, 36, 42, 50, 50];
  const requiredDevelop = [10, 14, 22, 30];
  const patrolcount = curWorld.dayPatrolCount + actions.filter(action => action.type === "patrol").length;
  const developList = curWorld.regions.map((region, i) => region.buildingMax - 4 + actions.filter(action => action.regionNo === i && action.type === "develop").length);
  const requiredBuild = curAction.type === "build" && curAction.typeDesc ? BuildingData[curAction.typeDesc].requiredBuild : null;

  let tempWorld = lodash.cloneDeep(curWorld);
  const isNotVaild = actions.map(action => tempWorld.processAction(action)).includes(false);

  return (
    <Container maxWidth="sm">
      <Typography component="h6" variant="h6" style={{ display: "flex" }}>
        <br />
        {isNotVaild ? null : `${tempWorld.getDay()} 일차 과학력 : ${tempWorld.getScience()} 환력 : ${tempWorld.getSpirit()} 정보력 : ${tempWorld.getInformation()}`}
      </Typography>
      <div style={{ display: "flex" }}>
        <Typography component="h6" variant="h6" style={{ display: "flex", verticalAlign: "center", marginTop: 10, marginLeft: 15 }}>
          신기사합:
        </Typography>
        <Badge overlap="circle" badgeContent="순찰">
          <Avatar alt="순찰치" style={{ background: "#3f51b5", display: "flex", margin: 7 }}>
            {curAction.knights.reduce((acc, name) => acc + KnightData[name].patrol, 0)}
          </Avatar>
        </Badge>
        <Badge overlap="circle" badgeContent="건설">
          <Avatar alt="건설치" style={{ display: "flex", margin: 7 }}>
            {curAction.knights.reduce((acc, name) => acc + KnightData[name].build, 0)}
          </Avatar>
        </Badge>
        <Badge overlap="circle" badgeContent="개발">
          <Avatar alt="개발치" style={{ background: "#8bc34a", display: "flex", margin: 7 }}>
            {curAction.knights.reduce((acc, name) => acc + KnightData[name].develop, 0)}
          </Avatar>
        </Badge>
      </div>

      <div style={{ display: "flex", alignContent: "center" }}>
        <Typography component="h6" variant="h6" style={{ display: "flex", verticalAlign: "center", marginTop: 10, marginLeft: 15 }}>
          필요수치:
        </Typography>
        <Badge overlap="circle" badgeContent="순찰">
          <Avatar alt="순찰치" style={{ background: "#3f51b5", display: "flex", margin: 7 }}>
            {requiredPatrol[patrolcount]}
          </Avatar>
        </Badge>
        <Badge overlap="circle" badgeContent="건설">
          <Avatar alt="건설치" style={{ display: "flex", margin: 7 }}>
            {requiredBuild}
          </Avatar>
        </Badge>
        <Badge overlap="circle" badgeContent="개발">
          <Avatar alt="개발치" style={{ background: "#8bc34a", display: "flex", margin: 7 }}>
            {requiredDevelop[developList[curAction.regionNo]]}
          </Avatar>
        </Badge>
      </div>
      <ActionItem addAction={addAction} curWorld={curWorld} setCurAction={cur => setCurAction({ ...curAction, ...cur })} />

      <ActionDay actions={actions} setActions={setActions} calcDay={calcDay} />

      {actions.length ? (
        <Paper>
          <ConditionDialog curWorld={curWorld} actions={actions} transact={transact} />
        </Paper>
      ) : null}

      <ActionResult curState={curState} />
      <br />
      {storeWorld.length ? "일차 되돌리기" : null}
      <Paper>
        {storeWorld.map(i => (
          <Chip key={i} onClick={() => backDay(i - 1)} style={{ maxWidth: 80, justifyContent: "center", margin: 15 }} label={i + "일차"} />
        ))}
      </Paper>
      <ActionAlert alertOpen={alertOpen} setAlertOpen={setAlertOpen} text="실행할수 없는 행동" />
      <SaveLoadAction loadData={loadData} saveData={saveData} />
    </Container>
  );
};
