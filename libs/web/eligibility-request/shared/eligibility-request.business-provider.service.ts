
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { EligibilityRequest, UserCreateEligibilityRequestInput, UserUpdateEligibilityRequestInput, UpdateResult, EligibilityStatus } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateEligibilityRequestExcelDataAction } from './actions/validate-eligibility-request-excel-data.action'
import { CreateEligibilityRequestAction } from './actions/create-eligibility-request.action'
import { UpdateEligibilityRequestsAction, UpdateEligibilityRequestAction } from './actions/update-eligibility-requests.action'


@Injectable({providedIn: 'root'})
export class EligibilityRequestBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.EligibilityRequestBusinessProviderService', logger, serviceContext)
  }

  createEligibilityRequest(input: UserCreateEligibilityRequestInput): Observable<EligibilityRequest> {
    const action = new CreateEligibilityRequestAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateEligibilityRequest(input: UserUpdateEligibilityRequestInput, eligibilityRequestId: string): Observable<EligibilityRequest> {
    const action = new UpdateEligibilityRequestAction(input, eligibilityRequestId); 
    action.Do(this);
    return action.response;   
  }
  
  importEligibilityRequests(eligibilityRequests: UserUpdateEligibilityRequestInput[]): Observable<UpdateResult> {
    const updateEligibilityRequestsAction = new UpdateEligibilityRequestsAction(eligibilityRequests);
    updateEligibilityRequestsAction.Do(this)
    return updateEligibilityRequestsAction.response;
  }

  validateEligibilityRequestExcelData(excelData: any[], elegibilityStatuses: EligibilityStatus[]) {
    const validateEligibilityRequestExcelDataAction = new ValidateEligibilityRequestExcelDataAction(excelData, elegibilityStatuses);
    validateEligibilityRequestExcelDataAction.Do(this)
    return validateEligibilityRequestExcelDataAction.response;
  }
}

