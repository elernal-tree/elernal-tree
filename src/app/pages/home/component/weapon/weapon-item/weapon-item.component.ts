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

  @Output() dataChange = new EventEmitter<void>();

  sLvOption = [{ label: 1, value: 0 }, { label: 2, value: 1 }, { label: 3, value: 2 }, { label: 4, value: 3 }];
  exLvOption = new Array(60).fill(0).map((_, index) => ({label: index + 1, value: index}));
  constructor() { }

  dragDroped(event: any) {
    this.droped.emit({
      data: event.data,
      index: this.index
    });
  }

  onDataChange() {
    this.dataChange.emit();
  }

  onDeleteCore() {
    // this.deleteCore.emit()
    this.weapon.core = null;
    this.onDataChange();
  }
}
