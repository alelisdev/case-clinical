
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreatePaymentApplicationMethodAction} from './actions/create-payment-application-method.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {PaymentApplicationMethod, UserCreatePaymentApplicationMethodInput, UserUpdatePaymentApplicationMethodInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdatePaymentApplicationMethodsAction, UpdatePaymentApplicationMethodAction } from './actions/update-payment-application-methods.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class PaymentApplicationMethodBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.PaymentApplicationMethodBusinessProviderService', logger, serviceContext)
  }

  createPaymentApplicationMethod(input: UserCreatePaymentApplicationMethodInput): Observable<PaymentApplicationMethod> {
    const action = new CreatePaymentApplicationMethodAction(input); 
    action.Do(this);
    return action.response;   
  }

  updatePaymentApplicationMethod(input: UserUpdatePaymentApplicationMethodInput, paymentApplicationMethodId: string): Observable<PaymentApplicationMethod> {
    const action = new UpdatePaymentApplicationMethodAction(input, paymentApplicationMethodId); 
    action.Do(this);
    return action.response;   
  }
  
  importPaymentApplicationMethods(paymentApplicationMethods: UserUpdatePaymentApplicationMethodInput[]): Observable<boolean> {
    const updatePaymentApplicationMethodsAction = new UpdatePaymentApplicationMethodsAction(paymentApplicationMethods);
    updatePaymentApplicationMethodsAction.Do(this)
    return updatePaymentApplicationMethodsAction.response;
  }
}

