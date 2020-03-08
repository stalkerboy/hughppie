import { World } from "./world";
import { Action } from "./action";
import lodash from "lodash";
export class Simulater {
  constructor() {
    this.world = new World();
  }

  //dummySchedule = {regionNo:1, fight:6, patrolNormal:1, patrolKnight:1, develop:2}
  dummyActions(dummySchedule) {
    let actions = [];
    Array.from(new Array(dummySchedule.fight ? dummySchedule.fight : 0)).map(() => {
      return actions.push(
        new Action({
          type: "fight",
          regionNo: dummySchedule.regionNo,
          knights: ["와타리", "카지", "우류"]
        })
      );
    });

    Array.from(new Array(dummySchedule.patrolNormal ? dummySchedule.patrolNormal : 0)).map(() => {
      return actions.push(
        new Action({
          type: "patrol",
          typeDesc: "normal",
          regionNo: dummySchedule.regionNo,
          knights: ["와타리", "카지", "우류"]
        })
      );
    });

    Array.from(new Array(dummySchedule.patrolKnight ? dummySchedule.patrolKnight : 0)).map(() => {
      return actions.push(
        new Action({
          type: "patrol",
          typeDesc: "knight",
          target: "카지",
          regionNo: dummySchedule.regionNo,
          knights: ["와타리", "카지", "우류"]
        })
      );
    });

    Array.from(new Array(dummySchedule.build공정소 ? dummySchedule.build공정소 : 0)).map(() => {
      return actions.push(
        new Action({
          type: "build",
          typeDesc: "공정소",
          regionNo: dummySchedule.regionNo,
          knights: ["와타리", "카지", "우류"]
        })
      );
    });

    Array.from(new Array(dummySchedule.build연구소 ? dummySchedule.build연구소 : 0)).map(() => {
      return actions.push(
        new Action({
          type: "build",
          typeDesc: "연구소",
          regionNo: dummySchedule.regionNo,
          knights: ["와타리", "카지", "우류"]
        })
      );
    });

    Array.from(new Array(dummySchedule.develop ? dummySchedule.develop : 0)).map(() => {
      return actions.push(new Action({ type: "develop", regionNo: dummySchedule.regionNo, knights: ["와타리", "카지", "우류"] }));
    });

    this.transact(actions);
  }

  start() {
    console.log("simulater started");
    this.dummyActions({ regionNo: 1, fight: 6 });
    this.transact([
      { type: "build", typeDesc: "지하연구소", knights: ["와타리", "카지", "우류"], regionNo: 1 },
      { type: "build", typeDesc: "공공도서관", knights: ["와타리", "카지", "우류"], regionNo: 1 },
      { type: "build", typeDesc: "지하연구소", knights: ["와타리", "카지", "우류"], regionNo: 1 },
      { type: "build", typeDesc: "시립연구센터", knights: ["와타리", "카지", "우류"], regionNo: 1 },
      { type: "build", typeDesc: "구립연구센터", knights: ["와타리", "카지", "우류"], regionNo: 1 },
      { type: "build", typeDesc: "쇼핑센터", knights: ["와타리", "카지", "우류"], regionNo: 1 }
    ]);

    this.world.eatRamen(this.inputRamen());
    this.world.eatRamen(this.inputRamen());
    this.world.eatRamen(this.inputRamen());
    this.world.eatRamen(this.inputRamen());
    this.transact([
      { type: "patrol", typeDesc: "normal", knights: ["와타리", "카지", "우류"], regionNo: 1 },
      { type: "patrol", typeDesc: "normal", knights: ["와타리", "카지", "우류"], regionNo: 1 },
      { type: "patrol", typeDesc: "normal", knights: ["와타리", "카지", "우류"], regionNo: 1 },
      { type: "patrol", typeDesc: "normal", knights: ["와타리", "카지", "우류"], regionNo: 1 },
      { type: "patrol", typeDesc: "normal", knights: ["와타리", "카지", "우류"], regionNo: 1 },
      { type: "patrol", typeDesc: "normal", knights: ["와타리", "카지", "우류"], regionNo: 1 },
      { type: "patrol", typeDesc: "normal", knights: ["와타리", "카지", "우류"], regionNo: 1 }
    ]);
    this.world.processDay();
    this.transact([
      { type: "patrol", typeDesc: "knight", target: "카지", knights: ["와타리", "카지", "우류"], regionNo: 1 },
      { type: "patrol", typeDesc: "knight", target: "카지", knights: ["와타리", "카지", "우류"], regionNo: 1 },
      { type: "patrol", typeDesc: "knight", target: "카지", knights: ["와타리", "카지", "우류"], regionNo: 1 },
      { type: "patrol", typeDesc: "knight", target: "카지", knights: ["와타리", "카지", "우류"], regionNo: 1 },
      { type: "patrol", typeDesc: "knight", target: "카지", knights: ["와타리", "카지", "우류"], regionNo: 1 }
    ]);

    // this.dummyActions({ regionNo: 1, fight: 6, patrolNormal: 1, patrolKnight: 2, develop: 3 });

    // this.world.eatRamen(this.inputRamen());
    // this.world.processDay();

    // this.dummyActions({ regionNo: 1, build연구소: 5 });
    // this.transact([
    //   { type: "build", typeDesc: "대형연구소", knights: ["와타리", "카지", "우류"], regionNo: 1 },
    //   { type: "build", typeDesc: "지하연구소", knights: ["와타리", "카지", "우류"], regionNo: 0 },
    //   { type: "build", typeDesc: "시립연구센터", knights: ["와타리", "카지", "우류"], regionNo: 1 }
    // ]);

    // for (let name in this.world.knights) {
    //   console.log(this.world.knights[name].printKnight());
    // }

    // this.world.regions.map(region => {
    //   if (region.isClear) console.log(region.printRegion());
    // });

    // let action;
    // let isValidAction;
    // for (let day = 0; day < 7; day++) {
    //   for (let hour = 9; hour < 21; hour++) {
    //     do {
    //       action = new Action(this.inputAction());
    //       isValidAction = this.world.checkAction(action);
    //     } while (!isValidAction);
    //     this.world.processAction(action);
    //     // console.log("day: ", this.world.getDay());
    //     // console.log("hour: ", this.world.getHour());
    //   }
    //   this.world.eatRamen(this.inputRamen());
    //   this.world.processDay();
    // }

    for (let name in this.world.knights) {
      console.log(this.world.knights[name].printKnight());
    }

    // this.world.regions.map(region => {
    //   if (region.isClear) console.log(region.printRegion());
    // });

    console.log("spirit : ", this.world.getSpirit());
    console.log("science : ", this.world.getScience());
    console.log("information : ", this.world.getInformation());
  }

  transact(actions) {
    // if (actions.length > 12 - this.world.getHour()) return false;
    let tempWorld = this.copyWorld();
    let isVaild = actions.map(action => tempWorld.processAction(action)).reduce((rtn, check) => rtn && check, true);

    if (isVaild) {
      actions.map(action => this.world.processAction(action)).reduce((rtn, check) => rtn && check, true);
      return true;
    } else return false;
  }

  inputAction() {
    // let action = {
    //   type: "fight",
    //   regionNo: "1",
    //   knights: ["와타리", "카지", "우류"]
    // };
    // let action = {
    //   type: "patrol",
    //   typeDesc: "knight",
    //   target: "카지",
    //   regionNo: "0",
    //   knights: ["와타리", "카지", "우류"]
    // };
    let action = {
      type: "patrol",
      typeDesc: "normal",
      regionNo: "0",
      knights: ["와타리", "카지", "우류"]
    };

    return action;
  }

  inputRamen() {
    let knights = ["와타리", "카지", "우류"];
    return knights;
  }

  copyWorld() {
    // return JSON.parse(JSON.stringify(this.world));
    return lodash.cloneDeep(this.world);
    // return this.world.copyWorld();
  }
}
