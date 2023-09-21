
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateCasePreProblemAction} from './actions/create-case-pre-problem.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {CasePreProblem, UserCreateCasePreProblemInput, UserUpdateCasePreProblemInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateCasePreProblemsAction, UpdateCasePreProblemAction } from './actions/update-case-pre-problems.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class CasePreProblemBusinessProviderService extends ServiceBase {constructor(
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
  
  importCasePreProblems(casePreProblems: UserUpdateCasePreProblemInput[]): Observable<boolean> {
    const updateCasePreProblemsAction = new UpdateCasePreProblemsAction(casePreProblems);
    updateCasePreProblemsAction.Do(this)
    return updateCasePreProblemsAction.response;
  }
}

