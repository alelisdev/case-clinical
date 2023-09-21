
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Insurance, UserCreateInsuranceInput, UserUpdateInsuranceInput, UpdateResult, LegalCase, InsuranceType, InsuranceSector, Lead } from "@case-clinical/shared/util/sdk";
import { InsuranceBusinessProviderService } from "./insurance.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class InsuranceService extends ServiceBase {
 constructor(
  @Inject(InsuranceBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: InsuranceBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("InsuranceService", loggingService, serviceContext);
 }

    createInsurance(input: UserCreateInsuranceInput): Observable<Insurance> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createInsurance(filteredObj);
    }

    updateInsurance(input: UserUpdateInsuranceInput, insuranceId: string): Observable<Insurance> {
        return this.businessProvider.updateInsurance(input, insuranceId);
    }

    importInsurances(insurances: UserUpdateInsuranceInput[]): Observable<UpdateResult> {
        return this.businessProvider.importInsurances(insurances);
    }

    validateInsuranceExcelData(excelData: any[], legalCases: LegalCase[], insuranceTypes: InsuranceType[], insuranceSectors: InsuranceSector[], leads: Lead[]) {
      return this.businessProvider.validateInsuranceExcelData(excelData, legalCases, insuranceTypes, insuranceSectors, leads);
    }
}

