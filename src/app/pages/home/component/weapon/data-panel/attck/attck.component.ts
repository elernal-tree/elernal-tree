import { Component, Input, OnInit } from '@angular/core';
import { ExtraInfo } from '../../model';
import { atkLimit } from '../util';
import { AtkRatio, CriRatio, Limit } from '@src/app/constants/constants';

@Component({
  selector: 'app-attck',
  templateUrl: './attck.component.html',
  styleUrls: ['./attck.component.scss'],
})
export class AttckComponent {
  @Input() atkDamage: number;
  @Input() extra: ExtraInfo;
  @Input() skillLimit: number;
  @Input() ubLimit: number;
  @Input() ub: number;
  @Input() skill: number;
  @Input() criticalDamageRatio: number;

  // 用于计算伤害的技能倍率
  skillRatio = 200;
  // 用于计算伤害的奥义倍率
  ubRatio = 300;

  constructor() {}

  fixed(num: number) {
    return atkLimit(num, 1).toFixed(0);
  }

  get damage() {
    return this.fixed(this.atkDamage * AtkRatio.normal);
  }

  get upDamage() {
    return this.fixed(this.atkDamage * AtkRatio.up);
  }

  get downDamage() {
    return this.fixed(this.atkDamage * AtkRatio.down);
  }

  get criDamage() {
    return this.fixed(this.atkDamage * (CriRatio.noraml + this.criticalDamageRatio));
  }

  get criUpDamage() {
    return this.fixed(
      this.atkDamage * AtkRatio.up * (CriRatio.up + this.criticalDamageRatio)
    );
  }

  get criDownDamage() {
    return this.fixed(
      this.atkDamage * AtkRatio.down * (CriRatio.noraml + this.criticalDamageRatio)
    );
  }

  sklDamageByLimit(damage: number) {
    const limit = Limit.skillDamage * (1 + this.skillLimit);
    return damage >= limit ? limit : damage;
  }

  _sklDamage() {
    const damage = this.atkDamage * this.skillRatio / 100 * (1 + this.skill);
    return this.sklDamageByLimit(damage);
  }
  get sklDmage() {
    return this._sklDamage().toFixed(0);
  }
  get sklUpDamage() {
    return this.sklDamageByLimit(this._sklDamage() * AtkRatio.up).toFixed(0);
  }

  get sklDownDamage() {
    return this.sklDamageByLimit(this._sklDamage() * AtkRatio.down).toFixed(0);
  }

  ubDamageByLimit(damage: number) {
    const limit = Limit.ubDamage * (1 + this.ubLimit);
    return damage >= limit ? limit : damage;
  }
  _ubDamage() {
    const damage = this.atkDamage * this.ubRatio / 100 * (1 + this.ub);
    return this.ubDamageByLimit(damage);
  }

  get ubDamage() {
    return this._ubDamage().toFixed(0);
  }

  get ubUpDamage() {
    return this.ubDamageByLimit(this._ubDamage() * AtkRatio.up).toFixed(0);
  }

  get ubDownDamage() {
    return this.ubDamageByLimit(this._ubDamage() * AtkRatio.down).toFixed(0);
  }
}
