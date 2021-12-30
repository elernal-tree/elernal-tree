import { Component, Input, OnInit } from '@angular/core';
import { CoreElement, Robot, SkillSection, SklAttrType } from '@src/app/constants/enum';
import { Core, CoreStage, PaSkillFuncition, Skill } from '@src/app/model/core';
import { WeaponItem } from '@src/app/model/weapon';
import { isNullOrUndefined } from '@src/app/util';
import { PanelData, Section } from './model';


@Component({
  selector: 'app-weapon',
  templateUrl: './weapon.component.html',
  styleUrls: ['./weapon.component.scss']
})
export class WeaponComponent {

  weaponList: WeaponItem[] = new Array(10).fill({
    core: null,
    lv: 60,
    sLv: 3
  });


  panelData: PanelData = {
    element: CoreElement.风,
    mainRobot: Robot.maguna,
    mainRobotValue: 0,
    subRobot: Robot.property,
    subRobotValue: 0,
    pureAtk: 0,
    pureHp: 0,
    atk: {
      normal: 0,
      ex: 0,
      maguna: 0
    },
    hp: {
      normal: 0,
      ex: 0,
      maguna: 0
    },
    da: {
      normal: 0,
      ex: 0,
      maguna: 0
    },
    ta: {
      normal: 0,
      ex: 0,
      maguna: 0
    },
    enmity: {
      normal: 0,
      ex: 0,
      maguna: 0
    },
    stamina: {
      normal: 0,
      ex: 0,
      maguna: 0
    },
    critical: {
      normal: 0,
      ex: 0,
      maguna: 0
    },
    ub: {
      normal: 0,
      ex: 0,
      maguna: 0
    },
    ubLimit: {
      normal: 0,
      ex: 0,
      maguna: 0
    },
    skillDamage: {
      normal: 0,
      ex: 0,
      maguna: 0
    },
    skillLimit: {
      normal: 0,
      ex: 0,
      maguna: 0
    },
  }

  constructor() { }


  dragDroped(ev: any) {
    const data = ev.data;
    if (isNullOrUndefined(data.index)) {
      this.weaponList[ev.index] = {
        core: data,
        lv: 60,
        sLv: 3
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
    console.log('cout', this.panelData.element)
    let [pureAtk, pureHp] = [0, 0];
    const atk: Section = {
      normal: 0,
      maguna: 0,
      ex: 0
    }
    const hp: Section = {
      normal: 0,
      maguna: 0,
      ex: 0
    }
    const da: Section = {
      normal: 0,
      maguna: 0,
      ex: 0
    }
    const ta: Section = {
      normal: 0,
      maguna: 0,
      ex: 0
    }
    const enmity: Section = {
      normal: 0,
      maguna: 0,
      ex: 0
    }
    const stamina: Section = {
      normal: 0,
      maguna: 0,
      ex: 0
    }
    const critical: Section = {
      normal: 0,
      maguna: 0,
      ex: 0
    }
    const ub: Section = {
      normal: 0,
      maguna: 0,
      ex: 0
    }
    const skill: Section = {
      normal: 0,
      maguna: 0,
      ex: 0
    }
    const skillLimit: Section = {
      normal: 0,
      maguna: 0,
      ex: 0
    }
    this.weaponList.forEach(weapon => {
      if (weapon.core) {
        const core = weapon.core.data;
        const stage = core.coreStage[core.coreMaxstage];
        pureHp += core.coreMinHp + core.coreAddHp * (weapon.lv - 1);
        pureAtk += core.coreAddAtk + core.coreAddAtk * (weapon.lv - 1);
        const paSkillFuncition2 = stage.skill2?.paSkillFuncition ?? [];
        const paSkillFuncition = [...stage.skill1.paSkillFuncition, ...paSkillFuncition2]
        if (core.coreElement === this.panelData.element) {
          this.countAtk(atk, paSkillFuncition, weapon.sLv);
          this.countHp(hp, paSkillFuncition, weapon.sLv);
          this.countDa(da, paSkillFuncition, weapon.sLv)
          this.countTa(ta, paSkillFuncition, weapon.sLv)
          this.countEnmity(enmity, paSkillFuncition, weapon.sLv);
          this.countCritical(critical, paSkillFuncition, weapon.sLv);
          this.countStamina(stamina, paSkillFuncition, weapon.sLv);
          this.countUb(ub, paSkillFuncition, weapon.sLv);
          this.countSkill(skill, paSkillFuncition, weapon.sLv);
        }
      }
    })
    this.panelData.pureAtk = pureAtk;
    this.panelData.pureHp = pureHp;
    this.panelData.atk = atk;
    this.panelData.hp = hp;
    this.panelData.enmity = enmity;
    this.panelData.stamina = stamina;
    this.panelData.da = da;
    this.panelData.ta = ta;
    this.panelData.critical = critical;
    this.panelData.ub = ub;
    this.panelData.skillDamage = skill;
  }

  /**
   * 1 + (加成) * 回响
   */
  countAtk(atk: Section, paSkillFuncition: PaSkillFuncition[], sklLv: number) {
    paSkillFuncition.forEach(skillfn => {
      const sklVal = skillfn.paValue[sklLv];
      if (skillfn.paramType === SklAttrType.atk) {
        if (skillfn.section === SkillSection.maguna) {
          atk.maguna += sklVal;
        } else if (skillfn.section === SkillSection.normal) {
          atk.normal += sklVal
        } else if (skillfn.section === SkillSection.ex) {
          atk.ex += sklVal;
        }
      }
    })
    
  }

  countHp(hp: Section, paSkillFuncition: PaSkillFuncition[], sklLv: number) {
    paSkillFuncition.forEach(skillfn => {
      const sklVal = skillfn.paValue[sklLv];
      if (skillfn.paramType === SklAttrType.hp) {
        if (skillfn.section === SkillSection.maguna) {
          hp.maguna += sklVal;
        } else if (skillfn.section === SkillSection.normal) {
          hp.normal += sklVal
        } else if (skillfn.section === SkillSection.ex) {
          hp.ex += sklVal;
        }
      }
    })
  
  }

  countEnmity(enmity: Section, paSkillFuncition: PaSkillFuncition[], sklLv: number) {
    paSkillFuncition.forEach(skillfn => {
      const sklVal = skillfn.paValue[sklLv];
      if (skillfn.paramType === SklAttrType.enmity) {
        if (skillfn.section === SkillSection.maguna) {
          enmity.maguna += sklVal;
        } else if (skillfn.section === SkillSection.normal) {
          enmity.normal += sklVal
        } else if (skillfn.section === SkillSection.ex) {
          enmity.ex += sklVal;
        }
      }
    })
  
  }
  countStamina(stamina: Section, paSkillFuncition: PaSkillFuncition[], sklLv: number) {
    paSkillFuncition.forEach(skillfn => {
      const sklVal = skillfn.paValue[sklLv];
      if (skillfn.paramType === SklAttrType.stamina) {
        if (skillfn.section === SkillSection.maguna) {
          stamina.maguna += sklVal;
        } else if (skillfn.section === SkillSection.normal) {
          stamina.normal += sklVal
        } else if (skillfn.section === SkillSection.ex) {
          stamina.ex += sklVal;
        }
      }
    })
   
  }


  countDa(da: Section, paSkillFuncition: PaSkillFuncition[], sklLv: number) {
    paSkillFuncition.forEach(skillfn => {
      const sklVal = skillfn.paValue[sklLv];
      if (skillfn.paramType === SklAttrType.da) {
        if (skillfn.section === SkillSection.maguna) {
          da.maguna += sklVal;
        } else if (skillfn.section === SkillSection.normal) {
          da.normal += sklVal
        } else if (skillfn.section === SkillSection.ex) {
          da.ex += sklVal;
        }
      }
    })
   
  }
  countTa(ta: Section, paSkillFuncition: PaSkillFuncition[], sklLv: number) {
    paSkillFuncition.forEach(skillfn => {
      const sklVal = skillfn.paValue[sklLv];
      if (skillfn.paramType === SklAttrType.ta) {
        if (skillfn.section === SkillSection.maguna) {
          ta.maguna += sklVal;
        } else if (skillfn.section === SkillSection.normal) {
          ta.normal += sklVal
        } else if (skillfn.section === SkillSection.ex) {
          ta.ex += sklVal;
        }
      }
    })
   
  }
  countCritical(critical: Section, paSkillFuncition: PaSkillFuncition[], sklLv: number) {
    paSkillFuncition.forEach(skillfn => {
      const sklVal = skillfn.paValue[sklLv];
      if (skillfn.paramType === SklAttrType.critical) {
        if (skillfn.section === SkillSection.maguna) {
          critical.maguna += sklVal;
        } else if (skillfn.section === SkillSection.normal) {
          critical.normal += sklVal
        } else if (skillfn.section === SkillSection.ex) {
          critical.ex += sklVal;
        }
      }
    })
    
  }
  countUb(ub: Section, paSkillFuncition: PaSkillFuncition[], sklLv: number) {
    paSkillFuncition.forEach(skillfn => {
      const sklVal = skillfn.paValue[sklLv];
      if (skillfn.paramType === SklAttrType.ub) {
        if (skillfn.section === SkillSection.maguna) {
          ub.maguna += sklVal;
        } else if (skillfn.section === SkillSection.normal) {
          ub.normal += sklVal
        } else if (skillfn.section === SkillSection.ex) {
          ub.ex += sklVal;
        }
      }
    })
    
  }
  countSkill(skill: Section, paSkillFuncition: PaSkillFuncition[], sklLv: number) {
    paSkillFuncition.forEach(skillfn => {
      const sklVal = skillfn.paValue[sklLv];
      if (skillfn.paramType === SklAttrType.skill) {
        if (skillfn.section === SkillSection.maguna) {
          skill.maguna += sklVal;
        } else if (skillfn.section === SkillSection.normal) {
          skill.normal += sklVal
        } else if (skillfn.section === SkillSection.ex) {
          skill.ex += sklVal;
        }
      }
    })
    
  }

}
