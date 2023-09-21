
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreatePriorMedsToDateStatusAction} from './actions/create-prior-meds-to-date-status.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {PriorMedsToDateStatus, UserCreatePriorMedsToDateStatusInput, UserUpdatePriorMedsToDateStatusInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdatePriorMedsToDateStatusesAction, UpdatePriorMedsToDateStatusAction } from './actions/update-prior-meds-to-date-statuses.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class PriorMedsToDateStatusBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.PriorMedsToDateStatusBusinessProviderService', logger, serviceContext)
  }

  createPriorMedsToDateStatus(input: UserCreatePriorMedsToDateStatusInput): Observable<PriorMedsToDateStatus> {
    const action = new CreatePriorMedsToDateStatusAction(input); 
    action.Do(this);
    return action.response;   
  }

  updatePriorMedsToDateStatus(input: UserUpdatePriorMedsToDateStatusInput, priorMedsToDateStatusId: string): Observable<PriorMedsToDateStatus> {
    const action = new UpdatePriorMedsToDateStatusAction(input, priorMedsToDateStatusId); 
    action.Do(this);
    return action.response;   
  }
  
  importPriorMedsToDateStatuses(priorMedsToDateStatuses: UserUpdatePriorMedsToDateStatusInput[]): Observable<boolean> {
    const updatePriorMedsToDateStatusesAction = new UpdatePriorMedsToDateStatusesAction(priorMedsToDateStatuses);
    updatePriorMedsToDateStatusesAction.Do(this)
    return updatePriorMedsToDateStatusesAction.response;
  }
}

