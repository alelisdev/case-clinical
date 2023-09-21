
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { CasePreAccident, UserCreateCasePreAccidentInput, UserUpdateCasePreAccidentInput, UpdateResult, LegalCase } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateCasePreAccidentExcelDataAction } from './actions/validate-case-pre-accident-excel-data.action'
import { CreateCasePreAccidentAction } from './actions/create-case-pre-accident.action'
import { UpdateCasePreAccidentsAction, UpdateCasePreAccidentAction } from './actions/update-case-pre-accidents.action'

@Injectable({providedIn: 'root'})
export class CasePreAccidentBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.CasePreAccidentBusinessProviderService', logger, serviceContext)
  }

  
  createCasePreAccident(input: UserCreateCasePreAccidentInput): Observable<CasePreAccident> {
    const action = new CreateCasePreAccidentAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateCasePreAccident(input: UserUpdateCasePreAccidentInput, casePreAccidentId: string): Observable<CasePreAccident> {
    const action = new UpdateCasePreAccidentAction(input, casePreAccidentId); 
    action.Do(this);
    return action.response;   
  }
  
  importCasePreAccidents(casePreAccidents: UserUpdateCasePreAccidentInput[]): Observable<UpdateResult> {
    const updateCasePreAccidentsAction = new UpdateCasePreAccidentsAction(casePreAccidents);
    updateCasePreAccidentsAction.Do(this)
    return updateCasePreAccidentsAction.response;
  }

  validateCasePreAccidentExcelData(excelData: any[], legalCases: LegalCase[], legalCaseId?:string) {
    
    const validateCasePreAccidentExcelDataAction = new ValidateCasePreAccidentExcelDataAction(excelData, legalCases, legalCaseId);
    validateCasePreAccidentExcelDataAction.Do(this)
    return validateCasePreAccidentExcelDataAction.response;
  }
}

