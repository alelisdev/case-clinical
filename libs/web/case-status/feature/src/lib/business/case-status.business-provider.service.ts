
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateCaseStatusAction} from './actions/create-case-status.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {CaseStatus, UserCreateCaseStatusInput, UserUpdateCaseStatusInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateCaseStatusesAction, UpdateCaseStatusAction } from './actions/update-case-statuses.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class CaseStatusBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.CaseStatusBusinessProviderService', logger, serviceContext)
  }

  createCaseStatus(input: UserCreateCaseStatusInput): Observable<CaseStatus> {
    const action = new CreateCaseStatusAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateCaseStatus(input: UserUpdateCaseStatusInput, caseStatusId: string): Observable<CaseStatus> {
    const action = new UpdateCaseStatusAction(input, caseStatusId); 
    action.Do(this);
    return action.response;   
  }
  
  importCaseStatuses(caseStatuses: UserUpdateCaseStatusInput[]): Observable<boolean> {
    const updateCaseStatusesAction = new UpdateCaseStatusesAction(caseStatuses);
    updateCaseStatusesAction.Do(this)
    return updateCaseStatusesAction.response;
  }
}

