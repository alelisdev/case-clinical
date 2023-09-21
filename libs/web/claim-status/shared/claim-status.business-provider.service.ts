
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { ClaimStatus, UserCreateClaimStatusInput, UserUpdateClaimStatusInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateClaimStatusExcelDataAction } from './actions/validate-claim-status-excel-data.action'
import { CreateClaimStatusAction } from './actions/create-claim-status.action'
import { UpdateClaimStatusesAction, UpdateClaimStatusAction } from './actions/update-claim-statuses.action'


@Injectable({providedIn: 'root'})
export class ClaimStatusBusinessProviderService extends ServiceBase {
  constructor(
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
  
  importClaimStatuses(claimStatuses: UserUpdateClaimStatusInput[]): Observable<UpdateResult> {
    const updateClaimStatusesAction = new UpdateClaimStatusesAction(claimStatuses);
    updateClaimStatusesAction.Do(this)
    return updateClaimStatusesAction.response;
  }

  validateClaimStatusExcelData(excelData: any[] ) {
    const validateClaimStatusExcelDataAction = new ValidateClaimStatusExcelDataAction(excelData );
    validateClaimStatusExcelDataAction.Do(this)
    return validateClaimStatusExcelDataAction.response;
  }
}

