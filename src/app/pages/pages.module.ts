import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '@app/share';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { NgZorroModules } from './ng-zorro';
import { WeaponComponent } from './home/component/weapon/weapon.component';
import { ArsenalComponent } from './home/component/arsenal/arsenal.component';
import { WeaponItemComponent } from './home/component/weapon/weapon-item/weapon-item.component';
import { DataPanelComponent } from './home/component/weapon/data-panel/data-panel.component';



@NgModule({
  declarations: [
    HomeComponent,
    WeaponComponent,
    ArsenalComponent,
    WeaponItemComponent,
    DataPanelComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ShareModule,
    ...NgZorroModules,
    DragDropModule
  ]
})
export class PagesModule { }
