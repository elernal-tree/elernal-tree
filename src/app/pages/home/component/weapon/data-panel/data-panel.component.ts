import { Component, Input, OnInit } from '@angular/core';
import { CoreOption } from '@src/app/constants/contants';

@Component({
  selector: 'app-data-panel',
  templateUrl: './data-panel.component.html',
  styleUrls: ['./data-panel.component.scss']
})
export class DataPanelComponent  {
  robotOption = [{
    label: '属性',
    value: 1
  }, {
    label: '方阵',
    value: 2
  },]
  

  coreOption = CoreOption;

  @Input() panelData: any;
  constructor() { }



}
