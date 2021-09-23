import { FormGroup } from '@angular/forms';

export function ConfirmedValidator(
  controlName: string,
  matchingControlName: string
): (fGp: FormGroup) => void {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}

export function GreaterValidator(
  controlName: string,
  matchingControlName: string
): (fGp: FormGroup) => void {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors.greaterValidator) {
      return;
    }
    if (control.value < matchingControl.value) {
      control.setErrors({ greaterValidator: true });
    } else {
      control.setErrors(null);
    }
  };
}
