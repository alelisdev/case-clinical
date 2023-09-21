
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateDurableMedicalEquipmentAction} from './actions/create-durable-medical-equipment.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {DurableMedicalEquipment, UserCreateDurableMedicalEquipmentInput, UserUpdateDurableMedicalEquipmentInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateDurableMedicalequipmentsAction, UpdateDurableMedicalEquipmentAction } from './actions/update-durable-medical-equipments.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class DurableMedicalEquipmentBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.DurableMedicalEquipmentBusinessProviderService', logger, serviceContext)
  }

  createDurableMedicalEquipment(input: UserCreateDurableMedicalEquipmentInput): Observable<DurableMedicalEquipment> {
    const action = new CreateDurableMedicalEquipmentAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateDurableMedicalEquipment(input: UserUpdateDurableMedicalEquipmentInput, durableMedicalEquipmentId: string): Observable<DurableMedicalEquipment> {
    const action = new UpdateDurableMedicalEquipmentAction(input, durableMedicalEquipmentId); 
    action.Do(this);
    return action.response;   
  }
  
  importDurableMedicalequipments(durableMedicalEquipments: UserUpdateDurableMedicalEquipmentInput[]): Observable<boolean> {
    const updateDurableMedicalequipmentsAction = new UpdateDurableMedicalequipmentsAction(durableMedicalEquipments);
    updateDurableMedicalequipmentsAction.Do(this)
    return updateDurableMedicalequipmentsAction.response;
  }
}

