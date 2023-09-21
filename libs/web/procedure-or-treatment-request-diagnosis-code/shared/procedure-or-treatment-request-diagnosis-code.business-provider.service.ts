
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { ProcedureOrTreatmentRequestDiagnosisCode, UserCreateProcedureOrTreatmentRequestDiagnosisCodeInput, UserUpdateProcedureOrTreatmentRequestDiagnosisCodeInput, UpdateResult, DiagnosisCode, ProcedureOrTreatmentRequest } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateProcedureOrTreatmentRequestDiagnosisCodeExcelDataAction } from './actions/validate-procedure-or-treatment-request-diagnosis-code-excel-data.action'
import { CreateProcedureOrTreatmentRequestDiagnosisCodeAction } from './actions/create-procedure-or-treatment-request-diagnosis-code.action'
import { UpdateProcedureOrTreatmentRequestDiagnosisCodesAction, UpdateProcedureOrTreatmentRequestDiagnosisCodeAction } from './actions/update-procedure-or-treatment-request-diagnosis-codes.action'


@Injectable({providedIn: 'root'})
export class ProcedureOrTreatmentRequestDiagnosisCodeBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.ProcedureOrTreatmentRequestDiagnosisCodeBusinessProviderService', logger, serviceContext)
  }

  createProcedureOrTreatmentRequestDiagnosisCode(input: UserCreateProcedureOrTreatmentRequestDiagnosisCodeInput): Observable<ProcedureOrTreatmentRequestDiagnosisCode> {
    const action = new CreateProcedureOrTreatmentRequestDiagnosisCodeAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateProcedureOrTreatmentRequestDiagnosisCode(input: UserUpdateProcedureOrTreatmentRequestDiagnosisCodeInput, procedureOrTreatmentRequestDiagnosisCodeId: string): Observable<ProcedureOrTreatmentRequestDiagnosisCode> {
    const action = new UpdateProcedureOrTreatmentRequestDiagnosisCodeAction(input, procedureOrTreatmentRequestDiagnosisCodeId); 
    action.Do(this);
    return action.response;   
  }
  
  importProcedureOrTreatmentRequestDiagnosisCodes(procedureOrTreatmentRequestDiagnosisCodes: UserUpdateProcedureOrTreatmentRequestDiagnosisCodeInput[]): Observable<UpdateResult> {
    const updateProcedureOrTreatmentRequestDiagnosisCodesAction = new UpdateProcedureOrTreatmentRequestDiagnosisCodesAction(procedureOrTreatmentRequestDiagnosisCodes);
    updateProcedureOrTreatmentRequestDiagnosisCodesAction.Do(this)
    return updateProcedureOrTreatmentRequestDiagnosisCodesAction.response;
  }

  validateProcedureOrTreatmentRequestDiagnosisCodeExcelData(excelData: any[], diagnoses: DiagnosisCode[], procedureOrTreatmentRequests: ProcedureOrTreatmentRequest[]) {
    const validateProcedureOrTreatmentRequestDiagnosisCodeExcelDataAction = new ValidateProcedureOrTreatmentRequestDiagnosisCodeExcelDataAction(excelData, diagnoses, procedureOrTreatmentRequests);
    validateProcedureOrTreatmentRequestDiagnosisCodeExcelDataAction.Do(this)
    return validateProcedureOrTreatmentRequestDiagnosisCodeExcelDataAction.response;
  }
}

