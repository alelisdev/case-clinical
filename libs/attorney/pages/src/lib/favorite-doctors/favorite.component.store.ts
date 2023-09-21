import { AttorneyBaseState, AttorneyBaseStore } from '../attorney-page.base.store'
import { Injectable, Injector } from '@angular/core'
import { switchMap, of, tap } from 'rxjs'
import { tapResponse } from '@ngrx/component-store'
import { WebClinicalProviderFeatureStore } from '@case-clinical/web/clinical-provider/shared'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { WebDocumentFeatureStore } from '@case-clinical/web/document/shared'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

export interface FavoriteDoctorsState extends AttorneyBaseState {
  loading: boolean
  query: string
}

@Injectable()
export class FavoriteDoctorsStore extends AttorneyBaseStore<FavoriteDoctorsState> {
  constructor(
    private data: WebCoreDataAccessService,
    private documentStore: WebDocumentFeatureStore,
    private providerStore: WebClinicalProviderFeatureStore,
    private toast: WebUiToastService,
    injector: Injector,
  ) {
    super(injector)

    this.providerStore.setFavorites(true)
    this.providerStore.loadClinicalProvidersEffect()
  }

  loading$ = this.select((s) => s.loading)
  doctors$ = this.providerStore.clinicalProviders$.pipe(
    switchMap((clinicalProviders) => {
      return of(
        clinicalProviders.map((item) => {
          let specialitesCount = 0
          item?.clinicalProviderSpecialties?.map(({ specialty }) => {
            specialitesCount++
          })

          return {
            ...item,
            mainLocation: item.clinicalProviderLocations?.at(0)?.location,
            mainSpecialty: item.clinicalProviderSpecialties?.at(0)?.specialty?.name,
            locations: item?.clinicalProviderLocations?.map(({ location }) => ({
              id: location?.id,
              name: location?.name,
              document: location?.locationImages?.at(0),
            })),
            services: item?.services,
            specialitesCount: specialitesCount - 3,
            specialties: item?.clinicalProviderSpecialties?.slice(0, 3),
            recommendPercent: 0,
          }
        }),
      )
    }),
  )

  attachment$ = this.documentStore.item$.pipe(
    tap((document) => {
      if (document && !document.attachment) {
        this.toast.error('Cannot find attachment file!', { duration: 2000 })
      }
    }),
  )

  vm$ = this.select(this.loading$, this.doctors$, this.user$, (loading, doctors, user) => ({
    loading,
    doctors,
    user,
  }))

  updateFavoriteProviderEffect = this.effect<{ clinicalProviderId: string; like: boolean }>((data$) =>
    data$.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(({ clinicalProviderId }) => {
        return this.data.userRemoveFromFavorites({ clinicalProviderId }).pipe(
          tapResponse(
            (response) => {
              this.toast.success('Removed from favorites', { duration: 2000 })
              this.providerStore.removeClinicalProvider(response.data?.updated as any)
            },
            (errors: any) => {
              this.toast.error(errors.graphQLErrors[0].message)
            },
          ),
        )
      }),
    ),
  )

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
