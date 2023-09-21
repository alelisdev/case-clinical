
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { PriorAuthorizationRequest, UserCreatePriorAuthorizationRequestInput, UserUpdatePriorAuthorizationRequestInput, UpdateResult, ProcedureSite, SurgicalPosition, ClinicalProvider, Document, VisitKind, GuidelineUsed, AuthorizationKind, AuthorizationStatus, Patient, CaseProcedure } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidatePriorAuthorizationRequestExcelDataAction } from './actions/validate-prior-authorization-request-excel-data.action'
import { CreatePriorAuthorizationRequestAction } from './actions/create-prior-authorization-request.action'
import { UpdatePriorAuthorizationRequestsAction, UpdatePriorAuthorizationRequestAction } from './actions/update-prior-authorization-requests.action'


@Injectable({providedIn: 'root'})
export class PriorAuthorizationRequestBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.PriorAuthorizationRequestBusinessProviderService', logger, serviceContext)
  }

  createPriorAuthorizationRequest(input: UserCreatePriorAuthorizationRequestInput): Observable<PriorAuthorizationRequest> {
    const action = new CreatePriorAuthorizationRequestAction(input); 
    action.Do(this);
    return action.response;   
  }

  updatePriorAuthorizationRequest(input: UserUpdatePriorAuthorizationRequestInput, priorAuthorizationRequestId: string): Observable<PriorAuthorizationRequest> {
    const action = new UpdatePriorAuthorizationRequestAction(input, priorAuthorizationRequestId); 
    action.Do(this);
    return action.response;   
  }
  
  importPriorAuthorizationRequests(priorAuthorizationRequests: UserUpdatePriorAuthorizationRequestInput[]): Observable<UpdateResult> {
    const updatePriorAuthorizationRequestsAction = new UpdatePriorAuthorizationRequestsAction(priorAuthorizationRequests);
    updatePriorAuthorizationRequestsAction.Do(this)
    return updatePriorAuthorizationRequestsAction.response;
  }

  validatePriorAuthorizationRequestExcelData(excelData: any[], procedureSites: ProcedureSite[], surgicalPositions: SurgicalPosition[], 
    treatingProviders: ClinicalProvider[], referredTos: ClinicalProvider[], prescriptions: Document[], visitKinds: VisitKind[], guidelineUseds: GuidelineUsed[], authorizationKinds: AuthorizationKind[], authorizationStatuses: AuthorizationStatus[],  patients: Patient[], caseProcedures: CaseProcedure[]) {
    const validatePriorAuthorizationRequestExcelDataAction = new ValidatePriorAuthorizationRequestExcelDataAction(excelData, procedureSites, surgicalPositions, treatingProviders, referredTos, prescriptions, visitKinds, guidelineUseds, authorizationKinds, authorizationStatuses, 
    patients, caseProcedures);
    validatePriorAuthorizationRequestExcelDataAction.Do(this)
    return validatePriorAuthorizationRequestExcelDataAction.response;
  }
}

