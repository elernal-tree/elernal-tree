import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FixedPipe } from './fixed.pipe';



@NgModule({
  declarations: [
    FixedPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FixedPipe
  ]
})
export class PipeModule { }
