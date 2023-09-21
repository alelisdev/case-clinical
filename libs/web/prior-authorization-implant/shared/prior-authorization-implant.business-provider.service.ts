
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { PriorAuthorizationImplant, UserCreatePriorAuthorizationImplantInput, UserUpdatePriorAuthorizationImplantInput, UpdateResult, Implant, PriorAuthorizationRequest } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidatePriorAuthorizationImplantExcelDataAction } from './actions/validate-prior-authorization-implant-excel-data.action'
import { CreatePriorAuthorizationImplantAction } from './actions/create-prior-authorization-implant.action'
import { UpdatePriorAuthorizationImplantsAction, UpdatePriorAuthorizationImplantAction } from './actions/update-prior-authorization-implants.action'


@Injectable({providedIn: 'root'})
export class PriorAuthorizationImplantBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.PriorAuthorizationImplantBusinessProviderService', logger, serviceContext)
  }

  createPriorAuthorizationImplant(input: UserCreatePriorAuthorizationImplantInput): Observable<PriorAuthorizationImplant> {
    const action = new CreatePriorAuthorizationImplantAction(input); 
    action.Do(this);
    return action.response;   
  }

  updatePriorAuthorizationImplant(input: UserUpdatePriorAuthorizationImplantInput, priorAuthorizationImplantId: string): Observable<PriorAuthorizationImplant> {
    const action = new UpdatePriorAuthorizationImplantAction(input, priorAuthorizationImplantId); 
    action.Do(this);
    return action.response;   
  }
  
  importPriorAuthorizationImplants(priorAuthorizationImplants: UserUpdatePriorAuthorizationImplantInput[]): Observable<UpdateResult> {
    const updatePriorAuthorizationImplantsAction = new UpdatePriorAuthorizationImplantsAction(priorAuthorizationImplants);
    updatePriorAuthorizationImplantsAction.Do(this)
    return updatePriorAuthorizationImplantsAction.response;
  }

  validatePriorAuthorizationImplantExcelData(excelData: any[], implants: Implant[], priorAuthorizationRequests: PriorAuthorizationRequest[]) {
    const validatePriorAuthorizationImplantExcelDataAction = new ValidatePriorAuthorizationImplantExcelDataAction(excelData, implants, priorAuthorizationRequests);
    validatePriorAuthorizationImplantExcelDataAction.Do(this)
    return validatePriorAuthorizationImplantExcelDataAction.response;
  }
}

