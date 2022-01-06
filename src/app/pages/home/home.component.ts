import { Component, OnInit } from '@angular/core';
import { Core } from '@src/app/model/core';
import { WeaponItem } from '@src/app/model/weapon';
import { RouteKeep } from '@app/core/router-config/route-keep'



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements RouteKeep {

 
  constructor() { }
  NG_ROUTE_KEEP: boolean = true;


}
