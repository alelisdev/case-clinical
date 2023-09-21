
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { ClinicalProviderSpecialty, UserCreateClinicalProviderSpecialtyInput, UserUpdateClinicalProviderSpecialtyInput, UpdateResult, ClinicalProvider, Specialty } from "@case-clinical/shared/util/sdk";
import { ClinicalProviderSpecialtyBusinessProviderService } from "./clinical-provider-specialty.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class ClinicalProviderSpecialtyService extends ServiceBase {
 constructor(
  @Inject(ClinicalProviderSpecialtyBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: ClinicalProviderSpecialtyBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("ClinicalProviderSpecialtyService", loggingService, serviceContext);
 }

    createClinicalProviderSpecialty(input: UserCreateClinicalProviderSpecialtyInput): Observable<ClinicalProviderSpecialty> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createClinicalProviderSpecialty(filteredObj);
    }

    updateClinicalProviderSpecialty(input: UserUpdateClinicalProviderSpecialtyInput, clinicalProviderSpecialtyId: string): Observable<ClinicalProviderSpecialty> {
        return this.businessProvider.updateClinicalProviderSpecialty(input, clinicalProviderSpecialtyId);
    }

    importClinicalProviderSpecialties(clinicalProviderSpecialties: UserUpdateClinicalProviderSpecialtyInput[]): Observable<UpdateResult> {
        return this.businessProvider.importClinicalProviderSpecialties(clinicalProviderSpecialties);
    }

    validateClinicalProviderSpecialtyExcelData(excelData: any[], clinicalProviders: ClinicalProvider[], specialties: Specialty[]) {
      return this.businessProvider.validateClinicalProviderSpecialtyExcelData(excelData, clinicalProviders, specialties);
    }
}

