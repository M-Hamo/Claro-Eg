import { NgModule, SkipSelf, Optional, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreloaderService } from './services/preloader.service';
import { GoogleLoginProvider, FacebookLoginProvider, SocialAuthServiceConfig } from 'angularx-social-login';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [],
})
export class CoreModule {
  // Looks for the module in the parent injector to see
  // if it's already been loaded (only want it loaded once)
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        `${parentModule.constructor.name} has already been loaded. Import this module in the AppModule only.`
      );
    }
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        PreloaderService,
        {
          provide: 'SocialAuthServiceConfig',
          useValue: {
            autoLogin: false,
            providers: [
              {
                id: GoogleLoginProvider.PROVIDER_ID,
                provider: new GoogleLoginProvider(environment.googleClientId),
              },
              {
                id: FacebookLoginProvider.PROVIDER_ID,
                provider: new FacebookLoginProvider(environment.facebookAppId),
              },
            ],
          } as SocialAuthServiceConfig,
        },
      ],
    };
  }
}
