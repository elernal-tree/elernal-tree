import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-enmity',
  templateUrl: './enmity.component.html',
  styleUrls: ['./enmity.component.scss']
})
export class EnmityComponent  {

  @Input() magunaEnmity: number;
  @Input() normalEnmity: number;
  @Input() exEnmity: number;
  @Input() weaponEnmity: number;
  @Input() sklEnmity: number;

  constructor() { }


}
