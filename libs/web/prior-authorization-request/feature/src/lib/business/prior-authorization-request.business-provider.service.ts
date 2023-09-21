
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreatePriorAuthorizationRequestAction} from './actions/create-prior-authorization-request.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {PriorAuthorizationRequest, UserCreatePriorAuthorizationRequestInput, UserUpdatePriorAuthorizationRequestInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdatePriorAuthorizationRequestsAction, UpdatePriorAuthorizationRequestAction } from './actions/update-prior-authorization-requests.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class PriorAuthorizationRequestBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.PriorAuthorizationRequestBusinessProviderService', logger, serviceContext)
  }

  createPriorAuthorizationRequest(input: UserCreatePriorAuthorizationRequestInput): Observable<PriorAuthorizationRequest> {
    const action = new CreatePriorAuthorizationRequestAction(input); 
    action.Do(this);
    return action.response;   
  }

  updatePriorAuthorizationRequest(input: UserUpdatePriorAuthorizationRequestInput, priorAuthorizationRequestId: string): Observable<PriorAuthorizationRequest> {
    const action = new UpdatePriorAuthorizationRequestAction(input, priorAuthorizationRequestId); 
    action.Do(this);
    return action.response;   
  }
  
  importPriorAuthorizationRequests(priorAuthorizationRequests: UserUpdatePriorAuthorizationRequestInput[]): Observable<boolean> {
    const updatePriorAuthorizationRequestsAction = new UpdatePriorAuthorizationRequestsAction(priorAuthorizationRequests);
    updatePriorAuthorizationRequestsAction.Do(this)
    return updatePriorAuthorizationRequestsAction.response;
  }
}

