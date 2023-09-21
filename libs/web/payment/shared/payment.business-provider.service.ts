
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { Payment, UserCreatePaymentInput, UserUpdatePaymentInput, UpdateResult, BatchControl, Bank, PayorType, PaymentType, PaymentApplicationMethod } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidatePaymentExcelDataAction } from './actions/validate-payment-excel-data.action'
import { CreatePaymentAction } from './actions/create-payment.action'
import { UpdatePaymentsAction, UpdatePaymentAction } from './actions/update-payments.action'


@Injectable({providedIn: 'root'})
export class PaymentBusinessProviderService extends ServiceBase {
  constructor(
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
  
  importPayments(payments: UserUpdatePaymentInput[]): Observable<UpdateResult> {
    const updatePaymentsAction = new UpdatePaymentsAction(payments);
    updatePaymentsAction.Do(this)
    return updatePaymentsAction.response;
  }

  validatePaymentExcelData(excelData: any[], batchControls: BatchControl[], banks: Bank[], payorTypes: PayorType[], paymentTypes: PaymentType[], paymentApplicationMethods: PaymentApplicationMethod[]) {
    const validatePaymentExcelDataAction = new ValidatePaymentExcelDataAction(excelData, batchControls, banks, payorTypes, paymentTypes, paymentApplicationMethods);
    validatePaymentExcelDataAction.Do(this)
    return validatePaymentExcelDataAction.response;
  }
}

