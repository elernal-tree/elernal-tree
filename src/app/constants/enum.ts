/** section 1 方阵 2 ex 3 普刃 */ 
export enum SkillType {
  maguna = 1,
  ex,
  normal,


}

export enum CoreElement {
  '火' = 1,
  "水",
  "地",
  "风",
  "光",
  "暗"
}

export enum AttrType {
  attack = 3,
  hp,
  da,
  ta,
  enmity, // 背水
  stamina, // 浑身
  critical = 10, // 暴击率
  ub,
  skillDamage = 13,
  skillDamageLimit = 23,
  counter = 43,
}

export enum CoreRarity {
  r = 1,
  sr,
  ssr,
  sp
}