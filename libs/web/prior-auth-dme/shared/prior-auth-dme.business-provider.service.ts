
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { PriorAuthDme, UserCreatePriorAuthDmeInput, UserUpdatePriorAuthDmeInput, UpdateResult, PriorAuthorizationRequest, DurableMedicalEquipment } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidatePriorAuthDmeExcelDataAction } from './actions/validate-prior-auth-dme-excel-data.action'
import { CreatePriorAuthDmeAction } from './actions/create-prior-auth-dme.action'
import { UpdatePriorAuthDmesAction, UpdatePriorAuthDmeAction } from './actions/update-prior-auth-dmes.action'


@Injectable({providedIn: 'root'})
export class PriorAuthDmeBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.PriorAuthDmeBusinessProviderService', logger, serviceContext)
  }

  createPriorAuthDme(input: UserCreatePriorAuthDmeInput): Observable<PriorAuthDme> {
    const action = new CreatePriorAuthDmeAction(input); 
    action.Do(this);
    return action.response;   
  }

  updatePriorAuthDme(input: UserUpdatePriorAuthDmeInput, priorAuthDmeId: string): Observable<PriorAuthDme> {
    const action = new UpdatePriorAuthDmeAction(input, priorAuthDmeId); 
    action.Do(this);
    return action.response;   
  }
  
  importPriorAuthDmes(priorAuthDmes: UserUpdatePriorAuthDmeInput[]): Observable<UpdateResult> {
    const updatePriorAuthDmesAction = new UpdatePriorAuthDmesAction(priorAuthDmes);
    updatePriorAuthDmesAction.Do(this)
    return updatePriorAuthDmesAction.response;
  }

  validatePriorAuthDmeExcelData(excelData: any[], priorAuthorizationRequests: PriorAuthorizationRequest[], durableMedicalEquipments: DurableMedicalEquipment[]) {
    const validatePriorAuthDmeExcelDataAction = new ValidatePriorAuthDmeExcelDataAction(excelData, priorAuthorizationRequests, durableMedicalEquipments);
    validatePriorAuthDmeExcelDataAction.Do(this)
    return validatePriorAuthDmeExcelDataAction.response;
  }
}

