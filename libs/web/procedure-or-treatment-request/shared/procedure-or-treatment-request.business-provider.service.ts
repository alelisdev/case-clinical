
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { ProcedureOrTreatmentRequest, UserCreateProcedureOrTreatmentRequestInput, UserUpdateProcedureOrTreatmentRequestInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateProcedureOrTreatmentRequestExcelDataAction } from './actions/validate-procedure-or-treatment-request-excel-data.action'
import { CreateProcedureOrTreatmentRequestAction } from './actions/create-procedure-or-treatment-request.action'
import { UpdateProcedureOrTreatmentRequestsAction, UpdateProcedureOrTreatmentRequestAction } from './actions/update-procedure-or-treatment-requests.action'


@Injectable({providedIn: 'root'})
export class ProcedureOrTreatmentRequestBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.ProcedureOrTreatmentRequestBusinessProviderService', logger, serviceContext)
  }

  createProcedureOrTreatmentRequest(input: UserCreateProcedureOrTreatmentRequestInput): Observable<ProcedureOrTreatmentRequest> {
    const action = new CreateProcedureOrTreatmentRequestAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateProcedureOrTreatmentRequest(input: UserUpdateProcedureOrTreatmentRequestInput, procedureOrTreatmentRequestId: string): Observable<ProcedureOrTreatmentRequest> {
    const action = new UpdateProcedureOrTreatmentRequestAction(input, procedureOrTreatmentRequestId); 
    action.Do(this);
    return action.response;   
  }
  
  importProcedureOrTreatmentRequests(procedureOrTreatmentRequests: UserUpdateProcedureOrTreatmentRequestInput[]): Observable<UpdateResult> {
    const updateProcedureOrTreatmentRequestsAction = new UpdateProcedureOrTreatmentRequestsAction(procedureOrTreatmentRequests);
    updateProcedureOrTreatmentRequestsAction.Do(this)
    return updateProcedureOrTreatmentRequestsAction.response;
  }

  validateProcedureOrTreatmentRequestExcelData(excelData: any[] ) {
    const validateProcedureOrTreatmentRequestExcelDataAction = new ValidateProcedureOrTreatmentRequestExcelDataAction(excelData );
    validateProcedureOrTreatmentRequestExcelDataAction.Do(this)
    return validateProcedureOrTreatmentRequestExcelDataAction.response;
  }
}

