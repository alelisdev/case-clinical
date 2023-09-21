import { DateFilterInput } from '@case-clinical/web/core/data-access'
import { Subject, of, switchMap, tap, withLatestFrom } from 'rxjs'
import { Inject, Injectable, Injector } from '@angular/core'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { PatientBaseState, PatientBaseStore } from '../patient-pages.base.store'
import { tapResponse } from '@ngrx/component-store'
import { WebDocumentFeatureStore } from '@case-clinical/web/document/shared'
import { WebSpecialtyFeatureStore } from '@case-clinical/web/specialty/shared'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { WebClinicalProviderLocationFeatureStore } from '@case-clinical/web/clinical-provider-location/shared'

export interface DoctorsState extends PatientBaseState {
  centerLatitude: string | undefined
  centerLongitude: string | undefined
  dateFilter?: DateFilterInput
 
  loading: boolean
  query: string
 
}

@Injectable()
export class DoctorsStore extends PatientBaseStore<DoctorsState> {
  constructor(
    private data: WebCoreDataAccessService,
    private documentStore: WebDocumentFeatureStore,
    private specialtyStore: WebSpecialtyFeatureStore,
    private toast: WebUiToastService,
    @Inject('listProviderLocationStore') private listProviderLocationStore: WebClinicalProviderLocationFeatureStore,
    injector: Injector,
  ) {
    super(injector)
    this.specialtyStore.loadSpecialtiesEffect()
    this.listProviderLocationStore.setDistance(100);
  }

  /******* Selectors Start ******/

  centerLatitude$ = this.select((s) => s.centerLatitude)
  centerLongitude$ = this.select((s) => s.centerLongitude)
  dateFilter$ = this.select((s) => s.dateFilter)
  specialties$ = this.specialtyStore.specialties$
  loading$ = this.select((s) => s.loading)

  providerLocations$ = this.listProviderLocationStore.formattedClinicalProviderLocations$.pipe(tap(locations => console.log(locations)));
  mapProviderLocations$ = this.select(this.providerLocations$, (providerLocations) => {
    return providerLocations.map((providerLocation) => ({
      ...providerLocation,
      latitude: providerLocation.location?.latitude,
      longitude: providerLocation.location?.longitude,
    }))
  })

  locationsCount$ = this.select(this.providerLocations$, (providerLocations) => providerLocations?.length ?? 0)
  listProviderLocationsPaging$ = this.listProviderLocationStore.paging$;

  searchable$ = this.select(this.centerLongitude$, this.centerLatitude$, (longitude, latitude) => longitude && latitude);
  attachment$ = this.documentStore.item$.pipe(
    tap((document) => {
      if (document && !document.attachment) {
        this.toast.error('Cannot find attachment file!', { duration: 2000 })
      }
    }),
  )
  /******* Selectors End ******/
  vm$ = this.select(
    this.loading$,
    this.user$,
    this.centerLongitude$,
    this.centerLatitude$,
    this.searchable$,
    this.locationsCount$,
    (
      loading,
      user,
      centerLongitude,
      centerLatitude,
      searchable,
      locationsCount,
    ) => {
      return {
        loading,
        doctorsCount: locationsCount,
        user,
        centerLongitude,
        centerLatitude,
        searchable,
      }
    },
  )
  /******** Updater Start *********/
  public inputSubject = new Subject<string>()
  readonly setCenterLatitude = this.updater((state, centerLatitude: any) => ({
    ...state,
    centerLatitude: centerLatitude.toString(),
  }))
  readonly setCenterLongitude = this.updater((state, centerLongitude: any) => ({
    ...state,
    centerLongitude: centerLongitude.toString(),
  }))
  readonly setCurrentPatientId = this.updater((state, currentPatientId: any) => ({
    ...state,
    currentPatientId: currentPatientId.toString(),
  }))
  readonly setDateFilter = this.updater((state, dateFilter: DateFilterInput) => ({
    ...state,
    dateFilter,
  }))
  readonly setSkip = this.updater((state, skip: number) => ({
    ...state,
    skip,
  }))
  readonly setViewMode = this.updater((state, viewMode: 'List' | 'Calendar') => ({
    ...state,
    viewMode,
  }))
  /******** Updater End *********/

  /******** Effects Start *********/
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
                this.listProviderLocationStore.updateClinicalProvider(response.data?.updated as any)
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
                this.listProviderLocationStore.updateClinicalProvider(response.data?.updated as any)
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


  searchProviderLocationsEffect = this.effect<void>($ => $.pipe(
    tap(() => { this.patchState({ loading: true }) }),
    withLatestFrom(this.searchable$),
    switchMap(([, searchable]) => {
      if(searchable) {
        this.listProviderLocationStore.loadClinicalProviderLocationsEffect()
      }
      return of(true);
    })
  ))
  /******** Effects End *********/

  /**********  Callback Functions Start ***********/
  searchQueryDidChange(value: string) {
    localStorage.setItem('queryFilter', value);
    this.listProviderLocationStore.setProviderName(value)
    this.searchProviderLocationsEffect();
  }

  filterBySpecialist(specialites: string[]) {
    if(specialites){
      localStorage.setItem('specialtyFilter', specialites.join(","));
      this.listProviderLocationStore.setSpecialties(specialites)
    }
    this.searchProviderLocationsEffect();
  }

  filterByLocation(location: any) {
    if(location)
      this.listProviderLocationStore.setCenterLocation(location)
    this.searchProviderLocationsEffect();
  }

  filterByDistance(distance: number) {
    if (distance) {
      localStorage.setItem('distanceFilter', distance.toString());

      this.listProviderLocationStore.setDistance(Number(distance))
      this.searchProviderLocationsEffect();
    }
  }


  loadImageDetail(documentId: string) {
    this.documentStore.loadDocumentEffect(documentId)
  }

  /**********  Callback Functions End ***********/

  override getInitialState(): DoctorsState {
    return {
      centerLatitude: undefined,
      centerLongitude: undefined,
      dateFilter: undefined,
      
      loading: false,
      query: '',
    
    }
  }
}
