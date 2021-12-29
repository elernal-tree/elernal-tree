import { Component, Input, OnInit } from '@angular/core';
import { CoreElement, SkillSection, SklAttrType } from '@src/app/constants/enum';
import { Core, CoreStage, PaSkillFuncition, Skill } from '@src/app/model/core';
import { WeaponItem } from '@src/app/model/weapon';
import { isNullOrUndefined } from '@src/app/util';
import { Atk, Hp } from './model';


@Component({
  selector: 'app-weapon',
  templateUrl: './weapon.component.html',
  styleUrls: ['./weapon.component.scss']
})
export class WeaponComponent {

  weaponList: WeaponItem[] = new Array(10).fill({
    core: null,
    lv: 1,
    sLv: 0
  });


  panelData = {
    mainRobot: null,
    mainRobotElement: CoreElement.风,
    mainRobotValue: 0,
    subRobot: CoreElement.风,
    subRobotElement: null,
    subRobotValue: 0,
    atk: 0,
    hp: 0,
    da: 0,
    ta: 0,
    enmity: 0,
    stamina: 0,
    critical: 0,
    ub: 0,
    skillDamage: 0
  }

  constructor() { }


  dragDroped(ev: any) {
    const data = ev.data;
    if (isNullOrUndefined(data.index)) {
      this.weaponList[ev.index] = {
        core: data,
        lv: 1,
        sLv: 0
      };
    } else {
      if (this.weaponList[ev.index]) {
        this.weaponList[data.index] = this.weaponList[ev.index];
      }
      this.weaponList[ev.index] = data.data;
    }
    this.countResult();
  }


  countResult() {
    let [pureAtk, pureHp] = [0, 0];
    let [nDa, magunaDa, exDa] = [0, 0, 0];
    let [nTa, magunaTa, exTa] = [0, 0, 0];
    let atk: Atk = {
      n: 0,
      maguna: 0,
      ex: 0
    }
    let hp: Hp = {
      n: 0,
      maguna: 0,
      ex: 0
    }
    let [nEnmity, magunaEnmity, exEnmity] = [0, 0, 0];
    let [nStamina, magunaStamina, exStamina] = [0, 0, 0];
    let [nCritical, magunaCritical, exCritical] = [0, 0, 0];
    let [nUb, magunaUb, exUb] = [0, 0, 0];
    let [nSkill, magunaSkill, exSkill] = [0, 0, 0];
    let [nsSkillLimit, magunasSkillLimit, exsSkillLimit] = [0, 0, 0];
    this.weaponList.forEach(weapon => {
      if (weapon.core) {
        const core = weapon.core.data;
        const stage = core.coreStage[core.coreMaxstage];
        const skill1 = stage.skill1;
        const skill2 = stage.skill2;
        pureHp += core.coreMinHp + core.coreAddHp * (weapon.lv - 1);
        pureAtk += core.coreAddAtk + core.coreAddAtk * (weapon.lv - 1);
        const paSkillFuncition2 = stage.skill2?.paSkillFuncition ?? [];
        const paSkillFuncition = [...stage.skill1.paSkillFuncition, ...paSkillFuncition2]
        this.countAtk(atk, paSkillFuncition, weapon.sLv);
        this.countHp(hp, paSkillFuncition, weapon.sLv);
      }

    })
    console.log(atk, hp, pureAtk, pureHp)

    this.countDa()
    this.countTa()
    this.countCritical()
  }
  /**
   * 1 + (加成) * 回响
   */
  countAtk(atk: Atk, paSkillFuncition: PaSkillFuncition[], sklLv: number) {
    paSkillFuncition.forEach(skillfn => {
      const sklVal = skillfn.paValue[sklLv];
      if (skillfn.paramType === SklAttrType.atk) {
        if (skillfn.section === SkillSection.maguna) {
          atk.maguna += sklVal;
        } else if (skillfn.section === SkillSection.normal) {
          atk.n += sklVal
        } else if (skillfn.section === SkillSection.ex) {
          atk.ex += sklVal;
        }
      }
    })
  }

  countHp(hp: Hp, paSkillFuncition: PaSkillFuncition[], sklLv: number) {
    paSkillFuncition.forEach(skillfn => {
      const sklVal = skillfn.paValue[sklLv];
      if (skillfn.paramType === SklAttrType.hp) {
        if (skillfn.section === SkillSection.maguna) {
          hp.maguna += sklVal;
        } else if (skillfn.section === SkillSection.normal) {
          hp.n += sklVal
        } else if (skillfn.section === SkillSection.ex) {
          hp.ex += sklVal;
        }
      }
    })
  }

  countEnmity() {

  }
  countStamina() {

  }


  countDa() {

  }
  countTa() {

  }
  countCritical() {

  }

}
