
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { PaymentApplicationMethod, UserCreatePaymentApplicationMethodInput, UserUpdatePaymentApplicationMethodInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidatePaymentApplicationMethodExcelDataAction } from './actions/validate-payment-application-method-excel-data.action'
import { CreatePaymentApplicationMethodAction } from './actions/create-payment-application-method.action'
import { UpdatePaymentApplicationMethodsAction, UpdatePaymentApplicationMethodAction } from './actions/update-payment-application-methods.action'


@Injectable({providedIn: 'root'})
export class PaymentApplicationMethodBusinessProviderService extends ServiceBase {
  constructor(
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
  
  importPaymentApplicationMethods(paymentApplicationMethods: UserUpdatePaymentApplicationMethodInput[]): Observable<UpdateResult> {
    const updatePaymentApplicationMethodsAction = new UpdatePaymentApplicationMethodsAction(paymentApplicationMethods);
    updatePaymentApplicationMethodsAction.Do(this)
    return updatePaymentApplicationMethodsAction.response;
  }

  validatePaymentApplicationMethodExcelData(excelData: any[] ) {
    const validatePaymentApplicationMethodExcelDataAction = new ValidatePaymentApplicationMethodExcelDataAction(excelData );
    validatePaymentApplicationMethodExcelDataAction.Do(this)
    return validatePaymentApplicationMethodExcelDataAction.response;
  }
}

