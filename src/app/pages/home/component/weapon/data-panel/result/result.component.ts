import { Component, Input, OnInit } from '@angular/core';
import { ShushuService } from '@app/core/service/shushu.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent {
  nzWidthConfig = new Array(4).fill('25%');

  @Input() atkBonus: number;
  @Input() hpBonus: number;
  @Input() hpPercent: number;
  @Input() da: number;
  @Input() ta: number;
  @Input() pureHp: number;
  @Input() critical: number;
  @Input() criticalDamageRatio: number;
  @Input() skill: number;
  @Input() skillLimit: number;
  @Input() ub: number;
  @Input() ubLimit: number;
  @Input() magunaEnmity: number;
  @Input() normalEnmity: number;
  @Input() exEnmity: number;
  @Input() weaponEnmity: number;
  @Input() sklEnmity: number;
  @Input() magunaStamina: number;
  @Input() normalStamina: number;
  @Input() exStamina: number;
  @Input() weaponStamina: number;
  @Input() sklStamina: number;

  constructor(private shushuSrv: ShushuService) {}

  fixed(num: number) {
    return (num * 100).toFixed(2);
  }

  get enmityWithHp() {
    return this.shushuSrv.enmityWithHp(this.hpPercent);
  }

  get staminaWithHp() {
    return this.shushuSrv.staminaWithHp(this.hpPercent);
  }

  get coreEnmity() {
    return (
      (this.magunaEnmity + this.normalEnmity + this.exEnmity + this.weaponEnmity / 100) *
      this.enmityWithHp
    );
  }

  get enmity() {
    return (1 + this.coreEnmity) * (1 + (this.sklEnmity / 100) * this.enmityWithHp) - 1;
  }

  get coreStamina() {
    return (
      (this.magunaStamina + this.normalStamina + this.exStamina + this.weaponStamina / 100) *
      this.staminaWithHp
    );
  }

  get stamina() {
    return (1 + this.coreStamina) * (1 + (this.sklStamina / 100) * this.staminaWithHp) - 1;
  }

  get hp() {
    return (this.pureHp * ( 1 + this.hpBonus)).toFixed(0);
  }
}
