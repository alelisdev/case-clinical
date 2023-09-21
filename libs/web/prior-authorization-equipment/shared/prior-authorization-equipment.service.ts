
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { PriorAuthorizationEquipment, UserCreatePriorAuthorizationEquipmentInput, UserUpdatePriorAuthorizationEquipmentInput, UpdateResult, Equipment, PriorAuthorizationRequest } from "@case-clinical/shared/util/sdk";
import { PriorAuthorizationEquipmentBusinessProviderService } from "./prior-authorization-equipment.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class PriorAuthorizationEquipmentService extends ServiceBase {
 constructor(
  @Inject(PriorAuthorizationEquipmentBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: PriorAuthorizationEquipmentBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("PriorAuthorizationEquipmentService", loggingService, serviceContext);
 }

    createPriorAuthorizationEquipment(input: UserCreatePriorAuthorizationEquipmentInput): Observable<PriorAuthorizationEquipment> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createPriorAuthorizationEquipment(filteredObj);
    }

    updatePriorAuthorizationEquipment(input: UserUpdatePriorAuthorizationEquipmentInput, priorAuthorizationEquipmentId: string): Observable<PriorAuthorizationEquipment> {
        return this.businessProvider.updatePriorAuthorizationEquipment(input, priorAuthorizationEquipmentId);
    }

    importPriorAuthorizationEquipments(priorAuthorizationEquipments: UserUpdatePriorAuthorizationEquipmentInput[]): Observable<UpdateResult> {
        return this.businessProvider.importPriorAuthorizationEquipments(priorAuthorizationEquipments);
    }

    validatePriorAuthorizationEquipmentExcelData(excelData: any[], equipment: Equipment[], priorAuthorizationRequests: PriorAuthorizationRequest[]) {
      return this.businessProvider.validatePriorAuthorizationEquipmentExcelData(excelData, equipment, priorAuthorizationRequests);
    }
}

