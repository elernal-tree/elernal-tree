import { CoreElement } from './enum';

export const CoreOption = Object.freeze([
  {
    label: '火',
    value: CoreElement.火,
  },
  {
    label: '水',
    value: CoreElement.水,
  },
  {
    label: '地',
    value: CoreElement.地,
  },

  {
    label: '风',
    value: CoreElement.风,
  },
  {
    label: '光',
    value: CoreElement.光,
  },
  {
    label: '暗',
    value: CoreElement.暗,
  },
]);
/**
 * 暴击倍率：有利属性为0.5，其他属性为0.25
 */
export const CriRatio = {
  up: 1.5,
  noraml: 1.25,
  down: 1.25
};

export const AtkRatio = {
  up: 1.25,
  normal: 1,
  down: 0.75
}

export const DaTaRatio  = {
  da : 1.5,
  ta: 2
}

export const Limit = {
  /** 伤害上限 */
  saDamage: 4e5,
  daDamage: 6e5,
  taDamage: 8e5,
  skillDamage: 6e5,
  ubDamage: 28e5,
  // 单独hp区间下限
  hp: -0.7,
  // 综合hp下限
  totalHp: -9.99999,
  // 连击概率上限
  combo: 0.75,
  /** 单独UB上限 */
  ubBonus: 0.5,
  sklBonus: 0.5,
}