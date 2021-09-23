import { SocialStorageService } from './social-storage.service';
import { SocialUser } from 'angularx-social-login';
import {
  AccountsClient,
  HttpResultOfString,
  ExternalLoginCommand,
  FullNameDto,
  ExternalRegisterCommand,
} from '@core/api';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { PATHS } from '@models';
import { TokenService } from './token.service';
import { AuthToken, ITokenPayload, Role } from './token';
import { AuthResult } from './auth-result';
import { ApiHandlerService } from '@core/services/api-handler.service';

export class User {
  id: string;
  userName: string;
  fullName?: string;
  email: string;
  created?: Date;
  picture?: string;
  roles?: Role | Role[];

  constructor(payload: ITokenPayload) {
    this.id = payload.sub;
    this.userName = payload.name;
    this.fullName = payload.fullName;
    this.email = payload.email;
    this.created = new Date(payload.created);
    this.roles = payload.roles;
  }
}

@Injectable({
  providedIn: 'root',
})
export class IdentityManager {
  public user$: BehaviorSubject<User> = new BehaviorSubject<User>(this.user);

  private _tokenExpirationTimer: any;

  constructor(
    private readonly _accountsClient: AccountsClient,
    private readonly _tokenService: TokenService,
    private readonly _router: Router,
    private readonly _handler: ApiHandlerService
  ) {}

  get user(): User {
    return this._tokenService.token.payload
      ? new User(this._tokenService.token.payload)
      : null;
  }

  public externalLogin(user: SocialUser): Observable<AuthResult> {
    return this.processResultToken(
      this._accountsClient.externalLogin(
        new ExternalLoginCommand({
          provider: user.provider,
          token: user.idToken ? user.idToken : user.authToken,
        })
      )
    ).pipe(
      catchError((err: AuthResult) => {
        SocialStorageService.set(user);
        return throwError(err);
      })
    );
  }

  public externalRegistration(phoneNumber: string): Observable<AuthResult> {
    const user = SocialStorageService.get();

    return this.processResultToken(
      this._accountsClient
        .externalRegistration(
          new ExternalRegisterCommand({
            provider: user.provider,
            token: user.idToken ? user.idToken : user.authToken,
            phoneNumber,
          })
        )
        .pipe(
          tap(() => {
            SocialStorageService.clear();
          })
        )
    );
  }

  public refreshToken(): Observable<AuthResult> {
    return this.processResultToken(this._accountsClient.refreshToken()).pipe(
      tap((result: AuthResult) => {
        if (result.result) {
          this.logout(true);
        }
      })
    );
  }

  public logout(navigate: boolean): void {
    clearTimeout(this._tokenExpirationTimer);

    this._tokenService.clear();

    if (navigate) {
      this._router.navigate([PATHS.Home]);
    }
  }

  /** Precess result. Save token if success result. Set logout timer */
  private processResultToken(
    tokenObservable: Observable<HttpResultOfString>
  ): Observable<AuthResult> {
    return tokenObservable.pipe(
      map((token) => new AuthToken(token.result)),
      tap((authToken) => this.authorize(authToken)),
      map((authToken) => new AuthResult(new User(authToken.payload), null)),
      catchError((err) => {
        return throwError(
          new AuthResult(
            null,
            err && err.status && err.status === 404
              ? null
              : this._handler.handleError(err)
          )
        );
      })
    );
  }

  private authorize(authToken: AuthToken): void {
    if (!authToken) {
      this._tokenService.clear();
      this.user$.next(null);
      return;
    }

    this._tokenService.set(authToken);
    this.user$.next(this.user);

    this._tokenExpirationTimer = setTimeout(() => {
      this.refreshToken();
    }, 24 * 60 * 60 * 1000); // After One Day
  }
}
