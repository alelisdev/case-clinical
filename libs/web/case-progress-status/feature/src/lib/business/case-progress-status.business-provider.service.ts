
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateCaseProgressStatusAction} from './actions/create-case-progress-status.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {CaseProgressStatus, UserCreateCaseProgressStatusInput, UserUpdateCaseProgressStatusInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateCaseProgressStatusesAction, UpdateCaseProgressStatusAction } from './actions/update-case-progress-statuses.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class CaseProgressStatusBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.CaseProgressStatusBusinessProviderService', logger, serviceContext)
  }

  createCaseProgressStatus(input: UserCreateCaseProgressStatusInput): Observable<CaseProgressStatus> {
    const action = new CreateCaseProgressStatusAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateCaseProgressStatus(input: UserUpdateCaseProgressStatusInput, caseProgressStatusId: string): Observable<CaseProgressStatus> {
    const action = new UpdateCaseProgressStatusAction(input, caseProgressStatusId); 
    action.Do(this);
    return action.response;   
  }
  
  importCaseProgressStatuses(caseProgressStatuses: UserUpdateCaseProgressStatusInput[]): Observable<boolean> {
    const updateCaseProgressStatusesAction = new UpdateCaseProgressStatusesAction(caseProgressStatuses);
    updateCaseProgressStatusesAction.Do(this)
    return updateCaseProgressStatusesAction.response;
  }
}

