
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateEquipmentAction} from './actions/create-equipment.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {Equipment, UserCreateEquipmentInput, UserUpdateEquipmentInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateEquipmentsAction, UpdateEquipmentAction } from './actions/update-equipments.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class EquipmentBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.EquipmentBusinessProviderService', logger, serviceContext)
  }

  createEquipment(input: UserCreateEquipmentInput): Observable<Equipment> {
    const action = new CreateEquipmentAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateEquipment(input: UserUpdateEquipmentInput, equipmentId: string): Observable<Equipment> {
    const action = new UpdateEquipmentAction(input, equipmentId); 
    action.Do(this);
    return action.response;   
  }
  
  importEquipments(equipments: UserUpdateEquipmentInput[]): Observable<boolean> {
    const updateEquipmentsAction = new UpdateEquipmentsAction(equipments);
    updateEquipmentsAction.Do(this)
    return updateEquipmentsAction.response;
  }
}

