
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { PriorAuthorizationProcedureCode, UserCreatePriorAuthorizationProcedureCodeInput, UserUpdatePriorAuthorizationProcedureCodeInput, UpdateResult, CostCategory, Procedure, PriorAuthorizationRequest } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidatePriorAuthorizationProcedureCodeExcelDataAction } from './actions/validate-prior-authorization-procedure-code-excel-data.action'
import { CreatePriorAuthorizationProcedureCodeAction } from './actions/create-prior-authorization-procedure-code.action'
import { UpdatePriorAuthorizationProcedureCodesAction, UpdatePriorAuthorizationProcedureCodeAction } from './actions/update-prior-authorization-procedure-codes.action'


@Injectable({providedIn: 'root'})
export class PriorAuthorizationProcedureCodeBusinessProviderService extends ServiceBase {
  constructor(
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
  
  importPriorAuthorizationProcedureCodes(priorAuthorizationProcedureCodes: UserUpdatePriorAuthorizationProcedureCodeInput[]): Observable<UpdateResult> {
    const updatePriorAuthorizationProcedureCodesAction = new UpdatePriorAuthorizationProcedureCodesAction(priorAuthorizationProcedureCodes);
    updatePriorAuthorizationProcedureCodesAction.Do(this)
    return updatePriorAuthorizationProcedureCodesAction.response;
  }

  validatePriorAuthorizationProcedureCodeExcelData(excelData: any[], costCategories: CostCategory[], procedures: Procedure[], priorAuthorizationRequests: PriorAuthorizationRequest[]) {
    const validatePriorAuthorizationProcedureCodeExcelDataAction = new ValidatePriorAuthorizationProcedureCodeExcelDataAction(excelData, costCategories, procedures, priorAuthorizationRequests);
    validatePriorAuthorizationProcedureCodeExcelDataAction.Do(this)
    return validatePriorAuthorizationProcedureCodeExcelDataAction.response;
  }
}

