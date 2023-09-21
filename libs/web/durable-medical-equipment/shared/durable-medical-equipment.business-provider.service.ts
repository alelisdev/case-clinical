
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { DurableMedicalEquipment, UserCreateDurableMedicalEquipmentInput, UserUpdateDurableMedicalEquipmentInput, UpdateResult, Vendor } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateDurableMedicalEquipmentExcelDataAction } from './actions/validate-durable-medical-equipment-excel-data.action'
import { CreateDurableMedicalEquipmentAction } from './actions/create-durable-medical-equipment.action'
import { UpdateDurableMedicalEquipmentsAction, UpdateDurableMedicalEquipmentAction } from './actions/update-durable-medical-equipments.action'


@Injectable({providedIn: 'root'})
export class DurableMedicalEquipmentBusinessProviderService extends ServiceBase {
  constructor(
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
  
  importDurableMedicalEquipments(durableMedicalEquipments: UserUpdateDurableMedicalEquipmentInput[]): Observable<UpdateResult> {
    const updateDurableMedicalEquipmentsAction = new UpdateDurableMedicalEquipmentsAction(durableMedicalEquipments);
    updateDurableMedicalEquipmentsAction.Do(this)
    return updateDurableMedicalEquipmentsAction.response;
  }

  validateDurableMedicalEquipmentExcelData(excelData: any[], vendors: Vendor[]) {
    const validateDurableMedicalEquipmentExcelDataAction = new ValidateDurableMedicalEquipmentExcelDataAction(excelData, vendors);
    validateDurableMedicalEquipmentExcelDataAction.Do(this)
    return validateDurableMedicalEquipmentExcelDataAction.response;
  }
}

