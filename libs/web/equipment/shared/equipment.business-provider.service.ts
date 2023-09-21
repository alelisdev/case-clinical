
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { Equipment, UserCreateEquipmentInput, UserUpdateEquipmentInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateEquipmentExcelDataAction } from './actions/validate-equipment-excel-data.action'
import { CreateEquipmentAction } from './actions/create-equipment.action'
import { UpdateEquipmentsAction, UpdateEquipmentAction } from './actions/update-equipments.action'


@Injectable({providedIn: 'root'})
export class EquipmentBusinessProviderService extends ServiceBase {
  constructor(
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
  
  importEquipments(equipments: UserUpdateEquipmentInput[]): Observable<UpdateResult> {
    const updateEquipmentsAction = new UpdateEquipmentsAction(equipments);
    updateEquipmentsAction.Do(this)
    return updateEquipmentsAction.response;
  }

  validateEquipmentExcelData(excelData: any[] ) {
    const validateEquipmentExcelDataAction = new ValidateEquipmentExcelDataAction(excelData );
    validateEquipmentExcelDataAction.Do(this)
    return validateEquipmentExcelDataAction.response;
  }
}

