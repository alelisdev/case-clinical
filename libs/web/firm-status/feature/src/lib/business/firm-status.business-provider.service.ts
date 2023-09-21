
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateFirmStatusAction} from './actions/create-firm-status.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {FirmStatus, UserCreateFirmStatusInput, UserUpdateFirmStatusInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateFirmStatusesAction, UpdateFirmStatusAction } from './actions/update-firm-statuses.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class FirmStatusBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.FirmStatusBusinessProviderService', logger, serviceContext)
  }

  createFirmStatus(input: UserCreateFirmStatusInput): Observable<FirmStatus> {
    const action = new CreateFirmStatusAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateFirmStatus(input: UserUpdateFirmStatusInput, firmStatusId: string): Observable<FirmStatus> {
    const action = new UpdateFirmStatusAction(input, firmStatusId); 
    action.Do(this);
    return action.response;   
  }
  
  importFirmStatuses(firmStatuses: UserUpdateFirmStatusInput[]): Observable<boolean> {
    const updateFirmStatusesAction = new UpdateFirmStatusesAction(firmStatuses);
    updateFirmStatusesAction.Do(this)
    return updateFirmStatusesAction.response;
  }
}

