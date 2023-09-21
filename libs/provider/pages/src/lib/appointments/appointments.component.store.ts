import { Appointment, UserUpdateAppointmentInput } from '@case-clinical/web/core/data-access';
import { DateFilterInput } from '@case-clinical/web/core/data-access';
import { Inject, Injectable, Injector } from "@angular/core";
import { of, switchMap, tap, withLatestFrom } from 'rxjs';
import { ProviderBaseState, ProviderBaseStore } from '../provider-page.base.store';
import { WebAppointmentFeatureStore } from '@case-clinical/web/appointment/shared';
import * as moment from 'moment'
import { FormlyModalController } from '@case-clinical/web/ui/formly-designer';
import { addMinutesToTime } from '@case-clinical/shared/util/helpers';
import { WebAppointmentStatusFeatureStore } from '@case-clinical/web/appointment-status/shared';
import { WebClinicalProviderFeatureStore } from '@case-clinical/web/clinical-provider/shared';
import { WebClinicalProviderLocationFeatureStore } from '@case-clinical/web/clinical-provider-location/shared';

export interface AppointmentState extends ProviderBaseState {
  dateFilter?: DateFilterInput
  limit: number
  loading: boolean
  query: string
  skip: number
  viewMode: 'List' | 'Calendar',
  appointmentForModal: Appointment | undefined,
  appointmentStatusId:string|undefined
}

@Injectable()
export class AppointmentStore extends ProviderBaseStore<AppointmentState> {
  constructor(
    @Inject('calendarAppointmentStore') private calendarAppointmentStore: WebAppointmentFeatureStore,
    @Inject('listAppointmentStore') private listAppointmentStore: WebAppointmentFeatureStore,
    @Inject('apptStatusStoreForFilter') private apptStatusStoreForFilter: WebAppointmentStatusFeatureStore,
    private providerStore: WebClinicalProviderFeatureStore,
    private providerLocationStore: WebClinicalProviderLocationFeatureStore,

    injector: Injector,
  ) {
    super(injector)
    this.apptStatusStoreForFilter.loadAppointmentStatusesEffect();
    this.loadProviderLocationsEffect();

    this.loadAppointmentsEffect();

  }

  uploadBillModalCtrl: FormlyModalController | undefined = undefined;
  uploadMedicalReportModalCtrl: FormlyModalController | undefined = undefined;
  uploadImagingModalCtrl: FormlyModalController | undefined = undefined;
  uploadMiscellaneousModalCtrl?: FormlyModalController

  /******* Selectors  ********/
  loading$ = this.select(s => s.loading)
  skip$ = this.select(s => s.skip)
  limit$ = this.select(s => s.limit)
  dateFilter$ = this.select(s => s.dateFilter)
  viewMode$ = this.select(s => s.viewMode)
  appointments$ = this.select(this.listAppointmentStore.formattedAppointments$,  (appointments, ) => {
    return appointments.map((appointment) => {
      console.log("appointmentDateAndTime === ", appointment.appointmentDateAndTime)
      return {
        ...appointment,
        mainLocation: (appointment?.clinicalProvider?.clinicalProviderLocations && appointment?.clinicalProvider?.clinicalProviderLocations?.length > 0) ? appointment?.clinicalProvider?.clinicalProviderLocations[0].location?.name : "",
        avatar: appointment.patient?.users ? appointment.patient?.users[0]?.avatarUrl : "",
        appointmentTime: (moment(appointment.appointmentDateAndTime).format("hh:mm:ss") ?? ''),
      }
    })
  });
  paging$ = this.listAppointmentStore.paging$;
  appointmentStatusId$ = this.select(s => s.appointmentStatusId)

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

  appointmentStatusesForFilter$ = this.select(
    this.apptStatusStoreForFilter.appointmentStatuses$,
    (appointmentStatuses) => {
      const options = appointmentStatuses?.map((appointmentStatus) => {
        return {  id:appointmentStatus?.id, title:appointmentStatus?.name,}
      });
      return [
        {
          id: "all",
          title: 'All'
        },
        ...options
      ]
    })

    providerLocationOptions$ = this.select(
      this.providerLocationStore.clinicalProviderLocations$,
      (providerLocations) => {
        const options = providerLocations?.map((providerLocation) => {
          return {
            id:providerLocation.location?.id, name:providerLocation.location?.name,
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

  vm$ = this.select(
    this.loading$,
    this.appointments$,
    this.appointmentEvents$,
    this.user$,
    this.vendor$,
    (
      loading,
      appointments,
      appointmentEvent,
      user,
      vendor
    ) => {
      return {
        loading,
        user,
        appointments,
        timeEvents: appointmentEvent,
        vendor
      }
    }
  )
  /******* Selectors  ********/

  /******* Updaters *******/
  setDateFilter = this.updater((state, dateFilter: DateFilterInput) => ({ ...state, dateFilter }))
  setSkip = this.updater((state, skip: number) => ({ ...state, skip }))
  setViewMode = this.updater((state, viewMode: 'List' | 'Calendar') => ({ ...state, viewMode }))
  setAppointmentStatusId= this.updater((state, appointmentStatusId: string|undefined) => ({ ...state, appointmentStatusId }))

  /******* Updaters *******/

  /****** Effects ******/
  loadAppointmentsEffect = this.effect<void>($ => $.pipe(
    tap(() => { this.patchState({ loading: true }) }),
    withLatestFrom(this.selectedProviderId$,this.selectedProviderLocationId$, this.viewMode$, this.skip$, this.limit$, this.dateFilter$ ,this.appointmentStatusId$),
    switchMap(([, providerId, providerLocationId, viewMode, skip, limit, dateFilter, appointmentStatusId]) => {
      
      if (viewMode === 'List') {
        this.listAppointmentStore.setDateFilter(undefined);
        this.listAppointmentStore.setLimit(limit);
        this.listAppointmentStore.setSkip(skip);
        this.listAppointmentStore.setClinicalProviderId((providerId !== 'all') ? providerId as string : undefined);
        this.listAppointmentStore.setLocationId((providerLocationId !== 'all' && providerLocationId !== '')?providerLocationId as string:undefined);
        this.listAppointmentStore.setAppointmentStatusId((appointmentStatusId !== 'all' && appointmentStatusId !== '')?appointmentStatusId as string:undefined);

        this.listAppointmentStore.loadAppointmentsEffect();

      } else {
        this.calendarAppointmentStore.setDateFilter(dateFilter);
        this.calendarAppointmentStore.setLimit(10000);
        this.calendarAppointmentStore.setSkip(0);
        this.calendarAppointmentStore.setClinicalProviderId((providerId !== 'all') ? providerId as string : undefined);
        this.calendarAppointmentStore.setLocationId((providerLocationId !== 'all' && providerLocationId !== '')?providerLocationId as string:undefined);
        this.calendarAppointmentStore.setAppointmentStatusId((appointmentStatusId !== 'all' && appointmentStatusId !== '')?appointmentStatusId as string:undefined);
        this.calendarAppointmentStore.loadAppointmentsEffect();

      }

      return of(true);
    }
    )
  ))

  uploadBillEffect = this.listAppointmentStore.uploadBillEffect;
  
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
  /****** Effects ******/

  /**********  Callback Functions Called By UI ************/
  viewModeDidChange(viewMode: 'List' | 'Calendar') {
    this.setViewMode(viewMode);
    this.loadAppointmentsEffect();
  }

  dateFilterDidChange(dates: { start: Date, end: Date }) {
    const filter = {} as DateFilterInput;
    filter.startDate = dates.start;
    filter.endDate = dates.end;
    filter.operator = "In";

    this.setDateFilter(filter);
    this.loadAppointmentsEffect();
  }

  skipDidChange(skip: number) {
    this.setSkip(skip);
    this.loadAppointmentsEffect();
  }

  checkInAppointment(appointment: Appointment) {
    this.listAppointmentStore.checkInAppointmentEffect(appointment);
  }

  cancelAppointment(appointment: Appointment) {
    this.listAppointmentStore.cancelAppointmentEffect(appointment);
  }

  hideAppointment(appointment: Appointment) {
    this.listAppointmentStore.hideAppointmentEffect(appointment);
  }
  /**********  Callback Functions Called By UI ************/

  override providerIdDidChange(providerId: string) {

    
    this.loadAppointmentsEffect();

  }

  override providerLocationIdDidChange(providerLocationId: string) {


    this.providerStore.setLocationId((providerLocationId !== '' && providerLocationId !== 'all') ? providerLocationId : '');
    this.loadProvidersEffect();
    this.loadAppointmentsEffect();
  }



  override setAppointmentViewModalController(controller: FormlyModalController) {
    super.setAppointmentViewModalController(controller);
  }

  override setRequestsMoreVisitsModalController(controller: FormlyModalController) {
    super.setRequestsMoreVisitsModalController(controller);
  }


  override openAppointmentViewModal(appointment: Appointment) {
    const contextData = { ...appointment }
    this.patchState({appointmentForModal: appointment})
    this.appointmentViewModalController?.open(contextData, {}, this);
  }

  override openRequestsMoreVisitsModal(appointment: Appointment) {
    super.openRequestsMoreVisitsModal(appointment);
  }

  setUploadBillModalCtrl(modalCtrl: FormlyModalController){
    this.uploadBillModalCtrl = modalCtrl;
  }

  filterByAppointmentStatus(value:string){
    this.setAppointmentStatusId(value)
    this.loadAppointmentsEffect();
  }

  setUploadMedicalReportModalCtrl(modalCtrl: FormlyModalController){
    this.uploadMedicalReportModalCtrl = modalCtrl;
  }

  setUploadImagingModalCtrl(modalCtrl: FormlyModalController){
    this.uploadImagingModalCtrl = modalCtrl;
  }

  openUploadModalCtrlForBill(modelData: any){
    const contextData = { ...modelData }
    this.patchState({
      appointmentForModal: contextData as Appointment
    })
    if(this.uploadBillModalCtrl){
      this.uploadBillModalCtrl?.open(contextData,contextData, this);
    }
  }

  openUploadModalCtrlForMedicalReport(modelData: any){
    const contextData = { ...modelData }
    this.patchState({
      appointmentForModal: contextData as Appointment
    })
    if(this.uploadMedicalReportModalCtrl){
      this.uploadMedicalReportModalCtrl?.open(contextData,contextData, this);
    }
  }

  openUploadModalCtrlForImaging(modelData: any){
    const contextData = { ...modelData }
    this.patchState({
      appointmentForModal: contextData as Appointment
    })
    if(this.uploadImagingModalCtrl){
      this.uploadImagingModalCtrl?.open(contextData,contextData, this);
    }
  }

  updateAppointmentForBill(formData: any){
    const sendData = formData
    if(!sendData?.bill || sendData?.bill?.attachment){
      delete sendData?.billId
    }
    const { id,name,bill, billId, imagingId,medicalReportId,appointmentDateAndTime,locationId,checkedIn,checkedInDateTime,duration,patientId,clinicalProviderId,legalCaseId,appointmentStatusId,notes,recurringEventId,isFirstInstance,description,start,end,allDay,recurrence } = sendData;
    this.listAppointmentStore.updateAppointmentEffect({ id,name,bill, billId, imagingId, medicalReportId,appointmentDateAndTime,locationId,checkedIn,checkedInDateTime,duration,patientId,clinicalProviderId,legalCaseId,appointmentStatusId,notes,recurringEventId,isFirstInstance,description,start,end,allDay,recurrence })
    this.uploadBillModalCtrl?.close();
  }

  /** Upload Miscellaneous */
  setUploadMiscellaneousModalCtrl(modalCtrl: FormlyModalController){
    this.uploadMiscellaneousModalCtrl = modalCtrl;
  }

  openUploadModalForMiscellaneous(appointment: Appointment) {
    const { id, name, miscellaneous } = appointment;
    this.uploadMiscellaneousModalCtrl?.open({ id, name, miscellaneous }, {}, this);
  }

  updateAppointmentForMiscellaneous(formData: any) {
    const { id, name, miscellaneous } = formData;
    this.listAppointmentStore.updateAppointmentEffect({ id,name,miscellaneous,  })
    this.uploadMiscellaneousModalCtrl?.close();
  }
  /** Upload Miscellaneous */

  updateAppointmentForMedicalReport(formData: any){
    const sendData = formData
    if(!sendData?.medicalReport  || sendData?.medicalReport?.attachment){
      delete sendData?.medicalReportId
    }
    const { id,name,medicalReport, medicalReportId, imagingId, billId,appointmentDateAndTime,locationId,checkedIn,checkedInDateTime,duration,patientId,clinicalProviderId,legalCaseId,appointmentStatusId,notes,recurringEventId,isFirstInstance,description,start,end,allDay,recurrence } = sendData;
    this.listAppointmentStore.updateAppointmentEffect({ id,name,medicalReport, medicalReportId, imagingId, billId,appointmentDateAndTime,locationId,checkedIn,checkedInDateTime,duration,patientId,clinicalProviderId,legalCaseId,appointmentStatusId,notes,recurringEventId,isFirstInstance,description,start,end,allDay,recurrence })
    this.uploadMedicalReportModalCtrl?.close();
  }

  updateAppointmentForImaging(formData: any){
    const sendData = formData
    if(!sendData?.imaging  || sendData?.imaging?.attachment){
      delete sendData?.imagingId
    }
    const { id,name,imaging, imagingId, billId,medicalReportId,appointmentDateAndTime,locationId,checkedIn,checkedInDateTime,duration,patientId,clinicalProviderId,legalCaseId,appointmentStatusId,notes,recurringEventId,isFirstInstance,description,start,end,allDay,recurrence } = sendData;
    this.listAppointmentStore.updateAppointmentEffect({ id,name,imaging, imagingId, billId, medicalReportId,appointmentDateAndTime,locationId,checkedIn,checkedInDateTime,duration,patientId,clinicalProviderId,legalCaseId,appointmentStatusId,notes,recurringEventId,isFirstInstance,description,start,end,allDay,recurrence })
    this.uploadImagingModalCtrl?.close();
  }

  updateAppointmentForBillForView(value: any){
    const sendData = this.get().appointmentForModal
    if(!sendData?.bill || sendData?.bill?.attachment){
      delete sendData?.billId
    }
    if(sendData){
      const bill = value;
      const { id,name, billId, imagingId,medicalReportId,appointmentDateAndTime,locationId,checkedIn,checkedInDateTime,duration,patientId,clinicalProviderId,legalCaseId,appointmentStatusId,notes,recurringEventId,isFirstInstance,description,start,end,allDay,recurrence } = sendData;
      this.listAppointmentStore.updateAppointmentEffect({ id,name,bill, billId, imagingId, medicalReportId,appointmentDateAndTime,locationId,checkedIn,checkedInDateTime,duration,patientId,clinicalProviderId,legalCaseId,appointmentStatusId,notes,recurringEventId,isFirstInstance,description,start,end,allDay,recurrence })
    }
  }

  updateAppointmentForMedicalReportForView(value: any){
    const sendData = this.get().appointmentForModal
    if(!sendData?.medicalReport  || sendData?.medicalReport?.attachment){
      delete sendData?.medicalReportId
    }
    const medicalReport = value
    if(sendData){
      const { id,name, medicalReportId, imagingId, billId,appointmentDateAndTime,locationId,checkedIn,checkedInDateTime,duration,patientId,clinicalProviderId,legalCaseId,appointmentStatusId,notes,recurringEventId,isFirstInstance,description,start,end,allDay,recurrence } = sendData;
      this.listAppointmentStore.updateAppointmentEffect({ id,name,medicalReport, medicalReportId, imagingId, billId,appointmentDateAndTime,locationId,checkedIn,checkedInDateTime,duration,patientId,clinicalProviderId,legalCaseId,appointmentStatusId,notes,recurringEventId,isFirstInstance,description,start,end,allDay,recurrence })
    }
  }

  updateAppointmentForImagingForView(value: any){
    const sendData = this.get().appointmentForModal
    if(!sendData?.imaging  || sendData?.imaging?.attachment){
      delete sendData?.imagingId
    }
    const imaging = value;
    if(sendData){
      const { id,name, imagingId, billId,medicalReportId,appointmentDateAndTime,locationId,checkedIn,checkedInDateTime,duration,patientId,clinicalProviderId,legalCaseId,appointmentStatusId,notes,recurringEventId,isFirstInstance,description,start,end,allDay,recurrence } = sendData;
      this.listAppointmentStore.updateAppointmentEffect({ id,name,imaging, imagingId, billId, medicalReportId,appointmentDateAndTime,locationId,checkedIn,checkedInDateTime,duration,patientId,clinicalProviderId,legalCaseId,appointmentStatusId,notes,recurringEventId,isFirstInstance,description,start,end,allDay,recurrence })
    }
  }

  override getInitialState(): AppointmentState {
    return {
      query: "",
      loading: false,
      skip: 0,
      viewMode: 'List',
      dateFilter: undefined,
      limit: 10,
      appointmentForModal: undefined,
      appointmentStatusId:undefined
    }
  }

}
