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
  @Input() hp: number;
  @Input() da: number;
  @Input() ta: number;
  // @Input() enmity: number;
  // @Input() stamina: number;
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

  get enmityByHp() {
    return this.shushuSrv.enmityByHp(this.hp);
  }

  get staminaByHp() {
    return this.shushuSrv.staminaByHp(this.hp);
  }

  get coreEnmity() {
    return (
      (this.magunaEnmity + this.normalEnmity + this.exEnmity + this.weaponEnmity / 100) *
      this.enmityByHp
    );
  }

  get enmity() {
    return (1 + this.coreEnmity) * (1 + (this.sklEnmity / 100) * this.enmityByHp) - 1;
  }

  get coreStamina() {
    return (
      (this.magunaStamina + this.normalStamina + this.exStamina + this.weaponStamina / 100) *
      this.staminaByHp
    );
  }

  get stamina() {
    return (1 + this.coreStamina) * (1 + (this.sklStamina / 100) * this.staminaByHp) - 1;
  }
}
