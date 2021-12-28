import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NzModalService} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent {
  constructor(
    private nzModalSrv: NzModalService,
  ) { }





}
