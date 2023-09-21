
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { CasePreProblem, UserCreateCasePreProblemInput, UserUpdateCasePreProblemInput, UpdateResult, LegalCase } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateCasePreProblemExcelDataAction } from './actions/validate-case-pre-problem-excel-data.action'
import { CreateCasePreProblemAction } from './actions/create-case-pre-problem.action'
import { UpdateCasePreProblemsAction, UpdateCasePreProblemAction } from './actions/update-case-pre-problems.action'


@Injectable({providedIn: 'root'})
export class CasePreProblemBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.CasePreProblemBusinessProviderService', logger, serviceContext)
  }

  createCasePreProblem(input: UserCreateCasePreProblemInput): Observable<CasePreProblem> {
    const action = new CreateCasePreProblemAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateCasePreProblem(input: UserUpdateCasePreProblemInput, casePreProblemId: string): Observable<CasePreProblem> {
    const action = new UpdateCasePreProblemAction(input, casePreProblemId); 
    action.Do(this);
    return action.response;   
  }
  
  importCasePreProblems(casePreProblems: UserUpdateCasePreProblemInput[]): Observable<UpdateResult> {
    const updateCasePreProblemsAction = new UpdateCasePreProblemsAction(casePreProblems);
    updateCasePreProblemsAction.Do(this)
    return updateCasePreProblemsAction.response;
  }

  validateCasePreProblemExcelData(excelData: any[], legalCases: LegalCase[]) {
    const validateCasePreProblemExcelDataAction = new ValidateCasePreProblemExcelDataAction(excelData, legalCases);
    validateCasePreProblemExcelDataAction.Do(this)
    return validateCasePreProblemExcelDataAction.response;
  }
}

