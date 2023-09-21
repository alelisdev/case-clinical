
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Insurance, UserCreateInsuranceInput, UserUpdateInsuranceInput } from "@case-clinical/shared/util/sdk";
import { InsuranceBusinessProviderService } from "./business/insurance.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
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
        return this.businessProvider.createInsurance(input);
    }

    updateInsurance(input: UserUpdateInsuranceInput, insuranceId: string): Observable<Insurance> {
        return this.businessProvider.updateInsurance(input, insuranceId);
    }

    importInsurances(insurances: UserUpdateInsuranceInput[]): Observable<boolean> {
        return this.businessProvider.importInsurances(insurances);
    }
}

