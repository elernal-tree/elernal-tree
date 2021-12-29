import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WeaponItem } from '@src/app/model/weapon';

@Component({
  selector: 'app-weapon-item',
  templateUrl: './weapon-item.component.html',
  styleUrls: ['./weapon-item.component.scss']
})
export class WeaponItemComponent {

  @Input() weapon: WeaponItem;
  @Input() index: number;
  @Output('dragDroped') droped =
    new EventEmitter<{
      index: number,
      data: any
    }>()

  sLvOption = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }]
  constructor() { }

  dragDroped(event: any) {
    this.droped.emit({
      data: event.data,
      index: this.index
    });
  }
}
