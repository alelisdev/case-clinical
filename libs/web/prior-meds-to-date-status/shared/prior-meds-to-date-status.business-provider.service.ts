
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { PriorMedsToDateStatus, UserCreatePriorMedsToDateStatusInput, UserUpdatePriorMedsToDateStatusInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidatePriorMedsToDateStatusExcelDataAction } from './actions/validate-prior-meds-to-date-status-excel-data.action'
import { CreatePriorMedsToDateStatusAction } from './actions/create-prior-meds-to-date-status.action'
import { UpdatePriorMedsToDateStatusesAction, UpdatePriorMedsToDateStatusAction } from './actions/update-prior-meds-to-date-statuses.action'


@Injectable({providedIn: 'root'})
export class PriorMedsToDateStatusBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.PriorMedsToDateStatusBusinessProviderService', logger, serviceContext)
  }

  createPriorMedsToDateStatus(input: UserCreatePriorMedsToDateStatusInput): Observable<PriorMedsToDateStatus> {
    const action = new CreatePriorMedsToDateStatusAction(input); 
    action.Do(this);
    return action.response;   
  }

  updatePriorMedsToDateStatus(input: UserUpdatePriorMedsToDateStatusInput, priorMedsToDateStatusId: string): Observable<PriorMedsToDateStatus> {
    const action = new UpdatePriorMedsToDateStatusAction(input, priorMedsToDateStatusId); 
    action.Do(this);
    return action.response;   
  }
  
  importPriorMedsToDateStatuses(priorMedsToDateStatuses: UserUpdatePriorMedsToDateStatusInput[]): Observable<UpdateResult> {
    const updatePriorMedsToDateStatusesAction = new UpdatePriorMedsToDateStatusesAction(priorMedsToDateStatuses);
    updatePriorMedsToDateStatusesAction.Do(this)
    return updatePriorMedsToDateStatusesAction.response;
  }

  validatePriorMedsToDateStatusExcelData(excelData: any[] ) {
    const validatePriorMedsToDateStatusExcelDataAction = new ValidatePriorMedsToDateStatusExcelDataAction(excelData );
    validatePriorMedsToDateStatusExcelDataAction.Do(this)
    return validatePriorMedsToDateStatusExcelDataAction.response;
  }
}

