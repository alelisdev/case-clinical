
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateProcessAction} from './actions/create-process.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {Process, UserCreateProcessInput, UserUpdateProcessInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateProcessesAction, UpdateProcessAction } from './actions/update-processes.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class ProcessBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.ProcessBusinessProviderService', logger, serviceContext)
  }

  createProcess(input: UserCreateProcessInput): Observable<Process> {
    const action = new CreateProcessAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateProcess(input: UserUpdateProcessInput, processId: string): Observable<Process> {
    const action = new UpdateProcessAction(input, processId); 
    action.Do(this);
    return action.response;   
  }
  
  importProcesses(processes: UserUpdateProcessInput[]): Observable<boolean> {
    const updateProcessesAction = new UpdateProcessesAction(processes);
    updateProcessesAction.Do(this)
    return updateProcessesAction.response;
  }
}

