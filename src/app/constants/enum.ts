/** section 1 方阵 2 ex 3 普刃 */ 
export enum SkillSection {
  maguna = 1,
  ex,
  normal,
}

export enum CoreSeries {
  maguna = 1,
  normal,
  ex,
}

export enum CoreElement {
  '火' = 1,
  "水",
  "地",
  "风",
  "光",
  "暗"
}

/**
 * core paramType
 */
export enum SklAttrType {
  atk = 3,
  hp,
  da,
  ta,
  enmity, // 背水
  stamina, // 浑身
  critical = 10, // 暴击率
  ub,
  skill = 13,
  skillLimit = 23,
  counter = 43,
}

export enum CoreRarity {
  r = 1,
  sr,
  ssr,
  sp
}

export enum Robot {
  maguna = 1,
  property,
  normal
}