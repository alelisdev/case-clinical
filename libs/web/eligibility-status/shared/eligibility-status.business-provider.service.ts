
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { EligibilityStatus, UserCreateEligibilityStatusInput, UserUpdateEligibilityStatusInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateEligibilityStatusExcelDataAction } from './actions/validate-eligibility-status-excel-data.action'
import { CreateEligibilityStatusAction } from './actions/create-eligibility-status.action'
import { UpdateEligibilityStatusesAction, UpdateEligibilityStatusAction } from './actions/update-eligibility-statuses.action'


@Injectable({providedIn: 'root'})
export class EligibilityStatusBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.EligibilityStatusBusinessProviderService', logger, serviceContext)
  }

  createEligibilityStatus(input: UserCreateEligibilityStatusInput): Observable<EligibilityStatus> {
    const action = new CreateEligibilityStatusAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateEligibilityStatus(input: UserUpdateEligibilityStatusInput, eligibilityStatusId: string): Observable<EligibilityStatus> {
    const action = new UpdateEligibilityStatusAction(input, eligibilityStatusId); 
    action.Do(this);
    return action.response;   
  }
  
  importEligibilityStatuses(eligibilityStatuses: UserUpdateEligibilityStatusInput[]): Observable<UpdateResult> {
    const updateEligibilityStatusesAction = new UpdateEligibilityStatusesAction(eligibilityStatuses);
    updateEligibilityStatusesAction.Do(this)
    return updateEligibilityStatusesAction.response;
  }

  validateEligibilityStatusExcelData(excelData: any[] ) {
    const validateEligibilityStatusExcelDataAction = new ValidateEligibilityStatusExcelDataAction(excelData );
    validateEligibilityStatusExcelDataAction.Do(this)
    return validateEligibilityStatusExcelDataAction.response;
  }
}

