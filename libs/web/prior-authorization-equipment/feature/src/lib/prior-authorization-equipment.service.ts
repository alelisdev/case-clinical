
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { PriorAuthorizationEquipment, UserCreatePriorAuthorizationEquipmentInput, UserUpdatePriorAuthorizationEquipmentInput } from "@case-clinical/shared/util/sdk";
import { PriorAuthorizationEquipmentBusinessProviderService } from "./business/prior-authorization-equipment.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
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
        return this.businessProvider.createPriorAuthorizationEquipment(input);
    }

    updatePriorAuthorizationEquipment(input: UserUpdatePriorAuthorizationEquipmentInput, priorAuthorizationEquipmentId: string): Observable<PriorAuthorizationEquipment> {
        return this.businessProvider.updatePriorAuthorizationEquipment(input, priorAuthorizationEquipmentId);
    }

    importPriorAuthorizationequipments(priorAuthorizationequipments: UserUpdatePriorAuthorizationEquipmentInput[]): Observable<boolean> {
        return this.businessProvider.importPriorAuthorizationequipments(priorAuthorizationequipments);
    }
}

