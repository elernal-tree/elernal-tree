import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Core } from '@src/app/model/core';
import { HttpClient } from '@angular/common/http';
import { CoreElement, CoreSeries } from '@src/app/constants/enum';
import { CdkDragDrop, CdkDragStart, CdkDragMove } from '@angular/cdk/drag-drop';
import { CoreOption } from '@src/app/constants/constants';

@Component({
  selector: 'app-arsenal',
  templateUrl: './arsenal.component.html',
  styleUrls: ['./arsenal.component.scss'],
})
export class ArsenalComponent implements OnInit {
  coreList: Core[] = [];
  currentCoreElement = CoreElement.火;
  coreOption = CoreOption;

  constructor(private _http: HttpClient) {}

  ngOnInit(): void {
    this._http.get<Core[]>('/api/core').subscribe((r) => {
      this.coreList = r;
    });
  }

  get currentCoreList() {
    return this.coreList.filter((core) => core.data.coreElement === this.currentCoreElement);
  }

  get magunaCore() {
    return this.currentCoreList
      .filter((core) => core.data.coreSeries === CoreSeries.maguna)
      .sort((a, b) => b.data.coreRarity - a.data.coreRarity);
  }

  get normalCore() {
    return this.currentCoreList
      .filter((core) => core.data.coreSeries === CoreSeries.normal)
      .sort((a, b) => b.data.coreRarity - a.data.coreRarity);
  }

  get exCore() {
    return this.currentCoreList
      .filter((core) => core.data.coreSeries === CoreSeries.ex)
      .sort((a, b) => b.data.coreRarity - a.data.coreRarity);
  }
}
