
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { WriteOffStatus, UserCreateWriteOffStatusInput, UserUpdateWriteOffStatusInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateWriteOffStatusExcelDataAction } from './actions/validate-write-off-status-excel-data.action'
import { CreateWriteOffStatusAction } from './actions/create-write-off-status.action'
import { UpdateWriteOffStatusesAction, UpdateWriteOffStatusAction } from './actions/update-write-off-statuses.action'


@Injectable({providedIn: 'root'})
export class WriteOffStatusBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.WriteOffStatusBusinessProviderService', logger, serviceContext)
  }

  createWriteOffStatus(input: UserCreateWriteOffStatusInput): Observable<WriteOffStatus> {
    const action = new CreateWriteOffStatusAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateWriteOffStatus(input: UserUpdateWriteOffStatusInput, writeOffStatusId: string): Observable<WriteOffStatus> {
    const action = new UpdateWriteOffStatusAction(input, writeOffStatusId); 
    action.Do(this);
    return action.response;   
  }
  
  importWriteOffStatuses(writeOffStatuses: UserUpdateWriteOffStatusInput[]): Observable<UpdateResult> {
    const updateWriteOffStatusesAction = new UpdateWriteOffStatusesAction(writeOffStatuses);
    updateWriteOffStatusesAction.Do(this)
    return updateWriteOffStatusesAction.response;
  }

  validateWriteOffStatusExcelData(excelData: any[] ) {
    const validateWriteOffStatusExcelDataAction = new ValidateWriteOffStatusExcelDataAction(excelData );
    validateWriteOffStatusExcelDataAction.Do(this)
    return validateWriteOffStatusExcelDataAction.response;
  }
}

