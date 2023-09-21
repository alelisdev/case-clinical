
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { ClinicalProviderLocation, UserCreateClinicalProviderLocationInput, UserUpdateClinicalProviderLocationInput, UpdateResult, ClinicalProvider, Location } from "@case-clinical/shared/util/sdk";
import { ClinicalProviderLocationBusinessProviderService } from "./clinical-provider-location.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class ClinicalProviderLocationService extends ServiceBase {
 constructor(
  @Inject(ClinicalProviderLocationBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: ClinicalProviderLocationBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("ClinicalProviderLocationService", loggingService, serviceContext);
 }

    createClinicalProviderLocation(input: UserCreateClinicalProviderLocationInput): Observable<ClinicalProviderLocation> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createClinicalProviderLocation(filteredObj);
    }

    updateClinicalProviderLocation(input: UserUpdateClinicalProviderLocationInput, clinicalProviderLocationId: string): Observable<ClinicalProviderLocation> {
        return this.businessProvider.updateClinicalProviderLocation(input, clinicalProviderLocationId);
    }

    importClinicalProviderLocations(clinicalProviderLocations: UserUpdateClinicalProviderLocationInput[]): Observable<UpdateResult> {
        return this.businessProvider.importClinicalProviderLocations(clinicalProviderLocations);
    }

    validateClinicalProviderLocationExcelData(excelData: any[], clinicalProviders: ClinicalProvider[], locations: Location[]) {
      return this.businessProvider.validateClinicalProviderLocationExcelData(excelData, clinicalProviders, locations);
    }
}

