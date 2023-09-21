
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { AppointmentStatus, UserCreateAppointmentStatusInput, UserUpdateAppointmentStatusInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateAppointmentStatusExcelDataAction } from './actions/validate-appointment-status-excel-data.action'
import { CreateAppointmentStatusAction } from './actions/create-appointment-status.action'
import { UpdateAppointmentStatusesAction, UpdateAppointmentStatusAction } from './actions/update-appointment-statuses.action'


@Injectable({providedIn: 'root'})
export class AppointmentStatusBusinessProviderService extends ServiceBase {
  constructor(
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
  
  importAppointmentStatuses(appointmentStatuses: UserUpdateAppointmentStatusInput[]): Observable<UpdateResult> {
    const updateAppointmentStatusesAction = new UpdateAppointmentStatusesAction(appointmentStatuses);
    updateAppointmentStatusesAction.Do(this)
    return updateAppointmentStatusesAction.response;
  }

  validateAppointmentStatusExcelData(excelData: any[] ) {
    const validateAppointmentStatusExcelDataAction = new ValidateAppointmentStatusExcelDataAction(excelData );
    validateAppointmentStatusExcelDataAction.Do(this)
    return validateAppointmentStatusExcelDataAction.response;
  }
}

