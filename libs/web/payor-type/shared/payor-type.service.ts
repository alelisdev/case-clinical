
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { PayorType, UserCreatePayorTypeInput, UserUpdatePayorTypeInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { PayorTypeBusinessProviderService } from "./payor-type.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class PayorTypeService extends ServiceBase {
 constructor(
  @Inject(PayorTypeBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: PayorTypeBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("PayorTypeService", loggingService, serviceContext);
 }

    createPayorType(input: UserCreatePayorTypeInput): Observable<PayorType> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createPayorType(filteredObj);
    }

    updatePayorType(input: UserUpdatePayorTypeInput, payorTypeId: string): Observable<PayorType> {
        return this.businessProvider.updatePayorType(input, payorTypeId);
    }

    importPayorTypes(payorTypes: UserUpdatePayorTypeInput[]): Observable<UpdateResult> {
        return this.businessProvider.importPayorTypes(payorTypes);
    }

    validatePayorTypeExcelData(excelData: any[] ) {
      return this.businessProvider.validatePayorTypeExcelData(excelData );
    }
}

