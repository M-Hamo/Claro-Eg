import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { QUERY_PARAMETER_NAMES } from '@models';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  SocialAuthService,
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialUser,
} from 'angularx-social-login';
import { IdentityManager, AuthResult } from '@core/auth';
import { FullNameDto } from '@core/api';
import { MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-social-dialog',
  templateUrl: './social-dialog.component.html',
  styleUrls: ['./social-dialog.component.scss'],
})
export class SocialDialogComponent implements OnInit {
  facebookProvider = FacebookLoginProvider.PROVIDER_ID;
  googleProvider = GoogleLoginProvider.PROVIDER_ID;

  form: FormGroup;

  isReady = false;
  notFound = false;
  loading = false;

  errors: any = {};
  formErrors = { detail: null, key: null };

  constructor(
    private readonly _dialogRef: MatDialogRef<SocialDialogComponent>,
    private readonly _socialService: SocialAuthService,
    private readonly _identityManager: IdentityManager,
    private readonly _translateService: TranslateService,
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
    private readonly _toastr: ToastrService,
    private readonly _fb: FormBuilder
  ) {}

  async ngOnInit(): Promise<any> {
    // Don't enable the social buttons unless the social service has been initialized
    this._socialService.initState.subscribe({ complete: () => (this.isReady = true) });

    // Build the registration form
    this.form = this._fb.group({
      phoneNumber: ['', Validators.required],
    });

    // Close the dialog if the route has been changed
    this._router.events.subscribe(() => this._dialogRef.close());

    // Initialize Errors
    this.errors.noData = await this._translateService.get('main.errorMessages.noData').toPromise();
  }

  login(provider: string): void {
    this._socialService
      .signIn(provider)
      .then((user: SocialUser) => {
        this._identityManager.externalLogin(user).subscribe(
          () => this.onSuccess(),
          (err: AuthResult) => {
            if (!err.result) {
              this.notFound = true;
              return;
            }

            err.result.pushError();
          }
        );
      })
      .catch(() => this._toastr.error(this.errors.noData));
  }

  register(): void {
    if (this.loading) {
      return;
    }

    const value = this.form.value;

    if (this.form.invalid || !value) {
      return;
    }

    this.loading = true;

    this._identityManager
      .externalRegistration(value.phoneNumber)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        () => this.onSuccess(),
        (err: AuthResult) =>
          err.result
            .assignValidationErrors(this.form)
            .pushError()
      );
  }

  onSuccess(): void {
    const returnUrl = this._route.snapshot.queryParams[QUERY_PARAMETER_NAMES.ReturnUrl];

    if (returnUrl) {
      this._router.navigateByUrl(returnUrl);
    }

    this._dialogRef.close();
  }
}
