import { Component, Input, OnInit } from '@angular/core';
import { ExtraInfo } from '../../model';

@Component({
  selector: 'app-extra-info',
  templateUrl: './extra-info.component.html',
  styleUrls: ['./extra-info.component.scss']
})
export class ExtraInfoComponent  {
  @Input() extra: ExtraInfo;
  constructor() { }



}
