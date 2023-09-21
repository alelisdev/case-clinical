
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateLegalCaseAction} from './actions/create-legal-case.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {LegalCase, UserCreateLegalCaseInput, UserUpdateLegalCaseInput,UpdateResult} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateLegalCasesAction, UpdateLegalCaseAction } from './actions/update-legal-cases.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class LegalCaseBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.LegalCaseBusinessProviderService', logger, serviceContext)
  }

  createLegalCase(input: UserCreateLegalCaseInput): Observable<LegalCase> {
    const action = new CreateLegalCaseAction(input);
    action.Do(this);
    return action.response;
  }

  updateLegalCase(input: UserUpdateLegalCaseInput, legalCaseId: string): Observable<LegalCase> {
    const action = new UpdateLegalCaseAction(input, legalCaseId);
    action.Do(this);
    return action.response;
  }

  importLegalCases(legalCases: UserUpdateLegalCaseInput[]): Observable<UpdateResult> {
    const updateLegalCasesAction = new UpdateLegalCasesAction(legalCases);
    updateLegalCasesAction.Do(this)
    return updateLegalCasesAction.response;
  }
}

