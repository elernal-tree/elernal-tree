import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CoreOption, Limit } from '@src/app/constants/constants';
import { Robot } from '@src/app/constants/enum';
import { ExtraInfo, PanelData } from '../model';
import { ShushuService } from '@app/core/service/shushu.service';

const calcBonus = 'x * (100 + y) / 10000';

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
    hpBonus: 20,
    ubLimit: 0,
    sklLimit: 0,
    damageLimit: 0,
    spLimit: 0,
    damageBonus: 0,
    atkLimit: 0,
  };

  constructor(private shushuSrv: ShushuService) {}

  // TODO 修改实现
  elementChange() {
    setTimeout(() => {
      this.dataChange.emit();
    }, 0);
  }

  calcBonus(x: number, y: number) {
    return eval(calcBonus.replace('x', `${x}`).replace('y', `${y}`));
  }

  get attributeBonus() {
    return this.transferPercent(this.roboteBonus.attribute + this.extra.attribute);
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

  get magunaAtk() {
    return this.calcBonus(this.panelData.atk.maguna, this.roboteBonus.maguna);
  }

  get normalAtk() {
    return this.calcBonus(this.panelData.atk.normal, this.roboteBonus.normal);
  }

  get exAtk() {
    return this.calcBonus(this.panelData.atk.ex, 0);
  }

  /**
   * 上限 -70%~
   */
  getHpLimit(hp: number) {
    return hp <= Limit.hp ? Limit.hp : hp;
  }
  get magunaHp() {
    return this.getHpLimit(this.calcBonus(this.panelData.hp.maguna, this.roboteBonus.maguna));
  }
  get normalHp() {
    return this.getHpLimit(this.calcBonus(this.panelData.hp.normal, this.roboteBonus.normal));
  }
  get exHp() {
    return this.getHpLimit(this.calcBonus(this.panelData.hp.ex, 0));
  }
  /**
   * 综合上限 -99.99%~
   */
  get hpBonus() {
    let hp = this.magunaHp + this.normalHp + this.exHp;
    hp = hp <= Limit.totalHp ? Limit.totalHp : hp;
    return hp + this.transferPercent(this.extra.hpBonus);
  }

  get magunaDa() {
    return this.calcBonus(this.panelData.da.maguna, this.roboteBonus.maguna);
  }

  get normalDa() {
    return this.calcBonus(this.panelData.da.normal, this.roboteBonus.normal);
  }

  get exDa() {
    return this.calcBonus(this.panelData.da.ex, 0);
  }
  /**
   * 盘子上限 75 不包含职武
   */
  get da() {
    let coreDa = this.magunaDa + this.normalDa + this.exDa;
    coreDa = coreDa >= Limit.combo ? Limit.combo : coreDa;
    const da = coreDa + this.transferPercent(this.extra.da);
    return da >= 1 ? 1 : da;
  }

  get magunaTa() {
    return this.calcBonus(this.panelData.ta.maguna, this.roboteBonus.maguna);
  }

  get normalTa() {
    return this.calcBonus(this.panelData.ta.normal, this.roboteBonus.normal);
  }
  get exTa() {
    return this.calcBonus(this.panelData.ta.ex, 0);
  }
  /**
   * 盘子上限 75 不包含职武
   */
  get ta() {
    let coreTa = this.magunaTa + this.normalTa + this.exTa;
    coreTa = coreTa >= Limit.combo ? Limit.combo : coreTa;
    const ta = coreTa + this.transferPercent(this.extra.ta);
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
    return this.calcBonus(this.panelData.enmity.maguna, this.roboteBonus.maguna);
  }
  get normalEnmity() {
    return this.calcBonus(this.panelData.enmity.normal, this.roboteBonus.normal);
  }

  get exEnmity() {
    return this.calcBonus(this.panelData.enmity.ex, 0);
  }
  /** 综合背水 */
  get enmity() {
    return this.magunaEnmity + this.normalEnmity + this.exEnmity;
  }

  get magunaStamina() {
    return this.calcBonus(this.panelData.stamina.maguna, this.roboteBonus.maguna);
  }

  get normalStamina() {
    return this.calcBonus(this.panelData.stamina.normal, this.roboteBonus.normal);
  }
  get exStamina() {
    return this.calcBonus(this.panelData.stamina.ex, 0);
  }
  get stamina() {
    return this.magunaStamina + this.normalStamina + this.exStamina;
  }

  get magunaSkl() {
    return this.calcBonus(this.panelData.skillDamage.maguna, this.roboteBonus.maguna);
  }

  get mormalSkl() {
    return this.calcBonus(this.panelData.skillDamage.normal, this.roboteBonus.normal);
  }

  get exSkl() {
    return this.calcBonus(this.panelData.skillDamage.ex, 0);
  }

  get skill() {
    return this.magunaSkl + this.mormalSkl + this.exSkl + this.transferPercent(this.extra.skill);
  }

  get magunaUb() {
    return this.calcBonus(this.panelData.ub.maguna, this.roboteBonus.maguna);
  }
  get noramlUb() {
    return this.calcBonus(this.panelData.ub.normal, this.roboteBonus.normal);
  }

  get exUb() {
    return this.calcBonus(this.panelData.ub.ex, 0);
  }
  get ub() {
    return this.magunaUb + this.noramlUb + this.exUb + this.transferPercent(this.extra.ub);
  }
  /**老王 方阵 ex每个区间 上限为 0~50% */
  getUbLimit(ub: number) {
    return ub >= Limit.ubBonus ? Limit.ubBonus : ub;
  }

  get magunaUbLimit() {
    return this.getUbLimit(this.calcBonus(this.panelData.ubLimit.maguna, this.roboteBonus.maguna));
  }

  get noramlUbLimit() {
    return this.getUbLimit(this.calcBonus(this.panelData.ubLimit.normal, this.roboteBonus.normal));
  }

  get exUbLimit() {
    return this.getUbLimit(this.calcBonus(this.panelData.ubLimit.ex, 0));
  }

  get ubLimit() {
    return (
      this.magunaUbLimit +
      this.noramlUbLimit +
      this.exUbLimit +
      this.transferPercent(this.extra.ubLimit + this.extra.damageLimit)
    );
  }

  /** 老王 方阵 ex每个区间 上限为  skillLimit 0~50% */
  getSkillLimit(skill: number) {
    return skill >= Limit.sklBonus ? Limit.sklBonus : skill;
  }

  get magunaSklLimit() {
    return this.getSkillLimit(
      this.calcBonus(this.panelData.skillLimit.maguna, this.roboteBonus.maguna)
    );
  }
  get normalSklLimit() {
    return this.getSkillLimit(
      this.calcBonus(this.panelData.skillLimit.normal, this.roboteBonus.normal)
    );
  }
  get exSklLimit() {
    return this.getSkillLimit(this.calcBonus(this.panelData.skillLimit.ex, 0));
  }

  get skillLimit() {
    return (
      this.magunaSklLimit +
      this.normalSklLimit +
      this.exSklLimit +
      this.transferPercent(this.extra.sklLimit + this.extra.damageLimit)
    );
  }

  get magunaCri() {
    return this.calcBonus(this.panelData.critical.maguna, this.roboteBonus.maguna);
  }
  get normalCri() {
    return this.calcBonus(this.panelData.critical.normal, this.roboteBonus.normal);
  }

  get exCri() {
    return this.calcBonus(this.panelData.critical.ex, 0);
  }
  /** 暴击率 */
  get critical() {
    return this.magunaCri + this.normalCri + this.exCri + this.transferPercent(this.extra.cri);
  }

  get magunaCriticalDamageRatio() {
    return this.calcBonus(this.panelData.criticalDamageRatio.maguna, this.roboteBonus.maguna);
  }
  get normalCriticalDamageRatio() {
    return this.calcBonus(this.panelData.criticalDamageRatio.normal, this.roboteBonus.normal);
  }
  get exCriticalDamageRatio() {
    return this.calcBonus(this.panelData.criticalDamageRatio.ex, 0);
  }

  get criticalDamageRatio() {
    return (
      this.magunaCriticalDamageRatio +
      this.normalCriticalDamageRatio +
      this.exCriticalDamageRatio +
      this.transferPercent(this.extra.criDamageRadio)
    );
  }
  /** 基础10防御  由于浑身公式不明确 所以计算直接使用的面板数值*/
  get atkDamage() {
    return (
      ((this.panelData.pureAtk + this.extra.atk) *
        (1 + this.magunaAtk) *
        (1 + this.normalAtk) *
        (1 + this.exAtk) *
        (1 + this.attributeBonus) *
        (1 + this.transferPercent(this.extra.atkBuff)) *
        (1 + (this.enmity + this.transferPercent(this.extra.weaponEnmity)) * this.enmityWithHp) *
        (1 + (this.stamina + this.transferPercent(this.extra.weaponStamina)) * this.staminaWithHp) *
        (1 + this.transferPercent(this.extra.sklEnmity) * this.enmityWithHp) *
        (1 + this.transferPercent(this.extra.sklStamina) * this.staminaWithHp) *
        (1 + this.transferPercent(this.extra.damageBonus))) /
      this.extra.defense
    );
  }
  // HP白值
  get pureHp() {
    return this.panelData.pureHp + this.extra.hp;
  }

  transferPercent(value: number) {
    return value / 100;
  }

  get spLimit() {
    return this.transferPercent(this.extra.spLimit);
  }

  get atkLimit() {
    return this.transferPercent(this.extra.atkLimit + this.extra.damageLimit);
  }
}
