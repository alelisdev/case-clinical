
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { InsuranceType, UserCreateInsuranceTypeInput, UserUpdateInsuranceTypeInput } from "@case-clinical/shared/util/sdk";
import { InsuranceTypeBusinessProviderService } from "./business/insurance-type.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class InsuranceTypeService extends ServiceBase {
 constructor(
  @Inject(InsuranceTypeBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: InsuranceTypeBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("InsuranceTypeService", loggingService, serviceContext);
 }

    createInsuranceType(input: UserCreateInsuranceTypeInput): Observable<InsuranceType> {
        return this.businessProvider.createInsuranceType(input);
    }

    updateInsuranceType(input: UserUpdateInsuranceTypeInput, insuranceTypeId: string): Observable<InsuranceType> {
        return this.businessProvider.updateInsuranceType(input, insuranceTypeId);
    }

    importInsuranceTypes(insuranceTypes: UserUpdateInsuranceTypeInput[]): Observable<boolean> {
        return this.businessProvider.importInsuranceTypes(insuranceTypes);
    }
}

