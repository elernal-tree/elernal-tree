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

  // 用于计算伤害的技能倍率
  skillRatio = 200;
  // 用于计算伤害的奥义倍率
  ubRatio = 300;

  sklDamageByLimit(damage: number) {
    const limit = Limit.skillDamage * (1 + this.skillLimit);
    return damage >= limit ? limit : damage;
  }

  _sklDamage() {
    const damage = ((this.atkDamage * this.skillRatio) / 100) * (1 + this.skill);
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
    const damage = ((this.atkDamage * this.ubRatio) / 100) * (1 + this.ub);
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

  fixed(num: number) {
    return (num * 100).toFixed(2);
  }
}
