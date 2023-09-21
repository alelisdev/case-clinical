
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { PriorAuthorizationImplant, UserCreatePriorAuthorizationImplantInput, UserUpdatePriorAuthorizationImplantInput, UpdateResult, Implant, PriorAuthorizationRequest } from "@case-clinical/shared/util/sdk";
import { PriorAuthorizationImplantBusinessProviderService } from "./prior-authorization-implant.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class PriorAuthorizationImplantService extends ServiceBase {
 constructor(
  @Inject(PriorAuthorizationImplantBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: PriorAuthorizationImplantBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("PriorAuthorizationImplantService", loggingService, serviceContext);
 }

    createPriorAuthorizationImplant(input: UserCreatePriorAuthorizationImplantInput): Observable<PriorAuthorizationImplant> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createPriorAuthorizationImplant(filteredObj);
    }

    updatePriorAuthorizationImplant(input: UserUpdatePriorAuthorizationImplantInput, priorAuthorizationImplantId: string): Observable<PriorAuthorizationImplant> {
        return this.businessProvider.updatePriorAuthorizationImplant(input, priorAuthorizationImplantId);
    }

    importPriorAuthorizationImplants(priorAuthorizationImplants: UserUpdatePriorAuthorizationImplantInput[]): Observable<UpdateResult> {
        return this.businessProvider.importPriorAuthorizationImplants(priorAuthorizationImplants);
    }

    validatePriorAuthorizationImplantExcelData(excelData: any[], implants: Implant[], priorAuthorizationRequests: PriorAuthorizationRequest[]) {
      return this.businessProvider.validatePriorAuthorizationImplantExcelData(excelData, implants, priorAuthorizationRequests);
    }
}

