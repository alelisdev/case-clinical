
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { DiagnosisCode, UserCreateDiagnosisCodeInput, UserUpdateDiagnosisCodeInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateDiagnosisCodeExcelDataAction } from './actions/validate-diagnosis-code-excel-data.action'
import { CreateDiagnosisCodeAction } from './actions/create-diagnosis-code.action'
import { UpdateDiagnosisCodesAction, UpdateDiagnosisCodeAction } from './actions/update-diagnosis-codes.action'


@Injectable({providedIn: 'root'})
export class DiagnosisCodeBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.DiagnosisCodeBusinessProviderService', logger, serviceContext)
  }

  createDiagnosisCode(input: UserCreateDiagnosisCodeInput): Observable<DiagnosisCode> {
    const action = new CreateDiagnosisCodeAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateDiagnosisCode(input: UserUpdateDiagnosisCodeInput, diagnosisCodeId: string): Observable<DiagnosisCode> {
    const action = new UpdateDiagnosisCodeAction(input, diagnosisCodeId); 
    action.Do(this);
    return action.response;   
  }
  
  importDiagnosisCodes(diagnosisCodes: UserUpdateDiagnosisCodeInput[]): Observable<UpdateResult> {
    const updateDiagnosisCodesAction = new UpdateDiagnosisCodesAction(diagnosisCodes);
    updateDiagnosisCodesAction.Do(this)
    return updateDiagnosisCodesAction.response;
  }

  validateDiagnosisCodeExcelData(excelData: any[] ) {
    const validateDiagnosisCodeExcelDataAction = new ValidateDiagnosisCodeExcelDataAction(excelData );
    validateDiagnosisCodeExcelDataAction.Do(this)
    return validateDiagnosisCodeExcelDataAction.response;
  }
}

