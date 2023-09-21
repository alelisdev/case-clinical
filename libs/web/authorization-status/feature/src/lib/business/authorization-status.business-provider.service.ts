
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateAuthorizationStatusAction} from './actions/create-authorization-status.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {AuthorizationStatus, UserCreateAuthorizationStatusInput, UserUpdateAuthorizationStatusInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateAuthorizationStatusesAction, UpdateAuthorizationStatusAction } from './actions/update-authorization-statuses.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class AuthorizationStatusBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.AuthorizationStatusBusinessProviderService', logger, serviceContext)
  }

  createAuthorizationStatus(input: UserCreateAuthorizationStatusInput): Observable<AuthorizationStatus> {
    const action = new CreateAuthorizationStatusAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateAuthorizationStatus(input: UserUpdateAuthorizationStatusInput, authorizationStatusId: string): Observable<AuthorizationStatus> {
    const action = new UpdateAuthorizationStatusAction(input, authorizationStatusId); 
    action.Do(this);
    return action.response;   
  }
  
  importAuthorizationStatuses(authorizationStatuses: UserUpdateAuthorizationStatusInput[]): Observable<boolean> {
    const updateAuthorizationStatusesAction = new UpdateAuthorizationStatusesAction(authorizationStatuses);
    updateAuthorizationStatusesAction.Do(this)
    return updateAuthorizationStatusesAction.response;
  }
}

