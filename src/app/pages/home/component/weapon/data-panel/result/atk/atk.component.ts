import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-atk',
  templateUrl: './atk.component.html',
  styleUrls: ['./atk.component.scss'],
})
export class AtkComponent {
  constructor() {}

  @Input() magunaAtk: number;
  @Input() normalAtk: number;
  @Input() exAtk: number;
}
