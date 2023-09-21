
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { PaymentType, UserCreatePaymentTypeInput, UserUpdatePaymentTypeInput } from "@case-clinical/shared/util/sdk";
import { PaymentTypeBusinessProviderService } from "./business/payment-type.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class PaymentTypeService extends ServiceBase {
 constructor(
  @Inject(PaymentTypeBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: PaymentTypeBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("PaymentTypeService", loggingService, serviceContext);
 }

    createPaymentType(input: UserCreatePaymentTypeInput): Observable<PaymentType> {
        return this.businessProvider.createPaymentType(input);
    }

    updatePaymentType(input: UserUpdatePaymentTypeInput, paymentTypeId: string): Observable<PaymentType> {
        return this.businessProvider.updatePaymentType(input, paymentTypeId);
    }

    importPaymentTypes(paymentTypes: UserUpdatePaymentTypeInput[]): Observable<boolean> {
        return this.businessProvider.importPaymentTypes(paymentTypes);
    }
}

