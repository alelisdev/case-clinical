
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { AdverseInsuranceStatus, UserCreateAdverseInsuranceStatusInput, UserUpdateAdverseInsuranceStatusInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateAdverseInsuranceStatusExcelDataAction } from './actions/validate-adverse-insurance-status-excel-data.action'
import { CreateAdverseInsuranceStatusAction } from './actions/create-adverse-insurance-status.action'
import { UpdateAdverseInsuranceStatusesAction, UpdateAdverseInsuranceStatusAction } from './actions/update-adverse-insurance-statuses.action'


@Injectable({providedIn: 'root'})
export class AdverseInsuranceStatusBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.AdverseInsuranceStatusBusinessProviderService', logger, serviceContext)
  }

  createAdverseInsuranceStatus(input: UserCreateAdverseInsuranceStatusInput): Observable<AdverseInsuranceStatus> {
    const action = new CreateAdverseInsuranceStatusAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateAdverseInsuranceStatus(input: UserUpdateAdverseInsuranceStatusInput, adverseInsuranceStatusId: string): Observable<AdverseInsuranceStatus> {
    const action = new UpdateAdverseInsuranceStatusAction(input, adverseInsuranceStatusId); 
    action.Do(this);
    return action.response;   
  }
  
  importAdverseInsuranceStatuses(adverseInsuranceStatuses: UserUpdateAdverseInsuranceStatusInput[]): Observable<UpdateResult> {
    const updateAdverseInsuranceStatusesAction = new UpdateAdverseInsuranceStatusesAction(adverseInsuranceStatuses);
    updateAdverseInsuranceStatusesAction.Do(this)
    return updateAdverseInsuranceStatusesAction.response;
  }

  validateAdverseInsuranceStatusExcelData(excelData: any[] ) {
    const validateAdverseInsuranceStatusExcelDataAction = new ValidateAdverseInsuranceStatusExcelDataAction(excelData );
    validateAdverseInsuranceStatusExcelDataAction.Do(this)
    return validateAdverseInsuranceStatusExcelDataAction.response;
  }
}

