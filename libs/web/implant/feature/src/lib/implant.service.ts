
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Implant, UserCreateImplantInput, UserUpdateImplantInput } from "@case-clinical/shared/util/sdk";
import { ImplantBusinessProviderService } from "./business/implant.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class ImplantService extends ServiceBase {
 constructor(
  @Inject(ImplantBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: ImplantBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("ImplantService", loggingService, serviceContext);
 }

    createImplant(input: UserCreateImplantInput): Observable<Implant> {
        return this.businessProvider.createImplant(input);
    }

    updateImplant(input: UserUpdateImplantInput, implantId: string): Observable<Implant> {
        return this.businessProvider.updateImplant(input, implantId);
    }

    importImplants(implants: UserUpdateImplantInput[]): Observable<boolean> {
        return this.businessProvider.importImplants(implants);
    }
}

