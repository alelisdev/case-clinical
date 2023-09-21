
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Firm, UserCreateFirmInput, UserUpdateFirmInput, UpdateResult } from "@case-clinical/shared/util/sdk";
import { FirmBusinessProviderService } from "./business/firm.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class FirmService extends ServiceBase {
 constructor(
  @Inject(FirmBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: FirmBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("FirmService", loggingService, serviceContext);
 }

    createFirm(input: UserCreateFirmInput): Observable<Firm> {
        return this.businessProvider.createFirm(input);
    }

    updateFirm(input: UserUpdateFirmInput, firmId: string): Observable<Firm> {
        return this.businessProvider.updateFirm(input, firmId);
    }

    importFirms(firms: UserUpdateFirmInput[]): Observable<UpdateResult> {
        return this.businessProvider.importFirms(firms);
    }
}

