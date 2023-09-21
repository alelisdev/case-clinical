import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { WebAuthStore } from '@case-clinical/web/auth/data-access'
import { WebLegalCaseDetailStore } from 'libs/web/legal-case/feature/src/lib/web-legal-case-detail/web-legal-case-detail.store'
import { WebUiBreadcrumService } from 'libs/web/ui/breadcrumbs/src/lib/web-ui-breadcrumbs.service'
import { WebPatientFeatureStore } from '@case-clinical/web/patient/shared';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators'
import { WebCoreDataAccessService } from './web-core-data-access.service'
import { FuseConfigService } from '@fuse/services/config'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

@Injectable({
    providedIn: 'root',
})
export class InitialDataResolver implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(
        private _userService: WebAuthStore,
        private data: WebCoreDataAccessService,
        private fuseConfigService: FuseConfigService,
    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Use this resolver to resolve initial mock-api for the application
     *
     * @param route
     * @param state
     */
    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
      console.log('Inital Data Resolver, starting to fetch initial data');
        await this._userService.initializeEffect()
        await this.data.userSettings({ input: { name: 'formly_Page_Settings' } }).subscribe((response) => {
          if(response.data?.items?.length > 0) {
            const { language, currency, dateFormat, timeFormat } = JSON.parse(response.data?.items?.at(0).value ?? '{}');
            this.fuseConfigService.setFormlyConfig(language, currency, dateFormat, timeFormat);
          }
        })
        this.data.fetchAndCacheAdminFormLayouts().subscribe();
        console.log('Inital Data Resolver, finished to fetch initial data');
        return this._userService.user$;
    }
}

@Injectable({
  providedIn: 'root',
})
export class PatientInitialDataResolver implements Resolve<any> {
  /**
   * Constructor
   */
  constructor(
      private _userService: WebAuthStore,
      private data: WebCoreDataAccessService,
      private fuseConfigService: FuseConfigService,
  ) { }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Use this resolver to resolve initial mock-api for the application
   *
   * @param route
   * @param state
   */
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    console.log('Patient Inital Data Resolver, starting to fetch initial data');
      await this._userService.initializeEffect()
      await this.data.userSettings({ input: { name: 'formly_Page_Settings' } }).subscribe((response) => {
        if(response.data?.items?.length > 0) {
          const { language, currency, dateFormat, timeFormat } = JSON.parse(response.data?.items?.at(0).value ?? '{}');
          this.fuseConfigService.setFormlyConfig(language, currency, dateFormat, timeFormat);
        }
      })
      await this.data.fetchAndCacheFormLayouts('page_patient').subscribe();
      console.log('Inital Data Resolver, finished to fetch initial data');
      return this._userService.user$;
  }
}

@Injectable({
  providedIn: 'root',
})
export class ProviderInitialDataResolver implements Resolve<any> {
  /**
   * Constructor
   */
  constructor(
      private _userService: WebAuthStore,
      private data: WebCoreDataAccessService,
      private fuseConfigService: FuseConfigService,
  ) { }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Use this resolver to resolve initial mock-api for the application
   *
   * @param route
   * @param state
   */
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    console.log('Provider Inital Data Resolver, starting to fetch initial data');
      await this._userService.initializeEffect()
      await this.data.userSettings({ input: { name: 'formly_Page_Settings' } }).subscribe((response) => {
        if(response.data?.items?.length > 0) {
          const { language, currency, dateFormat, timeFormat } = JSON.parse(response.data?.items?.at(0).value ?? '{}');
          this.fuseConfigService.setFormlyConfig(language, currency, dateFormat, timeFormat);
        }
      })
      await this.data.fetchAndCacheFormLayouts('page_provider').subscribe();
      console.log('Provider Inital Data Resolver, finished to fetch initial data');
      return this._userService.user$;
  }
}

@Injectable({
  providedIn: 'root',
})
export class AttorneyInitialDataResolver implements Resolve<any> {
  /**
   * Constructor
   */
  constructor(
      private _userService: WebAuthStore,
      private data: WebCoreDataAccessService,
      private fuseConfigService: FuseConfigService,
  ) { }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Use this resolver to resolve initial mock-api for the application
   *
   * @param route
   * @param state
   */
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    console.log('Attorney Inital Data Resolver, starting to fetch initial data');
      await this._userService.initializeEffect()
      await this.data.userSettings({ input: { name: 'formly_Page_Settings' } }).subscribe((response) => {
        if(response.data?.items?.length > 0) {
          const { language, currency, dateFormat, timeFormat } = JSON.parse(response.data?.items?.at(0).value ?? '{}');
          this.fuseConfigService.setFormlyConfig(language, currency, dateFormat, timeFormat);
        }
      })
      await this.data.fetchAndCacheFormLayouts('page_attorney').subscribe();
      console.log('Attorney Inital Data Resolver, finished to fetch initial data');
      return this._userService.user$;
  }
}

@Injectable({
    providedIn: 'root',
})
export class BreadCrumbResolver implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(
        private _breadcrumbService: WebUiBreadcrumService
    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Use this resolver to resolve initial mock-api for the application
     *
     * @param route
     * @param state
     */
    async resolve(): Promise<any> {
        // await this._userService.initializeEffect()
        return this._breadcrumbService.breadCrumbs;
        // return await this._userService.vm$.pipe(map(asdf => {
        //     return asdf
        // })).subscribe(newUser => {
        //     return newUser
        // })
        // console.log("User: ", user);
        // return user;
    }
}

@Injectable({
    providedIn: 'root'
})
export class LegalCaseResolver implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(
        private _legalCaseService: WebLegalCaseDetailStore
    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Use this resolver to resolve initial mock-api for the application
     *
     * @param route
     * @param state
     */
    async resolve(): Promise<any> {
        return this._legalCaseService.item$;
    }
}
@Injectable({
    providedIn: 'root',
})
export class UserRoleResolver implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(
        private _userService: WebAuthStore
    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Use this resolver to resolve initial mock-api for the application
     *
     * @param route
     * @param state
     */
    async resolve(): Promise<any> {
        // await this._userService.initializeEffect()
        return this._userService.userRoles$;
        // return await this._userService.vm$.pipe(map(asdf => {
        //     return asdf
        // })).subscribe(newUser => {
        //     return newUser
        // })
        // console.log("User: ", user);
        // return user;
    }
}
