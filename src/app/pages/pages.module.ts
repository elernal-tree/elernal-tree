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
import { ResultComponent } from './home/component/weapon/data-panel/result/result.component';
import { ExtraInfoComponent } from './home/component/weapon/data-panel/extra-info/extra-info.component';
import { EnmityComponent } from './home/component/weapon/data-panel/result/enmity/enmity.component';
import { StaminaComponent } from './home/component/weapon/data-panel/result/stamina/stamina.component';
import { AboutComponent } from './about/about.component';
import { AtkComponent } from './home/component/weapon/data-panel/result/atk/atk.component';
import { SklUbComponent } from './home/component/weapon/data-panel/skl-ub/skl-ub.component';
import { ComboCriticalComponent } from './home/component/weapon/data-panel/combo-critical/combo-critical.component';
import { SimulationComponent } from './simulation/simulation.component';

const icons: IconDefinition[] = [ PlusOutline ];

@NgModule({
  declarations: [
    HomeComponent,
    WeaponComponent,
    ArsenalComponent,
    WeaponItemComponent,
    DataPanelComponent,
    ResultComponent,
    ExtraInfoComponent,
    EnmityComponent,
    StaminaComponent,
    AboutComponent,
    AtkComponent,
    SklUbComponent,
    ComboCriticalComponent,
    SimulationComponent
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
