
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { DurableMedicalEquipment, UserCreateDurableMedicalEquipmentInput, UserUpdateDurableMedicalEquipmentInput } from "@case-clinical/shared/util/sdk";
import { DurableMedicalEquipmentBusinessProviderService } from "./business/durable-medical-equipment.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class DurableMedicalEquipmentService extends ServiceBase {
 constructor(
  @Inject(DurableMedicalEquipmentBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: DurableMedicalEquipmentBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("DurableMedicalEquipmentService", loggingService, serviceContext);
 }

    createDurableMedicalEquipment(input: UserCreateDurableMedicalEquipmentInput): Observable<DurableMedicalEquipment> {
        return this.businessProvider.createDurableMedicalEquipment(input);
    }

    updateDurableMedicalEquipment(input: UserUpdateDurableMedicalEquipmentInput, durableMedicalEquipmentId: string): Observable<DurableMedicalEquipment> {
        return this.businessProvider.updateDurableMedicalEquipment(input, durableMedicalEquipmentId);
    }

    importDurableMedicalequipments(durableMedicalEquipments: UserUpdateDurableMedicalEquipmentInput[]): Observable<boolean> {
        return this.businessProvider.importDurableMedicalequipments(durableMedicalEquipments);
    }
}

