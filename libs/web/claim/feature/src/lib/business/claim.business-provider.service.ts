
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateClaimAction} from './actions/create-claim.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {Claim, UserCreateClaimInput, UserUpdateClaimInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateClaimsAction, UpdateClaimAction } from './actions/update-claims.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class ClaimBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.ClaimBusinessProviderService', logger, serviceContext)
  }

  createClaim(input: UserCreateClaimInput): Observable<Claim> {
    const action = new CreateClaimAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateClaim(input: UserUpdateClaimInput, claimId: string): Observable<Claim> {
    const action = new UpdateClaimAction(input, claimId); 
    action.Do(this);
    return action.response;   
  }
  
  importClaims(claims: UserUpdateClaimInput[]): Observable<boolean> {
    const updateClaimsAction = new UpdateClaimsAction(claims);
    updateClaimsAction.Do(this)
    return updateClaimsAction.response;
  }
}

