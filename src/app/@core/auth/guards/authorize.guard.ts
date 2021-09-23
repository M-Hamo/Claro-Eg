import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanLoad,
  Route,
  UrlSegment,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { IdentityManager } from '../services/identity-manager.service';
import { PATHS, QUERY_PARAMETER_NAMES, ACTIONS } from '@models';

@Injectable({
  providedIn: 'root',
})
export class AuthorizeGuard implements CanActivate, CanLoad {
  constructor(private _identityManager: IdentityManager, private _router: Router) {}

  canLoad(route: Route, segments: UrlSegment[]) {
    const returnUrl = segments.reduce(
      (path, currentSegment) => `${path}/${currentSegment.path}`,
      ''
    );
    return true;
    // return this.handle(returnUrl);
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return true;
    // return this.handle(state.url);
  }

  private handle(returnUrl: string): Observable<boolean> {
    return this._identityManager.user$.pipe(
      take(1),
      map((user) => {
        const authorized = !!user;

        if (!authorized) {
          this._router.navigate([], {
            queryParams: {
              action: ACTIONS.Login,
              [QUERY_PARAMETER_NAMES.ReturnUrl]: !!returnUrl ? returnUrl : PATHS.Home,
            },
          });
        }

        return authorized;
      })
    );
  }
}
