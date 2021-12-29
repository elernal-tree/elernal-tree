import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickStopModule } from './click-stop/click-stop.module';
import { ContextmuneModule } from './contextmenu/contextmenu.module';
import { DargDropModule } from './darg-drop/darg-drop.module';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [ClickStopModule, ContextmuneModule, DargDropModule],
})
export class DirectivesModule {}
