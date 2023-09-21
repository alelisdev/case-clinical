
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreatePaymentAction} from './actions/create-payment.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {Payment, UserCreatePaymentInput, UserUpdatePaymentInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdatePaymentsAction, UpdatePaymentAction } from './actions/update-payments.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class PaymentBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.PaymentBusinessProviderService', logger, serviceContext)
  }

  createPayment(input: UserCreatePaymentInput): Observable<Payment> {
    const action = new CreatePaymentAction(input); 
    action.Do(this);
    return action.response;   
  }

  updatePayment(input: UserUpdatePaymentInput, paymentId: string): Observable<Payment> {
    const action = new UpdatePaymentAction(input, paymentId); 
    action.Do(this);
    return action.response;   
  }
  
  importPayments(payments: UserUpdatePaymentInput[]): Observable<boolean> {
    const updatePaymentsAction = new UpdatePaymentsAction(payments);
    updatePaymentsAction.Do(this)
    return updatePaymentsAction.response;
  }
}

