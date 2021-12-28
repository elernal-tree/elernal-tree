import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '@app/share';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { NgZorroModules } from './ng-zorro';
import { WeaponComponent } from './home/component/weapon/weapon.component';
import { ArsenalComponent } from './home/component/arsenal/arsenal.component';



@NgModule({
  declarations: [
    HomeComponent,
    WeaponComponent,
    ArsenalComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ShareModule,
    ...NgZorroModules
  ]
})
export class PagesModule { }
