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
export class DataPanelComponent  {
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

  @Input() panelData: PanelData;

  @Output() dataChange = new EventEmitter<void>()

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

  get atk() {
    return this.fixed(
      this.calcAtkBonus(this.panelData.atk.maguna, this.roboteBonus.maguna) *
        this.calcAtkBonus(this.panelData.atk.normal, this.roboteBonus.normal) *
        this.calcAtkBonus(this.panelData.atk.ex, 0) *
        this.propertyBonus -
        1
    );
  }

  get hp() {
    return this.fixed(
      this.calcOtherBonus(this.panelData.hp.maguna, this.roboteBonus.maguna) +
        this.calcOtherBonus(this.panelData.hp.normal, this.roboteBonus.normal) +
        this.calcOtherBonus(this.panelData.hp.ex, 0)
    );
  }

  get da() {
    return this.fixed(
      this.calcOtherBonus(this.panelData.da.maguna, this.roboteBonus.maguna) +
        this.calcOtherBonus(this.panelData.da.normal, this.roboteBonus.normal) +
        this.calcOtherBonus(this.panelData.da.ex, 0)
    );
  }

  get ta() {
    return this.fixed(
      this.calcOtherBonus(this.panelData.ta.maguna, this.roboteBonus.maguna) +
        this.calcOtherBonus(this.panelData.ta.normal, this.roboteBonus.normal) +
        this.calcOtherBonus(this.panelData.ta.ex, 0)
    );
  }
  get enmity() {
    return this.fixed(
      this.calcOtherBonus(this.panelData.enmity.maguna, this.roboteBonus.maguna) +
        this.calcOtherBonus(this.panelData.enmity.normal, this.roboteBonus.normal) +
        this.calcOtherBonus(this.panelData.enmity.ex, 0)
    );
  }
  get stamina() {
    return this.fixed(
      this.calcOtherBonus(this.panelData.stamina.maguna, this.roboteBonus.maguna) +
        this.calcOtherBonus(this.panelData.stamina.normal, this.roboteBonus.normal) +
        this.calcOtherBonus(this.panelData.stamina.ex, 0)
    );
  }
  get skill() {
    return this.fixed(
      this.calcOtherBonus(this.panelData.skillDamage.maguna, this.roboteBonus.maguna) +
        this.calcOtherBonus(this.panelData.skillDamage.normal, this.roboteBonus.normal) +
        this.calcOtherBonus(this.panelData.skillDamage.ex, 0)
    );
  }
  get ub() {
    return this.fixed(
      this.calcOtherBonus(this.panelData.ub.maguna, this.roboteBonus.maguna) +
        this.calcOtherBonus(this.panelData.ub.normal, this.roboteBonus.normal) +
        this.calcOtherBonus(this.panelData.ub.ex, 0)
    );
  }
}
