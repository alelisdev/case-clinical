
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateAppointmentStatusAction} from './actions/create-appointment-status.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {AppointmentStatus, UserCreateAppointmentStatusInput, UserUpdateAppointmentStatusInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateAppointmentStatusesAction, UpdateAppointmentStatusAction } from './actions/update-appointment-statuses.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class AppointmentStatusBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.AppointmentStatusBusinessProviderService', logger, serviceContext)
  }

  createAppointmentStatus(input: UserCreateAppointmentStatusInput): Observable<AppointmentStatus> {
    const action = new CreateAppointmentStatusAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateAppointmentStatus(input: UserUpdateAppointmentStatusInput, appointmentStatusId: string): Observable<AppointmentStatus> {
    const action = new UpdateAppointmentStatusAction(input, appointmentStatusId); 
    action.Do(this);
    return action.response;   
  }
  
  importAppointmentStatuses(appointmentStatuses: UserUpdateAppointmentStatusInput[]): Observable<boolean> {
    const updateAppointmentStatusesAction = new UpdateAppointmentStatusesAction(appointmentStatuses);
    updateAppointmentStatusesAction.Do(this)
    return updateAppointmentStatusesAction.response;
  }
}

