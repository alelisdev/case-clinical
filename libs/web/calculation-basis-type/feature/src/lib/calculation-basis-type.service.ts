
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { CalculationBasisType, UserCreateCalculationBasisTypeInput, UserUpdateCalculationBasisTypeInput } from "@case-clinical/shared/util/sdk";
import { CalculationBasisTypeBusinessProviderService } from "./business/calculation-basis-type.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class CalculationBasisTypeService extends ServiceBase {
 constructor(
  @Inject(CalculationBasisTypeBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: CalculationBasisTypeBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("CalculationBasisTypeService", loggingService, serviceContext);
 }

    createCalculationBasisType(input: UserCreateCalculationBasisTypeInput): Observable<CalculationBasisType> {
        return this.businessProvider.createCalculationBasisType(input);
    }

    updateCalculationBasisType(input: UserUpdateCalculationBasisTypeInput, calculationBasisTypeId: string): Observable<CalculationBasisType> {
        return this.businessProvider.updateCalculationBasisType(input, calculationBasisTypeId);
    }

    importCalculationBasisTypes(calculationBasisTypes: UserUpdateCalculationBasisTypeInput[]): Observable<boolean> {
        return this.businessProvider.importCalculationBasisTypes(calculationBasisTypes);
    }
}

