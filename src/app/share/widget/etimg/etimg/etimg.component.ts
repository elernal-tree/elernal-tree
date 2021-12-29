import { Component, OnInit, Input } from '@angular/core';
import { Core, Skill } from '@src/app/model/core';

const ImgUrl = `https://cdn.jsdelivr.net/gh/elernal-tree/elernal-tree@master/static/image/core/{id}.png`;
const Rarity = ['','R', 'SR', 'SSR']

@Component({
  selector: 'app-etimg',
  templateUrl: './etimg.component.html',
  styleUrls: ['./etimg.component.scss']
})
export class EtimgComponent {
  _core: Core;
  imgSrc = '';
  rarity = 'R';
  skill1: Skill;
  skill2?: Skill;
  @Input()
  set core(value) {
    this._core = value;
    this.imgSrc = ImgUrl.replace('{id}', `${this.core.id}`);
    this.rarity = Rarity[value.data.coreRarity] ?? 'R';
    const skillData = value.data.coreStage[value.data.coreMaxstage]; 
    this.skill1 = skillData.skill1;
    this.skill1.cnDescription = this.skill1.cnDescription.replace(/&%/ig, '');
    if (skillData.skill2) {
      this.skill2 = skillData.skill2;
      this.skill2.cnDescription = this.skill2.cnDescription?.replace(/&%/ig, '');
    }
  }

  get core() {
    return this._core;
  }

  @Input() showTip = true;
  constructor() { }



}
