
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { PriorAuthorizationDiagnosisCode, UserCreatePriorAuthorizationDiagnosisCodeInput, UserUpdatePriorAuthorizationDiagnosisCodeInput, UpdateResult, DiagnosisCode, PriorAuthorizationRequest } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidatePriorAuthorizationDiagnosisCodeExcelDataAction } from './actions/validate-prior-authorization-diagnosis-code-excel-data.action'
import { CreatePriorAuthorizationDiagnosisCodeAction } from './actions/create-prior-authorization-diagnosis-code.action'
import { UpdatePriorAuthorizationDiagnosisCodesAction, UpdatePriorAuthorizationDiagnosisCodeAction } from './actions/update-prior-authorization-diagnosis-codes.action'


@Injectable({providedIn: 'root'})
export class PriorAuthorizationDiagnosisCodeBusinessProviderService extends ServiceBase {
  constructor(
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
  
  importPriorAuthorizationDiagnosisCodes(priorAuthorizationDiagnosisCodes: UserUpdatePriorAuthorizationDiagnosisCodeInput[]): Observable<UpdateResult> {
    const updatePriorAuthorizationDiagnosisCodesAction = new UpdatePriorAuthorizationDiagnosisCodesAction(priorAuthorizationDiagnosisCodes);
    updatePriorAuthorizationDiagnosisCodesAction.Do(this)
    return updatePriorAuthorizationDiagnosisCodesAction.response;
  }

  validatePriorAuthorizationDiagnosisCodeExcelData(excelData: any[], diagnoses: DiagnosisCode[], priorAuthorizationRequests: PriorAuthorizationRequest[]) {
    const validatePriorAuthorizationDiagnosisCodeExcelDataAction = new ValidatePriorAuthorizationDiagnosisCodeExcelDataAction(excelData, diagnoses, priorAuthorizationRequests);
    validatePriorAuthorizationDiagnosisCodeExcelDataAction.Do(this)
    return validatePriorAuthorizationDiagnosisCodeExcelDataAction.response;
  }
}

