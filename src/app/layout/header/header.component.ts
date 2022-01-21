import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  {

  constructor(
    private router: Router,
  ) {}


  about() {
    this.router.navigate(['/about'])
  }

  home() {
    this.router.navigate(['/'])
  }


}
