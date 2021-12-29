import { Component, Input, OnInit } from '@angular/core';
import { Core } from '@src/app/model/core';
import { WeaponItem } from '@src/app/model/weapon';
import { isNullOrUndefined } from '@src/app/util';


@Component({
  selector: 'app-weapon',
  templateUrl: './weapon.component.html',
  styleUrls: ['./weapon.component.scss']
})
export class WeaponComponent {

  // @Input() weaponList: WeaponItem[];
  weaponList: WeaponItem[] = new Array(10).fill({
    core: null,
    lv: 1,
    sLv: 1
  });


  mainRobot = null;
  mainRobotValue = 0;
  subRobot = null;
  subRobotValue = 0;
  robotOption = [{
    label: '属性',
    value: 1
  }, {
    label: '方阵',
    value: 2
  },]
  constructor() { }


  dragDroped(ev: any) {
    const data = ev.data;
    console.log(data, 'data', ev.index)
    if (isNullOrUndefined(data.index)) {
      this.weaponList[ev.index] = {
        core: data,
        lv: 1,
        sLv:1
      };
      console.log(this.weaponList)
    } else {
      if (this.weaponList[ev.index]) {
        this.weaponList[data.index] = this.weaponList[ev.index];
      }
      this.weaponList[ev.index] = data.data;
    }
    this.countResult();
  }


  countResult() {

  }

  countAttack() {

  }
}
