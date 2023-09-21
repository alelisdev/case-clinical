
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateAppointmentAction} from './actions/create-appointment.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {Appointment, UserCreateAppointmentInput, UserUpdateAppointmentInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateAppointmentsAction, UpdateAppointmentAction } from './actions/update-appointments.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class AppointmentBusinessProviderService extends ServiceBase {constructor(
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
  
  importAppointments(appointments: UserUpdateAppointmentInput[]): Observable<boolean> {
    const updateAppointmentsAction = new UpdateAppointmentsAction(appointments);
    updateAppointmentsAction.Do(this)
    return updateAppointmentsAction.response;
  }
}

