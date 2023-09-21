
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreatePriorAuthorizationProcedureCodeAction} from './actions/create-prior-authorization-procedure-code.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {PriorAuthorizationProcedureCode, UserCreatePriorAuthorizationProcedureCodeInput, UserUpdatePriorAuthorizationProcedureCodeInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdatePriorAuthorizationProcedureCodesAction, UpdatePriorAuthorizationProcedureCodeAction } from './actions/update-prior-authorization-procedure-codes.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class PriorAuthorizationProcedureCodeBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.PriorAuthorizationProcedureCodeBusinessProviderService', logger, serviceContext)
  }

  createPriorAuthorizationProcedureCode(input: UserCreatePriorAuthorizationProcedureCodeInput): Observable<PriorAuthorizationProcedureCode> {
    const action = new CreatePriorAuthorizationProcedureCodeAction(input); 
    action.Do(this);
    return action.response;   
  }

  updatePriorAuthorizationProcedureCode(input: UserUpdatePriorAuthorizationProcedureCodeInput, priorAuthorizationProcedureCodeId: string): Observable<PriorAuthorizationProcedureCode> {
    const action = new UpdatePriorAuthorizationProcedureCodeAction(input, priorAuthorizationProcedureCodeId); 
    action.Do(this);
    return action.response;   
  }
  
  importPriorAuthorizationProcedureCodes(priorAuthorizationProcedureCodes: UserUpdatePriorAuthorizationProcedureCodeInput[]): Observable<boolean> {
    const updatePriorAuthorizationProcedureCodesAction = new UpdatePriorAuthorizationProcedureCodesAction(priorAuthorizationProcedureCodes);
    updatePriorAuthorizationProcedureCodesAction.Do(this)
    return updatePriorAuthorizationProcedureCodesAction.response;
  }
}

