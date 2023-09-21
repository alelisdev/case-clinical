import { AttorneyBaseState, AttorneyBaseStore } from '../attorney-page.base.store'
import { ClinicalProvider, DateFilterInput, WebCoreDataAccessService } from '@case-clinical/web/core/data-access';
import { EMPTY, of, switchMap, tap, withLatestFrom } from 'rxjs'
import { FormlyModalController } from '@case-clinical/web/ui/formly-designer'
import { Inject, Injectable, Injector } from '@angular/core'
import { ModalController } from '@case-clinical/web/ui/form'
import { tapResponse } from '@ngrx/component-store'
import { VendorStats } from '@case-clinical/api/vendor/data-access';
import { WebAppointmentFeatureStore } from '@case-clinical/web/appointment/shared'
import { WebClinicalProviderLocationFeatureStore } from '@case-clinical/web/clinical-provider-location/shared';
import { WebLegalCaseFeatureStore } from '@case-clinical/web/legal-case/shared'
import { WebLocationFeatureStore } from '@case-clinical/web/location/shared'
import { WebServiceFeatureStore } from '@case-clinical/web/service/shared'
import { WebSpecialtyFeatureStore } from '@case-clinical/web/specialty/shared'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import * as moment from 'moment'
import { addMinutesToTime } from '@case-clinical/shared/util/helpers';

export interface DashboardState extends AttorneyBaseState {
  loading: boolean
  query: string
  selectedDate: Date | undefined,
  stats?: VendorStats,
  centerLatitude: string | undefined
  centerLongitude: string | undefined
}

@Injectable()
export class DashboardStore extends AttorneyBaseStore<DashboardState> {
  private leadCreateModalControl?: ModalController
  private providerSearchModalControl?: ModalController

  private searchValue: string | undefined
  private selectedServices: string[] | undefined
  private selectedSpecialites: string[] | undefined
  private distance = '100';

  private truamaModalControl?: ModalController
  private ratingbarModalControl?: FormlyModalController

  private addAppointmentModalController?: ModalController
  private addAppointmentFormlyModalController?: FormlyModalController
  private addRatingFormlyModalController?: FormlyModalController
  private searchFilterFormlyModalController?: FormlyModalController
  private clickAppointmentFormlyModalController?: FormlyModalController

  rxFormlyModalController?: FormlyModalController;
  imagingFormlyModalContoller?: FormlyModalController;
  recOrdersFormlyModalController?: FormlyModalController;
  referralsFormlyModalController?: FormlyModalController;
  appointmentsFormlyModalController?: FormlyModalController;

  constructor(
    @Inject('calendarAppointmentStore') private calendarAppointmentStore: WebAppointmentFeatureStore,
    @Inject('listAppointmentStore') private listAppointmentStore: WebAppointmentFeatureStore,
    @Inject('listProviderLocationStore') private listProviderLocationStore: WebClinicalProviderLocationFeatureStore,
    injector: Injector,
    private data: WebCoreDataAccessService,
    private legalCasestore: WebLegalCaseFeatureStore,
    private locationStore: WebLocationFeatureStore,
    private serviceStore: WebServiceFeatureStore,
    private specialtyStore: WebSpecialtyFeatureStore,
    private toast: WebUiToastService,
  ) {
    super(injector)

    this.listAppointmentStore.setLimit(10);
    this.listAppointmentStore.loadAppointmentsEffect()

    this.legalCasestore.setLimit(10)
    this.loadLegalCasesEffect('me');
    this.legalCasestore.loadLegalCasesUpdatesEffect()

    this.listProviderLocationStore.setDistance(100);

    this.serviceStore.loadServicesEffect()
    this.specialtyStore.loadSpecialtiesEffect()
    this.loadVendorStatsEffect();
  }

  loading$ = this.select((s) => s.loading)
  centerLongitude$ = this.select((s) => s.centerLongitude)
  centerLatitude$ = this.select((s) => s.centerLatitude)
  searchable$ = this.select(this.centerLongitude$, this.centerLatitude$, (longitude, latitude) => longitude && latitude);
  stats$ = this.select(s => s.stats)
  appointmentEvents$ = this.select(this.calendarAppointmentStore.formattedAppointments$, (appointments) => {
    return appointments.map((appointment)=>{
      if(!appointment?.end){
        appointment.end = addMinutesToTime(appointment.start?? "00:00",appointment.duration ?? 0)
      }
      return {
        ...appointment,
        id: appointment.id,
        start: new Date(`${moment(appointment.appointmentDateAndTime).format("MM-DD-yyyy")} ${appointment.start}`),
        end: new Date(`${moment(appointment.appointmentDateAndTime).format("MM-DD-yyyy")} ${appointment.end ?? '?'}`),
        title: `${appointment.clinicalProvider?.name} ${appointment.start} - ${appointment.end ?? '?'}`,
        data: appointment
      }
    }).filter(c=>c.appointmentDateAndTime && c.start && c.end > c.start)
  })

  providerLocations$ = this.listProviderLocationStore.formattedClinicalProviderLocations$.pipe(tap(locations => console.log(locations)));
  mapProviderLocations$ = this.select(this.providerLocations$, (providerLocations) => {
    return providerLocations.map((providerLocation) => ({
      ...providerLocation,
      latitude: providerLocation.location?.latitude,
      longitude: providerLocation.location?.longitude,
    }))
  })
  locationsCount$ = this.select(this.providerLocations$, (providerLocations) => providerLocations?.length ?? 0)

  appointments$ = this.listAppointmentStore.appointments$
    .pipe(
      switchMap((appointments) => {
        return of(
          appointments.filter(
            (item) => {
              return item.clinicalProviderId;
            }
          )
        )
      })
    )

  legalCases$ = this.legalCasestore.legalCases$
  legalCasesPaging$ = this.legalCasestore.paging$
  legalCaseUpdates$ = this.legalCasestore.legalCaseUpdates$
  locations$ = this.locationStore.locations$
  selectedDate$ = this.select((s) => s.selectedDate);

  dayAppointments$ = this.select(this.appointments$, this.selectedDate$, (appointments, selectedDate) => {
    return appointments.filter((appointment) => {
      if (moment(moment(appointment.appointmentDateAndTime).format('MM-DD-yyyy')).isSame(moment(selectedDate)))
        return true;
      else return false;
    });
  });

  legalCaseUpdatesCount$ = this.legalCaseUpdates$.pipe(switchMap((legalCaseUpdates) => of(legalCaseUpdates.length ?? 0)))

  services$ = this.serviceStore.services$
  specialties$ = this.specialtyStore.specialties$

  bills$ = this.appointments$.pipe(
    switchMap((appointment) => {
      const result: any[] = []
      appointment.map((item) => {
        if (item?.medicalReportId) {
          result.push({
            ...item,
            name: item?.clinicalProvider?.name,
            document: item?.medicalReport?.name,
            // createdAt: item?.medicalReport?.createdAt,
          })
        }
        if (item?.billId) {
          result.push({
            ...item,
            name: item?.clinicalProvider?.name,
            document: item?.bill?.name,
          })
        }
      })
      return of(result)
    }),
  )

  vm$ = this.select(
    this.loading$,
    this.stats$,
    this.appointments$,
    this.bills$,
    this.user$,
    this.legalCaseUpdates$,
    this.legalCaseUpdatesCount$,
    this.searchable$,
    this.locationsCount$,
    (
      loading,
      stats,
      appointments,
      bills,
      user,
      legalCaseUpdates,
      legalCaseUpdatesCount,
      searchable,
      locationsCount,
    ) => {
      return {
        loading,
        stats,
        user,
        bills,
        dayOfWeek: new Date().toLocaleDateString('en-US', { weekday: 'long' }),
        today: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
        legalCaseUpdates,
        legalCaseUpdatesCount,
        searchable,
        locationsCount,
      }
    },
  )

  loadVendorStatsEffect = this.effect($ => $.pipe(
    tap(() => { this.patchState({ loading: true }) }),
    withLatestFrom(this.attorneyId$),
    switchMap(([, providerId]) => {
      return this.data.userVendorStats({ providorId: providerId as string }).pipe(
        tapResponse(
          (res) => {
            this.setStats({
              totalPatientCount: res.data.stats?.totalPatientCount ?? 0,
              todayPatientCount: res.data.stats?.todayPatientCount ?? 0,
              appointmentCount: res.data.stats?.appointmentCount ?? 0,
              totalPatientPercent: res.data.stats?.totalPatientPercent ?? 0,
              todayPatientPercent: res.data.stats?.todayPatientPercent ?? 0,
              appointmentsPercent: res.data.stats?.appointmentsPercent ?? 0,
            })
          },
          (error) => {
            this.patchState({
              loading: false
            })
          }
        )
      )
    }
    )
  ));
  setSelectedDate = this.updater((state, date: Date) => ({ ...state, selectedDate: date }))
  readonly setCenterLatitude = this.updater((state, centerLatitude: any) => ({
    ...state,
    centerLatitude: centerLatitude.toString(),
  }))
  setStats = this.updater((state, stats?: VendorStats) => ({ ...state, stats }))

  readonly setCenterLongitude = this.updater((state, centerLongitude: any) => ({
    ...state,
    centerLongitude: centerLongitude.toString(),
  }))

  setAppointmentsEffect = this.effect<string>((allOrMe$) =>
    allOrMe$.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      withLatestFrom(this.user$),
      switchMap(([allOrMe, user]) => {
        if (!user) return EMPTY
        const { attorneyId } = user as any
        if (allOrMe == 'all') {
          this.listAppointmentStore.setAttorneyId('all')
        }
        if (allOrMe == 'me') {
          this.listAppointmentStore.setAttorneyId(attorneyId)
        }
        this.listAppointmentStore.setLimit(10);
        this.calendarAppointmentStore.loadAppointmentsEffect()
        return of(true)
      }),
    ),
  )

  loadLegalCasesEffect = this.effect<string>((allOrMe$) =>
  allOrMe$.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      withLatestFrom(this.attorneyId$),
      switchMap(([allOrMe, attorneyId]) => {
        if (allOrMe == 'all') {
          this.legalCasestore.setAttorneyId(undefined)
        }
        if (allOrMe == 'me') {
          this.legalCasestore.setAttorneyId(attorneyId as string)
        }
        this.legalCasestore.loadLegalCasesEffect()
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
                this.listProviderLocationStore.updateClinicalProvider(response.data?.updated as ClinicalProvider)
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
                this.listProviderLocationStore.updateClinicalProvider(response.data?.updated as ClinicalProvider)
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

  /** Lead Create **/
  openLeadCreateModal() {
    this.leadCreateModalControl?.open()
  }
  closeLeadCreateModal() {
    this.leadCreateModalControl?.close()
  }
  setLeadCreateModalControl(control: ModalController) {
    this.leadCreateModalControl = control
  }
  /** Lead Create **/

  openTruamaCreateModal() {
    this.truamaModalControl?.open()
  }

  setTruamaCreateModalControl(control: ModalController) {
    this.truamaModalControl = control
  }

  openRatingbarCreateModal() {
    this.ratingbarModalControl?.open({}, {}, this);
  }

  closeRatingbarCreateModal() {
    this.ratingbarModalControl?.close()
  }

  setRatingbarCreateModalControl(control: FormlyModalController) {
    this.ratingbarModalControl = control
  }

  openProviderSearchModal() {
    this.providerSearchModalControl?.open({
      selectedSpecialty: this.selectedSpecialites,
      selectedServices: this.selectedServices,
      searchValue: this.searchValue,
      searchRange: this.distance,
    })
  }

  setProviderSearchModalControl(control: ModalController) {
    this.providerSearchModalControl = control
  }

  setBodySpcialities(specialites: any[]) {
    const temp: string[] = []
    specialites.forEach((item) => {
      temp.push(item?.id)
    })
    this.selectedSpecialites = temp
  }

  saveTruamaCashData() {
    console.log('Save Data')
  }

  setLegalCasesSkip(skip: number) {
    this.legalCasestore.setSkip(skip)
    this.legalCasestore.loadLegalCasesEffect()
  }

  setRxFormlyModalController(controller: FormlyModalController) {
    this.rxFormlyModalController = controller;
  }

  setImagingFormlyModalContoller(controller: FormlyModalController) {
    this.imagingFormlyModalContoller = controller;
  }

  setRecOrdersFormlyModalController(controller: FormlyModalController) {
    this.recOrdersFormlyModalController = controller;
  }

  setReferralsFormlyModalController(controller: FormlyModalController) {
    this.referralsFormlyModalController = controller;
  }

  setAppointmentsFormlyModalController(controller: FormlyModalController) {
    this.appointmentsFormlyModalController = controller;
  }


  openRxFormlyModalController() {
    this.rxFormlyModalController?.open({}, {}, {});
  }

  openImagingFormlyModalContoller() {
    this.imagingFormlyModalContoller?.open({}, {}, {});
  }

  openRecOrdersFormlyModalController() {
    this.recOrdersFormlyModalController?.open({}, {}, {});
  }

  openReferralsFormlyModalController() {
    this.referralsFormlyModalController?.open({}, {}, {});
  }

  openAppointmentsFormlyModalController() {
    this.appointmentsFormlyModalController?.open({}, {}, {});
  }

  setClickAppointmentFormlyModalController(controller: FormlyModalController) {
    this.clickAppointmentFormlyModalController = controller;
  }

  setSearchFilterFormlyModalController(controller: FormlyModalController) {
    this.searchFilterFormlyModalController = controller
  }

  setAddAppointmentFormlyModalController(controller: FormlyModalController) {
    this.addAppointmentFormlyModalController = controller;
  }

  setAddRatingFormlyModalController(controller: FormlyModalController) {
    this.addRatingFormlyModalController = controller;
  }

  openAddAppointmentDialog() {
    this.addAppointmentModalController?.open()
  }

  loadClinicalProviderLocations(clinicalProviderId: string) {
    this.locationStore.setClinicalProviderId(clinicalProviderId)
    this.locationStore.loadLocationsEffect()
  }

  openClickAppointmentDialog() {
    this.clickAppointmentFormlyModalController?.open({}, {}, {});
  }

  createAppointment(date: any) {
    this.setSelectedDate(date);
    this.dayAppointments$.subscribe((appointments) => {
      this.addAppointmentFormlyModalController?.open({}, { dayAppointments: appointments }, {});
    }).unsubscribe();
  }

  saveAppointment(data: any) {
    this.listAppointmentStore.createAppointmentEffect(data)
  }

  valueChangedByName(value: string) {
    this.searchValue = value
  }

  filterBySpecialist(specialites: string[]) {
    this.selectedSpecialites = specialites
  }

  /** Clinical Provider Search Filters **/
  setLocationFilter(location: any) {
    this.listProviderLocationStore.setCenterLocation(location)
  }

  setDistanceFilter(distance: any) {
    if (distance) {
      this.listProviderLocationStore.setDistance(Number(distance))
      this.distance = distance;
    }
  }
  /** Clinical Provider Search Filters **/

  filterByServicelist(services: string[]) {
    this.selectedServices = services
  }

  searchProvider() {
    this.providerSearchModalControl?.close()
    this.listProviderLocationStore.setProviderName(this.searchValue ?? of(''))
    this.listProviderLocationStore.setSpecialties(this.selectedSpecialites ?? of([]))
    this.listProviderLocationStore.loadClinicalProviderLocationsEffect()
  }

  clearProviderSearchFilter() {
    this.listProviderLocationStore.setProviderName(undefined)
    this.listProviderLocationStore.setSpecialties(undefined)
    this.selectedSpecialites = []
    this.selectedServices = []
    this.searchValue = ''
    this.listProviderLocationStore.clear();
  }

  valueChangedLegalCaseByName(value: string) {
    this.legalCasestore.setSearchQuery(value)
    this.legalCasestore.loadLegalCasesEffect()
  }

  calendarDateRangeDidChange(dates: { start: Date, end: Date }) {
    const filter = {} as DateFilterInput;
    filter.startDate = dates.start;
    filter.endDate = dates.end;
    filter.operator = "In";
    this.calendarAppointmentStore.setDateFilter(filter);
    this.calendarAppointmentStore.loadAppointmentsEffect();
  }

  override attorneyIdDidChange(attorneyId: string) {
    this.listAppointmentStore.setAttorneyId(attorneyId)
    this.listAppointmentStore.loadAppointmentsEffect()
  }

  override getInitialState(): DashboardState {
    return {
      query: '',
      loading: false,
      selectedDate: undefined,
      centerLatitude: undefined,
      centerLongitude: undefined,
    }
  }
}
