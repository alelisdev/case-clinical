
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { PriorAuthorizationEquipment, UserCreatePriorAuthorizationEquipmentInput, UserUpdatePriorAuthorizationEquipmentInput, UpdateResult, Equipment, PriorAuthorizationRequest } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidatePriorAuthorizationEquipmentExcelDataAction } from './actions/validate-prior-authorization-equipment-excel-data.action'
import { CreatePriorAuthorizationEquipmentAction } from './actions/create-prior-authorization-equipment.action'
import { UpdatePriorAuthorizationEquipmentsAction, UpdatePriorAuthorizationEquipmentAction } from './actions/update-prior-authorization-equipments.action'


@Injectable({providedIn: 'root'})
export class PriorAuthorizationEquipmentBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.PriorAuthorizationEquipmentBusinessProviderService', logger, serviceContext)
  }

  createPriorAuthorizationEquipment(input: UserCreatePriorAuthorizationEquipmentInput): Observable<PriorAuthorizationEquipment> {
    const action = new CreatePriorAuthorizationEquipmentAction(input); 
    action.Do(this);
    return action.response;   
  }

  updatePriorAuthorizationEquipment(input: UserUpdatePriorAuthorizationEquipmentInput, priorAuthorizationEquipmentId: string): Observable<PriorAuthorizationEquipment> {
    const action = new UpdatePriorAuthorizationEquipmentAction(input, priorAuthorizationEquipmentId); 
    action.Do(this);
    return action.response;   
  }
  
  importPriorAuthorizationEquipments(priorAuthorizationEquipments: UserUpdatePriorAuthorizationEquipmentInput[]): Observable<UpdateResult> {
    const updatePriorAuthorizationEquipmentsAction = new UpdatePriorAuthorizationEquipmentsAction(priorAuthorizationEquipments);
    updatePriorAuthorizationEquipmentsAction.Do(this)
    return updatePriorAuthorizationEquipmentsAction.response;
  }

  validatePriorAuthorizationEquipmentExcelData(excelData: any[], equipment: Equipment[], priorAuthorizationRequests: PriorAuthorizationRequest[]) {
    const validatePriorAuthorizationEquipmentExcelDataAction = new ValidatePriorAuthorizationEquipmentExcelDataAction(excelData, equipment, priorAuthorizationRequests);
    validatePriorAuthorizationEquipmentExcelDataAction.Do(this)
    return validatePriorAuthorizationEquipmentExcelDataAction.response;
  }
}

