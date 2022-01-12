import { Component, Input, OnInit } from '@angular/core';
import { DaTaRatio, CriRatio } from '@src/app/constants/constants';
import { AtkType } from '@src/app/constants/enum';
import { ShushuService } from '@src/app/core/service/shushu.service';
import { ExtraInfo } from '../../model';

// TODO 如果da+ta满100就不触发sa 需要进行期望计算改动
// 满100. 溢出da无效
// 不满100 2*ta+1.5*min(1-ta,da)+1*max(1-da-ta,0)
// 伤害期望计算
// 100x1x0.1
// 基础伤害 x TA倍率（1） x TA率

// 100x0.5x（1-0.1）x0.1
// 基础伤害 x DA倍率（0.5） x （1-TA率）x DA率

@Component({
  selector: 'app-combo-critical',
  templateUrl: './combo-critical.component.html',
  styleUrls: ['./combo-critical.component.scss'],
})
export class ComboCriticalComponent {
  constructor(private shushuSrc: ShushuService) {}

  @Input() atkDamage: number;
  @Input() extra: ExtraInfo;
  @Input() da: number;
  @Input() ta: number;
  @Input() critical: number;
  @Input() criticalDamageRatio: number;

  nzWidthConfig = new Array(3).fill('33%')

  fixedDamage(num: number) {
    return this.shushuSrc.atkLimit(num, AtkType.ta).toFixed(0);
  }

  fixed(num: number) {
    return (num * 100).toFixed(2);
  }

  get damage() {
    return (
      (DaTaRatio.ta * this.ta +
        DaTaRatio.da * (1 - this.ta) * this.da +
        (1 - this.ta) * (1 - this.da)) *
      this.atkDamage
    );
  }

  get criDamage() {
    return this.damage * (1 + this.critical * (CriRatio.noraml + this.criticalDamageRatio - 1));
  }

  get criUpDamage() {
    return this.damage * (1 + this.critical * (CriRatio.up + this.criticalDamageRatio - 1));
  }

  get criDownDamage() {
    return this.damage * (1 + this.critical * (CriRatio.down + this.criticalDamageRatio - 1));
  }
}
