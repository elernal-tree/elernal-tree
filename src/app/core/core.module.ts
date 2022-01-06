import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CacheReuseStrategy } from './router-config/cacheReuseStrategy';
import { RouteReuseStrategy } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: CacheReuseStrategy },
  ]
})
export class CoreModule { }
