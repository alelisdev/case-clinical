
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { PriorAuthorizationImplant, UserCreatePriorAuthorizationImplantInput, UserUpdatePriorAuthorizationImplantInput } from "@case-clinical/shared/util/sdk";
import { PriorAuthorizationImplantBusinessProviderService } from "./business/prior-authorization-implant.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
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
        return this.businessProvider.createPriorAuthorizationImplant(input);
    }

    updatePriorAuthorizationImplant(input: UserUpdatePriorAuthorizationImplantInput, priorAuthorizationImplantId: string): Observable<PriorAuthorizationImplant> {
        return this.businessProvider.updatePriorAuthorizationImplant(input, priorAuthorizationImplantId);
    }

    importPriorAuthorizationImplants(priorAuthorizationImplants: UserUpdatePriorAuthorizationImplantInput[]): Observable<boolean> {
        return this.businessProvider.importPriorAuthorizationImplants(priorAuthorizationImplants);
    }
}

