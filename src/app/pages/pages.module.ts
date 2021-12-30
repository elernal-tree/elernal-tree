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
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import { PlusOutline } from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] = [ PlusOutline ];

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
    DragDropModule,
    NzIconModule.forChild(icons)
  ]
})
export class PagesModule { }
