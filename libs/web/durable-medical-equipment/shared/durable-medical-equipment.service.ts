
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { DurableMedicalEquipment, UserCreateDurableMedicalEquipmentInput, UserUpdateDurableMedicalEquipmentInput, UpdateResult, Vendor } from "@case-clinical/shared/util/sdk";
import { DurableMedicalEquipmentBusinessProviderService } from "./durable-medical-equipment.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
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
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createDurableMedicalEquipment(filteredObj);
    }

    updateDurableMedicalEquipment(input: UserUpdateDurableMedicalEquipmentInput, durableMedicalEquipmentId: string): Observable<DurableMedicalEquipment> {
        return this.businessProvider.updateDurableMedicalEquipment(input, durableMedicalEquipmentId);
    }

    importDurableMedicalEquipments(durableMedicalEquipments: UserUpdateDurableMedicalEquipmentInput[]): Observable<UpdateResult> {
        return this.businessProvider.importDurableMedicalEquipments(durableMedicalEquipments);
    }

    validateDurableMedicalEquipmentExcelData(excelData: any[], vendors: Vendor[]) {
      return this.businessProvider.validateDurableMedicalEquipmentExcelData(excelData, vendors);
    }
}

