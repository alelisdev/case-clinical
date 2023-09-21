
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { TaskTag, UserCreateTaskTagInput, UserUpdateTaskTagInput, UpdateResult, TaskItem, Tag } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateTaskTagExcelDataAction } from './actions/validate-task-tag-excel-data.action'
import { CreateTaskTagAction } from './actions/create-task-tag.action'
import { UpdateTaskTagsAction, UpdateTaskTagAction } from './actions/update-task-tags.action'


@Injectable({providedIn: 'root'})
export class TaskTagBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.TaskTagBusinessProviderService', logger, serviceContext)
  }

  createTaskTag(input: UserCreateTaskTagInput): Observable<TaskTag> {
    const action = new CreateTaskTagAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateTaskTag(input: UserUpdateTaskTagInput, taskTagId: string): Observable<TaskTag> {
    const action = new UpdateTaskTagAction(input, taskTagId); 
    action.Do(this);
    return action.response;   
  }
  
  importTaskTags(taskTags: UserUpdateTaskTagInput[]): Observable<UpdateResult> {
    const updateTaskTagsAction = new UpdateTaskTagsAction(taskTags);
    updateTaskTagsAction.Do(this)
    return updateTaskTagsAction.response;
  }

  validateTaskTagExcelData(excelData: any[], tasks: TaskItem[], tags: Tag[]) {
    const validateTaskTagExcelDataAction = new ValidateTaskTagExcelDataAction(excelData, tasks, tags);
    validateTaskTagExcelDataAction.Do(this)
    return validateTaskTagExcelDataAction.response;
  }
}

