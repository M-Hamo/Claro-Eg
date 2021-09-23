import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-residential',
  templateUrl: './residential.component.html',
  styleUrls: ['./residential.component.scss'],
})
export class ResidentialComponent implements OnInit {
  @Input() activeOneFromHome: string;
  @Output() value = new EventEmitter<string>();
  @Output() closeDropdown = new EventEmitter();

  activeOne: string = '';
  buttons: any[] = [
    {
      id: 1,
      value: 'residential_land',
      title: 'main.client.residential_land',
      imgSurce: 'assets/icons/Mask Group 79.svg',
      disabeled: false,
    },
    {
      id: 2,
      value: 'flat',
      title: 'main.client.flat',
      imgSurce: 'assets/icons/Mask Group 54.svg',
      disabeled: false,
    },
    {
      id: 3,
      value: 'villa',
      title: 'main.client.villa',
      imgSurce: 'assets/icons/Mask Group 62.svg',
      disabeled: false,
    },
    {
      id: 4,
      value: 'duplex',
      title: 'main.client.duplex',
      imgSurce: 'assets/icons/Mask Group 78.svg',
      disabeled: false,
    },
    {
      id: 5,
      value: 'twin_houses',
      title: 'main.client.twin_houses',
      imgSurce: 'assets/icons/Mask Group 63.svg',
      disabeled: false,
    },
    {
      id: 6,
      value: 'building',
      title: 'main.client.building',
      imgSurce: 'assets/icons/Mask Group 78.svg',
      disabeled: false,
    },
    {
      id: 7,
      value: 'palace',
      title: 'main.client.palace',
      imgSurce: 'assets/icons/Mask Group 64.svg',
      disabeled: false,
    },
    {
      id: 8,
      value: 'beach_unit',
      title: 'main.client.beach_unit',
      imgSurce: 'assets/icons/Mask Group 65.svg',
      disabeled: true,
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  clickValue(value: string): void {
    this.activeOne = value;

    this.value.emit(value);

    setTimeout(() => {
      this.closeDropdown.emit();
    }, 1000);
  }
}
