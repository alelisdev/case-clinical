
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { PriorAuthDme, UserCreatePriorAuthDmeInput, UserUpdatePriorAuthDmeInput } from "@case-clinical/shared/util/sdk";
import { PriorAuthDmeBusinessProviderService } from "./business/prior-auth-dme.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
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
        return this.businessProvider.createPriorAuthDme(input);
    }

    updatePriorAuthDme(input: UserUpdatePriorAuthDmeInput, priorAuthDmeId: string): Observable<PriorAuthDme> {
        return this.businessProvider.updatePriorAuthDme(input, priorAuthDmeId);
    }

    importPriorAuthDmes(priorAuthDmes: UserUpdatePriorAuthDmeInput[]): Observable<boolean> {
        return this.businessProvider.importPriorAuthDmes(priorAuthDmes);
    }
}

