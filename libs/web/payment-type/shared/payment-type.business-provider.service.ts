
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { PaymentType, UserCreatePaymentTypeInput, UserUpdatePaymentTypeInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidatePaymentTypeExcelDataAction } from './actions/validate-payment-type-excel-data.action'
import { CreatePaymentTypeAction } from './actions/create-payment-type.action'
import { UpdatePaymentTypesAction, UpdatePaymentTypeAction } from './actions/update-payment-types.action'


@Injectable({providedIn: 'root'})
export class PaymentTypeBusinessProviderService extends ServiceBase {
  constructor(
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
  
  importPaymentTypes(paymentTypes: UserUpdatePaymentTypeInput[]): Observable<UpdateResult> {
    const updatePaymentTypesAction = new UpdatePaymentTypesAction(paymentTypes);
    updatePaymentTypesAction.Do(this)
    return updatePaymentTypesAction.response;
  }

  validatePaymentTypeExcelData(excelData: any[] ) {
    const validatePaymentTypeExcelDataAction = new ValidatePaymentTypeExcelDataAction(excelData );
    validatePaymentTypeExcelDataAction.Do(this)
    return validatePaymentTypeExcelDataAction.response;
  }
}

