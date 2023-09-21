
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Equipment, UserCreateEquipmentInput, UserUpdateEquipmentInput } from "@case-clinical/shared/util/sdk";
import { EquipmentBusinessProviderService } from "./business/equipment.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
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
        return this.businessProvider.createEquipment(input);
    }

    updateEquipment(input: UserUpdateEquipmentInput, equipmentId: string): Observable<Equipment> {
        return this.businessProvider.updateEquipment(input, equipmentId);
    }

    importEquipments(equipments: UserUpdateEquipmentInput[]): Observable<boolean> {
        return this.businessProvider.importEquipments(equipments);
    }
}

