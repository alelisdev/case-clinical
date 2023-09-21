
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { PriorAuthGuideline, UserCreatePriorAuthGuidelineInput, UserUpdatePriorAuthGuidelineInput, UpdateResult, Guideline, PriorAuthorizationRequest } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidatePriorAuthGuidelineExcelDataAction } from './actions/validate-prior-auth-guideline-excel-data.action'
import { CreatePriorAuthGuidelineAction } from './actions/create-prior-auth-guideline.action'
import { UpdatePriorAuthGuidelinesAction, UpdatePriorAuthGuidelineAction } from './actions/update-prior-auth-guidelines.action'


@Injectable({providedIn: 'root'})
export class PriorAuthGuidelineBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.PriorAuthGuidelineBusinessProviderService', logger, serviceContext)
  }

  createPriorAuthGuideline(input: UserCreatePriorAuthGuidelineInput): Observable<PriorAuthGuideline> {
    const action = new CreatePriorAuthGuidelineAction(input); 
    action.Do(this);
    return action.response;   
  }

  updatePriorAuthGuideline(input: UserUpdatePriorAuthGuidelineInput, priorAuthGuidelineId: string): Observable<PriorAuthGuideline> {
    const action = new UpdatePriorAuthGuidelineAction(input, priorAuthGuidelineId); 
    action.Do(this);
    return action.response;   
  }
  
  importPriorAuthGuidelines(priorAuthGuidelines: UserUpdatePriorAuthGuidelineInput[]): Observable<UpdateResult> {
    const updatePriorAuthGuidelinesAction = new UpdatePriorAuthGuidelinesAction(priorAuthGuidelines);
    updatePriorAuthGuidelinesAction.Do(this)
    return updatePriorAuthGuidelinesAction.response;
  }

  validatePriorAuthGuidelineExcelData(excelData: any[], guidelines: Guideline[], priorAuthorizationRequests: PriorAuthorizationRequest[]) {
    const validatePriorAuthGuidelineExcelDataAction = new ValidatePriorAuthGuidelineExcelDataAction(excelData, guidelines, priorAuthorizationRequests);
    validatePriorAuthGuidelineExcelDataAction.Do(this)
    return validatePriorAuthGuidelineExcelDataAction.response;
  }
}

