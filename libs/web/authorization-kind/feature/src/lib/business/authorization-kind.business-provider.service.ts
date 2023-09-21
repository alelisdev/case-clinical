
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateAuthorizationKindAction} from './actions/create-authorization-kind.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {AuthorizationKind, UserCreateAuthorizationKindInput, UserUpdateAuthorizationKindInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateAuthorizationKindsAction, UpdateAuthorizationKindAction } from './actions/update-authorization-kinds.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class AuthorizationKindBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.AuthorizationKindBusinessProviderService', logger, serviceContext)
  }

  createAuthorizationKind(input: UserCreateAuthorizationKindInput): Observable<AuthorizationKind> {
    const action = new CreateAuthorizationKindAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateAuthorizationKind(input: UserUpdateAuthorizationKindInput, authorizationKindId: string): Observable<AuthorizationKind> {
    const action = new UpdateAuthorizationKindAction(input, authorizationKindId); 
    action.Do(this);
    return action.response;   
  }
  
  importAuthorizationKinds(authorizationKinds: UserUpdateAuthorizationKindInput[]): Observable<boolean> {
    const updateAuthorizationKindsAction = new UpdateAuthorizationKindsAction(authorizationKinds);
    updateAuthorizationKindsAction.Do(this)
    return updateAuthorizationKindsAction.response;
  }
}

