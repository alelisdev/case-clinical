
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { AttorneyStatus, UserCreateAttorneyStatusInput, UserUpdateAttorneyStatusInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateAttorneyStatusExcelDataAction } from './actions/validate-attorney-status-excel-data.action'
import { CreateAttorneyStatusAction } from './actions/create-attorney-status.action'
import { UpdateAttorneyStatusesAction, UpdateAttorneyStatusAction } from './actions/update-attorney-statuses.action'


@Injectable({providedIn: 'root'})
export class AttorneyStatusBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.AttorneyStatusBusinessProviderService', logger, serviceContext)
  }

  createAttorneyStatus(input: UserCreateAttorneyStatusInput): Observable<AttorneyStatus> {
    const action = new CreateAttorneyStatusAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateAttorneyStatus(input: UserUpdateAttorneyStatusInput, attorneyStatusId: string): Observable<AttorneyStatus> {
    const action = new UpdateAttorneyStatusAction(input, attorneyStatusId); 
    action.Do(this);
    return action.response;   
  }
  
  importAttorneyStatuses(attorneyStatuses: UserUpdateAttorneyStatusInput[]): Observable<UpdateResult> {
    const updateAttorneyStatusesAction = new UpdateAttorneyStatusesAction(attorneyStatuses);
    updateAttorneyStatusesAction.Do(this)
    return updateAttorneyStatusesAction.response;
  }

  validateAttorneyStatusExcelData(excelData: any[] ) {
    const validateAttorneyStatusExcelDataAction = new ValidateAttorneyStatusExcelDataAction(excelData );
    validateAttorneyStatusExcelDataAction.Do(this)
    return validateAttorneyStatusExcelDataAction.response;
  }
}

