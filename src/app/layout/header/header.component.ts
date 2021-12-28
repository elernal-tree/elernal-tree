import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService} from 'ng-zorro-antd/modal';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  {

  constructor(
    private router: Router,
    private nzModalSrc: NzModalService,
  ) {}





}
