import { Appointment } from '@case-clinical/web/core/data-access';
import { AttorneyBaseState, AttorneyBaseStore } from '../attorney-page.base.store';
import { DateFilterInput } from '@case-clinical/web/core/data-access';
import { Inject, Injectable, Injector } from "@angular/core";
import { of, switchMap, tap, withLatestFrom } from 'rxjs';
import { WebAppointmentFeatureStore } from '@case-clinical/web/appointment/shared';
import * as moment from 'moment'
import { addMinutesToTime } from '@case-clinical/shared/util/helpers';

export interface AppointmentState extends AttorneyBaseState {
  dateFilter?: DateFilterInput
  limit: number
  loading: boolean
  query: string
  skip: number
  viewMode: 'List' | 'Calendar'
}

@Injectable()
export class AppointmentStore extends AttorneyBaseStore<AppointmentState> {
  constructor(
    @Inject('calendarAppointmentStore') private calendarAppointmentStore: WebAppointmentFeatureStore,
    @Inject('listAppointmentStore') private listAppointmentStore: WebAppointmentFeatureStore,
    injector: Injector,
  ) {
    super(injector)
    this.listAppointmentStore.setLimit(10)
    this.loadAppoinmentsEffect();
  }

  /******* Selectors  ********/
  loading$ = this.select(s => s.loading)
  skip$ = this.select(s => s.skip)
  limit$ = this.select(s => s.limit)
  dateFilter$ = this.select(s => s.dateFilter)
  viewMode$ = this.select(s => s.viewMode)

  appointments$ = this.select(this.listAppointmentStore.formattedAppointments$,  (appointments, ) => {
    return appointments.map((appointment) => {
      return {
        ...appointment,
        mainLocation: (appointment?.clinicalProvider?.clinicalProviderLocations && appointment?.clinicalProvider?.clinicalProviderLocations?.length > 0) ? appointment?.clinicalProvider?.clinicalProviderLocations[0].location?.name : "",
        avatar: appointment.patient?.users ? appointment.patient?.users[0]?.avatarUrl : "",
      }
    })
  });
  paging$ = this.listAppointmentStore.paging$;

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

  vm$ = this.select(
    this.loading$,
    this.appointments$,
    this.appointmentEvents$,
    this.user$,
    (
      loading,
      appointments,
      appointmentEvent,
      user,
    ) => {
      console.log('appointmentEvent', appointmentEvent)
      return {
        loading,
        user,
        appointments,
        timeEvents:appointmentEvent,
      }
    }
  )
  /******* Selectors  ********/

  /******* Updaters *******/
  setDateFilter = this.updater((state, dateFilter: DateFilterInput) => ({ ...state, dateFilter }))
  setSkip = this.updater((state, skip: number) => ({ ...state, skip }))
  setViewMode = this.updater((state, viewMode: 'List' | 'Calendar') => ({ ...state, viewMode }))
  /******* Updaters *******/

  /****** Effects ******/
  loadAppoinmentsEffect = this.effect<void>($ => $.pipe(
    tap(() => { this.patchState({ loading: true }) }),
    withLatestFrom(this.selectedAttorneyId$, this.viewMode$, this.skip$, this.limit$, this.dateFilter$),
    switchMap(([, attorneyId, viewMode, skip, limit, dateFilter]) => {
      if (viewMode === 'List') {
        this.listAppointmentStore.setDateFilter(undefined);
        this.listAppointmentStore.setLimit(limit);
        this.listAppointmentStore.setSkip(skip);
        this.listAppointmentStore.setAttorneyId((attorneyId !== 'all')? attorneyId as string:undefined);
        this.listAppointmentStore.loadAppointmentsEffect();
      } else {
        this.calendarAppointmentStore.setDateFilter(dateFilter);
        this.calendarAppointmentStore.setLimit(10000);
        this.calendarAppointmentStore.setSkip(0);
        this.calendarAppointmentStore.setAttorneyId((attorneyId !== 'all')? attorneyId as string:undefined);
        this.calendarAppointmentStore.loadAppointmentsEffect();
      }
      return of(true);
    }
    )
  ))
  /****** Effects ******/

  /**********  Callback Functions Called By UI ************/
  viewModeDidChange(viewMode: 'List' | 'Calendar') {
    this.setViewMode(viewMode);
    this.loadAppoinmentsEffect();
  }

  dateFilterDidChange(dates: { start: Date, end: Date }) {
    const filter = {} as DateFilterInput;
    filter.startDate = dates.start;
    filter.endDate = dates.end;
    filter.operator = "In";

    this.setDateFilter(filter);
    this.loadAppoinmentsEffect();
  }

  skipDidChange(skip: number) {
    this.setSkip(skip);
    this.loadAppoinmentsEffect();
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

  override attorneyIdDidChange(attorneyId: string) {
    this.loadAppoinmentsEffect();
  }

  override getInitialState(): AppointmentState {
    return {
      query: "",
      loading: false,
      skip: 0,
      viewMode: 'List',
      dateFilter: undefined,
      limit: 10,
    }
  }
}
