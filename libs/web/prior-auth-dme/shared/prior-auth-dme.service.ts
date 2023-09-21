
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { PriorAuthDme, UserCreatePriorAuthDmeInput, UserUpdatePriorAuthDmeInput, UpdateResult, PriorAuthorizationRequest, DurableMedicalEquipment } from "@case-clinical/shared/util/sdk";
import { PriorAuthDmeBusinessProviderService } from "./prior-auth-dme.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class PriorAuthDmeService extends ServiceBase {
 constructor(
  @Inject(PriorAuthDmeBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: PriorAuthDmeBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("PriorAuthDmeService", loggingService, serviceContext);
 }

    createPriorAuthDme(input: UserCreatePriorAuthDmeInput): Observable<PriorAuthDme> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createPriorAuthDme(filteredObj);
    }

    updatePriorAuthDme(input: UserUpdatePriorAuthDmeInput, priorAuthDmeId: string): Observable<PriorAuthDme> {
        return this.businessProvider.updatePriorAuthDme(input, priorAuthDmeId);
    }

    importPriorAuthDmes(priorAuthDmes: UserUpdatePriorAuthDmeInput[]): Observable<UpdateResult> {
        return this.businessProvider.importPriorAuthDmes(priorAuthDmes);
    }

    validatePriorAuthDmeExcelData(excelData: any[], priorAuthorizationRequests: PriorAuthorizationRequest[], durableMedicalEquipments: DurableMedicalEquipment[]) {
      return this.businessProvider.validatePriorAuthDmeExcelData(excelData, priorAuthorizationRequests, durableMedicalEquipments);
    }
}

