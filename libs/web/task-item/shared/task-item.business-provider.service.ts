
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { TaskItem, UserCreateTaskItemInput, UserUpdateTaskItemInput, UpdateResult, LegalCase, User } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateTaskItemExcelDataAction } from './actions/validate-task-item-excel-data.action'
import { CreateTaskItemAction } from './actions/create-task-item.action'
import { UpdateTaskItemsAction, UpdateTaskItemAction } from './actions/update-task-items.action'


@Injectable({providedIn: 'root'})
export class TaskItemBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.TaskItemBusinessProviderService', logger, serviceContext)
  }

  createTaskItem(input: UserCreateTaskItemInput): Observable<TaskItem> {
    const action = new CreateTaskItemAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateTaskItem(input: UserUpdateTaskItemInput, taskItemId: string): Observable<TaskItem> {
    const action = new UpdateTaskItemAction(input, taskItemId); 
    action.Do(this);
    return action.response;   
  }
  
  importTaskItems(taskItems: UserUpdateTaskItemInput[]): Observable<UpdateResult> {
    const updateTaskItemsAction = new UpdateTaskItemsAction(taskItems);
    updateTaskItemsAction.Do(this)
    return updateTaskItemsAction.response;
  }

  validateTaskItemExcelData(excelData: any[], legalCases: LegalCase[], assignedTos: User[]) {
    const validateTaskItemExcelDataAction = new ValidateTaskItemExcelDataAction(excelData, legalCases, assignedTos);
    validateTaskItemExcelDataAction.Do(this)
    return validateTaskItemExcelDataAction.response;
  }
}

