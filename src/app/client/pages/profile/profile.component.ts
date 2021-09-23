import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  panelOpenState = false;
  lang: any;

  constructor() {}

  ngOnInit(): void {
    this.lang = document.documentElement.lang;
  }
}
