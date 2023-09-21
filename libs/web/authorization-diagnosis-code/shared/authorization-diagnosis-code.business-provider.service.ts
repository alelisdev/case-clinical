
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { AuthorizationDiagnosisCode, UserCreateAuthorizationDiagnosisCodeInput, UserUpdateAuthorizationDiagnosisCodeInput, UpdateResult, DiagnosisCode, Authorization } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateAuthorizationDiagnosisCodeExcelDataAction } from './actions/validate-authorization-diagnosis-code-excel-data.action'
import { CreateAuthorizationDiagnosisCodeAction } from './actions/create-authorization-diagnosis-code.action'
import { UpdateAuthorizationDiagnosisCodesAction, UpdateAuthorizationDiagnosisCodeAction } from './actions/update-authorization-diagnosis-codes.action'


@Injectable({providedIn: 'root'})
export class AuthorizationDiagnosisCodeBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.AuthorizationDiagnosisCodeBusinessProviderService', logger, serviceContext)
  }

  createAuthorizationDiagnosisCode(input: UserCreateAuthorizationDiagnosisCodeInput): Observable<AuthorizationDiagnosisCode> {
    const action = new CreateAuthorizationDiagnosisCodeAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateAuthorizationDiagnosisCode(input: UserUpdateAuthorizationDiagnosisCodeInput, authorizationDiagnosisCodeId: string): Observable<AuthorizationDiagnosisCode> {
    const action = new UpdateAuthorizationDiagnosisCodeAction(input, authorizationDiagnosisCodeId); 
    action.Do(this);
    return action.response;   
  }
  
  importAuthorizationDiagnosisCodes(authorizationDiagnosisCodes: UserUpdateAuthorizationDiagnosisCodeInput[]): Observable<UpdateResult> {
    const updateAuthorizationDiagnosisCodesAction = new UpdateAuthorizationDiagnosisCodesAction(authorizationDiagnosisCodes);
    updateAuthorizationDiagnosisCodesAction.Do(this)
    return updateAuthorizationDiagnosisCodesAction.response;
  }

  validateAuthorizationDiagnosisCodeExcelData(excelData: any[], diagnoses: DiagnosisCode[], authorizations: Authorization[]) {
    const validateAuthorizationDiagnosisCodeExcelDataAction = new ValidateAuthorizationDiagnosisCodeExcelDataAction(excelData, diagnoses, authorizations);
    validateAuthorizationDiagnosisCodeExcelDataAction.Do(this)
    return validateAuthorizationDiagnosisCodeExcelDataAction.response;
  }
}

