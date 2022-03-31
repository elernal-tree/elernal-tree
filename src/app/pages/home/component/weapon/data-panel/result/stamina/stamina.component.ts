import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stamina',
  templateUrl: './stamina.component.html',
  styleUrls: ['./stamina.component.scss'],
})
export class StaminaComponent {
  @Input() magunaStamina: number;
  @Input() normalStamina: number;
  @Input() exStamina: number;
  @Input() weaponStamina: number;
  @Input() sklStamina: number;

  constructor() {}
}
