
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateAttorneyStatusAction} from './actions/create-attorney-status.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {AttorneyStatus, UserCreateAttorneyStatusInput, UserUpdateAttorneyStatusInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateAttorneyStatusesAction, UpdateAttorneyStatusAction } from './actions/update-attorney-statuses.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class AttorneyStatusBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.AttorneyStatusBusinessProviderService', logger, serviceContext)
  }

  createAttorneyStatus(input: UserCreateAttorneyStatusInput): Observable<AttorneyStatus> {
    const action = new CreateAttorneyStatusAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateAttorneyStatus(input: UserUpdateAttorneyStatusInput, attorneyStatusId: string): Observable<AttorneyStatus> {
    const action = new UpdateAttorneyStatusAction(input, attorneyStatusId); 
    action.Do(this);
    return action.response;   
  }
  
  importAttorneyStatuses(attorneyStatuses: UserUpdateAttorneyStatusInput[]): Observable<boolean> {
    const updateAttorneyStatusesAction = new UpdateAttorneyStatusesAction(attorneyStatuses);
    updateAttorneyStatusesAction.Do(this)
    return updateAttorneyStatusesAction.response;
  }
}

