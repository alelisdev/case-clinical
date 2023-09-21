
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Payment, UserCreatePaymentInput, UserUpdatePaymentInput, UpdateResult, BatchControl, Bank, PayorType, PaymentType, PaymentApplicationMethod } from "@case-clinical/shared/util/sdk";
import { PaymentBusinessProviderService } from "./payment.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
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
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createPayment(filteredObj);
    }

    updatePayment(input: UserUpdatePaymentInput, paymentId: string): Observable<Payment> {
        return this.businessProvider.updatePayment(input, paymentId);
    }

    importPayments(payments: UserUpdatePaymentInput[]): Observable<UpdateResult> {
        return this.businessProvider.importPayments(payments);
    }

    validatePaymentExcelData(excelData: any[], batchControls: BatchControl[], banks: Bank[], payorTypes: PayorType[], paymentTypes: PaymentType[], paymentApplicationMethods: PaymentApplicationMethod[]) {
      return this.businessProvider.validatePaymentExcelData(excelData, batchControls, banks, payorTypes, paymentTypes, paymentApplicationMethods);
    }
}

