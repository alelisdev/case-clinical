
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { BalanceRequest, UserCreateBalanceRequestInput, UserUpdateBalanceRequestInput, UpdateResult, Document, LegalCase } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateBalanceRequestExcelDataAction } from './actions/validate-balance-request-excel-data.action'
import { CreateBalanceRequestAction } from './actions/create-balance-request.action'
import { UpdateBalanceRequestsAction, UpdateBalanceRequestAction } from './actions/update-balance-requests.action'


@Injectable({providedIn: 'root'})
export class BalanceRequestBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.BalanceRequestBusinessProviderService', logger, serviceContext)
  }

  createBalanceRequest(input: UserCreateBalanceRequestInput): Observable<BalanceRequest> {
    console.log("input", input)
    const action = new CreateBalanceRequestAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateBalanceRequest(input: UserUpdateBalanceRequestInput, balanceRequestId: string): Observable<BalanceRequest> {
    const action = new UpdateBalanceRequestAction(input, balanceRequestId); 
    action.Do(this);
    return action.response;   
  }
  
  importBalanceRequests(balanceRequests: UserUpdateBalanceRequestInput[]): Observable<UpdateResult> {
    const updateBalanceRequestsAction = new UpdateBalanceRequestsAction(balanceRequests);
    updateBalanceRequestsAction.Do(this)
    return updateBalanceRequestsAction.response;
  }

  validateBalanceRequestExcelData(excelData: any[], statements: Document[], legalCases: LegalCase[]) {
    const validateBalanceRequestExcelDataAction = new ValidateBalanceRequestExcelDataAction(excelData, statements, legalCases);
    validateBalanceRequestExcelDataAction.Do(this)
    return validateBalanceRequestExcelDataAction.response;
  }
}

