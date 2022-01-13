import { Component, Input, OnInit } from '@angular/core';
import { ShushuService } from '@app/core/service/shushu.service';
import { AtkRatio, CriRatio } from '@src/app/constants/constants';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent {
  nzWidthConfig = new Array(5).fill('20%');

  @Input() hpBonus: number;
  @Input() hpPercent: number;
  @Input() pureHp: number;
  @Input() critical: number;
  @Input() criticalDamageRatio: number;
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
  @Input() attributeBonus: number;
  @Input() magunaAtk: number;
  @Input() normalAtk: number;
  @Input() exAtk: number;
  @Input() atkDamage: number;

  constructor(private shushuSrv: ShushuService) {}

  fixed(num: number) {
    return (num * 100).toFixed(2);
  }

  fixedAtkDamage(num: number) {
    return this.shushuSrv.atkLimit(num, 1).toFixed(0);
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
    return (this.pureHp * (1 + this.hpBonus)).toFixed(0);
  }
  get atkBonus() {
    return (1 + this.magunaAtk) * (1 + this.normalAtk) * (1 + this.exAtk) - 1;
  }

  get damage() {
    return this.fixedAtkDamage(this.atkDamage * AtkRatio.normal);
  }

  get upDamage() {
    return this.fixedAtkDamage(this.atkDamage * AtkRatio.up);
  }

  get downDamage() {
    return this.fixedAtkDamage(this.atkDamage * AtkRatio.down);
  }

  get criDamage() {
    return this.fixedAtkDamage(this.atkDamage * (CriRatio.noraml + this.criticalDamageRatio));
  }

  get criUpDamage() {
    return this.fixedAtkDamage(
      this.atkDamage * AtkRatio.up * (CriRatio.up + this.criticalDamageRatio)
    );
  }

  get criDownDamage() {
    return this.fixedAtkDamage(
      this.atkDamage * AtkRatio.down * (CriRatio.down + this.criticalDamageRatio)
    );
  }
}
