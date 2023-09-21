
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { CasePreInjury, UserCreateCasePreInjuryInput, UserUpdateCasePreInjuryInput, UpdateResult, LegalCase } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateCasePreInjuryExcelDataAction } from './actions/validate-case-pre-injury-excel-data.action'
import { CreateCasePreInjuryAction } from './actions/create-case-pre-injury.action'
import { UpdateCasePreInjuriesAction, UpdateCasePreInjuryAction } from './actions/update-case-pre-injuries.action'


@Injectable({providedIn: 'root'})
export class CasePreInjuryBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.CasePreInjuryBusinessProviderService', logger, serviceContext)
  }

  createCasePreInjury(input: UserCreateCasePreInjuryInput): Observable<CasePreInjury> {
    const action = new CreateCasePreInjuryAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateCasePreInjury(input: UserUpdateCasePreInjuryInput, casePreInjuryId: string): Observable<CasePreInjury> {
    const action = new UpdateCasePreInjuryAction(input, casePreInjuryId); 
    action.Do(this);
    return action.response;   
  }
  
  importCasePreInjuries(casePreInjuries: UserUpdateCasePreInjuryInput[]): Observable<UpdateResult> {
    const updateCasePreInjuriesAction = new UpdateCasePreInjuriesAction(casePreInjuries);
    updateCasePreInjuriesAction.Do(this)
    return updateCasePreInjuriesAction.response;
  }

  validateCasePreInjuryExcelData(excelData: any[], legalCases: LegalCase[]) {
    const validateCasePreInjuryExcelDataAction = new ValidateCasePreInjuryExcelDataAction(excelData, legalCases);
    validateCasePreInjuryExcelDataAction.Do(this)
    return validateCasePreInjuryExcelDataAction.response;
  }
}

