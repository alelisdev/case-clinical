
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreatePriorAuthorizationDiagnosisCodeAction} from './actions/create-prior-authorization-diagnosis-code.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {PriorAuthorizationDiagnosisCode, UserCreatePriorAuthorizationDiagnosisCodeInput, UserUpdatePriorAuthorizationDiagnosisCodeInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdatePriorAuthorizationDiagnosisCodesAction, UpdatePriorAuthorizationDiagnosisCodeAction } from './actions/update-prior-authorization-diagnosis-codes.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class PriorAuthorizationDiagnosisCodeBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.PriorAuthorizationDiagnosisCodeBusinessProviderService', logger, serviceContext)
  }

  createPriorAuthorizationDiagnosisCode(input: UserCreatePriorAuthorizationDiagnosisCodeInput): Observable<PriorAuthorizationDiagnosisCode> {
    const action = new CreatePriorAuthorizationDiagnosisCodeAction(input); 
    action.Do(this);
    return action.response;   
  }

  updatePriorAuthorizationDiagnosisCode(input: UserUpdatePriorAuthorizationDiagnosisCodeInput, priorAuthorizationDiagnosisCodeId: string): Observable<PriorAuthorizationDiagnosisCode> {
    const action = new UpdatePriorAuthorizationDiagnosisCodeAction(input, priorAuthorizationDiagnosisCodeId); 
    action.Do(this);
    return action.response;   
  }
  
  importPriorAuthorizationDiagnosisCodes(priorAuthorizationDiagnosisCodes: UserUpdatePriorAuthorizationDiagnosisCodeInput[]): Observable<boolean> {
    const updatePriorAuthorizationDiagnosisCodesAction = new UpdatePriorAuthorizationDiagnosisCodesAction(priorAuthorizationDiagnosisCodes);
    updatePriorAuthorizationDiagnosisCodesAction.Do(this)
    return updatePriorAuthorizationDiagnosisCodesAction.response;
  }
}

