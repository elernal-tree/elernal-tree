import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CoreOption, Limit } from '@src/app/constants/constants';
import { Robot } from '@src/app/constants/enum';
import { ExtraInfo, PanelData } from '../model';
import { ShushuService } from '@app/core/service/shushu.service';

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
      value: Robot.attribute,
    },
    {
      label: '老王',
      value: Robot.normal,
    },
  ];

  coreOption = CoreOption;

  @Input() panelData: PanelData;

  @Output() dataChange = new EventEmitter<void>();

  extra: ExtraInfo = {
    atk: 0,
    hp: 0,
    attribute: 0,
    skill: 0,
    ub: 0,
    cri: 0,
    criDamageRadio: 0,
    atkBuff: 20,
    defense: 10,
    /** 当前hp百分比 */
    hpPercent: 50,
    weaponEnmity: 0,
    weaponStamina: 0,
    sklEnmity: 0,
    sklStamina: 0,
    da: 0,
    ta: 0,
  };

  constructor(private shushuSrv: ShushuService) {}

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

  get attributeBonus() {
    return (
      (100 +
        (this.roboteBonus.attribute ? +this.roboteBonus.attribute + this.extra.attribute : 0)) /
      100
    );
  }

  get roboteBonus() {
    return {
      maguna:
        (this.panelData.mainRobot === Robot.maguna ? this.panelData.mainRobotValue : 0) +
        (this.panelData.subRobot === Robot.maguna ? this.panelData.subRobotValue : 0),
      normal:
        (this.panelData.mainRobot === Robot.normal ? this.panelData.mainRobotValue : 0) +
        (this.panelData.subRobot === Robot.normal ? this.panelData.subRobotValue : 0),
      attribute:
        (this.panelData.mainRobot === Robot.attribute ? this.panelData.mainRobotValue : 0) +
        (this.panelData.subRobot === Robot.attribute ? this.panelData.subRobotValue : 0),
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

  get atkBonus() {
    return this.nagunaAtk * this.normalAtk * this.exAtk * this.attributeBonus - 1;
  }
  /**
   * 上限 -70%~
   */
  getHpLimit(hp: number) {
    return hp <= Limit.hp ? Limit.hp : hp;
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
  get hpBonus() {
    const hp = this.magunaHp + this.normalHp + this.exHp;
    return hp <= Limit.totalHp ? Limit.totalHp : hp;
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
    let coreDa = this.magunaDa + this.normalDa + this.exDa;
    coreDa = coreDa >= Limit.successionChance ? Limit.successionChance : coreDa;
    const da = coreDa + this.extra.da / 100;
    return da >= 1 ? 1 : da;
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
    let coreTa = this.magunaTa + this.normalTa + this.exTa;
    coreTa = coreTa >= Limit.successionChance ? Limit.successionChance : coreTa;
    const ta = coreTa + this.extra.ta / 100;
    return ta >= 1 ? 1 : ta;
  }
  /**
   * 根据背水曲线公式计算当前hp的背水攻刃加成 80%hp以上为0
   */
  get enmityWithHp() {
    return this.shushuSrv.enmityWithHp(this.extra.hpPercent);
  }

  get staminaWithHp() {
    return this.shushuSrv.staminaWithHp(this.extra.hpPercent);
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
  /** 综合背水 */
  get enmity() {
    return this.magunaEnmity + this.normalEnmity + this.exEnmity;
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
    return this.magunaStamina + this.normalStamina + this.exStamina;
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
    return this.magunaSkl + this.mormalSkl + this.exSkl + this.extra.skill / 100;
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
    return this.magunaUb + this.noramlUb + this.exUb + this.extra.ub / 100;
  }
  /**老王 方阵 ex每个区间 上限为 0~50% */
  getUbLimit(ub: number) {
    return ub >= Limit.ubBonus ? Limit.ubBonus : ub;
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
    return this.magunaUbLimit + this.noramlUbLimit + this.exUbLimit;
  }

  /** 老王 方阵 ex每个区间 上限为  skillLimit 0~50% */
  getSkillLimit(skill: number) {
    return skill >= Limit.sklBonus ? Limit.sklBonus : skill;
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
    return this.magunaSklLimit + this.normalSklLimit + this.exSklLimit;
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
  /** 暴击率 */
  get critical() {
    return this.magunaCri + this.normalCri + this.exCri + this.extra.cri / 100;
  }

  get magunaCriticalDamageRatio() {
    return this.calcOtherBonus(this.panelData.criticalDamageRatio.maguna, this.roboteBonus.maguna);
  }
  get normalCriticalDamageRatio() {
    return this.calcOtherBonus(this.panelData.criticalDamageRatio.normal, this.roboteBonus.normal);
  }
  get exCriticalDamageRatio() {
    return this.calcOtherBonus(this.panelData.criticalDamageRatio.ex, 0);
  }

  get criticalDamageRatio() {
    return (
      this.magunaCriticalDamageRatio +
      this.normalCriticalDamageRatio +
      this.exCriticalDamageRatio +
      this.extra.criDamageRadio / 100
    );
  }
  /** 基础10防御  由于浑身公式不明确 所以计算直接使用的面板数值*/
  get atkDamage() {
    return (
      ((this.panelData.pureAtk + this.extra.atk) *
        (1 + this.atkBonus) *
        (1 + this.extra.atkBuff / 100) *
        (1 + (this.enmity + this.extra.weaponEnmity / 100) * this.enmityWithHp) *
        (1 + (this.stamina + this.extra.weaponStamina / 100) * this.staminaWithHp) *
        (1 + (this.extra.sklEnmity / 100) * this.enmityWithHp) *
        (1 + this.extra.sklStamina / 100 * this.staminaWithHp)) /
      this.extra.defense
    );
  }
  // HP白值
  get pureHp() {
    return this.panelData.pureHp + this.extra.hp
  }
}
