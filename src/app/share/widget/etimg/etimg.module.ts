import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EtimgComponent } from './etimg/etimg.component';
import { NzPopoverModule } from 'ng-zorro-antd/popover'



@NgModule({
  declarations: [
    EtimgComponent
  ],
  imports: [
    CommonModule,
    NzPopoverModule
  ],
  exports: [EtimgComponent]
})
export class EtimgModule { }
