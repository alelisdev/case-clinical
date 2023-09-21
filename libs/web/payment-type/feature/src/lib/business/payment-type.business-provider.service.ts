
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreatePaymentTypeAction} from './actions/create-payment-type.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {PaymentType, UserCreatePaymentTypeInput, UserUpdatePaymentTypeInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdatePaymentTypesAction, UpdatePaymentTypeAction } from './actions/update-payment-types.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class PaymentTypeBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.PaymentTypeBusinessProviderService', logger, serviceContext)
  }

  createPaymentType(input: UserCreatePaymentTypeInput): Observable<PaymentType> {
    const action = new CreatePaymentTypeAction(input); 
    action.Do(this);
    return action.response;   
  }

  updatePaymentType(input: UserUpdatePaymentTypeInput, paymentTypeId: string): Observable<PaymentType> {
    const action = new UpdatePaymentTypeAction(input, paymentTypeId); 
    action.Do(this);
    return action.response;   
  }
  
  importPaymentTypes(paymentTypes: UserUpdatePaymentTypeInput[]): Observable<boolean> {
    const updatePaymentTypesAction = new UpdatePaymentTypesAction(paymentTypes);
    updatePaymentTypesAction.Do(this)
    return updatePaymentTypesAction.response;
  }
}

