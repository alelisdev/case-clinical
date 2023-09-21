import { Injectable } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import {
  WebCoreDataAccessService,
  LoginInput,
  RegisterInput,
  User,
  Role,
  Navigation,
  Notification,
  UserCalendar,
  UserRole,
  UserFeature,
  UserFeaturePermission,
} from '@case-clinical/web/core/data-access'
import { coerceArray, TranslocoService } from '@ngneat/transloco'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { firstValueFrom, Observable, of } from 'rxjs'
import { map, shareReplay, switchMap, tap } from 'rxjs/operators'
import { AuthUtils } from '@case-clinical/core/auth'

export enum AuthenticationStatus {
  GUEST,
  AUTHENTICATING,
  AUTHENTICATED,
}

interface WebAuthDataAccessState {
  errors?: any
  user?: User
  accessToken?: string
  roles?: Role[]
  navigations?: Navigation[]
  notfications?: Notification[]
  userFeatures?: UserFeature[]
  userFeaturePermissions?: UserFeaturePermission[]
  featureFlags?: string[]
  loading: boolean
  loadedFeatureFlags?: boolean
}

@Injectable({ providedIn: 'root' })
export class WebAuthStore extends ComponentStore<WebAuthDataAccessState> {

  readonly errors$: Observable<any> = this.select((s) => s.errors)

  readonly user$: Observable<User> = this.select((s) => s.user)

  readonly hasSigned$: Observable<boolean> = this.select(this.user$, (user) => !(user?.assignedDocuments?.length > 0))

  readonly navigations$: Observable<Navigation[]> = this.select((s) => s.user?.navigations)

  readonly notifications$: Observable<Notification[]> = this.select((s) => s.user?.notifications)

  // readonly userCalendars$: Observable<UserCalendar[]> = this.select((s) => s.user?.userCalendars)

  readonly userRoles$: Observable<UserRole[]> = this.select((s) => s.user?.userRoles)

  readonly accessToken$: Observable<boolean> = of(!!this.accessToken)

  // readonly loggedIn$: Observable<boolean> = this.select(this.accessToken$, (token) => token)
  readonly loggedIn$: Observable<boolean> = new Observable((observer) => {
    observer.next(!!this.accessToken);
    observer.complete();
  })


  readonly loading$: Observable<boolean> = this.select((s) => s.loading)

  readonly adminUserId: string

  readonly roles$: Observable<Role[]> = this.select((s) => s.roles)

  readonly featureFlags$: Observable<string[]> = this.select((s) => {
    const currentFeatures = this.processToken(this.featuresToken)
    return this.mapFeatureFlags(currentFeatures?.userFeaturePermissions)
  })

  readonly features$: Observable<string[]> = this.select((s) => this.mapFeatureAccess(s.userFeatures))
  readonly vm$ = this.select(
    this.user$,
    this.loggedIn$,
    this.errors$,
    this.roles$,
    this.navigations$,
    this.notifications$,
    this.features$,
    this.featureFlags$,
    this.loading$,
    (user, loggedIn, errors, roles, navigations, notifications, features, featureFlags, loading) => ({
      user,
      loggedIn,
      errors,
      roles,
      navigations,
      notifications,
      features,
      featureFlags,
      loading,
    }),
    { debounce: true },
  )

  constructor(public readonly data: WebCoreDataAccessService,
    private readonly translocoService: TranslocoService,
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
  ) {
    super({ loading: true, loadedFeatureFlags: false })
    this.initializeEffect()
  }

  readonly initializeEffect = this.effect(($) =>
    $.pipe(
      tap(() => {
        this.meEffect()
      }),
    ),
  )

  readonly meEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap(() =>
        this.data.me().pipe(
          tapResponse(
            (res) => {
              this.setState({
                user: res.data.me,
                errors: res.errors,
                loadedFeatureFlags: true,
                loading: false,
              })
              return res.data.me
            },
            (errors) => this.setState({ errors, loading: false }),
          ),
        ),
      ),
      shareReplay(1, 10000),
    ),
  )

  readonly update = this.effect<string>(($status) =>
    $status.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((status) =>
        this.data.userUpdateUserStatus({ input: status }).pipe(
          tapResponse(
            (res) => {
              const current = this.get()
              current.user = { ...current.user, status }
              this.setState({ user: current.user, errors: res.errors, loading: false })
            },
            (errors) => this.setState({ errors, loading: false }),
          ),
        ),
      ),
    ),
  )

  readonly loginEffect = this.effect<LoginInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input: LoginInput) =>
        firstValueFrom(this.data.login({ input }).pipe(
          tapResponse(
            (resp: any) => {
              this.loggedIn(resp.data['login']);
            },
            (errors) => {
              this.setState({ errors, loading: false })
            },
          )),
        )
      ),
      tap((c: any) => this.redirect(!!c?.data?.login?.token))
    ),
  )

  readonly registerEffect = this.effect<RegisterInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input: RegisterInput) =>
        this.data.register({ input }).pipe(
          tapResponse(
            (resp) => {
              this.loggedIn(resp.data['register'])
            },
            (errors) => this.setState({ errors, loading: false }),
          ),
        ),
      ),
      tap((c: any) => this.redirect(!!c?.data?.login?.token))
    ),
  )

  readonly logoutEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap(() =>
        this.data.logout().pipe(
          tapResponse(
            () => {
              this.setState({ user: null, errors: null, loading: false })
              this._router.navigate(['/'])
            },
            (errors) => this.setState({ errors, loading: false }),
          ),
        ),
      ),
    ),
  )

  loggedIn(data: any) {
    const { token, verified, subscriberId, signupStatus, features }= data

    this.accessToken = token
    this.featuresToken = features

    // For now, skip signup settings, it will be removed in near future
    // this.verified = verified
    this.verified = true
    this.signupStatus = signupStatus
    this.subscriberId = subscriberId

    this.translocoService.setActiveLang(this.translocoService.getDefaultLang())
    const featuresFlags = this.processToken(features)

    this.setState({ accessToken: token, featureFlags: featuresFlags, loading: false })
  }

  hasFlags(flags: string | string[]): Observable<boolean> {
    return this.featureFlags$.pipe(
      map((results) => {
        if (!results || results.length == 0) {
          return false
        }

        const output = coerceArray(flags).every((current) => results.includes(current))
        return output
      }),
    )
  }

  public get authenticationStatus() : AuthenticationStatus {
    if(!this.accessToken) return AuthenticationStatus.GUEST;
    else {
      if(this.verified) return AuthenticationStatus.AUTHENTICATED;
      else return AuthenticationStatus.AUTHENTICATING;
    }
  }

  setCookie(token: string) {
    const d = new Date()
    d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000)
    const expires = `expires=${d.toUTCString()}`
    const cpath = 'path=localhost'
    document.cookie = `__session=${token}; ${expires}${cpath}`

    return document.cookie
  }

  set accessToken(token: string) {
    localStorage.setItem('accessToken', token)
  }

  get accessToken(): string {
    return localStorage.getItem('accessToken') ?? ''
  }

  public get subscriberId() : string {
    return localStorage.getItem('subscriberId') ?? ''
  }

  public set subscriberId(id : string) {
    localStorage.setItem('subscriberId', id)
  }

  public set verified(verified : boolean) {
    localStorage.setItem('verified', String(verified))
  }

  public get verified() : boolean {
    return (localStorage.getItem('verified') ?? 'false') === 'true'
  }

  public set signupStatus(signupStatus : number) {
    localStorage.setItem('signupStatus', String(signupStatus ?? 0))
  }

  public get signupStatus() : number {
    return Number(localStorage.getItem('signupStatus') ?? '0')
  }

  set featuresToken(token: string) {
    localStorage.setItem('featuresToken', token)
  }

  get featuresToken(): string {
    return localStorage.getItem('featuresToken') ?? ''
  }

  processToken(token: string): any {
    const results = AuthUtils.decodeToken(token)
    return results
  }


  signOut(): Observable<any> {
    // Remove the access token from the local storage
    localStorage.clear();
    // localStorage.removeItem('accessToken')
    // localStorage.removeItem('subscriberId')
    // localStorage.removeItem('verified')
    // localStorage.removeItem('signupStatus')
    // localStorage.removeItem('featuresToken')
    // console.log('signOut')
    // Return the observable
    return of(true)
  }

  mapFeatureFlags(userFeaturePermissions: UserFeaturePermission[]): string[] {
    const flags = []

    userFeaturePermissions?.forEach((feature) => {
      if (flags.indexOf(feature?.name) <= 0) {
        flags.push(feature?.name)
      }
    })

    return flags
  }

  mapFeatureAccess(userFeatures: UserFeature[]): string[] {
    const access = []
    userFeatures?.forEach((feature) => {
      if (access.indexOf(feature?.name) <= 0) {
        access.push(feature?.name)
      }
    })

    return access
  }

  redirect(isLoggedIn) {
    if (isLoggedIn) {

      const redirectURL =
        this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect'
      // Navigate to the redirect url
      this._router.navigateByUrl(redirectURL)
    }
  }
}
