
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { ReferralRequest, UserCreateReferralRequestInput, UserUpdateReferralRequestInput, UpdateResult, Patient, LegalCase, ClinicalProvider, ClinicalProviderLocation } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateReferralRequestExcelDataAction } from './actions/validate-referral-request-excel-data.action'
import { CreateReferralRequestAction } from './actions/create-referral-request.action'
import { UpdateReferralRequestsAction, UpdateReferralRequestAction } from './actions/update-referral-requests.action'


@Injectable({providedIn: 'root'})
export class ReferralRequestBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.ReferralRequestBusinessProviderService', logger, serviceContext)
  }

  createReferralRequest(input: UserCreateReferralRequestInput): Observable<ReferralRequest> {
    const action = new CreateReferralRequestAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateReferralRequest(input: UserUpdateReferralRequestInput, referralRequestId: string): Observable<ReferralRequest> {
    const action = new UpdateReferralRequestAction(input, referralRequestId); 
    action.Do(this);
    return action.response;   
  }
  
  importReferralRequests(referralRequests: UserUpdateReferralRequestInput[]): Observable<UpdateResult> {
    const updateReferralRequestsAction = new UpdateReferralRequestsAction(referralRequests);
    updateReferralRequestsAction.Do(this)
    return updateReferralRequestsAction.response;
  }

  validateReferralRequestExcelData(excelData: any[], patients: Patient[], legalCases: LegalCase[], requestingProviders: ClinicalProvider[], referredTos: ClinicalProvider[], referredToLocations: ClinicalProviderLocation[]) {
    const validateReferralRequestExcelDataAction = new ValidateReferralRequestExcelDataAction(excelData, patients, legalCases, requestingProviders, referredTos, referredToLocations);
    validateReferralRequestExcelDataAction.Do(this)
    return validateReferralRequestExcelDataAction.response;
  }
}

