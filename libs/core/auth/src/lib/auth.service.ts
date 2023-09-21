import { Injectable } from '@angular/core'
import { catchError, delay, firstValueFrom, map, Observable, of, Subscribable, switchMap, throwError } from 'rxjs'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { AuthenticationStatus, WebAuthStore } from '@case-clinical/web/auth/data-access'

@Injectable()
export class AuthService {
  /**
   * Constructor
   */
  constructor(private client: WebCoreDataAccessService, private _userService: WebAuthStore) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Forgot password
   *
   * @param email
   */
  forgotPassword(email: string): Observable<any> {
    return of({}) //thishttpClient.post('api/auth/forgot-password', email)
  }

  /**
   * Reset password
   *
   * @param password
   */
  resetPassword(password: string): Observable<any> {
    return of({}) //return this._httpClient.post('api/auth/reset-password', password)
  }

  /**
   * Sign up
   *
   * @param user
   */
  async signUp(user: { username: string; email: string; password: string }): Promise<any> {
    return await this._userService.registerEffect(user)
    // return this.client.register({ input: user })
  }

  /**
   * Sign in
   *
   * @param credentials
   */
  async signIn(credentials: { email: string; password: string }): Promise<any> {
    const result = await this._userService.loginEffect({ email: credentials.email, password: credentials.password })
    return result
  }

  /**
   * Sign in using the access token
   */
  signInUsingToken(): Observable<any> {
    // Renew token
    return this.client
      .refresh({
        accessToken: this._userService.accessToken,
      })
      .pipe(
        catchError(() =>
          // Return false
          of(false),
        ),
        switchMap((response: any) => {
          // Store the access token in the local storage
          this._userService.accessToken = response.accessToken

          // Store the user on the user service
          this._userService.meEffect()

          // Return true
          return of(true)
        }),
      )
  }

  /**
   * Sign out
   */
  signOut(): Observable<any> {
    return this._userService.signOut();
  }

  /**
   * Unlock session
   *
   * @param credentials
   */
  unlockSession(credentials: { email: string; password: string }): Observable<any> {
    return of({}) //return this._httpClient.post('api/auth/unlock-session', credentials)
  }

  /**
   * Check the authentication status
   */
  check(): Observable<AuthenticationStatus> {
    return of(this._userService.authenticationStatus)
  }
}
