import { Component, OnInit, Input } from '@angular/core';
import { Core, Skill } from '@src/app/model/core';
import {environment } from '@src/environments/environment'

// const ImgUrl = `https://cdn.jsdelivr.net/gh/elernal-tree/elernal-tree@master/static/image/core/{id}.png`;

const Rarity = ['', 'R', 'SR', 'SSR'];

@Component({
  selector: 'app-etimg',
  templateUrl: './etimg.component.html',
  styleUrls: ['./etimg.component.scss'],
})
export class EtimgComponent {
  _core: Core;
  imgSrc = '';
  rarity = 'R';
  skill1: Skill;
  skill2?: Skill;
  coreName = '';
  @Input()
  set core(value) {
    this._core = value;
    this.setImgSrc();
    this.setRarity();
    this.setSkill();
    this.setName();
  }

  get core() {
    return this._core;
  }

  @Input() showTip = true;
  constructor() {}

  setImgSrc() {
    this.imgSrc = environment.ImgUrl.replace('{id}', `${this.core.id}`);
  }

  setRarity() {
    this.rarity = Rarity[this.core.data.coreRarity] ?? 'R';
  }

  setSkill() {
    const value = this.core;
    const skillData = value.data.coreStage[value.data.coreMaxstage];
    this.skill1 = skillData.skill1;
    this.skill1.paSkillFuncition.forEach((r) => {
      this.skill1.cnDescription = this.skill1.cnDescription.replace(
        /&/,
        r.paValue
          .slice(0, value.data.coreMaxSklv)
          .map((v) => +v.toFixed(1))
          .join('/')
      );
    });

    if (skillData.skill2) {
      this.skill2 = skillData.skill2;
      this.skill2.paSkillFuncition.forEach((r) => {
        this.skill2.cnDescription = this.skill2.cnDescription.replace(
          /&/,
          r.paValue
            .slice(0, value.data.coreMaxSklv)
            .map((v) => +v.toFixed(1))
            .join('/')
        );
      });
    }
  }

  setName() {
    let label = this.core.data.name;
    this.coreName = label;
  }
}
