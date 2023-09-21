
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { PaymentApplicationMethod, UserCreatePaymentApplicationMethodInput, UserUpdatePaymentApplicationMethodInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { PaymentApplicationMethodBusinessProviderService } from "./payment-application-method.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
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
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createPaymentApplicationMethod(filteredObj);
    }

    updatePaymentApplicationMethod(input: UserUpdatePaymentApplicationMethodInput, paymentApplicationMethodId: string): Observable<PaymentApplicationMethod> {
        return this.businessProvider.updatePaymentApplicationMethod(input, paymentApplicationMethodId);
    }

    importPaymentApplicationMethods(paymentApplicationMethods: UserUpdatePaymentApplicationMethodInput[]): Observable<UpdateResult> {
        return this.businessProvider.importPaymentApplicationMethods(paymentApplicationMethods);
    }

    validatePaymentApplicationMethodExcelData(excelData: any[] ) {
      return this.businessProvider.validatePaymentApplicationMethodExcelData(excelData );
    }
}

