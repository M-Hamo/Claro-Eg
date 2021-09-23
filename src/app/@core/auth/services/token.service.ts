import { Injectable } from '@angular/core';
import { AuthToken } from './token';
import { LocalStorageService } from '@core/services/local-storage.service';

const TOKEN_KEY = 'access_token';

/**
 * Service that allows you to manage authentication token - get, set,
 * clear and also listen to token changes over time.
 */
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private _tokenStorage: LocalStorageService) {}

  /** Returns the current token from localStorage */
  get token(): AuthToken {
    return new AuthToken(this._tokenStorage.get(TOKEN_KEY));
  }

  /** Sets token to storage */
  set(token: AuthToken): void {
    this._tokenStorage.set(TOKEN_KEY, token.value);
  }

  /** Removes the token and published token value */
  clear(): void {
    this._tokenStorage.remove(TOKEN_KEY);
  }
}
