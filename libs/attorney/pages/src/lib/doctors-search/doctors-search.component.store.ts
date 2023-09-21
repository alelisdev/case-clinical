import { AttorneyBaseState, AttorneyBaseStore } from '../attorney-page.base.store'
import { FormlyModalController } from '@case-clinical/web/ui/formly-designer'
import { Inject, Injectable, Injector } from '@angular/core'
import { of, switchMap, tap, withLatestFrom } from 'rxjs'
import { tapResponse } from '@ngrx/component-store'
import { WebAppointmentFeatureStore } from '@case-clinical/web/appointment/shared'
import { WebClinicalProviderLocationFeatureStore } from '@case-clinical/web/clinical-provider-location/shared';
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { WebDocumentFeatureStore } from '@case-clinical/web/document/shared'
import { WebLegalCaseFeatureStore } from '@case-clinical/web/legal-case/shared'
import { WebSpecialtyFeatureStore } from '@case-clinical/web/specialty/shared'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

export interface DoctorsSearchState extends AttorneyBaseState {
  centerLatitude: string | undefined
  centerLongitude: string | undefined
  loading: boolean
  query: string
}

@Injectable()
export class DoctorsSearchStore extends AttorneyBaseStore<DoctorsSearchState> {
  private addAppointmentModalController?: FormlyModalController

  constructor(
    injector: Injector,
    private appointmentstore: WebAppointmentFeatureStore,
    private data: WebCoreDataAccessService,
    private documentStore: WebDocumentFeatureStore,
    private legalCaseStore: WebLegalCaseFeatureStore,
    private specialtyStore: WebSpecialtyFeatureStore,
    private toast: WebUiToastService,
    @Inject('listProviderLocationStore') private listProviderLocationStore: WebClinicalProviderLocationFeatureStore,
  ) {
    super(injector)

    this.loadLegalCasesEffect()
    this.specialtyStore.loadSpecialtiesEffect()

    this.listProviderLocationStore.setDistance(100);
  }

  /** Selectors */
  centerLongitude$ = this.select((s) => s.centerLongitude)
  centerLatitude$ = this.select((s) => s.centerLatitude)
  loading$ = this.select((s) => s.loading)
  legalCases$ = this.legalCaseStore.legalCases$
  specialties$ = this.specialtyStore.specialties$

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

  attachment$ = this.documentStore.item$.pipe(
    tap((document) => {
      if (document && !document.attachment) {
        this.toast.error('Cannot find attachment file!', { duration: 2000 })
      }
    }),
  )

  searchable$ = this.select(this.centerLongitude$, this.centerLatitude$, (longitude, latitude) => longitude && latitude);

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
  /** Selectors */

  /** Updaters */
  readonly setCenterLatitude = this.updater((state, centerLatitude: any) => ({
    ...state,
    centerLatitude: centerLatitude.toString(),
  }))

  readonly setCenterLongitude = this.updater((state, centerLongitude: any) => ({
    ...state,
    centerLongitude: centerLongitude.toString(),
  }))

  /** Updaters */

  /** Effects */
  loadLegalCasesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      withLatestFrom(this.attorneyId$),
      switchMap(([, attorneyId]) => {
        this.legalCaseStore.setAttorneyId(attorneyId as string)
        this.legalCaseStore.loadLegalCasesEffect()
        return of(true)
      }),
    ),
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
  /** Effects */

  /** Begin Appointment **/
  setAddAppointmentModalController(controller: FormlyModalController) {
    this.addAppointmentModalController = controller
  }

  openAddAppointmentDialog(providerLocation: any) {
    this.addAppointmentModalController?.open({
      clinicalProviderId: providerLocation?.clinicalProviderId,
      locationId: providerLocation.location?.id,
      provider: providerLocation.clinicalProvider,
      location: providerLocation.location,
    }, {
      legalCases: this.legalCases$,
      provider: providerLocation.clinicalProvider,
      location: providerLocation.location,
    }, this)
  }

  saveAppointment(data: any) {
    const createListener = this.appointmentstore.actionResult$.subscribe((result) => {
      if (result) {
        const { done } = result
        if (done) {
          this.addAppointmentModalController?.close()
          createListener.unsubscribe()
        }
      }
    })
    const {appointmentDateAndTime, clinicalProviderId, legalCaseId, locationId, name, patientId, start} = data;
    this.appointmentstore.createAppointmentEffect({appointmentDateAndTime, clinicalProviderId, legalCaseId, locationId, name, patientId, start})
  }
  /** End Appointment **/

  /** Callback Functions Called By UI */
  searchQueryDidChange(value: string) {
    localStorage.setItem('queryFilter', value);
    this.listProviderLocationStore.setProviderName(value)
    this.searchProviderLocationsEffect();
  }

  filterBySpecialist(specialites: string[]) {
    localStorage.setItem('specialtyFilter', specialites.join(","));
    this.listProviderLocationStore.setSpecialties(specialites)
    this.searchProviderLocationsEffect();
  }

  filterByLocation(location: any) {
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

  filterByFavorites(value: boolean) {
    this.listProviderLocationStore.setFavorite(value)
    this.listProviderLocationStore.setSkip(0);
    this.searchProviderLocationsEffect();
  }
  /** Callback Functions Called By UI */

  override getInitialState(): DoctorsSearchState {
    return {
      centerLatitude: undefined,
      centerLongitude: undefined,
      loading: false,
      query: '',
    }
  }
}
