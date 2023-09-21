
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { ClinicalProvider, UserCreateClinicalProviderInput, UserUpdateClinicalProviderInput, UpdateResult, Vendor } from "@case-clinical/shared/util/sdk";
import { ClinicalProviderBusinessProviderService } from "./clinical-provider.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class ClinicalProviderService extends ServiceBase {
 constructor(
  @Inject(ClinicalProviderBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: ClinicalProviderBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("ClinicalProviderService", loggingService, serviceContext);
 }

    createClinicalProvider(input: UserCreateClinicalProviderInput): Observable<ClinicalProvider> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createClinicalProvider(filteredObj);
    }

    updateClinicalProvider(input: UserUpdateClinicalProviderInput, clinicalProviderId: string): Observable<ClinicalProvider> {
        return this.businessProvider.updateClinicalProvider(input, clinicalProviderId);
    }

    importClinicalProviders(clinicalProviders: UserUpdateClinicalProviderInput[]): Observable<UpdateResult> {
        return this.businessProvider.importClinicalProviders(clinicalProviders);
    }

    validateClinicalProviderExcelData(excelData: any[], vendors: Vendor[]) {
      return this.businessProvider.validateClinicalProviderExcelData(excelData, vendors);
    }
}

