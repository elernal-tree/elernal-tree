import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Core } from '@src/app/model/core';
import { HttpClient } from '@angular/common/http'
import { CoreElement } from '@src/app/constants/enum';
import { outCoreList } from './outCore';
import { CdkDragDrop, CdkDragStart, CdkDragMove } from '@angular/cdk/drag-drop'
import { CoreOption } from '@src/app/constants/contants';

@Component({
  selector: 'app-arsenal',
  templateUrl: './arsenal.component.html',
  styleUrls: ['./arsenal.component.scss']
})
export class ArsenalComponent implements OnInit {
  coreList: Core[] = [];
  currentCoreElement = CoreElement.风;
  coreOption = CoreOption;

  constructor(
    private _http: HttpClient
  ) { }

  ngOnInit(): void {
    this._http.get<Core[]>('/assets/core.json').subscribe(r => {
      this.coreList = r.filter(core => !outCoreList.includes(core.id));
    });
  }

  get currentCoreList() {
    return this.coreList.filter(core => core.data.coreElement === this.currentCoreElement)
  }




}


