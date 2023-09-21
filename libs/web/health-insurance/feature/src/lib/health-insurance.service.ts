
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { HealthInsurance, UserCreateHealthInsuranceInput, UserUpdateHealthInsuranceInput } from "@case-clinical/shared/util/sdk";
import { HealthInsuranceBusinessProviderService } from "./business/health-insurance.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
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
        return this.businessProvider.createHealthInsurance(input);
    }

    updateHealthInsurance(input: UserUpdateHealthInsuranceInput, healthInsuranceId: string): Observable<HealthInsurance> {
        return this.businessProvider.updateHealthInsurance(input, healthInsuranceId);
    }

    importHealthInsurances(healthInsurances: UserUpdateHealthInsuranceInput[]): Observable<boolean> {
        return this.businessProvider.importHealthInsurances(healthInsurances);
    }
}

