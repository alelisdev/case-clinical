import { Appointment, Patient, WebCoreDataAccessService } from '@case-clinical/web/core/data-access';
import { convertTo12HourFormat, isValidTimeFormat, addMinutesToTime } from '@case-clinical/shared/util/helpers';
import { DateFilterInput } from '@case-clinical/api/core/data-access';
import { FormGroup } from '@angular/forms';
import { FormlyModalController } from '@case-clinical/web/ui/formly-designer';
import { Injectable, Injector, Inject } from "@angular/core";
import { of, switchMap, tap, withLatestFrom } from 'rxjs';
import { ProviderBaseState, ProviderBaseStore } from '../provider-page.base.store';
import { tapResponse } from '@ngrx/component-store';
import { UserCreateAppointmentInput } from '@case-clinical/web/core/data-access';
import { VendorStats } from '@case-clinical/api/vendor/data-access';
import { WebAppointmentFeatureStore, appointmentStatusColorMap, appointmentStatusIconMap } from '@case-clinical/web/appointment/shared';
import { WebAppointmentStatusFeatureStore } from '@case-clinical/web/appointment-status/shared';
import { WebClinicalProviderFeatureStore } from '@case-clinical/web/clinical-provider/shared';
import { WebClinicalProviderLocationFeatureStore } from '@case-clinical/web/clinical-provider-location/shared'
import { WebLegalCaseFeatureStore } from '@case-clinical/web/legal-case/shared';
import { WebPatientFeatureStore } from '@case-clinical/web/patient/shared';
import { WebVisitKindFeatureStore } from '@case-clinical/web/visit-kind/shared';
import * as moment from 'moment';

export interface DashboardState extends ProviderBaseState {
  dateFilter?: DateFilterInput
  loading: boolean,
  query: string,
  stats?: VendorStats,
  skip: number,
  limit: number,
  patientIdForUploadSubpoena: string,
  patientIdForUploadMiscellaneous: string,

  patientIdForAppointmentAdd: string,
  viewMode: 'List' | 'Calendar',
  appointmentForModal: Appointment | undefined,
  patientForSubpeona: Patient | undefined,
  appointmentStatusId: string | undefined
}

@Injectable()
export class DashboardStore extends ProviderBaseStore<DashboardState> {

  rxFormlyModalController?: FormlyModalController;
  imagingFormlyModalContoller?: FormlyModalController;
  recOrdersFormlyModalController?: FormlyModalController;
  referralsFormlyModalController?: FormlyModalController;
  appointmentsFormlyModalController?: FormlyModalController;

  form?: FormGroup<any>;
  currentLegalCaseIdForMiscellaneousModal = ""

  constructor(
    @Inject('calendarAppointmentStore') private calendarAppointmentStore: WebAppointmentFeatureStore,
    @Inject('listAppointmentStore') private listAppointmentStore: WebAppointmentFeatureStore,

    @Inject('providerStoreForAppointmentAdd') private providerStoreForAppointmentAdd: WebClinicalProviderFeatureStore,

    @Inject('providerLocationStoreForAppointmentAdd') private providerLocationStoreForAppointmentAdd: WebClinicalProviderLocationFeatureStore,
    @Inject('legalCaseStoreForAppointmentAdd') private legalCaseStoreForAppointmentAdd: WebLegalCaseFeatureStore,
    @Inject('apptStatusStoreForFilter') private apptStatusStoreForFilter: WebAppointmentStatusFeatureStore,

    private providerStore: WebClinicalProviderFeatureStore,

    private legalCaseStore: WebLegalCaseFeatureStore,

    private appointmentStatusStore: WebAppointmentStatusFeatureStore,
    private visitKindStore: WebVisitKindFeatureStore,

    private providerLocationStore: WebClinicalProviderLocationFeatureStore,
    private data: WebCoreDataAccessService,
    private patientStore: WebPatientFeatureStore,
    injector: Injector,
  ) {
    super(injector);
    this.appointmentStatusStore.loadAppointmentStatusesEffect();
    this.apptStatusStoreForFilter.loadAppointmentStatusesEffect();

    this.visitKindStore.loadVisitKindsEffect();

    this.patientStore.setIsAllPatients(true);
    this.patientStore.loadPatientsEffect();

    this.legalCaseStore.loadLegalCasesEffect();
    this.legalCaseStoreForAppointmentAdd.loadLegalCasesEffect();
    this.providerStoreForAppointmentAdd.loadClinicalProvidersEffect();

    this.calendarAppointmentStore.setDateFilter({ startDate: new Date(), operator: '=' });
    this.calendarAppointmentStore.loadAppointmentsEffect();

    this.loadProviderLocationsEffect();
  }

  calendarTimeEvents$ = this.select(this.calendarAppointmentStore.formattedAppointments$, (appointments) => {
    return appointments.map(appointment => {
      if (!appointment?.end) {
        appointment.end = addMinutesToTime(appointment.start ?? "00:00", appointment.duration ?? 0)
      }
      return {
        ...appointment,
        id: appointment.id,
        providerName: appointment.clinicalProvider?.name ?? '',
        status: appointment.appointmentStatus?.name ?? '',
        start: new Date(`${moment(appointment.appointmentDateAndTime).format('MM-DD-yyyy')} ${appointment.start}`),
        end: new Date(
          `${moment(appointment.appointmentDateAndTime).format('MM-DD-yyyy')} ${appointment.end ?? '?'}`,
        ),
        title: `${appointment?.clinicalProvider?.name} ${appointment.start} - ${appointment.end ?? '?'}`,
        data: {
          ...appointment
        },
      }
    })
  });

  providersForAppointmentAdd$ = this.select(this.providerStoreForAppointmentAdd.clinicalProviders$, (providers) => {
    return providers.map((provider) => {
      return {
        id: provider.id,
        title: provider.name
      }
    })
  })

  clinicalProviderLocationsForAppointmentAdd$ = this.select(this.providerLocationStoreForAppointmentAdd.clinicalProviderLocations$, (locations) => {
    return locations.map(location => {
      return {
        id: location.location?.id,
        title: location.location?.name
      }
    })
  })
  patients$ = this.select(this.patientStore.patients$, (patients) => {
    return patients.map((patient) => {
      return {
        id: patient.id,
        title: patient?.name
      }
    });
  });

  legalCases$ = this.select(this.legalCaseStore.legalCases$, (legalCases) => {
    return legalCases.map((legalCase) => {
      return {
        id: legalCase.id,
        title: legalCase?.medicalRecordNumber
      }
    });
  });

  legalCasesForAppointmentAdd$ = this.select(this.legalCaseStoreForAppointmentAdd.legalCases$, (legalCases) => {
    return legalCases.map((legalCase) => {
      return {
        id: legalCase.id,
        title: legalCase?.medicalRecordNumber
      }
    });
  });

  loading$ = this.select(s => s.loading)
  dateFilter$ = this.select(s => s.dateFilter)
  patientForSubpeona$ = this.select(s => s.patientForSubpeona)
  appointmentStatusId$ = this.select(s => s.appointmentStatusId)

  viewMode$ = this.select(s => s.viewMode)
  appointmentStatuses$ = this.appointmentStatusStore.appointmentStatuses$

  appointmentStatusActions$ = this.select(this.appointmentStatuses$, (statuses) => {
    return statuses?.map((status: any) => {
      const key: string = status.name as string;
      return {
        ...status,
        color: appointmentStatusColorMap[key] ?? 'red',
        icon: appointmentStatusIconMap[status.name as string] ?? 'assets/icons/rescheduled.png',
      }
    })
  });

  appointmentStatusesForFilter$ = this.select(
    this.apptStatusStoreForFilter.appointmentStatuses$,
    (appointmentStatuses) => {
      const options = appointmentStatuses?.map((appointmentStatus) => {
        const id = appointmentStatus?.id;
        const title = appointmentStatus?.name;

        return {
          id, title,
        }
      });
      return [
        {
          id: "all",
          title: 'All'
        },
        ...options
      ]
    })
  visitKinds$ = this.visitKindStore.visitKinds$

  appointments$ = this.listAppointmentStore.formattedAppointmentsForProvider$

  skip$ = this.select(s => s.skip)
  limit$ = this.select(s => s.limit)
  paging$ = this.listAppointmentStore.paging$;
  stats$ = this.select(s => s.stats)
  patientIdForUploadSubpoena$ = this.select(s => s.patientIdForUploadSubpoena);
  patientIdForUploadMiscellaneous$ = this.select(s => s.patientIdForUploadMiscellaneous);

  patientInfoForUploadSubpoena$ = this.select(this.patientStore.patients$, this.patientIdForUploadSubpoena$, (patients, patientIdForUploadSubpoena) => {
    const patientsForUploadSubpoena = patients.filter(value => value.id === patientIdForUploadSubpoena);

    if (patientsForUploadSubpoena && this.uploadSubpoenaModalController) {
      this.uploadSubpoenaModalController.update({ subpoena: patientsForUploadSubpoena[0].subpoena }, {})
    }
    return patientsForUploadSubpoena;
  });

  patientInfoForUploadMiscellaneous$ = this.select(this.patientStore.patients$, this.patientIdForUploadMiscellaneous$, (patients, patientIdForUploadMiscellaneous) => {
    const patientsForUploadMiscellaneous = patients.filter(value => value.id === patientIdForUploadMiscellaneous);
    return patientsForUploadMiscellaneous;
  });

  legalCaseInfoForUploadMiscellaneous$ = this.select(this.legalCaseStore.legalCases$, this.patientIdForUploadMiscellaneous$, (legalCases, patientIdForUploadMiscellaneous) => {
    const legalCasesForUploadMiscellaneous = legalCases.filter(value => value.id === patientIdForUploadMiscellaneous);
    return legalCasesForUploadMiscellaneous;
  });

  patientIdForAppointmentAdd$ = this.select(s => s.patientIdForAppointmentAdd);
  patientInfoAppointmentAdd$ = this.select(this.patientStore.patients$, this.patientIdForAppointmentAdd$, (patients, patientIdForAppointmentAdd) => {
    const filteredData = patients.filter(value => value.id === patientIdForAppointmentAdd);
    return filteredData.map((value) => ({
      ...value,
      dateOfLoss: (value?.legalCases && value?.legalCases[0]?.dateOfLoss) ?? ""
    }))

  });

  providerLocations$ = this.providerLocationStore.clinicalProviderLocations$.pipe(
    switchMap((locations) => {
      return of(locations.map((location) => { return { 'id': location.id, 'name': location?.location?.name } }))
    })
  )

  providerLocationOptions$ = this.select(
    this.providerLocationStore.clinicalProviderLocations$,
    (providerLocations) => {
      const options = providerLocations?.map((providerLocation) => {
        const id = providerLocation.location?.id;
        const name = providerLocation.location?.name;

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
  providerOptionsForFilter$ = this.select(
    this.providerStore.clinicalProviders$,
    (clinicalProviders) => {
      const options = clinicalProviders?.map((clinicalProvider) => {
        const { id, name } = clinicalProvider;
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


  setDateFilter = this.updater((state, dateFilter: DateFilterInput) => ({ ...state, dateFilter }))
  setPatientForSubpeona = this.updater((state, patientForSubpeona: Patient | undefined) => ({ ...state, patientForSubpeona }))
  setAppointmentStatusId = this.updater((state, appointmentStatusId: string | undefined) => ({ ...state, appointmentStatusId }))

  setStats = this.updater((state, stats?: VendorStats) => ({ ...state, stats }))
  setPatientIdForUploadSubpoena = this.updater((state, patientIdForUploadSubpoena: string) => ({ ...state, patientIdForUploadSubpoena }))
  setPatientIdForUploadMiscellaneous = this.updater((state, patientIdForUploadMiscellaneous: string) => ({ ...state, patientIdForUploadMiscellaneous }))


  setPatientIdForAppointmentAdd = this.updater((state, patientIdForAppointmentAdd: string) => ({ ...state, patientIdForAppointmentAdd }))
  setSkip = this.updater((state, skip: number) => ({ ...state, skip }))
  setViewMode = this.updater((state, viewMode: 'List' | 'Calendar') => ({ ...state, viewMode }))

  vm$ = this.select(
    this.stats$,
    this.user$,
    this.vendor$,
    this.appointmentStatuses$,
    this.providerLocations$,
    this.viewMode$,
    (
      stats,
      user,
      vendor,
      appointmentStatuses,
      providerLocations,
      viewMode,
    ) => {
      return {
        viewMode,
        stats,
        user,
        vendor,
        appointmentStatuses,
        providerLocations,
        dayOfWeek: new Date().toLocaleDateString('en-US', { weekday: 'long' }),
        today: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
      }
    }
  )

  loadVendorStatsEffect = this.effect($ => $.pipe(
    tap(() => { this.patchState({ loading: true }) }),
    withLatestFrom(this.selectedProviderId$),
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

  loadAppointmentsEffect = this.effect<void>($ => $.pipe(
    tap(() => { this.patchState({ loading: true }) }),
    withLatestFrom(this.dateFilter$, this.selectedProviderId$, this.selectedProviderLocationId$, this.viewMode$, this.skip$, this.limit$, this.appointmentStatusId$),
    switchMap(([_, dateFilter, providerId, providerLocationId, viewMode, skip, limit, appointmentStatusId]) => {

      if (viewMode === 'List') {
        this.listAppointmentStore.setDateFilter({ startDate: new Date(), operator: '=' });
        this.listAppointmentStore.setLimit(limit);
        this.listAppointmentStore.setSkip(skip);
        this.listAppointmentStore.setClinicalProviderId((providerId !== 'all') ? providerId as string : undefined);
        this.listAppointmentStore.setLocationId((providerLocationId !== 'all' && providerLocationId !== '') ? providerLocationId as string : undefined);
        this.listAppointmentStore.setAppointmentStatusId((appointmentStatusId !== 'all' && appointmentStatusId !== '') ? appointmentStatusId as string : undefined);

        this.listAppointmentStore.loadAppointmentsEffect();

      } else {
        console.log('calendar appointments')
        this.calendarAppointmentStore.setLimit(10000);
        this.calendarAppointmentStore.setSkip(0);
        this.calendarAppointmentStore.setClinicalProviderId((providerId !== 'all') ? providerId as string : undefined);
        this.calendarAppointmentStore.setLocationId((providerLocationId !== 'all' && providerLocationId !== '') ? providerLocationId as string : undefined);
        this.calendarAppointmentStore.setAppointmentStatusId((appointmentStatusId !== 'all' && appointmentStatusId !== '') ? appointmentStatusId as string : undefined);
        this.calendarAppointmentStore.loadAppointmentsEffect();
      }
      return of(true);
    }
    )
  ))

  loadProviderLocationsEffect = this.effect<void>($ => $.pipe(
    tap(() => { this.patchState({ loading: true }) }),
    withLatestFrom(this.selectedProviderId$),
    switchMap(([, selectedProviderId]) => {
      this.providerLocationStore.loadClinicalProviderLocationsEffect()
      return of(true);
    }
    )
  ))

  loadProvidersEffect = this.effect<void>($ => $.pipe(
    tap(() => { this.patchState({ loading: true }) }),
    withLatestFrom(this.selectedProviderLocationId$),
    switchMap(([, selectedProviderLocationId]) => {
      this.providerStore.setLocationId(selectedProviderLocationId as string);
      this.providerStore.loadClinicalProvidersEffect()
      return of(true);
    }
    )
  ))

  setForm(formValue: FormGroup<any>) {
    this.form = formValue
  }
  loadProviderLocations() {
    this.providerLocationStore.loadClinicalProviderLocationsEffect()
  }


  skipDidChange(skip: number) {
    this.setSkip(skip);
    this.loadAppointmentsEffect();
  }

  viewModeDidChange(viewMode: 'List' | 'Calendar') {
    this.setViewMode(viewMode);
    this.loadAppointmentsEffect();
  }

  changeLegalCasesByPatientId(patientId: string) {
    this.legalCaseStore.setPatientId(patientId)
    this.legalCaseStore.loadLegalCasesEffect()
  }

  changeLegalCasesByPatientIdForAppointmentAdd(patientId: string) {
    this.legalCaseStoreForAppointmentAdd.setPatientId(patientId)
    this.legalCaseStoreForAppointmentAdd.loadLegalCasesEffect()
  }

  setLegalCaseId(legalCaseId: string) {
    this.currentLegalCaseIdForMiscellaneousModal = legalCaseId
  }

  dateFilterDidChange(dates: { start: Date, end: Date }) {
    console.log(dates)
  }

  filterByAppointmentStatus(value: string) {
    this.setAppointmentStatusId(value)
    this.loadAppointmentsEffect();
  }

  override getInitialState(): DashboardState {
    return {
      query: "",
      loading: false,
      stats: {
        totalPatientCount: 0,
        todayPatientCount: 0,
        appointmentCount: 0,
        totalPatientPercent: 0,
        todayPatientPercent: 0,
        appointmentsPercent: 0,
      },
      skip: 0,
      limit: 10,
      viewMode: 'List',
      patientIdForUploadSubpoena: '',
      patientIdForUploadMiscellaneous: '',

      patientIdForAppointmentAdd: '',
      appointmentForModal: undefined,
      patientForSubpeona: undefined,
      appointmentStatusId: undefined
    }
  }

  override providerIdDidChange(providerId: string) {


    this.loadAppointmentsEffect();
    this.loadVendorStatsEffect();

    this.patientStore.loadPatientsEffect();
  }

  override providerLocationIdDidChange(providerLocationId: string) {
    this.providerStore.setLocationId((providerLocationId !== '' && providerLocationId !== 'all') ? providerLocationId : '');
    this.loadProvidersEffect();
    this.loadVendorStatsEffect();

    this.providerLocationStore.clinicalProviderLocations$.subscribe((clinicalProviderLocations) => {
      const index = clinicalProviderLocations.findIndex(value => value?.id === providerLocationId)
      if (index > -1) {
        this.patientStore.loadPatientsEffect()
      }

    }).unsubscribe();
    this.loadAppointmentsEffect();
  }

  patientChangedForSubpeonaMaodal(value: any) {
    this.patientInfoForUploadSubpoena$.subscribe((patientInfoForUploadSubpoena) => {
      const patientInfo = patientInfoForUploadSubpoena[0];
      if (patientInfo?.subpoena) {
        this.uploadSubpoenaModalController?.update({ subpeona: patientInfo?.subpoena }, {})
      }
    })
  }

  updatePatientForSubpoena(value: any) {
    this.patientInfoForUploadSubpoena$.subscribe((patientInfoForUploadSubpoena) => {
      const sendData = patientInfoForUploadSubpoena[0];
      if (!sendData?.subpoena || sendData?.subpoena?.attachment) {
        delete sendData?.subpoenaId
      }
      if (sendData) {
        const { subpoena } = value;
        const { id, name, subpoenaId } = sendData;

        this.patientStore.updatePatientEffect({ id, name, subpoena, subpoenaId })
      }
    }).unsubscribe();
    this.uploadSubpoenaModalController?.close()
  }


  updateStatus(status: any, appointment: Appointment) {
    switch (status.title) {
      case 'Check In':
        this.listAppointmentStore.checkInAppointmentEffect(appointment);
        break;
      case 'Cancel':
        this.listAppointmentStore.cancelAppointmentEffect(appointment);
        break;
      case 'No Show':
        this.listAppointmentStore.hideAppointmentEffect(appointment);
        break;
      default:
        break;
    }
  }

  appointmentAction(action: string, appointment: Appointment) {
    switch (action) {
      case 'View':
        this.openAppointmentViewModal(appointment);
        break;
      case 'Edit':
        break;
      case 'Request More Visits':
        this.openRequestsMoreVisitsModal(appointment);
        break;
      case 'No Show':
        this.listAppointmentStore.hideAppointmentEffect(appointment);
        break;
      default:
        break;
    }
  }

  updateLegalForMiscellaneous(value: any) {
    this.legalCaseStore.legalCases$.subscribe((legalCases) => {

      const sendData = legalCases.filter(c => c.id == this.currentLegalCaseIdForMiscellaneousModal)[0];
      if (sendData) {
        const { miscellaneousDocuments } = value;
        const { id, name } = sendData;

        this.legalCaseStore.updateLegalCaseEffect({ id, name, miscellaneousDocuments })
      }
    }).unsubscribe();
    this.uploadMiscellaneousModalController?.close()
  }
  addAppointment(formData: any) {
    const addData: UserCreateAppointmentInput = {};
    addData.name = `${formData?.providerId} for ${formData?.patientId} at ${formData?.appointmentDate} ${formData?.appointmentTime} with ${formData?.apptId}`
    addData.clinicalProviderId = formData?.providerId;
    addData.patientId = formData?.patientId;
    addData.appointmentDateAndTime = `${formData?.appointmentDate} ${formData?.appointmentTime}`
    addData.appointmentStatusId = formData?.apptId
    addData.visitKindId = formData?.visitKindId
    addData.locationId = formData?.locationId;
    addData.legalCaseId = formData?.legalCaseId
    this.listAppointmentStore.createAppointmentEffect(addData)
    this.addAppointmentModalController?.close()
  }
  override setAppointmentViewModalController(controller: FormlyModalController) {
    super.setAppointmentViewModalController(controller);
  }

  override setRequestsMoreVisitsModalController(controller: FormlyModalController) {
    super.setRequestsMoreVisitsModalController(controller);
  }

  override openAppointmentViewModal(appointment: Appointment) {
    this.patchState({ appointmentForModal: appointment as Appointment })
    this.appointmentViewModalController?.open(appointment, {}, this);
  }

  override openRequestsMoreVisitsModal(appointment: Appointment) {
    super.openRequestsMoreVisitsModal(appointment);
  }

  override openAddAppointmentModal() {
    this.addAppointmentModalController?.open({}, {
      patients: this.patients$,
      legalCases: this.legalCasesForAppointmentAdd$,
      patientInfo: this.patientInfoAppointmentAdd$,
      providers: this.providersForAppointmentAdd$,
      locations: this.clinicalProviderLocationsForAppointmentAdd$,
      appointmentStatuses: this.appointmentStatuses$,
      visitKinds: this.visitKinds$
    }, this)
  }

  override openUploadModalCtrlForSubpoena() {

    this.uploadSubpoenaModalController?.open({}, {
      patients: this.patients$,
      patientInfo: this.patientInfoForUploadSubpoena$,

    }, this)
  }


  override openUploadModalCtrlForMiscellaneous() {
    this.uploadMiscellaneousModalController?.open({}, {
      patients: this.patients$,
      patientInfo: this.patientInfoForUploadMiscellaneous$,
      legalCases: this.legalCases$
    }, this)
  }

  override setUploadModalCtrlForSubpoena(controller: FormlyModalController) {
    super.setUploadModalCtrlForSubpoena(controller);
  }

  override setAddAppointmentModalController(controller: FormlyModalController) {
    super.setAddAppointmentModalController(controller);
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

  updateAppointmentForBill(value: any) {
    const sendData = this.get().appointmentForModal
    if (!sendData?.bill || sendData?.bill?.attachment) {
      delete sendData?.billId
    }
    if (sendData) {
      const bill = value;
      const { id, name, billId, imagingId, medicalReportId, appointmentDateAndTime, locationId, checkedIn, checkedInDateTime, duration, patientId, clinicalProviderId, legalCaseId, appointmentStatusId, notes, recurringEventId, isFirstInstance, description, start, end, allDay, recurrence } = sendData;
      this.listAppointmentStore.updateAppointmentEffect({ id, name, bill, billId, imagingId, medicalReportId, appointmentDateAndTime, locationId, checkedIn, checkedInDateTime, duration, patientId, clinicalProviderId, legalCaseId, appointmentStatusId, notes, recurringEventId, isFirstInstance, description, start, end, allDay, recurrence })
    }
  }

  updateAppointmentForMedicalReport(value: any) {
    const sendData = this.get().appointmentForModal
    if (!sendData?.medicalReport || sendData?.medicalReport?.attachment) {
      delete sendData?.medicalReportId
    }
    const medicalReport = value
    if (sendData) {
      const { id, name, medicalReportId, imagingId, billId, appointmentDateAndTime, locationId, checkedIn, checkedInDateTime, duration, patientId, clinicalProviderId, legalCaseId, appointmentStatusId, notes, recurringEventId, isFirstInstance, description, start, end, allDay, recurrence } = sendData;
      this.listAppointmentStore.updateAppointmentEffect({ id, name, medicalReport, medicalReportId, imagingId, billId, appointmentDateAndTime, locationId, checkedIn, checkedInDateTime, duration, patientId, clinicalProviderId, legalCaseId, appointmentStatusId, notes, recurringEventId, isFirstInstance, description, start, end, allDay, recurrence })
    }
  }

  updateAppointmentForImaging(value: any) {
    const sendData = this.get().appointmentForModal
    if (!sendData?.imaging || sendData?.imaging?.attachment) {
      delete sendData?.imagingId
    }
    const imaging = value;
    if (sendData) {
      const { id, name, imagingId, billId, medicalReportId, appointmentDateAndTime, locationId, checkedIn, checkedInDateTime, duration, patientId, clinicalProviderId, legalCaseId, appointmentStatusId, notes, recurringEventId, isFirstInstance, description, start, end, allDay, recurrence } = sendData;
      this.listAppointmentStore.updateAppointmentEffect({ id, name, imaging, imagingId, billId, medicalReportId, appointmentDateAndTime, locationId, checkedIn, checkedInDateTime, duration, patientId, clinicalProviderId, legalCaseId, appointmentStatusId, notes, recurringEventId, isFirstInstance, description, start, end, allDay, recurrence })
    }

  }
}
