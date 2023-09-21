
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { AccountStatus, UserCreateAccountStatusInput, UserUpdateAccountStatusInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateAccountStatusExcelDataAction } from './actions/validate-account-status-excel-data.action'
import { CreateAccountStatusAction } from './actions/create-account-status.action'
import { UpdateAccountStatusesAction, UpdateAccountStatusAction } from './actions/update-account-statuses.action'


@Injectable({providedIn: 'root'})
export class AccountStatusBusinessProviderService extends ServiceBase {
  constructor(
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
  
  importAccountStatuses(accountStatuses: UserUpdateAccountStatusInput[]): Observable<UpdateResult> {
    const updateAccountStatusesAction = new UpdateAccountStatusesAction(accountStatuses);
    updateAccountStatusesAction.Do(this)
    return updateAccountStatusesAction.response;
  }

  validateAccountStatusExcelData(excelData: any[] ) {
    const validateAccountStatusExcelDataAction = new ValidateAccountStatusExcelDataAction(excelData );
    validateAccountStatusExcelDataAction.Do(this)
    return validateAccountStatusExcelDataAction.response;
  }
}

