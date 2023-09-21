
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { ProcedureOrTreatmentRequestAuthorization, UserCreateProcedureOrTreatmentRequestAuthorizationInput, UserUpdateProcedureOrTreatmentRequestAuthorizationInput, UpdateResult, Authorization, ProcedureOrTreatmentRequest } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateProcedureOrTreatmentRequestAuthorizationExcelDataAction } from './actions/validate-procedure-or-treatment-request-authorization-excel-data.action'
import { CreateProcedureOrTreatmentRequestAuthorizationAction } from './actions/create-procedure-or-treatment-request-authorization.action'
import { UpdateProcedureOrTreatmentRequestAuthorizationsAction, UpdateProcedureOrTreatmentRequestAuthorizationAction } from './actions/update-procedure-or-treatment-request-authorizations.action'


@Injectable({providedIn: 'root'})
export class ProcedureOrTreatmentRequestAuthorizationBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.ProcedureOrTreatmentRequestAuthorizationBusinessProviderService', logger, serviceContext)
  }

  createProcedureOrTreatmentRequestAuthorization(input: UserCreateProcedureOrTreatmentRequestAuthorizationInput): Observable<ProcedureOrTreatmentRequestAuthorization> {
    const action = new CreateProcedureOrTreatmentRequestAuthorizationAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateProcedureOrTreatmentRequestAuthorization(input: UserUpdateProcedureOrTreatmentRequestAuthorizationInput, procedureOrTreatmentRequestAuthorizationId: string): Observable<ProcedureOrTreatmentRequestAuthorization> {
    const action = new UpdateProcedureOrTreatmentRequestAuthorizationAction(input, procedureOrTreatmentRequestAuthorizationId); 
    action.Do(this);
    return action.response;   
  }
  
  importProcedureOrTreatmentRequestAuthorizations(procedureOrTreatmentRequestAuthorizations: UserUpdateProcedureOrTreatmentRequestAuthorizationInput[]): Observable<UpdateResult> {
    const updateProcedureOrTreatmentRequestAuthorizationsAction = new UpdateProcedureOrTreatmentRequestAuthorizationsAction(procedureOrTreatmentRequestAuthorizations);
    updateProcedureOrTreatmentRequestAuthorizationsAction.Do(this)
    return updateProcedureOrTreatmentRequestAuthorizationsAction.response;
  }

  validateProcedureOrTreatmentRequestAuthorizationExcelData(excelData: any[], authorizations: Authorization[], procedureOrTreatmentRequests: ProcedureOrTreatmentRequest[]) {
    const validateProcedureOrTreatmentRequestAuthorizationExcelDataAction = new ValidateProcedureOrTreatmentRequestAuthorizationExcelDataAction(excelData, authorizations, procedureOrTreatmentRequests);
    validateProcedureOrTreatmentRequestAuthorizationExcelDataAction.Do(this)
    return validateProcedureOrTreatmentRequestAuthorizationExcelDataAction.response;
  }
}

