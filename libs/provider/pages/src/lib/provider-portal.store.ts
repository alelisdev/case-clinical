import { ComponentStore } from '@ngrx/component-store';
import { Injectable } from "@angular/core";
import { WebAuthStore } from '@case-clinical/web/auth/data-access';
import { WebClinicalProviderFeatureStore } from '@case-clinical/web/clinical-provider/shared';
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access';
import { WebVendorFeatureStore } from '@case-clinical/web/vendor/shared';
import { WebClinicalProviderLocationFeatureStore } from '@case-clinical/web/clinical-provider-location/shared';

export interface ProviderPortalState {
  loading: boolean
  query: string
  selectedProviderId?: string
  selectedProviderLocationId?: string

}

@Injectable({ providedIn: 'root' })
export class ProviderPortalStore extends ComponentStore<ProviderPortalState> {
  constructor(
    private providerStore: WebClinicalProviderFeatureStore,
    private providerLocationStore: WebClinicalProviderLocationFeatureStore,

    private authStore: WebAuthStore,
    private vendorStore: WebVendorFeatureStore,
    private data: WebCoreDataAccessService,
  ) {
    super({
      query: '',
      loading: false,
    })

    this.authStore.user$.subscribe((user) => {
      console.log({ user })
      if (user?.vendorId) {
        this.vendorStore.loadVendorEffect(user.vendorId)
      }
    })

    this.loadData();
  }

  public providers$ = this.providerStore.clinicalProviders$
  readonly vendor$ = this.vendorStore.item$

  readonly user$ = this.authStore.user$

  readonly selectedProviderId$ = this.select((s) => {
    return s.selectedProviderId ?? 'all'
  })

  readonly selectedProviderLocationId$ = this.select((s) => {
    return s.selectedProviderLocationId ?? 'all'
  })


  readonly providerOptions$ = this.select(
    this.providers$,
    (providers) => {
      const options = providers?.map((provider) => {
        const { id, name } = provider;
        return {
          id, name,
        }
      });
      return [
        {
          id: "all",
          name: 'All'
        },
        ...options
      ]
    })

    

  readonly loading$ = this.select(s => s.loading)

  readonly setSelectedProviderId = this.updater((state, selectedProviderId: string) => {
    return { ...state, selectedProviderId }
  })

  readonly setSelectedProviderLocationId = this.updater((state, selectedProviderLocationId: string) => {
    return { ...state, selectedProviderLocationId }
  })

  loadData() {
    this.providerStore.loadClinicalProvidersEffect()


  }
}
