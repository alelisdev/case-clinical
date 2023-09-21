
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { CaseProgressStatus, UserCreateCaseProgressStatusInput, UserUpdateCaseProgressStatusInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateCaseProgressStatusExcelDataAction } from './actions/validate-case-progress-status-excel-data.action'
import { CreateCaseProgressStatusAction } from './actions/create-case-progress-status.action'
import { UpdateCaseProgressStatusesAction, UpdateCaseProgressStatusAction } from './actions/update-case-progress-statuses.action'


@Injectable({providedIn: 'root'})
export class CaseProgressStatusBusinessProviderService extends ServiceBase {
  constructor(
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
  
  importCaseProgressStatuses(caseProgressStatuses: UserUpdateCaseProgressStatusInput[]): Observable<UpdateResult> {
    const updateCaseProgressStatusesAction = new UpdateCaseProgressStatusesAction(caseProgressStatuses);
    updateCaseProgressStatusesAction.Do(this)
    return updateCaseProgressStatusesAction.response;
  }

  validateCaseProgressStatusExcelData(excelData: any[] ) {
    const validateCaseProgressStatusExcelDataAction = new ValidateCaseProgressStatusExcelDataAction(excelData );
    validateCaseProgressStatusExcelDataAction.Do(this)
    return validateCaseProgressStatusExcelDataAction.response;
  }
}

