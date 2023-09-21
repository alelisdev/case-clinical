
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateAdverseInsuranceStatusAction} from './actions/create-adverse-insurance-status.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {AdverseInsuranceStatus, UserCreateAdverseInsuranceStatusInput, UserUpdateAdverseInsuranceStatusInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateAdverseInsuranceStatusesAction, UpdateAdverseInsuranceStatusAction } from './actions/update-adverse-insurance-statuses.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class AdverseInsuranceStatusBusinessProviderService extends ServiceBase {constructor(
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
  
  importAdverseInsuranceStatuses(adverseInsuranceStatuses: UserUpdateAdverseInsuranceStatusInput[]): Observable<boolean> {
    const updateAdverseInsuranceStatusesAction = new UpdateAdverseInsuranceStatusesAction(adverseInsuranceStatuses);
    updateAdverseInsuranceStatusesAction.Do(this)
    return updateAdverseInsuranceStatusesAction.response;
  }
}

