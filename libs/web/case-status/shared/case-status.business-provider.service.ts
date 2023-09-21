
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { CaseStatus, UserCreateCaseStatusInput, UserUpdateCaseStatusInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateCaseStatusExcelDataAction } from './actions/validate-case-status-excel-data.action'
import { CreateCaseStatusAction } from './actions/create-case-status.action'
import { UpdateCaseStatusesAction, UpdateCaseStatusAction } from './actions/update-case-statuses.action'


@Injectable({providedIn: 'root'})
export class CaseStatusBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.CaseStatusBusinessProviderService', logger, serviceContext)
  }

  createCaseStatus(input: UserCreateCaseStatusInput): Observable<CaseStatus> {
    const action = new CreateCaseStatusAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateCaseStatus(input: UserUpdateCaseStatusInput, caseStatusId: string): Observable<CaseStatus> {
    const action = new UpdateCaseStatusAction(input, caseStatusId); 
    action.Do(this);
    return action.response;   
  }
  
  importCaseStatuses(caseStatuses: UserUpdateCaseStatusInput[]): Observable<UpdateResult> {
    const updateCaseStatusesAction = new UpdateCaseStatusesAction(caseStatuses);
    updateCaseStatusesAction.Do(this)
    return updateCaseStatusesAction.response;
  }

  validateCaseStatusExcelData(excelData: any[] ) {
    const validateCaseStatusExcelDataAction = new ValidateCaseStatusExcelDataAction(excelData );
    validateCaseStatusExcelDataAction.Do(this)
    return validateCaseStatusExcelDataAction.response;
  }
}

