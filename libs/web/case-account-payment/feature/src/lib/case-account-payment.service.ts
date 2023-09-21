
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { CaseAccountPayment, UserCreateCaseAccountPaymentInput, UserUpdateCaseAccountPaymentInput } from "@case-clinical/shared/util/sdk";
import { CaseAccountPaymentBusinessProviderService } from "./business/case-account-payment.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class CaseAccountPaymentService extends ServiceBase {
 constructor(
  @Inject(CaseAccountPaymentBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: CaseAccountPaymentBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("CaseAccountPaymentService", loggingService, serviceContext);
 }

    createCaseAccountPayment(input: UserCreateCaseAccountPaymentInput): Observable<CaseAccountPayment> {
        return this.businessProvider.createCaseAccountPayment(input);
    }

    updateCaseAccountPayment(input: UserUpdateCaseAccountPaymentInput, caseAccountPaymentId: string): Observable<CaseAccountPayment> {
        return this.businessProvider.updateCaseAccountPayment(input, caseAccountPaymentId);
    }

    importCaseAccountPayments(caseAccountPayments: UserUpdateCaseAccountPaymentInput[]): Observable<boolean> {
        return this.businessProvider.importCaseAccountPayments(caseAccountPayments);
    }
}

