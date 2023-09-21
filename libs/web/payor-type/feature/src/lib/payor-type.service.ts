
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { PayorType, UserCreatePayorTypeInput, UserUpdatePayorTypeInput } from "@case-clinical/shared/util/sdk";
import { PayorTypeBusinessProviderService } from "./business/payor-type.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
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
        return this.businessProvider.createPayorType(input);
    }

    updatePayorType(input: UserUpdatePayorTypeInput, payorTypeId: string): Observable<PayorType> {
        return this.businessProvider.updatePayorType(input, payorTypeId);
    }

    importPayorTypes(payorTypes: UserUpdatePayorTypeInput[]): Observable<boolean> {
        return this.businessProvider.importPayorTypes(payorTypes);
    }
}

