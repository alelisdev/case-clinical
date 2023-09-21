
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { CaseAccountPayment, UserCreateCaseAccountPaymentInput, UserUpdateCaseAccountPaymentInput, UpdateResult, Payment, CaseAccount } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateCaseAccountPaymentExcelDataAction } from './actions/validate-case-account-payment-excel-data.action'
import { CreateCaseAccountPaymentAction } from './actions/create-case-account-payment.action'
import { UpdateCaseAccountPaymentsAction, UpdateCaseAccountPaymentAction } from './actions/update-case-account-payments.action'


@Injectable({providedIn: 'root'})
export class CaseAccountPaymentBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.CaseAccountPaymentBusinessProviderService', logger, serviceContext)
  }

  createCaseAccountPayment(input: UserCreateCaseAccountPaymentInput): Observable<CaseAccountPayment> {
    const action = new CreateCaseAccountPaymentAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateCaseAccountPayment(input: UserUpdateCaseAccountPaymentInput, caseAccountPaymentId: string): Observable<CaseAccountPayment> {
    const action = new UpdateCaseAccountPaymentAction(input, caseAccountPaymentId); 
    action.Do(this);
    return action.response;   
  }
  
  importCaseAccountPayments(caseAccountPayments: UserUpdateCaseAccountPaymentInput[]): Observable<UpdateResult> {
    const updateCaseAccountPaymentsAction = new UpdateCaseAccountPaymentsAction(caseAccountPayments);
    updateCaseAccountPaymentsAction.Do(this)
    return updateCaseAccountPaymentsAction.response;
  }

  validateCaseAccountPaymentExcelData(excelData: any[], payments: Payment[], caseAccounts: CaseAccount[]) {
    const validateCaseAccountPaymentExcelDataAction = new ValidateCaseAccountPaymentExcelDataAction(excelData, payments, caseAccounts);
    validateCaseAccountPaymentExcelDataAction.Do(this)
    return validateCaseAccountPaymentExcelDataAction.response;
  }
}

