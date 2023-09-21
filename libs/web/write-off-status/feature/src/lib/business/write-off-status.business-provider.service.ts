
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateWriteOffStatusAction} from './actions/create-write-off-status.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {WriteOffStatus, UserCreateWriteOffStatusInput, UserUpdateWriteOffStatusInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateWriteOffStatusesAction, UpdateWriteOffStatusAction } from './actions/update-write-off-statuses.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class WriteOffStatusBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.WriteOffStatusBusinessProviderService', logger, serviceContext)
  }

  createWriteOffStatus(input: UserCreateWriteOffStatusInput): Observable<WriteOffStatus> {
    const action = new CreateWriteOffStatusAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateWriteOffStatus(input: UserUpdateWriteOffStatusInput, writeOffStatusId: string): Observable<WriteOffStatus> {
    const action = new UpdateWriteOffStatusAction(input, writeOffStatusId); 
    action.Do(this);
    return action.response;   
  }
  
  importWriteOffStatuses(writeOffStatuses: UserUpdateWriteOffStatusInput[]): Observable<boolean> {
    const updateWriteOffStatusesAction = new UpdateWriteOffStatusesAction(writeOffStatuses);
    updateWriteOffStatusesAction.Do(this)
    return updateWriteOffStatusesAction.response;
  }
}

