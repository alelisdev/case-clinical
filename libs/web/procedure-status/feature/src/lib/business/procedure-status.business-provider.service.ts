
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateProcedureStatusAction} from './actions/create-procedure-status.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {ProcedureStatus, UserCreateProcedureStatusInput, UserUpdateProcedureStatusInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateProcedureStatusesAction, UpdateProcedureStatusAction } from './actions/update-procedure-statuses.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class ProcedureStatusBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.ProcedureStatusBusinessProviderService', logger, serviceContext)
  }

  createProcedureStatus(input: UserCreateProcedureStatusInput): Observable<ProcedureStatus> {
    const action = new CreateProcedureStatusAction(input);
    action.Do(this);
    return action.response;
  }

  updateProcedureStatus(input: UserUpdateProcedureStatusInput, procedureStatusId: string): Observable<ProcedureStatus> {
    const action = new UpdateProcedureStatusAction(input, procedureStatusId);
    action.Do(this);
    return action.response;
  }

  importProcedureStatuses(procedureStatuses: UserUpdateProcedureStatusInput[]): Observable<boolean> {
    const updateProcedureStatusesAction = new UpdateProcedureStatusesAction(procedureStatuses);
    updateProcedureStatusesAction.Do(this)
    return updateProcedureStatusesAction.response;
  }
}

