import { QUERY_PARAMETER_NAMES, PATHS } from '@models';
import { take, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { LocalizationService } from '@core/services/localization.service';
import { PreloaderService } from '@core/services/preloader.service';
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SocialDialogComponent } from './client/social-dialog/social-dialog.component';
import { IdentityManager, User } from '@core/auth';
import { SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(
    private readonly _localizationService: LocalizationService,
    private readonly _socialService: SocialAuthService,
    private readonly _identityManager: IdentityManager,
    private readonly _preloaderService: PreloaderService,
    private readonly _dialog: MatDialog,
    private readonly _router: Router,
    private readonly _route: ActivatedRoute
  ) {
    this.configureLocalization();
    this.configureGlobalParams();
    this.configureSocialAuth();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this._preloaderService.hide();
  }

  configureLocalization(): void {
    this._localizationService.localize();
  }

  configureGlobalParams(): void {
    this._route.queryParams.subscribe((params: Params) => {
      const action = params.action;
      const returnUrl = params[QUERY_PARAMETER_NAMES.ReturnUrl];

      if (!action) {
        return;
      }

      if (action === 'login') {
        this._identityManager.user$
          .pipe(
            take(1),
            map((user: User) => !!user)
          )
          .subscribe((authorized: boolean) => {
            if (authorized) {
              this._router.navigateByUrl(returnUrl ? returnUrl : PATHS.Home);
            } else {
              this._dialog.open(SocialDialogComponent);
            }
          });
      }

      this._router.navigate([], {
        queryParams: { [QUERY_PARAMETER_NAMES.ReturnUrl]: returnUrl },
      });
    });
  }

  configureSocialAuth(): void {
    this._socialService.initState.subscribe();
  }
}
