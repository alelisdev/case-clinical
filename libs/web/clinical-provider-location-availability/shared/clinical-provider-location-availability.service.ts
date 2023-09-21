
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { ClinicalProviderLocationAvailability, UserCreateClinicalProviderLocationAvailabilityInput, UserUpdateClinicalProviderLocationAvailabilityInput, UpdateResult, ClinicalProviderLocation } from "@case-clinical/shared/util/sdk";
import { ClinicalProviderLocationAvailabilityBusinessProviderService } from "./clinical-provider-location-availability.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class ClinicalProviderLocationAvailabilityService extends ServiceBase {
 constructor(
  @Inject(ClinicalProviderLocationAvailabilityBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: ClinicalProviderLocationAvailabilityBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("ClinicalProviderLocationAvailabilityService", loggingService, serviceContext);
 }

    createClinicalProviderLocationAvailability(input: UserCreateClinicalProviderLocationAvailabilityInput): Observable<ClinicalProviderLocationAvailability> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createClinicalProviderLocationAvailability(filteredObj);
    }

    updateClinicalProviderLocationAvailability(input: UserUpdateClinicalProviderLocationAvailabilityInput, clinicalProviderLocationAvailabilityId: string): Observable<ClinicalProviderLocationAvailability> {
        return this.businessProvider.updateClinicalProviderLocationAvailability(input, clinicalProviderLocationAvailabilityId);
    }

    importClinicalProviderLocationAvailabilities(clinicalProviderLocationAvailabilities: UserUpdateClinicalProviderLocationAvailabilityInput[]): Observable<UpdateResult> {
        return this.businessProvider.importClinicalProviderLocationAvailabilities(clinicalProviderLocationAvailabilities);
    }

    validateClinicalProviderLocationAvailabilityExcelData(excelData: any[], clinicalProviderLocations: ClinicalProviderLocation[]) {
      return this.businessProvider.validateClinicalProviderLocationAvailabilityExcelData(excelData, clinicalProviderLocations);
    }
}

