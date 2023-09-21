
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { Claim, UserCreateClaimInput, UserUpdateClaimInput, UpdateResult, PriorAuthorizationRequest, Document, Patient } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateClaimExcelDataAction } from './actions/validate-claim-excel-data.action'
import { CreateClaimAction } from './actions/create-claim.action'
import { UpdateClaimsAction, UpdateClaimAction } from './actions/update-claims.action'


@Injectable({providedIn: 'root'})
export class ClaimBusinessProviderService extends ServiceBase {
  constructor(
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
  
  importClaims(claims: UserUpdateClaimInput[]): Observable<UpdateResult> {
    const updateClaimsAction = new UpdateClaimsAction(claims);
    updateClaimsAction.Do(this)
    return updateClaimsAction.response;
  }

  validateClaimExcelData(excelData: any[], priorAuthorizationRequests: PriorAuthorizationRequest[], claims: Document[], explanationOfPayments: Document[], patients: Patient[]) {
    const validateClaimExcelDataAction = new ValidateClaimExcelDataAction(excelData, priorAuthorizationRequests, claims, explanationOfPayments, patients);
    validateClaimExcelDataAction.Do(this)
    return validateClaimExcelDataAction.response;
  }
}

