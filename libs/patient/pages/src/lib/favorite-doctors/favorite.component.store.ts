import { tapResponse } from '@ngrx/component-store'
import { Injectable, Injector } from '@angular/core'
import { of, switchMap, tap } from 'rxjs'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { PatientBaseState, PatientBaseStore } from '../patient-pages.base.store'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { WebDocumentFeatureStore } from '@case-clinical/web/document/shared'
import { WebClinicalProviderLocationFeatureStore } from '@case-clinical/web/clinical-provider-location/shared'

export interface FavoriteDoctorsState extends PatientBaseState {
  loading: boolean
  query: string
}

@Injectable()
export class FavoriteDoctorsStore extends PatientBaseStore<FavoriteDoctorsState> {
  constructor(
    private toast: WebUiToastService,
    private documentStore: WebDocumentFeatureStore,
    private providerLocationStore: WebClinicalProviderLocationFeatureStore,
    private data: WebCoreDataAccessService,
    injector: Injector,
  ) {
    super(injector)
    this.providerLocationStore.setFavorite(true)
    this.providerLocationStore.loadClinicalProviderLocationsEffect()
  }

  loading$ = this.select((s) => s.loading)
  
  providerLocations$ = this.providerLocationStore.formattedClinicalProviderLocations$.pipe(tap(locations => console.log(locations)));
  
  locationsCount$ = this.select(this.providerLocations$, (providerLocations) => providerLocations?.length ?? 0)

  attachment$ = this.documentStore.item$.pipe(
    tap((document) => {
      if (document && !document.attachment) {
        this.toast.error('Cannot find attachment file!', { duration: 2000 })
      }
    }),
  )

  vm$ = this.select(
    this.loading$,
    this.user$,
    this.membership$,
    this.locationsCount$,
    (loading, user, membership,locationsCount) => ({
      loading,
      user,
      membership,
      doctorsCount: locationsCount,
    }),
  )

  updateFavoriteProviderEffect = this.effect<{ clinicalProviderId: string; like: boolean }>((data$) =>
    data$.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(({ clinicalProviderId, like }) => {
        if (!like) {
          return this.data.userRemoveFromFavorites({ clinicalProviderId }).pipe(
            tapResponse(
              (response) => {
                this.toast.success('Removed from favorites', { duration: 2000 })
                this.providerLocationStore.updateClinicalProvider(response.data?.updated as any)
                this.providerLocationStore.loadClinicalProviderLocationsEffect()
              },
              (errors: any) => {
                this.toast.error(errors.graphQLErrors[0].message)
              },
            ),
          )
        } else {
          return this.data.userAddToFavorites({ clinicalProviderId }).pipe(
            tapResponse(
              (response) => {
                this.toast.success('Successfully added to favorites', { duration: 2000 })
                this.providerLocationStore.updateClinicalProvider(response.data?.updated as any)
              },
              (errors: any) => {
                this.toast.error(errors.graphQLErrors[0].message)
              },
            ),
          )
        }
      }),
    ),
  )


  loadClinicalProviderLocationsEffect = this.effect<void>($ => $.pipe(
    tap(() => { this.patchState({ loading: true }) }),
    switchMap(() => {
      this.providerLocationStore.loadClinicalProviderLocationsEffect()
      return of(true);
    })
  ))
  loadImageDetail(documentId: string) {
    this.documentStore.loadDocumentEffect(documentId)
  }

  override getInitialState(): FavoriteDoctorsState {
    return {
      query: '',
      loading: false,
    }
  }
}
