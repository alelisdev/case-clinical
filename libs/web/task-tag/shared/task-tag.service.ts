
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { TaskTag, UserCreateTaskTagInput, UserUpdateTaskTagInput, UpdateResult, TaskItem, Tag } from "@case-clinical/shared/util/sdk";
import { TaskTagBusinessProviderService } from "./task-tag.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class TaskTagService extends ServiceBase {
 constructor(
  @Inject(TaskTagBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: TaskTagBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("TaskTagService", loggingService, serviceContext);
 }

    createTaskTag(input: UserCreateTaskTagInput): Observable<TaskTag> {
        return this.businessProvider.createTaskTag(input);
    }

    updateTaskTag(input: UserUpdateTaskTagInput, taskTagId: string): Observable<TaskTag> {
        return this.businessProvider.updateTaskTag(input, taskTagId);
    }

    importTaskTags(taskTags: UserUpdateTaskTagInput[]): Observable<UpdateResult> {
        return this.businessProvider.importTaskTags(taskTags);
    }

    validateTaskTagExcelData(excelData: any[], tasks: TaskItem[], tags: Tag[]) {
      return this.businessProvider.validateTaskTagExcelData(excelData, tasks, tags);
    }
}

