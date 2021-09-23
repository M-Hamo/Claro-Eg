import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
})
export class ProfileSettingsComponent implements OnInit {
  profileForm: FormGroup;
  hide = true;

  constructor(private _fb: FormBuilder) {
    this._profileForm();
  }

  ngOnInit(): void {
    this.profileForm.patchValue({
      name: 'Mohamed Eldeeb',
      phoneNumber: '01098799837',
      email: 'moahmed.eldeib5@gmail.com',
    });
  }

  saveChanges(settingvalue): void {
    console.log(settingvalue.value);
    // post value
  }

  private _profileForm(): void {
    this.profileForm = this._fb.group({
      name: [''],
      phoneNumber: [''],
      email: [{ value: '', disabled: true }],
    });
  }
}
