
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { CasePreProcedure, UserCreateCasePreProcedureInput, UserUpdateCasePreProcedureInput, UpdateResult, LegalCase } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateCasePreProcedureExcelDataAction } from './actions/validate-case-pre-procedure-excel-data.action'
import { CreateCasePreProcedureAction } from './actions/create-case-pre-procedure.action'
import { UpdateCasePreProceduresAction, UpdateCasePreProcedureAction } from './actions/update-case-pre-procedures.action'


@Injectable({providedIn: 'root'})
export class CasePreProcedureBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.CasePreProcedureBusinessProviderService', logger, serviceContext)
  }

  createCasePreProcedure(input: UserCreateCasePreProcedureInput): Observable<CasePreProcedure> {
    const action = new CreateCasePreProcedureAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateCasePreProcedure(input: UserUpdateCasePreProcedureInput, casePreProcedureId: string): Observable<CasePreProcedure> {
    const action = new UpdateCasePreProcedureAction(input, casePreProcedureId); 
    action.Do(this);
    return action.response;   
  }
  
  importCasePreProcedures(casePreProcedures: UserUpdateCasePreProcedureInput[]): Observable<UpdateResult> {
    const updateCasePreProceduresAction = new UpdateCasePreProceduresAction(casePreProcedures);
    updateCasePreProceduresAction.Do(this)
    return updateCasePreProceduresAction.response;
  }

  validateCasePreProcedureExcelData(excelData: any[], legalCases: LegalCase[]) {
    const validateCasePreProcedureExcelDataAction = new ValidateCasePreProcedureExcelDataAction(excelData, legalCases);
    validateCasePreProcedureExcelDataAction.Do(this)
    return validateCasePreProcedureExcelDataAction.response;
  }
}

