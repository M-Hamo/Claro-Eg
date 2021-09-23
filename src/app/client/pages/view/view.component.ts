import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { MapDialogComponent } from './map-dialog/map-dialog.component';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
  // carousel responsive views
  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1,
    },
  ];
  obj = {
    id: 200,
    carouselItems: [
      {
        id: 1,
        photo: 'assets/images/villa.jpg',
      },
      {
        id: 2,
        photo: 'assets/images/company.jpg',
      },
      {
        id: 3,
        photo: 'assets/images/building.jpg',
      },
      {
        id: 4,
        photo: 'assets/images/inechtine.jpg',
      },
    ],
    price: 5200000,
    discription_half1: [
      {
        icon: 'assets/icons/Mask Group 6.svg',
        title: 'main.client.space',
        unit: 'main.client.square_meters',
      },
      {
        icon: 'assets/icons/Mask Group 6.svg',
        title: 'main.client.Net_space',
        unit: 'main.client.square_meters',
      },
      {
        icon: 'assets/icons/Mask Group 6.svg',
        title: 'main.client.kitchen_space',
        unit: 'main.client.square_meters',
      },
      {
        icon: 'assets/icons/Mask Group 7.svg',
        title: 'main.client.bedrooms',
        unit: null,
      },
      {
        icon: 'assets/icons/sofa.svg',
        title: 'main.client.receiver_cut',
        unit: null,
      },
      {
        icon: 'assets/icons/bath.svg',
        title: 'main.client.bathrooms',
        unit: null,
      },
      {
        icon: 'assets/icons/garden.svg',
        title: 'main.client.private_garden',
        unit: 'main.client.square_meters',
      },
    ],
    discription_half2: [
      {
        title: 'main.client.interval',
        unit: 'main.client.year',
      },

      {
        title: 'main.client.annual_increase_value',
        unit: 'main.client.currency',
      },
      {
        title: 'main.client.annual_increase_rate',
        unit: null,
      },
      {
        title: 'main.client.insurance',
        unit: 'main.client.month',
      },
      {
        title: 'main.client.security_deposit',
        unit: 'main.client.currency',
      },
      {
        title: 'main.client.owners_union_maintenance',
        unit: null,
      },
      {
        title: 'main.client.owners_union_maintenance_amount',
        unit: 'main.client.currency',
      },
      {
        title: 'main.client.construction_condition',
        unit: null,
      },
      {
        title: 'main.client.finishing',
        unit: null,
      },
      {
        title: 'main.client.brushes_and_fixtures',
        unit: null,
      },
      {
        title: 'main.client.share_in_land',
        unit: null,
      },
      {
        title: 'main.client.share_garage',
        unit: null,
      },
      {
        title: 'main.client.services',
        unit: null,
      },
    ],
  };

  // for charts
  servicesCharts: any[];

  constructor(public dialog: MatDialog, private translateService: TranslateService) {}

  // translation service
  translate(key: string): Promise<string> {
    return this.translateService.get(key).toPromise();
  }

  async ngOnInit(): Promise<void> {
    this.servicesCharts = [
      {
        title: await this.translate('main.client.urban_ratio'),
        rate: 10,
      },
      {
        title: await this.translate('main.client.learn'),
        rate: 20,
      },
      {
        title: await this.translate('main.client.medical'),
        rate: 40,
      },
      {
        title: await this.translate('main.client.entertainment_services'),
        rate: 60,
      },
      {
        title: await this.translate('main.client.water'),
        rate: 30,
      },
      {
        title: await this.translate('main.client.electricity'),
        rate: 45,
      },
      {
        title: await this.translate('main.client.natural_gas'),
        rate: 79,
      },
      {
        title: await this.translate('main.client.telephones_and_internet'),
        rate: 30,
      },
      {
        title: await this.translate('main.client.roads'),
        rate: 50,
      },
      {
        title: await this.translate('main.client.commercial_centers'),
        rate: 20,
      },
      {
        title: await this.translate('main.client.green_spaces'),
        rate: 30,
      },
    ];
  }

  openDialog() {
    const dialogRef = this.dialog.open(MapDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
