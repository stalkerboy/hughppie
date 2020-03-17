import React from "react";
import { Container, Typography, Chip, Paper } from "@material-ui/core";
import { ActionItem } from "./actionitem";
import { ActionDay } from "./actionday";
import { ActionAlert } from "./actionalert";
import { ActionResult } from "./actionresult";
import { World } from "./simulater/world";

import ConditionDialog from "./conditiondialog";

import lodash from "lodash";
import { SaveLoadAction } from "./saveloadaction";

export class Simulater extends React.Component {
  constructor(props) {
    super(props);
    this.curWorld = new World();
    this.worlds = [lodash.cloneDeep(this.curWorld)];
    this.state = {
      actions: [],
      allActions: [],
      curState: {
        day: this.curWorld.getDay(),
        spirit: this.curWorld.getSpirit(),
        science: this.curWorld.getScience(),
        information: this.curWorld.getInformation(),
        knights: this.curWorld.getKnight(),
        region: this.curWorld.getRegion()
      },
      storeWorld: [],
      alertOpen: false,
      curKnights: []
    };
  }

  addAction = action => {
    const { actions } = this.state;
    if (actions.length > 11) return;

    const max = actions.reduce((acc, action) => (acc >= action.key ? acc : action.key), 0) + 1;

    let tempWorld = lodash.cloneDeep(this.curWorld);
    const tempActions = [...actions, { ...action, key: max }];
    const isNotVaild = tempActions.map(action => tempWorld.processAction(action)).includes(false);
    this.setState({ alertOpen: isNotVaild });
    if (isNotVaild) return;

    this.setState({ actions: [...actions, { ...action, key: max }] });
  };

  calcDay = (actions, ramenKnights) => {
    if (actions.length + this.curWorld.getHour() > 12) return false;
    if (this.transact(this.curWorld, actions)) {
      this.curWorld.eatRamen(ramenKnights);
      this.curWorld.processDay();
      this.worlds.push(lodash.cloneDeep(this.curWorld));
      this.setState({
        curState: {
          day: this.curWorld.getDay(),
          spirit: this.curWorld.getSpirit(),
          science: this.curWorld.getScience(),
          information: this.curWorld.getInformation(),
          knights: this.curWorld.getKnight(),
          region: this.curWorld.getRegion()
        },
        allActions: [...this.state.allActions, ...actions],
        actions: [],
        storeWorld: [...this.state.storeWorld, this.curWorld.getDay() - 1]
      });
    }
  };

  transact = (world, actions) => {
    let tempWorld = lodash.cloneDeep(world);
    const isNotVaild = actions.map(action => tempWorld.processAction(action)).includes(false);

    if (!isNotVaild) {
      actions.map(action => world.processAction(action)).includes(false);
      return true;
    } else return false;
  };

  backDay = day => {
    this.curWorld = lodash.cloneDeep(this.worlds[day]);
    this.worlds = this.worlds.filter((_, i) => i <= day);
    this.setState({
      curState: {
        day: this.curWorld.getDay(),
        spirit: this.curWorld.getSpirit(),
        science: this.curWorld.getScience(),
        information: this.curWorld.getInformation(),
        knights: this.curWorld.getKnight(),
        region: this.curWorld.getRegion()
      },
      actions: this.state.allActions.slice(12 * day, 12 * (day + 1)),
      allActions: this.state.allActions.filter((_, i) => i < day * 12),
      storeWorld: this.state.storeWorld.filter((_, i) => i < day)
    });
  };

  loadData = strData => {
    try {
      const { actions, gifts, ramen } = JSON.parse(strData);

      const tempWorld = new World();
      const tempWorlds = [new World()];

      Object.keys(gifts).map(name => (tempWorld.knights[name].gifts = gifts[name]));

      const day = parseInt(actions.length / 12);
      // const hour = actions.length % 12;

      const isVaild = ![...Array(day)]
        .map((_, i) => {
          if (this.transact(tempWorld, actions.splice(i * 12, (i + 1) * 12))) {
            tempWorld.ramenHistory.push(ramen[i]);
            tempWorld.eatRamen(tempWorld.ramenHistory[i]);
            tempWorlds.push(lodash.cloneDeep(tempWorld));
            return true;
          }
          return false;
        })
        .includes(false);
      if (isVaild) {
        this.curWorld = tempWorld;
        this.worlds = tempWorlds;
        this.setState({
          allActions: actions,
          actions: actions.splice(12 * day, actions.length),
          curState: {
            day: tempWorld.getDay(),
            spirit: tempWorld.getSpirit(),
            science: tempWorld.getScience(),
            information: tempWorld.getInformation(),
            knights: tempWorld.getKnight(),
            region: tempWorld.getRegion()
          },
          storeWorld: [...Array(day)].map((_, i) => i + 1)
        });
        return true;
      }
      return false;
    } catch (e) {
      console.log("parsing error" + e);
      return false;
    }
  };

  load = () => {};

  render() {
    return (
      <Container maxWidth="sm">
        <Typography component="h6" variant="h6" style={{ display: "flex" }}>
          <br />
          {this.state.curState.day}일차 &nbsp; 과학력 : {this.state.curState.science} &nbsp; 환력 : {this.state.curState.spirit} &nbsp; 정보력 :{" "}
          {this.state.curState.information}
        </Typography>
        <ActionItem
          setCurAction={action => this.setState({ curAction: action })}
          addAction={this.addAction}
          curWorld={this.curWorld}
          setCurKnights={knights => this.setState({ curKnights: knights })}
        />

        <ActionDay
          actions={this.state.actions}
          setActions={actions => this.setState({ actions })}
          calcDay={this.calcDay}
          curKnights={this.state.curKnights}
        />

        {this.state.actions.length ? (
          <Paper>
            <ConditionDialog curWorld={this.curWorld} actions={this.state.actions} transact={this.transact} />
          </Paper>
        ) : null}

        <ActionResult curState={this.state.curState} />
        <br />
        {this.state.storeWorld.length ? "일차 되돌리기" : null}
        <Paper>
          {this.state.storeWorld.map(i => (
            <Chip key={i} onClick={() => this.backDay(i - 1)} style={{ maxWidth: 80, justifyContent: "center", margin: 15 }} label={i + "일차"} />
          ))}
        </Paper>
        <ActionAlert alertOpen={this.state.alertOpen} setAlertOpen={v => this.setState({ alertOpen: v })} text="실행할수 없는 행동" />
        <SaveLoadAction
          actions={this.state.allActions}
          gifts={Object.keys(this.curWorld.knights)
            .filter(name => this.curWorld.knights[name].gifts && this.curWorld.knights[name].gifts.length)
            .reduce((acc, name) => {
              acc[name] = this.curWorld.knights[name].gifts;
              return acc;
            }, {})}
          ramen={this.curWorld.ramenHistory}
          loadData={this.loadData}
        />
      </Container>
    );
  }
}
