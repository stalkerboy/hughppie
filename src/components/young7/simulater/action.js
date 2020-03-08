export class Action {
  constructor(action) {
    this.type = action.type; //build patrol fight develop
    this.typeDesc = action.typeDesc; // building명 / patrol 타입 (일반, 호감, 시나),
    this.target = action.target; //공략신기사
    this.regionNo = action.regionNo;
    this.knights = action.knights;
  }
}
