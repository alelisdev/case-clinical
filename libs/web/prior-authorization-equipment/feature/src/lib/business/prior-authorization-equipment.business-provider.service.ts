
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreatePriorAuthorizationEquipmentAction} from './actions/create-prior-authorization-equipment.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {PriorAuthorizationEquipment, UserCreatePriorAuthorizationEquipmentInput, UserUpdatePriorAuthorizationEquipmentInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdatePriorAuthorizationequipmentsAction, UpdatePriorAuthorizationEquipmentAction } from './actions/update-prior-authorization-equipments.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class PriorAuthorizationEquipmentBusinessProviderService extends ServiceBase {constructor(
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
  
  importPriorAuthorizationequipments(priorAuthorizationequipments: UserUpdatePriorAuthorizationEquipmentInput[]): Observable<boolean> {
    const updatePriorAuthorizationequipmentsAction = new UpdatePriorAuthorizationequipmentsAction(priorAuthorizationequipments);
    updatePriorAuthorizationequipmentsAction.Do(this)
    return updatePriorAuthorizationequipmentsAction.response;
  }
}

