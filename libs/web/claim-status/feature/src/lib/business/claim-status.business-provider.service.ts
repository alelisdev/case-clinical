
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateClaimStatusAction} from './actions/create-claim-status.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {ClaimStatus, UserCreateClaimStatusInput, UserUpdateClaimStatusInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateClaimStatusesAction, UpdateClaimStatusAction } from './actions/update-claim-statuses.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class ClaimStatusBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.ClaimStatusBusinessProviderService', logger, serviceContext)
  }

  createClaimStatus(input: UserCreateClaimStatusInput): Observable<ClaimStatus> {
    const action = new CreateClaimStatusAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateClaimStatus(input: UserUpdateClaimStatusInput, claimStatusId: string): Observable<ClaimStatus> {
    const action = new UpdateClaimStatusAction(input, claimStatusId); 
    action.Do(this);
    return action.response;   
  }
  
  importClaimStatuses(claimStatuses: UserUpdateClaimStatusInput[]): Observable<boolean> {
    const updateClaimStatusesAction = new UpdateClaimStatusesAction(claimStatuses);
    updateClaimStatusesAction.Do(this)
    return updateClaimStatusesAction.response;
  }
}

