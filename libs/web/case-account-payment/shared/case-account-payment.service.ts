
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { CaseAccountPayment, UserCreateCaseAccountPaymentInput, UserUpdateCaseAccountPaymentInput, UpdateResult, Payment, CaseAccount } from "@case-clinical/shared/util/sdk";
import { CaseAccountPaymentBusinessProviderService } from "./case-account-payment.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
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
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createCaseAccountPayment(filteredObj);
    }

    updateCaseAccountPayment(input: UserUpdateCaseAccountPaymentInput, caseAccountPaymentId: string): Observable<CaseAccountPayment> {
        return this.businessProvider.updateCaseAccountPayment(input, caseAccountPaymentId);
    }

    importCaseAccountPayments(caseAccountPayments: UserUpdateCaseAccountPaymentInput[]): Observable<UpdateResult> {
        return this.businessProvider.importCaseAccountPayments(caseAccountPayments);
    }

    validateCaseAccountPaymentExcelData(excelData: any[], payments: Payment[], caseAccounts: CaseAccount[]) {
      return this.businessProvider.validateCaseAccountPaymentExcelData(excelData, payments, caseAccounts);
    }
}

