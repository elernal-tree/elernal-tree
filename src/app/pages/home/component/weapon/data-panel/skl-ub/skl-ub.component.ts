import { Component, Input, OnInit } from '@angular/core';
import { AtkRatio, Limit } from '@src/app/constants/constants';

@Component({
  selector: 'app-skl-ub',
  templateUrl: './skl-ub.component.html',
  styleUrls: ['./skl-ub.component.scss'],
})
export class SklUbComponent {
  constructor() {}
  @Input() atkDamage: number;
  @Input() skill: number;
  @Input() skillLimit: number;
  @Input() ub: number;
  @Input() ubLimit: number;
  @Input() spLimit: number;

  // 用于计算伤害的技能倍率
  skillRatio = 200;
  // 用于计算伤害的奥义倍率
  ubRatio = 300;

  sklDamageByLimit(damage: number) {
    const limit = Limit.skillDamage * (1 + this.skillLimit);
    const result = damage >= limit ? limit : damage;
    return result * (1 + this.spLimit);
  }

  get _sklDamage() {
    return ((this.atkDamage * this.skillRatio) / 100) * (1 + this.skill);
  }
  get sklDmage() {
    return this.sklDamageByLimit(this._sklDamage);
  }
  get sklUpDamage() {
    return this.sklDamageByLimit(this._sklDamage * AtkRatio.up);
  }

  get sklDownDamage() {
    return this.sklDamageByLimit(this._sklDamage * AtkRatio.down);
  }

  ubDamageByLimit(damage: number) {
    const limit = Limit.ubDamage * (1 + this.ubLimit);
    const result = damage >= limit ? limit : damage;
    return result * (1 + this.spLimit);
  }
  get _ubDamage() {
    return ((this.atkDamage * this.ubRatio) / 100) * (1 + this.ub);
  }

  get ubDamage() {
    return this.ubDamageByLimit(this._ubDamage);
  }

  get ubUpDamage() {
    return this.ubDamageByLimit(this._ubDamage * AtkRatio.up);
  }

  get ubDownDamage() {
    return this.ubDamageByLimit(this._ubDamage * AtkRatio.down);
  }
}
