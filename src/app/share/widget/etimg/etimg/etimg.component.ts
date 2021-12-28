import { Component, OnInit, Input } from '@angular/core';
import { Core } from '@src/app/model/core';

@Component({
  selector: 'app-etimg',
  templateUrl: './etimg.component.html',
  styleUrls: ['./etimg.component.scss']
})
export class EtimgComponent {

  @Input() core!: Core;
  constructor() { }


  get imgSrc() {
    return `https://cdn.jsdelivr.net/gh/elernal-tree/elernal-tree@master/static/image/core/${this.core.id}.png`
  }

}
