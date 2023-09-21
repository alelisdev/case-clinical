
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { CalculationBasisType, UserCreateCalculationBasisTypeInput, UserUpdateCalculationBasisTypeInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { CalculationBasisTypeBusinessProviderService } from "./calculation-basis-type.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
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
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createCalculationBasisType(filteredObj);
    }

    updateCalculationBasisType(input: UserUpdateCalculationBasisTypeInput, calculationBasisTypeId: string): Observable<CalculationBasisType> {
        return this.businessProvider.updateCalculationBasisType(input, calculationBasisTypeId);
    }

    importCalculationBasisTypes(calculationBasisTypes: UserUpdateCalculationBasisTypeInput[]): Observable<UpdateResult> {
        return this.businessProvider.importCalculationBasisTypes(calculationBasisTypes);
    }

    validateCalculationBasisTypeExcelData(excelData: any[] ) {
      return this.businessProvider.validateCalculationBasisTypeExcelData(excelData );
    }
}

