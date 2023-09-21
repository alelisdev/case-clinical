
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { PaymentType, UserCreatePaymentTypeInput, UserUpdatePaymentTypeInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { PaymentTypeBusinessProviderService } from "./payment-type.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
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
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createPaymentType(filteredObj);
    }

    updatePaymentType(input: UserUpdatePaymentTypeInput, paymentTypeId: string): Observable<PaymentType> {
        return this.businessProvider.updatePaymentType(input, paymentTypeId);
    }

    importPaymentTypes(paymentTypes: UserUpdatePaymentTypeInput[]): Observable<UpdateResult> {
        return this.businessProvider.importPaymentTypes(paymentTypes);
    }

    validatePaymentTypeExcelData(excelData: any[] ) {
      return this.businessProvider.validatePaymentTypeExcelData(excelData );
    }
}

