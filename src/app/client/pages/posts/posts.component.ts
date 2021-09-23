import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { GenericValidator } from '@shared/customValidators/GenericValidatros';
import { fromEvent, merge, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-ads',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  // Use with the generic validation message class
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  // editAd
  editAd = false;

  displayErrorMessage: { [key: string]: string } = {};

  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  // Form
  adForm: FormGroup;

  // show ads
  showAd = false;

  // degree buttons
  previewButton = false;
  appraisalButton = false;

  // Set our map properties
  mapCenter = [-122.4194, 37.7749];
  basemapType = 'satellite';
  mapZoomLevel = 13;

  // Hide and showed fields
  depositAmount = true;

  // Photo picker
  filePicker = [
    {
      id: 1,
      file: null,
      imageShow: null,
      type: null,
      msg: null,
    },
    {
      id: 2,
      file: null,
      imageShow: null,
      type: null,
      msg: null,
    },
    {
      id: 3,
      file: null,
      imageShow: null,
      type: null,
      msg: null,
    },
    {
      id: 4,
      file: null,
      imageShow: null,
      type: null,
      msg: null,
    },
    {
      id: 5,
      file: null,
      imageShow: null,
      type: null,
      msg: null,
    },
    {
      id: 6,
      file: null,
      imageShow: null,
      type: null,
      msg: null,
    },
  ];

  dropdown = [
    {
      id: 1,
      value: 'one',
      disabeld: true,
      placeHolder: 'main.client.flat',
      cities: [
        { name: 'New York', value: 'NY' },
        { name: 'Rome', value: 'RM' },
      ],
    },
    {
      id: 2,
      value: 'one',
      disabeld: true,
      placeHolder: 'main.client.city',

      cities: [
        { name: 'New York', value: 'NY' },
        { name: 'Rome', value: 'RM' },
      ],
    },
    {
      id: 3,
      value: 'one',
      disabeld: true,
      placeHolder: 'main.client.neighborhood_region',

      cities: [
        { name: 'New York', value: 'NY' },
        { name: 'Rome', value: 'RM' },
      ],
    },
    {
      id: 4,
      value: 'one',
      disabeld: false,
      placeHolder: 'main.client.flat',

      cities: [
        { name: 'New York', value: 'NY' },
        { name: 'Rome', value: 'RM' },
      ],
    },
  ];

  intervalDropDown = [
    {
      title: 'شهر',
      value: 1,
    },
    {
      title: 'شهرين',
      value: 2,
    },
    {
      title: '3 شهور',
      value: 3,
    },
    {
      title: '5 شهور',
      value: 4,
    },
  ];

  constructor(private fb: FormBuilder, private translateService: TranslateService) {
    this._adForm();
  }

  // translation service
  translate(key: string): Promise<string> {
    return this.translateService.get(key).toPromise();
  }

  async ngOnInit(): Promise<void> {
    this.adForm.get('showAd').valueChanges.subscribe((x) => {
      this.showAd = !this.showAd;
    });

    this.adForm.get('requestPreview').valueChanges.subscribe((x) => {
      // if (x) {
      // this.adForm.get('requestAppraisal').setValue(false);
      // this.previewButton = false;
      // }
      this.previewButton = !this.previewButton;
    });

    this.adForm.get('requestAppraisal').valueChanges.subscribe((x) => {
      // if (x) {
      // this.adForm.get('requestPreview').setValue(false);
      // this.previewButton = false;
      // }
      this.appraisalButton = !this.appraisalButton;
    });

    this.adForm.get('priceIncludesMaintenanceDeposit').valueChanges.subscribe((x) => {
      const depositAmount = this.adForm.get('depositAmount');
      if (x === 'yes') {
        depositAmount.setValidators([Validators.required, Validators.minLength(5)]);
        this.depositAmount = true;
      }
      if (x === 'no') {
        this.depositAmount = false;
        depositAmount.setValidators(null);
      }
      depositAmount.updateValueAndValidity();
    });

    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      depositAmount: {
        required: await this.translate('main.errorMessages.required'),
        min: await this.translate('main.errorMessages.min'),
      },
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    // This is required because the valueChanges does not provide notification on blur
    const controlBlurs: Observable<any>[] = this.formInputElements.map(
      (formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur')
    );

    // Merge the blur event observable with the valueChanges observable
    // so we only need to subscribe once.
    merge(this.adForm.valueChanges, ...controlBlurs)
      .pipe(debounceTime(0))
      .subscribe((value) => {
        this.displayErrorMessage = this.genericValidator.processMessages(this.adForm);
      });
  }

  // file selector
  onSelectFile(event, files: FileList | null, id: number): void {
    const file = files[0];

    // image reader
    const reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]);

    // file 'll send to API
    const fileUp = this.filePicker.find((x) => x.id === id);

    // file type
    fileUp.type = file.type;

    if (!file) {
      return;
    }

    if (file.type.match(/image\/*/)) {
      reader.onload = (event) => {
        fileUp.imageShow = reader.result;
      };

      fileUp.file = file;
    } else if (file.type.match(/video\/*/)) {
      fileUp.file = file;
    } else if (file.type.match(/pdf\/*/)) {
      fileUp.file = file;
    } else {
      fileUp.msg = 'main.errorMessages.invalid_file_type';

      setTimeout(() => {
        fileUp.msg = '';
      }, 2000);
    }
  }

  mapLoadedEvent(status: boolean) {
    console.log('The map has loaded: ' + status);
  }

  submit(form): void {
    console.log(form.value);

    // Files
    console.log(
      this.filePicker.map((file) => {
        file.id, file.file, file.type;
      })
    );

    // map location
    console.log(this.mapCenter);
  }

  private _adForm(): void {
    this.adForm = this.fb.group({
      showAd: [true, [Validators.required]],
      residentialOrNot: ['residential', [Validators.required]],
      requestPreview: ['', [Validators.required]],
      requestAppraisal: ['', [Validators.required]],
      forSale_forRent_or_both: ['forSale', [Validators.required]],
      paymentMethod: ['cash', [Validators.required]],
      priceIncludesMaintenanceDeposit: ['yes', [Validators.required]],
      depositAmount: ['', [Validators.required, Validators.min(5000)]],
      space: ['', [Validators.required, Validators.min(100), Validators.minLength(2)]],
      netSpace: ['', [Validators.required, Validators.min(100), Validators.minLength(2)]],
    });
  }
}
