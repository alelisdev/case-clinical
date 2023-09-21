
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { MedicalConditionProvider, UserCreateMedicalConditionProviderInput, UserUpdateMedicalConditionProviderInput, UpdateResult, ClinicalProvider } from "@case-clinical/shared/util/sdk";
import { MedicalConditionProviderBusinessProviderService } from "./medical-condition-provider.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class MedicalConditionProviderService extends ServiceBase {
 constructor(
  @Inject(MedicalConditionProviderBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: MedicalConditionProviderBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("MedicalConditionProviderService", loggingService, serviceContext);
 }

    createMedicalConditionProvider(input: UserCreateMedicalConditionProviderInput): Observable<MedicalConditionProvider> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createMedicalConditionProvider(filteredObj);
    }

    updateMedicalConditionProvider(input: UserUpdateMedicalConditionProviderInput, medicalConditionProviderId: string): Observable<MedicalConditionProvider> {
        return this.businessProvider.updateMedicalConditionProvider(input, medicalConditionProviderId);
    }

    importMedicalConditionProviders(medicalConditionProviders: UserUpdateMedicalConditionProviderInput[]): Observable<UpdateResult> {
        return this.businessProvider.importMedicalConditionProviders(medicalConditionProviders);
    }

    validateMedicalConditionProviderExcelData(excelData: any[], clinicalProviders: ClinicalProvider[]) {
      return this.businessProvider.validateMedicalConditionProviderExcelData(excelData, clinicalProviders);
    }
}

