export class Knight {
  constructor(knight) {
    this.name = knight.name;
    this.feeling = knight.feeling ? knight.feeling : 0;
    this.fatigue = knight.fatigue ? knight.fatigue : 100;
    this.actionCount = knight.actionCount ? knight.actionCount : 0;
    this.build = knight.build;
    this.patrol = knight.patrol;
    this.develop = knight.develop;
    this.clearPatrolCount = knight.clearPatrolCount;
    this.clearValue = knight.clearValue;
    this.isClear = false;
    this.sex = knight.sex;
  }

  eatRamen() {
    this.fatigue += 20;
    if (this.fatigue > 100) {
      this.fatigue = 100;
    }
  }

  dayRest() {
    this.fatigue += 5;
    if (this.fatigue > 100) {
      this.fatigue = 100;
    }
  }

  doFireFestival() {
    this.fatigue += 30;
    if (this.fatigue > 100) {
      this.fatigue = 100;
    }
  }

  doAction(fatigue = 5) {
    if (this.fatigue < fatigue) return false;
    else {
      this.fatigue -= fatigue;
      if (this.fatigue < 0) {
        this.fatigue = 0;
      }
      this.actionCount++;
      return true;
    }
  }

  feelup(feeling = 5) {
    this.feeling += feeling;
    if (this.feeling > 100) {
      this.feeling = 100;
    }
  }

  clearPatrol(action) {
    if (!this.isClear) {
      const clearValue = this.clearValue[this.clearPatrolCount];
      if (action.regionNo === clearValue.regionNo && this.feeling >= clearValue.requiredFeeling) {
        this.feeling += clearValue.addFeeling;
        this.clearPatrolCount++;
        if (this.feeling > 100) {
          this.feeling = 100;
        }
        if (this.clearPatrolCount === this.clearValue.length) this.isClear = true;
        return true;
      }
    }
    return false;
  }

  printKnight() {
    const str = `${this.name}   
    피로도 : ${this.fatigue}   활동수 : ${this.actionCount} 
    호감도 : ${this.feeling} ${this.isClear ? "공략완료" : ""}
    공략순찰횟수 : ${this.clearPatrolCount} `;
    return str;
  }
}
