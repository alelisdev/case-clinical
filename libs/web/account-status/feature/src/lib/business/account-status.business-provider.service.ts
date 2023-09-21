
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateAccountStatusAction} from './actions/create-account-status.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {AccountStatus, UserCreateAccountStatusInput, UserUpdateAccountStatusInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateAccountStatusesAction, UpdateAccountStatusAction } from './actions/update-account-statuses.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class AccountStatusBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.AccountStatusBusinessProviderService', logger, serviceContext)
  }

  createAccountStatus(input: UserCreateAccountStatusInput): Observable<AccountStatus> {
    const action = new CreateAccountStatusAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateAccountStatus(input: UserUpdateAccountStatusInput, accountStatusId: string): Observable<AccountStatus> {
    const action = new UpdateAccountStatusAction(input, accountStatusId); 
    action.Do(this);
    return action.response;   
  }
  
  importAccountStatuses(accountStatuses: UserUpdateAccountStatusInput[]): Observable<boolean> {
    const updateAccountStatusesAction = new UpdateAccountStatusesAction(accountStatuses);
    updateAccountStatusesAction.Do(this)
    return updateAccountStatusesAction.response;
  }
}

