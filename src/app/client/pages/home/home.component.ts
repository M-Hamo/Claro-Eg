import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  query: string;

  buttonFilter: any = {
    claroFilter: false,
    forSale: false,
    forRent: false,
  };

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
      id: 3,
      value: 'claro',
      photo: 'assets/images/building.jpg',
      preview: false,
      evaluation_was_done: true,
      love: false,
      type: 'عمارة سكنية',
      location: 'كوم حمادة ,البحيرة',
      negotiable: false,
      bedNum: 4,
      pathNum: 2,
      size: 800,
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
      id: 5,
      value: 'claro',
      photo: 'assets/images/villa.jpg',
      preview: true,
      evaluation_was_done: false,
      love: true,
      type: 'فيلا للبيع',
      location: 'القاهرة الجديدة, الرحاب',
      negotiable: false,
      bedNum: 5,
      pathNum: 3,
      size: 320,
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

  residentialRealEstateItems: any[] = [
    {
      id: 1,
      value: 'claro',
      photo: 'assets/images/villa.jpg',
      preview: true,
      evaluation_was_done: true,
      love: false,
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
      love: false,
      type: 'شركة تطوير',
      location: 'طنطا شارع سعيد',
      negotiable: true,
      bedNum: 9,
      pathNum: 4,
      size: 550,
    },
    {
      id: 3,
      value: 'claro',
      photo: 'assets/images/building.jpg',
      preview: false,
      evaluation_was_done: true,
      love: true,
      type: 'عمارة سكنية',
      location: 'كوم حمادة ,البحيرة',
      negotiable: false,
      bedNum: 4,
      pathNum: 2,
      size: 800,
    },
  ];

  nonResidentialRealEstateItems: any[] = [
    {
      id: 1,
      value: 'claro',
      photo: 'assets/images/office.jpg',
      preview: true,
      evaluation_was_done: true,
      love: false,
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
      photo: 'assets/images/office.jpg',
      preview: true,
      evaluation_was_done: true,
      love: false,
      type: 'شركة تطوير',
      location: 'طنطا شارع سعيد',
      negotiable: true,
      bedNum: 9,
      pathNum: 4,
      size: 550,
    },
    {
      id: 3,
      value: 'claro',
      photo: 'assets/images/office.jpg',
      preview: false,
      evaluation_was_done: true,
      love: true,
      type: 'عمارة سكنية',
      location: 'كوم حمادة ,البحيرة',
      negotiable: false,
      bedNum: 4,
      pathNum: 2,
      size: 800,
    },
  ];

  links: any[] = [
    {
      title: 'شقق للبيع في القاهرة الجديدة',
    },
    {
      title: 'شقق للبيع في القاهرة الجديدة',
    },
    {
      title: 'شقق للبيع في القاهرة الجديدة',
    },
  ];

  cities: City[] = [];
  selectedCity1: City | undefined;

  mapToggle = false;
  residential = false;
  nonResidential = false;

  // FilterForm
  filterForm: FormGroup;

  // not found result
  notFound = false;

  resValue: string;
  nonResValue: string;

  public setResValue(value: string): void {
    this.resValue = value;
  }

  public setNonResValue(value: string) {
    this.nonResValue = value;
  }

  constructor(private _fb: FormBuilder, public dialog: MatDialog) {
    this.filtreForm();
    this.filterForm.reset();
  }

  ngOnInit(): void {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];

    this.filterForm.get('claro').valueChanges.subscribe((x) => {
      this.buttonFilter.claroFilter = !this.buttonFilter.claroFilter;
    });

    this.filterForm.get('forRent').valueChanges.subscribe((x) => {
      if (x) {
        this.filterForm.get('forSale').setValue(false);
        this.buttonFilter.forSale = false;
      }
      this.buttonFilter.forRent = !this.buttonFilter.forRent;
    });

    this.filterForm.get('forSale').valueChanges.subscribe((x) => {
      if (x) {
        this.filterForm.get('forRent').setValue(false);
        this.buttonFilter.forRent = false;
      }
      this.buttonFilter.forSale = !this.buttonFilter.forSale;
    });
  }

  // scroll to element somthly
  scrollToElement($element): void {
    setTimeout(() => {
      $element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }, 200);
  }

  search(search: NgForm): void {
    console.log(search.value.search);
  }

  // filteration Values
  filteration(filterValue: any): void {
    console.log(this.resValue);
    console.log(this.nonResValue);
    console.log(filterValue);
    this.notFound = true;
  }

  resetForms(): void {
    this.filterForm.reset();
    this.buttonFilter = {
      claroFilter: false,
      forSale: false,
      forRent: false,
    };
  }

  // Toggle dropdown residential
  // dropDown_residential(): void {
  //   if (this.non_residential === true) {
  //     this.non_residential = false;
  //   }
  //   this.residential = !this.residential;
  // }
  // // Toggle dropdown non_residential
  // dropDown_non_residential(): void {
  //   if (this.residential === true) {
  //     this.residential = false;
  //   }
  //   this.non_residential = !this.non_residential;
  // }

  ngOnDestroy(): void {
    this.filterForm.reset();
  }

  private filtreForm(): void {
    this.filterForm = this._fb.group({
      claro: [''],
      forSale: [''],
      forRent: [''],
      company: [''],
      city: [''],
      neighborhood: [''],
      price: [''],
      size: [''],
      bedRooms: [''],
      bathRooms: [''],
      receiverCut: [''],
      role: [''],
      installment: [''],
      elevator: [''],
      furnished: [''],
      compound: [''],
    });
  }
}
