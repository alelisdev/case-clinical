
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateCaseAccountAction} from './actions/create-case-account.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {CaseAccount, UserCreateCaseAccountInput, UserUpdateCaseAccountInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateCaseAccountsAction, UpdateCaseAccountAction } from './actions/update-case-accounts.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class CaseAccountBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.CaseAccountBusinessProviderService', logger, serviceContext)
  }

  createCaseAccount(input: UserCreateCaseAccountInput): Observable<CaseAccount> {
    const action = new CreateCaseAccountAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateCaseAccount(input: UserUpdateCaseAccountInput, caseAccountId: string): Observable<CaseAccount> {
    const action = new UpdateCaseAccountAction(input, caseAccountId); 
    action.Do(this);
    return action.response;   
  }
  
  importCaseAccounts(caseAccounts: UserUpdateCaseAccountInput[]): Observable<boolean> {
    const updateCaseAccountsAction = new UpdateCaseAccountsAction(caseAccounts);
    updateCaseAccountsAction.Do(this)
    return updateCaseAccountsAction.response;
  }
}

