import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CdragDirective} from './cdrag.directive'
import { DragDropBoxDirective} from './drag-drop-box.directive';



@NgModule({
  declarations: [CdragDirective, DragDropBoxDirective],
  imports: [
    CommonModule
  ],
  exports: [
    CdragDirective,
    DragDropBoxDirective
  ]
})
export class DargDropModule { }
