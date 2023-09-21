
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Equipment, UserCreateEquipmentInput, UserUpdateEquipmentInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { EquipmentBusinessProviderService } from "./equipment.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class EquipmentService extends ServiceBase {
 constructor(
  @Inject(EquipmentBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: EquipmentBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("EquipmentService", loggingService, serviceContext);
 }

    createEquipment(input: UserCreateEquipmentInput): Observable<Equipment> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createEquipment(filteredObj);
    }

    updateEquipment(input: UserUpdateEquipmentInput, equipmentId: string): Observable<Equipment> {
        return this.businessProvider.updateEquipment(input, equipmentId);
    }

    importEquipments(equipments: UserUpdateEquipmentInput[]): Observable<UpdateResult> {
        return this.businessProvider.importEquipments(equipments);
    }

    validateEquipmentExcelData(excelData: any[] ) {
      return this.businessProvider.validateEquipmentExcelData(excelData );
    }
}

