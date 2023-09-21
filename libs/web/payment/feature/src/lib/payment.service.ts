
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Payment, UserCreatePaymentInput, UserUpdatePaymentInput } from "@case-clinical/shared/util/sdk";
import { PaymentBusinessProviderService } from "./business/payment.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class PaymentService extends ServiceBase {
 constructor(
  @Inject(PaymentBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: PaymentBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("PaymentService", loggingService, serviceContext);
 }

    createPayment(input: UserCreatePaymentInput): Observable<Payment> {
        return this.businessProvider.createPayment(input);
    }

    updatePayment(input: UserUpdatePaymentInput, paymentId: string): Observable<Payment> {
        return this.businessProvider.updatePayment(input, paymentId);
    }

    importPayments(payments: UserUpdatePaymentInput[]): Observable<boolean> {
        return this.businessProvider.importPayments(payments);
    }
}

