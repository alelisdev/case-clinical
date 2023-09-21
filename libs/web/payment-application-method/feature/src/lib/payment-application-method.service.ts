
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { PaymentApplicationMethod, UserCreatePaymentApplicationMethodInput, UserUpdatePaymentApplicationMethodInput } from "@case-clinical/shared/util/sdk";
import { PaymentApplicationMethodBusinessProviderService } from "./business/payment-application-method.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class PaymentApplicationMethodService extends ServiceBase {
 constructor(
  @Inject(PaymentApplicationMethodBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: PaymentApplicationMethodBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("PaymentApplicationMethodService", loggingService, serviceContext);
 }

    createPaymentApplicationMethod(input: UserCreatePaymentApplicationMethodInput): Observable<PaymentApplicationMethod> {
        return this.businessProvider.createPaymentApplicationMethod(input);
    }

    updatePaymentApplicationMethod(input: UserUpdatePaymentApplicationMethodInput, paymentApplicationMethodId: string): Observable<PaymentApplicationMethod> {
        return this.businessProvider.updatePaymentApplicationMethod(input, paymentApplicationMethodId);
    }

    importPaymentApplicationMethods(paymentApplicationMethods: UserUpdatePaymentApplicationMethodInput[]): Observable<boolean> {
        return this.businessProvider.importPaymentApplicationMethods(paymentApplicationMethods);
    }
}

