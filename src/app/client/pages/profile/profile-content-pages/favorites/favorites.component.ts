import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  love: any;

  claroItems: any[] = [
    {
      id: 1,
      value: 'claro',
      photo: 'assets/images/villa.jpg',
      preview: true,
      evaluation_was_done: true,
      love: true,
      type: 'فيلا للبيع',
      location: 'القاهرة الجديدة, الرحاب',
      negotiable: true,
      bedNum: 8,
      pathNum: 3,
      size: 360,
    },
    {
      id: 2,
      value: 'claro',
      photo: 'assets/images/company.jpg',
      preview: true,
      evaluation_was_done: true,
      love: true,
      type: 'شركة تطوير',
      location: 'طنطا شارع سعيد',
      negotiable: true,
      bedNum: 9,
      pathNum: 4,
      size: 550,
    },

    {
      id: 4,
      value: 'claro',
      photo: 'assets/images/company.jpg',
      preview: true,
      evaluation_was_done: true,
      love: true,
      type: 'شركة تطوير',
      location: 'طنطا شارع سعيد',
      negotiable: true,
      bedNum: 9,
      pathNum: 4,
      size: 550,
    },

    {
      id: 6,
      value: 'claro',
      photo: 'assets/images/company.jpg',
      preview: true,
      evaluation_was_done: true,
      love: true,
      type: 'شركة تطوير',
      location: 'طنطا شارع سعيد',
      negotiable: true,
      bedNum: 9,
      pathNum: 4,
      size: 550,
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  hitLove(): void {
    this.love = !this.love;
  }
}
