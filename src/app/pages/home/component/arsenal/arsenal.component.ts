import { Component, OnInit } from '@angular/core';
import { Core } from '@src/app/model/core';
import { HttpClient } from '@angular/common/http'
import { CoreElement } from '@src/app/constants/enum';

@Component({
  selector: 'app-arsenal',
  templateUrl: './arsenal.component.html',
  styleUrls: ['./arsenal.component.scss']
})
export class ArsenalComponent implements OnInit {
  coreList: Core[] = [];
  currentCoreElement = CoreElement.风;
  coreOption = [{
    label: '风',
    value: CoreElement.风
  }, {
    label: '地',
    value: CoreElement.地
  }, {
    label: '水',
    value: CoreElement.水
  }, {
    label: '火',
    value: CoreElement.火
  }, {
    label: '光',
    value: CoreElement.光
  }, {
    label: '暗',
    value: CoreElement.暗
  },]
  constructor(
    private _http: HttpClient
  ) { }

  ngOnInit(): void {
    this._http.get<Core[]>('/assets/core.json').subscribe(r => {
      this.coreList = r;
    });
  }

  get currentCoreList() {
    return this.coreList.filter(core => core.data.coreElement === this.currentCoreElement)
  }

  getImgSrc(id: number) {
    return `https://cdn.jsdelivr.net/gh/elernal-tree/elernal-tree@master/static/image/core/${id}.png`
  }
}
