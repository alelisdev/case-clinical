
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateCaseAccountPaymentAction} from './actions/create-case-account-payment.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {CaseAccountPayment, UserCreateCaseAccountPaymentInput, UserUpdateCaseAccountPaymentInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateCaseAccountPaymentsAction, UpdateCaseAccountPaymentAction } from './actions/update-case-account-payments.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class CaseAccountPaymentBusinessProviderService extends ServiceBase {constructor(
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
  
  importCaseAccountPayments(caseAccountPayments: UserUpdateCaseAccountPaymentInput[]): Observable<boolean> {
    const updateCaseAccountPaymentsAction = new UpdateCaseAccountPaymentsAction(caseAccountPayments);
    updateCaseAccountPaymentsAction.Do(this)
    return updateCaseAccountPaymentsAction.response;
  }
}

