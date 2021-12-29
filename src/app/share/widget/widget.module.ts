import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubBtnModule } from './github-btn/github-btn.module'
import { EtimgModule } from './etimg/etimg.module'


@NgModule({
  declarations: [
  ],
  imports: [CommonModule],
  exports: [GithubBtnModule, EtimgModule],
})
export class WidgetModule {}
