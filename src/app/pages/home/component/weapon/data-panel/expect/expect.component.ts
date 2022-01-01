import { Component, Input, OnInit } from '@angular/core';
import { ExtraInfo } from '../../model';
import { atkLimit } from '../util';
import { AtkRatio, DaTaRatio } from '@app/constants/constants';
import { AtkType } from '@src/app/constants/enum';

// 伤害期望计算
// 100x1x0.1
// 基础伤害 x TA倍率（1） x TA率

// 100x0.5x（1-0.1）x0.1
// 基础伤害 x DA倍率（0.5） x （1-TA率）x DA率

@Component({
  selector: 'app-expect',
  templateUrl: './expect.component.html',
  styleUrls: ['./expect.component.scss'],
})
export class ExpectComponent {
  @Input() atkDamage: number;
  @Input() extra: ExtraInfo;
  @Input() da: number;
  @Input() ta: number;
  @Input() critical: number;
  constructor() {}

  fixed(num: number, type: AtkType) {
    return atkLimit(num, type).toFixed(0);
  }
  // 1倍
  get taDamage() {
    return this.atkDamage * DaTaRatio.ta * this.ta + this.atkDamage;
  }
  // 0.5
  get daDamage() {
    return this.atkDamage * DaTaRatio.ta * (1 - this.ta) * this.da + this.atkDamage;
  }
}
