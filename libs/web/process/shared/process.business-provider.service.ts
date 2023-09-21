
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { Process, UserCreateProcessInput, UserUpdateProcessInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateProcessExcelDataAction } from './actions/validate-process-excel-data.action'
import { CreateProcessAction } from './actions/create-process.action'
import { UpdateProcessesAction, UpdateProcessAction } from './actions/update-processes.action'


@Injectable({providedIn: 'root'})
export class ProcessBusinessProviderService extends ServiceBase {
  constructor(
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
  
  importProcesses(processes: UserUpdateProcessInput[]): Observable<UpdateResult> {
    const updateProcessesAction = new UpdateProcessesAction(processes);
    updateProcessesAction.Do(this)
    return updateProcessesAction.response;
  }

  validateProcessExcelData(excelData: any[] ) {
    const validateProcessExcelDataAction = new ValidateProcessExcelDataAction(excelData );
    validateProcessExcelDataAction.Do(this)
    return validateProcessExcelDataAction.response;
  }
}

