
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { InsuranceSector, UserCreateInsuranceSectorInput, UserUpdateInsuranceSectorInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { InsuranceSectorBusinessProviderService } from "./insurance-sector.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
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
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createInsuranceSector(filteredObj);
    }

    updateInsuranceSector(input: UserUpdateInsuranceSectorInput, insuranceSectorId: string): Observable<InsuranceSector> {
        return this.businessProvider.updateInsuranceSector(input, insuranceSectorId);
    }

    importInsuranceSectors(insuranceSectors: UserUpdateInsuranceSectorInput[]): Observable<UpdateResult> {
        return this.businessProvider.importInsuranceSectors(insuranceSectors);
    }

    validateInsuranceSectorExcelData(excelData: any[] ) {
      return this.businessProvider.validateInsuranceSectorExcelData(excelData );
    }
}

