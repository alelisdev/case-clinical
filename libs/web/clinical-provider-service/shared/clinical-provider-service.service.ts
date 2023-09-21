
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { ClinicalProviderService, UserCreateClinicalProviderServiceInput, UserUpdateClinicalProviderServiceInput, UpdateResult, Service, ClinicalProvider } from "@case-clinical/shared/util/sdk";
import { ClinicalProviderServiceBusinessProviderService } from "./clinical-provider-service.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class ClinicalProviderServiceService extends ServiceBase {
 constructor(
  @Inject(ClinicalProviderServiceBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: ClinicalProviderServiceBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("ClinicalProviderServiceService", loggingService, serviceContext);
 }

    createClinicalProviderService(input: UserCreateClinicalProviderServiceInput): Observable<ClinicalProviderService> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createClinicalProviderService(filteredObj);
    }

    updateClinicalProviderService(input: UserUpdateClinicalProviderServiceInput, clinicalProviderServiceId: string): Observable<ClinicalProviderService> {
        return this.businessProvider.updateClinicalProviderService(input, clinicalProviderServiceId);
    }

    importClinicalProviderServices(clinicalProviderServices: UserUpdateClinicalProviderServiceInput[]): Observable<UpdateResult> {
        return this.businessProvider.importClinicalProviderServices(clinicalProviderServices);
    }

    validateClinicalProviderServiceExcelData(excelData: any[], services: Service[], clinicalProviders: ClinicalProvider[]) {
      return this.businessProvider.validateClinicalProviderServiceExcelData(excelData, services, clinicalProviders);
    }
}

