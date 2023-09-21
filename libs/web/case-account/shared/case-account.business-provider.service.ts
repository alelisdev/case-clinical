
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { CaseAccount, UserCreateCaseAccountInput, UserUpdateCaseAccountInput, UpdateResult, LegalCase, Location, Vendor, AccountStatus, ProcedureType, AgreementType, ClaimProcedure, InvoiceDetail, Contract, Portfolio, ProcedureVendor } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateCaseAccountExcelDataAction } from './actions/validate-case-account-excel-data.action'
import { CreateCaseAccountAction } from './actions/create-case-account.action'
import { UpdateCaseAccountsAction, UpdateCaseAccountAction } from './actions/update-case-accounts.action'


@Injectable({providedIn: 'root'})
export class CaseAccountBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.CaseAccountBusinessProviderService', logger, serviceContext)
  }

  createCaseAccount(input: UserCreateCaseAccountInput): Observable<CaseAccount> {
    const action = new CreateCaseAccountAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateCaseAccount(input: UserUpdateCaseAccountInput, caseAccountId: string): Observable<CaseAccount> {
    const action = new UpdateCaseAccountAction(input, caseAccountId); 
    action.Do(this);
    return action.response;   
  }
  
  importCaseAccounts(caseAccounts: UserUpdateCaseAccountInput[]): Observable<UpdateResult> {
    const updateCaseAccountsAction = new UpdateCaseAccountsAction(caseAccounts);
    updateCaseAccountsAction.Do(this)
    return updateCaseAccountsAction.response;
  }

  validateCaseAccountExcelData(excelData: any[], legalCases: LegalCase[], locations: Location[], vendors: Vendor[], accountStatuses: AccountStatus[], procedureTypes: ProcedureType[], agreementTypes: AgreementType[], claimProcedures: ClaimProcedure[], invoiceDetails: InvoiceDetail[], contracts: Contract[], portfolios: Portfolio[], procedureVendors: ProcedureVendor[]) {
    const validateCaseAccountExcelDataAction = new ValidateCaseAccountExcelDataAction(excelData, legalCases, locations, vendors, accountStatuses, procedureTypes, agreementTypes, claimProcedures, invoiceDetails, contracts, portfolios, procedureVendors);
    validateCaseAccountExcelDataAction.Do(this)
    return validateCaseAccountExcelDataAction.response;
  }
}

