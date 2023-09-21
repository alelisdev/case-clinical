
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { CaseAccount, UserCreateCaseAccountInput, UserUpdateCaseAccountInput, UpdateResult, LegalCase, Location, Vendor, AccountStatus, ProcedureType, AgreementType, ClaimProcedure, InvoiceDetail, Contract, Portfolio, ProcedureVendor } from "@case-clinical/shared/util/sdk";
import { CaseAccountBusinessProviderService } from "./case-account.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class CaseAccountService extends ServiceBase {
 constructor(
  @Inject(CaseAccountBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: CaseAccountBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("CaseAccountService", loggingService, serviceContext);
 }

    createCaseAccount(input: UserCreateCaseAccountInput): Observable<CaseAccount> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createCaseAccount(filteredObj);
    }

    updateCaseAccount(input: UserUpdateCaseAccountInput, caseAccountId: string): Observable<CaseAccount> {
        return this.businessProvider.updateCaseAccount(input, caseAccountId);
    }

    importCaseAccounts(caseAccounts: UserUpdateCaseAccountInput[]): Observable<UpdateResult> {
        return this.businessProvider.importCaseAccounts(caseAccounts);
    }

    validateCaseAccountExcelData(excelData: any[], legalCases: LegalCase[], locations: Location[], vendors: Vendor[], accountStatuses: AccountStatus[], procedureTypes: ProcedureType[], agreementTypes: AgreementType[], claimProcedures: ClaimProcedure[], invoiceDetails: InvoiceDetail[], contracts: Contract[], portfolios: Portfolio[], procedureVendors: ProcedureVendor[]) {
      return this.businessProvider.validateCaseAccountExcelData(excelData, legalCases, locations, vendors, accountStatuses, procedureTypes, agreementTypes, claimProcedures, invoiceDetails, contracts, portfolios, procedureVendors);
    }
}

