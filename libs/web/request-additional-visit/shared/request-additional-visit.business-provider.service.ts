
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { RequestAdditionalVisit, UserCreateRequestAdditionalVisitInput, UserUpdateRequestAdditionalVisitInput, UpdateResult, Patient, LegalCase } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateRequestAdditionalVisitExcelDataAction } from './actions/validate-request-additional-visit-excel-data.action'
import { CreateRequestAdditionalVisitAction } from './actions/create-request-additional-visit.action'
import { UpdateRequestAdditionalVisitsAction, UpdateRequestAdditionalVisitAction } from './actions/update-request-additional-visits.action'


@Injectable({providedIn: 'root'})
export class RequestAdditionalVisitBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.RequestAdditionalVisitBusinessProviderService', logger, serviceContext)
  }

  createRequestAdditionalVisit(input: UserCreateRequestAdditionalVisitInput): Observable<RequestAdditionalVisit> {
    const action = new CreateRequestAdditionalVisitAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateRequestAdditionalVisit(input: UserUpdateRequestAdditionalVisitInput, requestAdditionalVisitId: string): Observable<RequestAdditionalVisit> {
    const action = new UpdateRequestAdditionalVisitAction(input, requestAdditionalVisitId); 
    action.Do(this);
    return action.response;   
  }
  
  importRequestAdditionalVisits(requestAdditionalVisits: UserUpdateRequestAdditionalVisitInput[]): Observable<UpdateResult> {
    const updateRequestAdditionalVisitsAction = new UpdateRequestAdditionalVisitsAction(requestAdditionalVisits);
    updateRequestAdditionalVisitsAction.Do(this)
    return updateRequestAdditionalVisitsAction.response;
  }

  validateRequestAdditionalVisitExcelData(excelData: any[], patients: Patient[], legalCases: LegalCase[]) {
    const validateRequestAdditionalVisitExcelDataAction = new ValidateRequestAdditionalVisitExcelDataAction(excelData, patients, legalCases);
    validateRequestAdditionalVisitExcelDataAction.Do(this)
    return validateRequestAdditionalVisitExcelDataAction.response;
  }
}

