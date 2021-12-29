import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Core } from '@src/app/model/core';
import { HttpClient } from '@angular/common/http'
import { CoreElement } from '@src/app/constants/enum';
import { outCoreList } from './outCore';
import { CdkDragDrop, CdkDragStart, CdkDragMove } from '@angular/cdk/drag-drop'

@Component({
  selector: 'app-arsenal',
  templateUrl: './arsenal.component.html',
  styleUrls: ['./arsenal.component.scss']
})
export class ArsenalComponent implements OnInit {
  @ViewChild('coreBox', { read: ElementRef }) child!: ElementRef;
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

  _currentIndex: number;
  _currentField = null;

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

  getImgSrc(id: number) {
    return `https://cdn.jsdelivr.net/gh/elernal-tree/elernal-tree@master/static/image/core/${id}.png`
  }

  fields: string[] = [];

  dragStart(event: CdkDragStart | any) {
    this._currentIndex = this.currentCoreList.indexOf(event.source.data); // Get index of dragged type
    console.log(this._currentIndex);
    this._currentField = this.child.nativeElement.children[this._currentIndex]; // Store HTML field
    console.log(this.child);
    console.log(this._currentField);
  }

  moved(event: CdkDragMove) {
    // Check if stored HTML field is as same as current field
    if (this.child.nativeElement.children[this._currentIndex] !== this._currentField) {
      console.log('3')
      // Replace current field, basically replaces placeholder with old HTML content
      this.child.nativeElement.replaceChild(this._currentField, this.child.nativeElement.children[this._currentIndex]);
    }
  }

  itemDropped(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      // moveItemInArray(this.fields, event.previousIndex, event.currentIndex);
    } else {
      this.addField(event.item.data, event.currentIndex);
    }
  }

  addField(fieldType: string, index: number) {
    this.fields.splice(index, 0, fieldType)
  }
}


