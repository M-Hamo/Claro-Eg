import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-claro-item',
  templateUrl: './claro-item.component.html',
  styleUrls: ['./claro-item.component.scss'],
})
export class ClaroItemComponent implements OnInit {
  @Input() item;

  love: any;

  constructor() {}

  ngOnInit(): void {
    this.love = this.item.love;
  }

  hitLove(): void {
    this.love = !this.love;
  }
}
