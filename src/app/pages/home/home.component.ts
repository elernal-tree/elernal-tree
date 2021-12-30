import { Component, OnInit } from '@angular/core';
import { Core } from '@src/app/model/core';
import { WeaponItem } from '@src/app/model/weapon';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

 
  constructor() { }

  ngOnInit(): void {
    // / 
    // console.log(this.weaponList)
  }

}
