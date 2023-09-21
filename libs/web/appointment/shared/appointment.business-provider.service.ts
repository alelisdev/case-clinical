
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { Appointment, UserCreateAppointmentInput, UserUpdateAppointmentInput, UpdateResult, Location, Patient, ClinicalProvider, LegalCase, AppointmentStatus } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateAppointmentExcelDataAction } from './actions/validate-appointment-excel-data.action'
import { CreateAppointmentAction } from './actions/create-appointment.action'
import { UpdateAppointmentsAction, UpdateAppointmentAction } from './actions/update-appointments.action'
import { CheckInAppointmentAction } from './actions/check-in-appointments.action'
import { RequestRescheduleAppointmentAction } from './actions/request-reschedule-appointments.action'
import { RescheduleAppointmentAction } from './actions/reschedule-appointments.action'
import { ConfirmAppointmentAction } from './actions/confirm-appointments.action'
import { CancelAppointmentAction } from './actions/cancel-appointments.action'
import { HideAppointmentAction } from './actions/hide-appointments.action'

@Injectable({providedIn: 'root'})
export class AppointmentBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.AppointmentBusinessProviderService', logger, serviceContext)
  }

  createAppointment(input: UserCreateAppointmentInput): Observable<Appointment> {
    const action = new CreateAppointmentAction(input);
    action.Do(this);
    return action.response;
  }

  updateAppointment(input: UserUpdateAppointmentInput, appointmentId: string): Observable<Appointment> {
    const action = new UpdateAppointmentAction(input, appointmentId);
    action.Do(this);
    return action.response;
  }

  checkInAppointment(appointment: Appointment): Observable<Appointment> {
    const action = new CheckInAppointmentAction(appointment);
    action.Do(this);
    return action.response;
  }

  requestRescheduleAppointment(appointment: Appointment): Observable<Appointment> {
    const action = new RequestRescheduleAppointmentAction(appointment);
    action.Do(this);
    return action.response;
  }

  rescheduleAppointment(appointment: Appointment, rescheduleDate: Date): Observable<Appointment> {
    const action = new RescheduleAppointmentAction(appointment, rescheduleDate);
    action.Do(this);
    return action.response;
  }

  confirmAppointment(appointment: Appointment): Observable<Appointment> {
    const action = new ConfirmAppointmentAction(appointment);
    action.Do(this);
    return action.response;
  }

  cancelAppointment(appointment: Appointment): Observable<Appointment> {
    const action = new CancelAppointmentAction(appointment);
    action.Do(this);
    return action.response;
  }

  hideAppointment(appointment: Appointment): Observable<Appointment> {
    const action = new HideAppointmentAction(appointment);
    action.Do(this);
    return action.response;
  }

  importAppointments(appointments: UserUpdateAppointmentInput[]): Observable<UpdateResult> {
    const updateAppointmentsAction = new UpdateAppointmentsAction(appointments);
    updateAppointmentsAction.Do(this)
    return updateAppointmentsAction.response;
  }

  validateAppointmentExcelData(excelData: any[], locations: Location[], patients: Patient[], clinicalProviders: ClinicalProvider[], legalCases: LegalCase[], appointmentStatuses: AppointmentStatus[]) {
    const validateAppointmentExcelDataAction = new ValidateAppointmentExcelDataAction(excelData, locations, patients, clinicalProviders, legalCases, appointmentStatuses);
    validateAppointmentExcelDataAction.Do(this)
    return validateAppointmentExcelDataAction.response;
  }
}

