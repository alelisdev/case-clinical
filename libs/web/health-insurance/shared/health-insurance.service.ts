
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { HealthInsurance, UserCreateHealthInsuranceInput, UserUpdateHealthInsuranceInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { HealthInsuranceBusinessProviderService } from "./health-insurance.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class HealthInsuranceService extends ServiceBase {
 constructor(
  @Inject(HealthInsuranceBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: HealthInsuranceBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("HealthInsuranceService", loggingService, serviceContext);
 }

    createHealthInsurance(input: UserCreateHealthInsuranceInput): Observable<HealthInsurance> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createHealthInsurance(filteredObj);
    }

    updateHealthInsurance(input: UserUpdateHealthInsuranceInput, healthInsuranceId: string): Observable<HealthInsurance> {
        return this.businessProvider.updateHealthInsurance(input, healthInsuranceId);
    }

    importHealthInsurances(healthInsurances: UserUpdateHealthInsuranceInput[]): Observable<UpdateResult> {
        return this.businessProvider.importHealthInsurances(healthInsurances);
    }

    validateHealthInsuranceExcelData(excelData: any[] ) {
      return this.businessProvider.validateHealthInsuranceExcelData(excelData );
    }
}

