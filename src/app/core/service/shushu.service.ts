import { Injectable } from '@angular/core';
import { Limit } from '@src/app/constants/constants';
import { AtkType } from '@src/app/constants/enum';

@Injectable({
  providedIn: 'root',
})
export class ShushuService {
  constructor() {}

  atkLimit(damage: number, type: AtkType, LimitBonus: number) {
    let limit = Limit.saDamage;
    if (type === AtkType.da) {
      limit = Limit.daDamage;
    }
    if (type === AtkType.ta) {
      limit = Limit.taDamage;
    }
    limit = limit * ( 1 + LimitBonus);
    return damage >= limit ? limit : damage;
  }

  /**
   * 根据背水曲线公式计算当前hp的背水攻刃加成 80%hp以上为0
   * X 为当前剩余血量百分比
   * 1.3X^2-3.75X+2.55
   */
  enmityWithHp(hp: number) {
    if (hp >= 80) {
      return 0;
    }
    const X = hp / 100;
    return 1.3 * X * X - 3.75 * X + 2.55;
  }

  /**
   * 根据浑身公式计算当前hp的浑身加成 25%以下为0
   * 浑身公式暂不明确
   * X 为当前血量百分比
   * 0.99X^2+0.075X+0.01
   */
  staminaWithHp(hp: number) {
    if (hp <= 25) {
      return 0;
    }
    const X = hp / 100;
    return 0.99 * X * X + 0.075 * X + 0.01;
  }
}
