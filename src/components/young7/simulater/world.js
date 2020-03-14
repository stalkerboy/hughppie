import { KnightData, RegionData, BuildingData } from "./data";
import { Knight } from "./knight";
import { Region } from "./region";
import { Building } from "./building";

export class World {
  constructor(knights) {
    this.actionHistory = [];
    this.curTime = 0;

    this.knights = knights ? knights : this.createAllKnight();
    this.regions = this.createAllRegion();

    this.dayPatrolCount = 0;
    this.worldLimitBuilding = {};
  }

  createAllKnight() {
    const knights = {};
    for (let key in KnightData) {
      knights[key] = new Knight(KnightData[key]);
    }
    return knights;
  }

  createAllRegion() {
    let regions = [];
    for (let region of RegionData) {
      regions.push(new Region(region));
    }
    regions[0].buildings.push(new Building(BuildingData.중앙청기지));
    return regions;
  }

  processAction(action) {
    let fatigueDown = 5;
    // if (action.typeDesc === "over") fatigueDown = 20;

    if (action.type === "fight" && this.getSpirit() < this.regions[action.regionNo].requiredSpirit) fatigueDown = 20;
    // let isVaild = action.knights.map(name => this.knights[name].doAction(fatigueDown)).reduce((rtn, vaildCheck) => rtn && vaildCheck, true);
    let isVaild = action.knights.map(name => this.knights[name].doAction(fatigueDown)).reduce((rtn, vaildCheck) => rtn && vaildCheck, true);

    if (!isVaild) return false;
    let data = { knights: this.knights, action, dayPatrolCount: this.dayPatrolCount };

    switch (action.type) {
      case "fight":
        isVaild = this.regions[action.regionNo].fight(data);
        break;
      case "patrol":
        this.regions.map(region => {
          const destroyBuilding = region.buildings.filter(building => building.buildDestroyPatrol);
          if (destroyBuilding.length) region.destroyBuilding(destroyBuilding[0].name);
          return destroyBuilding;
        });
        isVaild = this.regions[action.regionNo].patrol(data);
        this.dayPatrolCount++;
        break;
      case "build":
        this.regions.map(region => {
          const destroyBuilding = region.buildings.filter(building => building.buildDestroyPlan);
          if (destroyBuilding.length) region.destroyBuilding(destroyBuilding[0].name);
          return destroyBuilding;
        });
        data.building = new Building(BuildingData[action.typeDesc]);

        if (data.building.limit.world) {
          this.worldLimitBuilding[data.building.name] = this.worldLimitBuilding[data.building.name] ? this.worldLimitBuilding[data.building.name] : 0;
          if (this.worldLimitBuilding[data.building.name] < data.building.limit.world) {
            this.worldLimitBuilding[data.building.name]++;
          } else return false;
        } else if (data.building.limit.region) {
          this.regions[action.regionNo].regionLimitBuilding[data.building.name] = this.regions[action.regionNo].regionLimitBuilding[
            data.building.name
          ]
            ? this.regions[action.regionNo].regionLimitBuilding[data.building.name]
            : 0;
          if (this.regions[action.regionNo].regionLimitBuilding[data.building.name] < data.building.limit.region) {
            this.regions[action.regionNo].regionLimitBuilding[data.building.name]++;
          } else return false;
        } else {
          if (Object.keys(data.building.limit).length) return false;
        }

        isVaild = this.regions[action.regionNo].build(data);
        break;
      case "develop":
        isVaild = this.regions[action.regionNo].develop(data);
        break;
      default:
        console.log("not vaild action");
        return false;
    }
    this.actionHistory.push(action);
    this.curTime++;
    return isVaild;
  }

  processDay() {
    this.dayPatrolCount = 0;
    this.dayRest();
  }

  eatRamen(knightNames) {
    knightNames.map(knightName => {
      if (!knightName || !this.knights[knightName]) return false;
      this.knights[knightName].eatRamen();
      return true;
    });
  }

  dayRest() {
    for (let name in this.knights) {
      this.knights[name].dayRest();
    }
  }

  getHour() {
    return this.curTime % 12;
  }

  getDay() {
    return parseInt(this.curTime / 12) + 1;
  }

  getScience() {
    return this.regions.reduce((acc, region) => acc + region.science, 0);
  }

  getSpirit() {
    return this.regions.reduce((acc, region) => acc + region.spirit, 0);
  }

  getInformation() {
    return this.regions.reduce((acc, region) => acc + region.information, 0);
  }

  getKnight() {
    return Object.keys(this.knights)
      .filter(name => this.knights[name].actionCount > 0)
      .map(name => this.knights[name].printKnight());
  }

  getRegion() {
    return this.regions.filter(region => region.isClear || region.fightCount > 0).map(region => region.printRegion());
  }
}
