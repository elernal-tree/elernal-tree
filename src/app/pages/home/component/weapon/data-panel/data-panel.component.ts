import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CoreOption } from '@src/app/constants/contants';
import { Robot } from '@src/app/constants/enum';
import { PanelData } from '../model';

const calcAtk = '1 + x * (100 + y) / 10000';
const calcOther = 'x * (100 + y) / 10000';

@Component({
  selector: 'app-data-panel',
  templateUrl: './data-panel.component.html',
  styleUrls: ['./data-panel.component.scss'],
})
export class DataPanelComponent {
  robotOption = [
    {
      label: '方阵',
      value: Robot.maguna,
    },
    {
      label: '属性',
      value: Robot.property,
    },
    {
      label: '老王',
      value: Robot.normal,
    },
  ];

  coreOption = CoreOption;

  nzWidthConfig = new Array(4).fill('25%');

  @Input() panelData: PanelData;

  @Output() dataChange = new EventEmitter<void>();

  constructor() {}

  // TODO 修改实现
  elementChange() {
    setTimeout(() => {
      this.dataChange.emit();
    }, 0);
  }

  calcAtkBonus(x: number, y: number) {
    return eval(calcAtk.replace('x', `${x}`).replace('y', `${y}`));
  }

  calcOtherBonus(x: number, y: number) {
    return eval(calcOther.replace('x', `${x}`).replace('y', `${y}`));
  }

  get propertyBonus() {
    return (100 + (this.roboteBonus.property ? +this.roboteBonus.property : 0)) / 100;
  }

  get roboteBonus() {
    return {
      maguna:
        (this.panelData.mainRobot === Robot.maguna ? this.panelData.mainRobotValue : 0) +
        (this.panelData.subRobot === Robot.maguna ? this.panelData.subRobotValue : 0),
      normal:
        (this.panelData.mainRobot === Robot.normal ? this.panelData.mainRobotValue : 0) +
        (this.panelData.subRobot === Robot.normal ? this.panelData.subRobotValue : 0),
      property:
        (this.panelData.mainRobot === Robot.property ? this.panelData.mainRobotValue : 0) +
        (this.panelData.subRobot === Robot.property ? this.panelData.subRobotValue : 0),
    };
  }

  fixed(num: number) {
    return (num * 100).toFixed(2);
  }

  get nagunaAtk() {
    return this.calcAtkBonus(this.panelData.atk.maguna, this.roboteBonus.maguna);
  }

  get normalAtk() {
    return this.calcAtkBonus(this.panelData.atk.normal, this.roboteBonus.normal);
  }

  get exAtk() {
    return this.calcAtkBonus(this.panelData.atk.ex, 0);
  }

  get atk() {
    return this.fixed(this.nagunaAtk * this.normalAtk * this.exAtk * this.propertyBonus - 1);
  }
  /**
   * 上限 -70%~
   */
  getHpLimit(hp: number) {
    return hp <= -0.7 ? -0.7 : hp;
  }
  get magunaHp() {
    return this.getHpLimit(this.calcOtherBonus(this.panelData.hp.maguna, this.roboteBonus.maguna));
  }
  get normalHp() {
    return this.getHpLimit(this.calcOtherBonus(this.panelData.hp.normal, this.roboteBonus.normal));
  }
  get exHp() {
    return this.getHpLimit(this.calcOtherBonus(this.panelData.hp.ex, 0));
  }
  /**
   * 综合上限 -99.99%~
   */
  get hp() {
    const hp = this.magunaHp + this.normalHp + this.exHp;
    return this.fixed(hp <= -9.9999 ? -9.9999 : hp);
  }

  get magunaDa() {
    return this.calcOtherBonus(this.panelData.da.maguna, this.roboteBonus.maguna);
  }

  get normalDa() {
    return this.calcOtherBonus(this.panelData.da.normal, this.roboteBonus.normal);
  }

  get exDa() {
    return this.calcOtherBonus(this.panelData.da.ex, 0);
  }
  /**
   * 盘子上限 75 不包含职武
   */
  get da() {
    const coreDa = this.magunaDa + this.normalDa + this.exDa;
    return this.fixed(coreDa >= 7.5 ? 7.5 : coreDa);
  }

  get magunaTa() {
    return this.calcOtherBonus(this.panelData.ta.maguna, this.roboteBonus.maguna);
  }

  get normalTa() {
    return this.calcOtherBonus(this.panelData.ta.normal, this.roboteBonus.normal);
  }
  get exTa() {
    return this.calcOtherBonus(this.panelData.ta.ex, 0);
  }
  /**
   * 盘子上限 75 不包含职武
   */
  get ta() {
    const coreTa = this.magunaTa + this.normalTa + this.exTa;
    return this.fixed(coreTa >= 7.5 ? 7.5 : coreTa);
  }

  get magunaEnmity() {
    return this.calcOtherBonus(this.panelData.enmity.maguna, this.roboteBonus.maguna);
  }
  get normalEnmity() {
    return this.calcOtherBonus(this.panelData.enmity.normal, this.roboteBonus.normal);
  }

  get exEnmity() {
    return this.calcOtherBonus(this.panelData.enmity.ex, 0);
  }

  get enmity() {
    return this.fixed(this.magunaEnmity + this.normalEnmity + this.exEnmity);
  }

  get magunaStamina() {
    return this.calcOtherBonus(this.panelData.stamina.maguna, this.roboteBonus.maguna);
  }

  get normalStamina() {
    return this.calcOtherBonus(this.panelData.stamina.normal, this.roboteBonus.normal);
  }
  get exStamina() {
    return this.calcOtherBonus(this.panelData.stamina.ex, 0);
  }
  get stamina() {
    return this.fixed(this.magunaStamina + this.normalStamina + this.exStamina);
  }

  get magunaSkl() {
    return this.calcOtherBonus(this.panelData.skillDamage.maguna, this.roboteBonus.maguna);
  }

  get mormalSkl() {
    return this.calcOtherBonus(this.panelData.skillDamage.normal, this.roboteBonus.normal);
  }

  get exSkl() {
    return this.calcOtherBonus(this.panelData.skillDamage.ex, 0);
  }

  get skill() {
    return this.fixed(this.magunaSkl + this.mormalSkl + this.exSkl);
  }

  get magunaUb() {
    return this.calcOtherBonus(this.panelData.ub.maguna, this.roboteBonus.maguna);
  }
  get noramlUb() {
    return this.calcOtherBonus(this.panelData.ub.normal, this.roboteBonus.normal);
  }

  get exUb() {
    return this.calcOtherBonus(this.panelData.ub.ex, 0);
  }
  get ub() {
    return this.fixed(this.magunaUb + this.noramlUb + this.exUb);
  }
  /** ubLimit 0~50% */
  getUbLimit(ub: number) {
    return ub >= 0.5 ? 0.5 : ub;
  }

  get magunaUbLimit() {
    return this.getUbLimit(
      this.calcOtherBonus(this.panelData.ubLimit.maguna, this.roboteBonus.maguna)
    );
  }

  get noramlUbLimit() {
    return this.getUbLimit(
      this.calcOtherBonus(this.panelData.ubLimit.normal, this.roboteBonus.normal)
    );
  }

  get exUbLimit() {
    return this.getUbLimit(this.calcOtherBonus(this.panelData.ubLimit.ex, 0));
  }

  get ubLimit() {
    return this.fixed(this.magunaUbLimit + this.noramlUbLimit + this.exUbLimit);
  }

  /** skillLimit 0~50% */
  getSkillLimit(skill: number) {
    return skill >= 0.5 ? 0.5 : skill;
  }

  get magunaSklLimit() {
    return this.getSkillLimit(
      this.calcOtherBonus(this.panelData.skillLimit.maguna, this.roboteBonus.maguna)
    );
  }
  get normalSklLimit() {
    return this.getSkillLimit(
      this.calcOtherBonus(this.panelData.skillLimit.normal, this.roboteBonus.normal)
    );
  }
  get exSklLimit() {
    return this.getSkillLimit(this.calcOtherBonus(this.panelData.skillLimit.ex, 0));
  }

  get skillLimit() {
    return this.fixed(this.magunaSklLimit + this.normalSklLimit + this.exSklLimit);
  }

  get magunaCri() {
    return this.calcOtherBonus(this.panelData.critical.maguna, this.roboteBonus.maguna);
  }
  get normalCri() {
    return this.calcOtherBonus(this.panelData.critical.normal, this.roboteBonus.normal);
  }

  get exCri() {
    return this.calcOtherBonus(this.panelData.critical.ex, 0);
  }
  get critical() {
    return this.fixed(this.magunaCri + this.normalCri + this.exCri);
  }

  get magunaCriticalDamage() {
    return this.calcOtherBonus(this.panelData.criticalDamage.maguna, this.roboteBonus.maguna);
  }
  get normalCriticalDamage() {
    return this.calcOtherBonus(this.panelData.criticalDamage.normal, this.roboteBonus.normal);
  }
  get exCriticalDamage() {
    return this.calcOtherBonus(this.panelData.criticalDamage.ex, 0);
  }

  get criticalDamage() {
    return this.fixed(
      this.magunaCriticalDamage + this.normalCriticalDamage + this.exCriticalDamage
    );
  }
}
