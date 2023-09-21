
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { TaskItem, UserCreateTaskItemInput, UserUpdateTaskItemInput, UpdateResult, LegalCase, User } from "@case-clinical/shared/util/sdk";
import { TaskItemBusinessProviderService } from "./task-item.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class TaskItemService extends ServiceBase {
 constructor(
  @Inject(TaskItemBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: TaskItemBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("TaskItemService", loggingService, serviceContext);
 }

    createTaskItem(input: UserCreateTaskItemInput): Observable<TaskItem> {
        return this.businessProvider.createTaskItem(input);
    }

    updateTaskItem(input: UserUpdateTaskItemInput, taskItemId: string): Observable<TaskItem> {
        return this.businessProvider.updateTaskItem(input, taskItemId);
    }

    importTaskItems(taskItems: UserUpdateTaskItemInput[]): Observable<UpdateResult> {
        return this.businessProvider.importTaskItems(taskItems);
    }

    validateTaskItemExcelData(excelData: any[], legalCases: LegalCase[], assignedTos: User[]) {
      return this.businessProvider.validateTaskItemExcelData(excelData, legalCases, assignedTos);
    }
}

