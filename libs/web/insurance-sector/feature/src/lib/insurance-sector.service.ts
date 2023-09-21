
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { InsuranceSector, UserCreateInsuranceSectorInput, UserUpdateInsuranceSectorInput } from "@case-clinical/shared/util/sdk";
import { InsuranceSectorBusinessProviderService } from "./business/insurance-sector.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class InsuranceSectorService extends ServiceBase {
 constructor(
  @Inject(InsuranceSectorBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: InsuranceSectorBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("InsuranceSectorService", loggingService, serviceContext);
 }

    createInsuranceSector(input: UserCreateInsuranceSectorInput): Observable<InsuranceSector> {
        return this.businessProvider.createInsuranceSector(input);
    }

    updateInsuranceSector(input: UserUpdateInsuranceSectorInput, insuranceSectorId: string): Observable<InsuranceSector> {
        return this.businessProvider.updateInsuranceSector(input, insuranceSectorId);
    }

    importInsuranceSectors(insuranceSectors: UserUpdateInsuranceSectorInput[]): Observable<boolean> {
        return this.businessProvider.importInsuranceSectors(insuranceSectors);
    }
}

