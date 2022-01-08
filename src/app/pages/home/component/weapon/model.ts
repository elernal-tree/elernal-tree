import { CoreElement, Robot } from '@src/app/constants/enum';

export interface Section {
  normal: number;
  maguna: number;
  ex: number;
}

export interface PanelData {
  element: CoreElement;
  mainRobot: Robot;
  mainRobotValue: number;
  subRobot: Robot;
  subRobotValue: number;
  atk: Section;
  hp: Section;
  da: Section;
  ta: Section;
  enmity: Section;
  stamina: Section;
  /** 暴击率 */
  critical: Section;
  /** 暴击伤害提升百分比 */
  criticalDamageRatio: Section;
  ub: Section;
  ubLimit: Section;
  skillLimit: Section;
  skillDamage: Section;
  pureHp: number;
  pureAtk: number;
}

export interface ExtraInfo {
  /** 攻击力白值 */
  atk: number;
  /** hp 白值 */
  hp: number;
  /** 属攻 */
  attribute: number;
  /** 技能攻刃 */
  skill: number;
  /** UB攻刃 */
  ub: number;
  cri: number; // 暴击率
  criDamageRadio: number; // 爆伤提升
  /** 攻刃% */
  atkBuff: number;
  /** 敌方防御力 */
  defense: number;
  /** 当前hp */
  hpPercent: number;
  weaponEnmity: number;
  weaponStamina: number;
  sklStamina: number;
  sklEnmity: number;
  da: number;
  ta: number;
}
