export class Region {
  constructor(region) {
    this.name = region.name;
    this.buildingMax = region.buildingMax;
    this.buildings = region.buildings;
    this.patrolCount = region.patrolCount;
    this.fightCount = region.fightCount ? region.fightCount : 0;
    this.requiredSpirit = region.requiredSpirit;
    this.isClear = region.isClear;
    this.regionLimitBuilding = {};
  }

  fight(data) {
    let { knights, action } = data;
    if (this.fightCount >= 6 || this.isClear) {
      return false;
    } else {
      this.fightCount++;
      if (this.fightCount === 6) {
        this.isClear = true;
      }
    }
    action.knights.map(name => knights[name].feelup(1));
    return true;
  }

  patrol(data) {
    const { knights, action, dayPatrolCount } = data;
    const requiredPatrol = [10, 10, 10, 14, 14, 22, 22, 30, 36, 42, 50, 50];

    const knightSum = action.knights.reduce((sum, name) => sum + knights[name].patrol, 0);
    const buildingBonus = this.buildings.reduce((acc, building) => acc + building.patrolPlus, 0);

    if (!this.isClear || requiredPatrol[dayPatrolCount] > knightSum + buildingBonus) return false;
    let isVaild = true;
    this.patrolCount++;
    switch (action.typeDesc) {
      case "normal":
        const malefeelingPlus = this.buildings.reduce((acc, building) => acc + building.malefeelingPlus, 0);
        const femalefeelingPlus = this.buildings.reduce((acc, building) => acc + building.femalefeelingPlus, 0);
        let feelingBonus = 0;
        action.knights.map(name => {
          feelingBonus = knights[name].sex === "male" ? malefeelingPlus : femalefeelingPlus;
          knights[name].feelup(4 + feelingBonus);
          return feelingBonus;
        });
        break;
      case "knight":
        isVaild = knights[action.target].clearPatrol(action);
        break;
      case "scena":
        break;
      case "score":
        break;
      default:
        return false;
    }
    return isVaild;
  }

  build(data) {
    const { knights, action, building } = data;
    const knightSum = action.knights.reduce((sum, name) => sum + knights[name].build, 0);
    const buildingBonus = this.buildings.reduce((acc, building) => acc + building.buildPlus, 0);
    if (!this.isClear || building.requiredBuild > knightSum + buildingBonus) return false;

    if (this.buildingMax > this.buildings.length) {
      this.buildings.push(building);
      return true;
    } else return false;
  }

  develop(data) {
    const { knights, action } = data;
    const knightSum = action.knights.reduce((sum, name) => sum + knights[name].develop, 0);
    const buildingBonus = this.buildings.reduce((acc, building) => acc + building.developPlus, 0);

    if (!this.isClear || this.develop > knightSum + buildingBonus) return false;

    if (this.buildingMax < 8) {
      this.buildingMax++;
      return true;
    } else {
      return false;
    }
  }

  destroyBuilding(name) {
    const idx = this.buildings.findIndex(building => name === building.name);
    if (idx > -1) this.buildings.splice(idx, 1);
  }

  printRegion() {
    const str = `${this.name}
    전투횟수: ${this.fightCount}
    건물: ${this.buildings.length ? this.buildings : "없음"}
    최대건물수: ${this.buildingMax}`;
    return str;
  }

  get science() {
    const multi = this.buildings.reduce((acc, building) => acc * building.scienceMulti, 1);

    // const plus = this.buildings.reduce((acc, building) => building.sciencePlus, 0);
    return parseInt(this.buildings.reduce((acc, building) => acc + building.science * multi, 0) + 0.5);
  }

  get spirit() {
    const multi = this.buildings.reduce((acc, building) => acc * building.spiritMulti, 1);
    return parseInt(this.buildings.reduce((acc, building) => acc + building.spirit * multi, 0) + 0.5);
  }

  get information() {
    const multi = this.buildings.reduce((acc, building) => acc * building.informationMulti, 1);
    return parseInt(this.buildings.reduce((acc, building) => acc + building.information * multi, 0) + 0.5);
  }
}
