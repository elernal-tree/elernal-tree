import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent  {
  nzWidthConfig = new Array(4).fill('25%');

  @Input() atk: number;
  @Input() hp: number;
  @Input() da: number;
  @Input() ta: number;
  @Input() enmity: number;
  @Input() stamina: number;
  @Input() critical: number;
  @Input() criticalDamageRatio: number;
  @Input() skill: number;
  @Input() skillLimit: number;
  @Input() ub: number;
  @Input() ubLimit: number;
  
  constructor() { }


  fixed(num: number) {
    return (num * 100).toFixed(2);
  }


}
