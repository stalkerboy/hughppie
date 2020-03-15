import React from "react";
import { Container, Typography, Chip, Paper } from "@material-ui/core";
import { ActionItem } from "./actionitem";
import { ActionDay } from "./actionday";
import { ActionResult } from "./actionresult";
import { World } from "./simulater/world";
import lodash from "lodash";
// import { SaveLoadAction } from "./saveloadaction";
import ConditionDialog from "./conditiondialog";

export class Simulater extends React.Component {
  constructor(props) {
    super(props);
    this.curWorld = new World();
    this.worlds = [lodash.cloneDeep(this.curWorld)];
    this.state = {
      actions: [],
      allActions: [],
      curAction: {},
      curState: {
        day: this.curWorld.getDay(),
        spirit: this.curWorld.getSpirit(),
        science: this.curWorld.getScience(),
        information: this.curWorld.getInformation(),
        knights: this.curWorld.getKnight(),
        region: this.curWorld.getRegion()
      },
      storeWorld: []
    };
  }

  addAction = action => {
    const { actions } = this.state;
    if (actions.length > 11) return;
    const max = actions.reduce((acc, action) => (acc >= action.key ? acc : action.key), 0) + 1;
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

  loadActions = strActions => {
    const parseAction = JSON.parse(strActions);
    console.log(parseAction);
  };

  render() {
    return (
      <Container maxWidth="sm">
        <Typography component="h6" variant="h6" style={{ display: "flex", justifyContent: "center" }}>
          <br />
          {this.state.curState.day}일차 &nbsp;&nbsp; 과학력 : {this.state.curState.science} &nbsp; 환력 : {this.state.curState.spirit} &nbsp; 정보력 :{" "}
          {this.state.curState.information}
        </Typography>
        <ActionItem curAction={this.state.curAction} setCurAction={action => this.setState({ curAction: action })} addAction={this.addAction} />

        <ActionDay actions={this.state.actions} setActions={actions => this.setState({ actions })} calcDay={this.calcDay} />

        {this.state.actions.length ? (
          <Paper>
            <ConditionDialog curWorld={this.curWorld} actions={this.state.actions} transact={this.transact} />{" "}
          </Paper>
        ) : null}

        <ActionResult curState={this.state.curState} />
        <br />
        {this.state.storeWorld.length ? "일차 되돌리기" : null}
        <Paper style={{ display: "flex" }}>
          {this.state.storeWorld.map(i => (
            <Chip key={i} onClick={() => this.backDay(i - 1)} style={{ maxWidth: 80, justifyContent: "center", margin: 15 }} label={i + "일차"} />
          ))}
        </Paper>
        {/* <SaveLoadAction actions={this.state.allActions} loadActions={this.loadActions} /> */}
      </Container>
    );
  }
}
