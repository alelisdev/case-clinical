
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { PayorType, UserCreatePayorTypeInput, UserUpdatePayorTypeInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidatePayorTypeExcelDataAction } from './actions/validate-payor-type-excel-data.action'
import { CreatePayorTypeAction } from './actions/create-payor-type.action'
import { UpdatePayorTypesAction, UpdatePayorTypeAction } from './actions/update-payor-types.action'


@Injectable({providedIn: 'root'})
export class PayorTypeBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.PayorTypeBusinessProviderService', logger, serviceContext)
  }

  createPayorType(input: UserCreatePayorTypeInput): Observable<PayorType> {
    const action = new CreatePayorTypeAction(input); 
    action.Do(this);
    return action.response;   
  }

  updatePayorType(input: UserUpdatePayorTypeInput, payorTypeId: string): Observable<PayorType> {
    const action = new UpdatePayorTypeAction(input, payorTypeId); 
    action.Do(this);
    return action.response;   
  }
  
  importPayorTypes(payorTypes: UserUpdatePayorTypeInput[]): Observable<UpdateResult> {
    const updatePayorTypesAction = new UpdatePayorTypesAction(payorTypes);
    updatePayorTypesAction.Do(this)
    return updatePayorTypesAction.response;
  }

  validatePayorTypeExcelData(excelData: any[] ) {
    const validatePayorTypeExcelDataAction = new ValidatePayorTypeExcelDataAction(excelData );
    validatePayorTypeExcelDataAction.Do(this)
    return validatePayorTypeExcelDataAction.response;
  }
}

