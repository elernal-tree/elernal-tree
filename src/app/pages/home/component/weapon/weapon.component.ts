import { Component, Input, OnInit } from '@angular/core';
import { CoreElement, Robot, SkillSection, SklAttrType } from '@src/app/constants/enum';
import { Core, CoreStage, PaSkillFuncition, Skill } from '@src/app/model/core';
import { WeaponItem } from '@src/app/model/weapon';
import { isNullOrUndefined } from '@src/app/util';
import { PanelData, Section } from './model';

@Component({
  selector: 'app-weapon',
  templateUrl: './weapon.component.html',
  styleUrls: ['./weapon.component.scss'],
})
export class WeaponComponent {
  weaponList: WeaponItem[] = new Array(10).fill({
    core: null,
    lv: 60,
    sLv: 3,
  });

  panelData: PanelData = {
    element: CoreElement.风,
    mainRobot: Robot.maguna,
    mainRobotValue: 0,
    subRobot: Robot.attribute,
    subRobotValue: 0,
    pureAtk: 0,
    pureHp: 0,
    atk: {
      normal: 0,
      ex: 0,
      maguna: 0,
    },
    hp: {
      normal: 0,
      ex: 0,
      maguna: 0,
    },
    da: {
      normal: 0,
      ex: 0,
      maguna: 0,
    },
    ta: {
      normal: 0,
      ex: 0,
      maguna: 0,
    },
    enmity: {
      normal: 0,
      ex: 0,
      maguna: 0,
    },
    stamina: {
      normal: 0,
      ex: 0,
      maguna: 0,
    },
    critical: {
      normal: 0,
      ex: 0,
      maguna: 0,
    },
    criticalDamageRatio: {
      normal: 0,
      ex: 0,
      maguna: 0,
    },
    ub: {
      normal: 0,
      ex: 0,
      maguna: 0,
    },
    ubLimit: {
      normal: 0,
      ex: 0,
      maguna: 0,
    },
    skillDamage: {
      normal: 0,
      ex: 0,
      maguna: 0,
    },
    skillLimit: {
      normal: 0,
      ex: 0,
      maguna: 0,
    },
  };

  constructor() {}

  dragDroped(ev: any) {
    const data = ev.data;
    if (isNullOrUndefined(data.index)) {
      this.weaponList[ev.index] = {
        core: data,
        lv: 60,
        sLv: 3,
      };
    } else {
      if (this.weaponList[ev.index].core) {
        this.weaponList[data.index] = this.weaponList[ev.index];
      }
      this.weaponList[ev.index] = data.data;
    }
    this.countResult();
  }

  countResult() {
    let [pureAtk, pureHp] = [0, 0];
    const atk: Section = {
      normal: 0,
      maguna: 0,
      ex: 0,
    };
    const hp: Section = {
      normal: 0,
      maguna: 0,
      ex: 0,
    };
    const da: Section = {
      normal: 0,
      maguna: 0,
      ex: 0,
    };
    const ta: Section = {
      normal: 0,
      maguna: 0,
      ex: 0,
    };
    const enmity: Section = {
      normal: 0,
      maguna: 0,
      ex: 0,
    };
    const stamina: Section = {
      normal: 0,
      maguna: 0,
      ex: 0,
    };
    const critical: Section = {
      normal: 0,
      maguna: 0,
      ex: 0,
    };
    const ub: Section = {
      normal: 0,
      maguna: 0,
      ex: 0,
    };
    const skill: Section = {
      normal: 0,
      maguna: 0,
      ex: 0,
    };
    const skillLimit: Section = {
      normal: 0,
      maguna: 0,
      ex: 0,
    };
    this.weaponList.forEach((weapon) => {
      if (weapon.core) {
        const core = weapon.core.data;
        const stage = core.coreStage[core.coreMaxstage];
        pureHp += core.coreMinHp + core.coreAddHp * (weapon.lv - 1);
        pureAtk += core.coreMinAtk + core.coreAddAtk * (weapon.lv - 1);
        const paSkillFuncition2 = stage.skill2?.paSkillFuncition ?? [];
        const paSkillFuncition = [...stage.skill1.paSkillFuncition, ...paSkillFuncition2];
        paSkillFuncition.forEach((skillfn) => {
          if (this.canCountWithElement(skillfn.element)) {
            this.countAtk(atk, skillfn, weapon.sLv);
            this.countHp(hp, skillfn, weapon.sLv);
            this.countDa(da, skillfn, weapon.sLv);
            this.countTa(ta, skillfn, weapon.sLv);
            this.countEnmity(enmity, skillfn, weapon.sLv);
            this.countCritical(critical, skillfn, weapon.sLv);
            this.countStamina(stamina, skillfn, weapon.sLv);
            this.countUb(ub, skillfn, weapon.sLv);
            this.countSkill(skill, skillfn, weapon.sLv);
            this.countSkillLimit(skillLimit, skillfn, weapon.sLv);
          }
        });
      }
    });
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
    this.panelData.skillLimit = skillLimit;
  }

  /**
   * 1 + (加成) * 回响
   */
  countAtk(atk: Section, skillfn: PaSkillFuncition, sklLv: number) {
    if (this.canCountWithElement(skillfn.element)) {
      if (skillfn.paramType === SklAttrType.atk) {
        const sklVal = skillfn.paValue[sklLv];
        if (skillfn.section === SkillSection.maguna) {
          atk.maguna += sklVal;
        } else if (skillfn.section === SkillSection.normal) {
          atk.normal += sklVal;
        } else if (skillfn.section === SkillSection.ex) {
          atk.ex += sklVal;
        }
      }
    }
  }

  countHp(hp: Section, skillfn: PaSkillFuncition, sklLv: number) {
    if (this.canCountWithElement(skillfn.element)) {
      if (skillfn.paramType === SklAttrType.hp) {
        const sklVal = skillfn.paValue[sklLv];
        if (skillfn.section === SkillSection.maguna) {
          hp.maguna += sklVal;
        } else if (skillfn.section === SkillSection.normal) {
          hp.normal += sklVal;
        } else if (skillfn.section === SkillSection.ex) {
          hp.ex += sklVal;
        }
      }
    }
  }

  countEnmity(enmity: Section, skillfn: PaSkillFuncition, sklLv: number) {
    if (this.canCountWithElement(skillfn.element)) {
      if (skillfn.paramType === SklAttrType.enmity) {
        const sklVal = skillfn.paValue[sklLv];
        if (skillfn.section === SkillSection.maguna) {
          enmity.maguna += sklVal;
        } else if (skillfn.section === SkillSection.normal) {
          enmity.normal += sklVal;
        } else if (skillfn.section === SkillSection.ex) {
          enmity.ex += sklVal;
        }
      }
    }
  }
  countStamina(stamina: Section, skillfn: PaSkillFuncition, sklLv: number) {
    if (this.canCountWithElement(skillfn.element)) {
      if (skillfn.paramType === SklAttrType.stamina) {
        const sklVal = skillfn.paValue[sklLv];
        if (skillfn.section === SkillSection.maguna) {
          stamina.maguna += sklVal;
        } else if (skillfn.section === SkillSection.normal) {
          stamina.normal += sklVal;
        } else if (skillfn.section === SkillSection.ex) {
          stamina.ex += sklVal;
        }
      }
    }
  }

  countDa(da: Section, skillfn: PaSkillFuncition, sklLv: number) {
    if (this.canCountWithElement(skillfn.element)) {
      if (skillfn.paramType === SklAttrType.da) {
        const sklVal = skillfn.paValue[sklLv];
        if (skillfn.section === SkillSection.maguna) {
          da.maguna += sklVal;
        } else if (skillfn.section === SkillSection.normal) {
          da.normal += sklVal;
        } else if (skillfn.section === SkillSection.ex) {
          da.ex += sklVal;
        }
      }
    }
  }
  countTa(ta: Section, skillfn: PaSkillFuncition, sklLv: number) {
    if (this.canCountWithElement(skillfn.element)) {
      if (skillfn.paramType === SklAttrType.ta) {
        const sklVal = skillfn.paValue[sklLv];
        if (skillfn.section === SkillSection.maguna) {
          ta.maguna += sklVal;
        } else if (skillfn.section === SkillSection.normal) {
          ta.normal += sklVal;
        } else if (skillfn.section === SkillSection.ex) {
          ta.ex += sklVal;
        }
      }
    }
  }
  countCritical(critical: Section, skillfn: PaSkillFuncition, sklLv: number) {
    if (this.canCountWithElement(skillfn.element)) {
      if (skillfn.paramType === SklAttrType.critical) {
        const sklVal = skillfn.paValue[sklLv];
        if (skillfn.section === SkillSection.maguna) {
          critical.maguna += sklVal;
        } else if (skillfn.section === SkillSection.normal) {
          critical.normal += sklVal;
        } else if (skillfn.section === SkillSection.ex) {
          critical.ex += sklVal;
        }
      }
    }
  }
  countUb(ub: Section, skillfn: PaSkillFuncition, sklLv: number) {
    if (this.canCountWithElement(skillfn.element)) {
      if (skillfn.paramType === SklAttrType.ub) {
        const sklVal = skillfn.paValue[sklLv];
        if (skillfn.section === SkillSection.maguna) {
          ub.maguna += sklVal;
        } else if (skillfn.section === SkillSection.normal) {
          ub.normal += sklVal;
        } else if (skillfn.section === SkillSection.ex) {
          ub.ex += sklVal;
        }
      }
    }
  }
  countSkill(skill: Section, skillfn: PaSkillFuncition, sklLv: number) {
    if (this.canCountWithElement(skillfn.element)) {
      if (skillfn.paramType === SklAttrType.skill) {
        const sklVal = skillfn.paValue[sklLv];
        if (skillfn.section === SkillSection.maguna) {
          skill.maguna += sklVal;
        } else if (skillfn.section === SkillSection.normal) {
          skill.normal += sklVal;
        } else if (skillfn.section === SkillSection.ex) {
          skill.ex += sklVal;
        }
      }
    }
  }
  countSkillLimit(skillLimit: Section, skillfn: PaSkillFuncition, sklLv: number) {
    if (this.canCountWithElement(skillfn.element)) {
      if (skillfn.paramType === SklAttrType.skillLimit) {
        const sklVal = skillfn.paValue[sklLv];
        if (skillfn.section === SkillSection.maguna) {
          skillLimit.maguna += sklVal;
        } else if (skillfn.section === SkillSection.normal) {
          skillLimit.normal += sklVal;
        } else if (skillfn.section === SkillSection.ex) {
          skillLimit.ex += sklVal;
        }
      }
    }
  }
  /** elemnt为0或者无，为全属性加成,列如格拉拉. */
  canCountWithElement(element?: number) {
    return !element || this.panelData.element === element;
  }
}
