import { Injectable } from '@angular/core';
import { Limit } from '@src/app/constants/constants';
import { AtkType } from '@src/app/constants/enum';

@Injectable({
  providedIn: 'root',
})
export class ShushuService {
  constructor() {}

  atkLimit(damage: number, type: AtkType) {
    if (type === AtkType.sa) {
      return damage >= Limit.saDamage ? Limit.saDamage : damage;
    }
    if (type === AtkType.da) {
      return damage >= Limit.daDamage ? Limit.daDamage : damage;
    }
    if (type === AtkType.ta) {
      return damage >= Limit.taDamage ? Limit.taDamage : damage;
    }
    return damage;
  }

  /**
   * 根据背水曲线公式计算当前hp的背水攻刃加成 80%hp以上为0
   * factor 为当前剩余血量百分比
   */
  enmityWithHp(hp: number) {
    if (hp >= 80) {
      return 0;
    }
    const factor = 1 - hp / 100;
    return (1 + 2 * factor) * factor;
  }

  /**
   * 根据浑身公式计算当前hp的浑身加成 25%以下为0
   * 浑身公式暂不明确 从容效果 = ( 2.1 + ( r /从容系数 ) ^ 2.9 ) / 100
   * r 为当前血量百分比
   */
  staminaWithHp(hp: number) {
    if (hp <= 25) {
      return 0;
    }
    return 1;
  }
}
