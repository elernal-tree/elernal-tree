import { Component, Input, OnInit } from '@angular/core';
import { ExtraInfo } from '../../model';
import { AtkRatio, CriRatio, DaTaRatio, Limit } from '@app/constants/constants';
import { AtkType } from '@src/app/constants/enum';
import { ShushuService } from '@app/core/service/shushu.service'

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
  @Input() criticalDamageRatio: number;
  constructor(
    private shushuSrc: ShushuService
  ) {}

  fixed(num: number) {
    return this.shushuSrc.atkLimit(num, AtkType.ta).toFixed(0);
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
