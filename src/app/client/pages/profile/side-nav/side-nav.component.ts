import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  panelOpenState = false;

  lang: any;
  routerUrl: any;

  navButtons = [
    {
      icon1: 'assets/icons/profile_information.svg',
      icon2: 'assets/icons/profile_information2.svg',
      title: 'main.client.profile_information',
      router: '/profile',
    },
    {
      icon1: 'assets/icons/heartBlue.svg',
      icon2: 'assets/icons/heart2.svg',
      title: 'main.client.favorite',
      router: 'favorites',
    },
  ];

  chatButton = {
    icon1: 'assets/icons/conversation.svg',
    icon2: 'assets/icons/conversation2.svg',
    title: 'main.client.messages',
    router: 'conversation',
    contacts: [
      {
        id: 0,
        name: 'mohamed',
        img: 'assets/images/inechtine.jpg',
      },
      {
        id: 1,
        name: 'hima',
        img: 'assets/images/inechtine.jpg',
      },
      {
        id: 2,
        name: 'hoda',
        img: 'assets/images/inechtine.jpg',
      },
      {
        id: 3,
        name: 'soso',
        img: 'assets/images/girl.jpg',
      },
      {
        id: 4,
        name: 'mom',
        img: 'assets/images/inechtine.jpg',
      },
    ],
  };
  constructor(private _router: Router) {}

  ngOnInit(): void {
    this.lang = document.documentElement.lang;
    this.routerUrl = this._router.url;
  }

  chooseContacts(id: number, name: string): void {
    console.log(`Id : ${id}, Name : ${name}`);
  }
}
