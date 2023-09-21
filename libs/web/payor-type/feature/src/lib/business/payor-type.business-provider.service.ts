
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreatePayorTypeAction} from './actions/create-payor-type.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {PayorType, UserCreatePayorTypeInput, UserUpdatePayorTypeInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdatePayorTypesAction, UpdatePayorTypeAction } from './actions/update-payor-types.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class PayorTypeBusinessProviderService extends ServiceBase {constructor(
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
  
  importPayorTypes(payorTypes: UserUpdatePayorTypeInput[]): Observable<boolean> {
    const updatePayorTypesAction = new UpdatePayorTypesAction(payorTypes);
    updatePayorTypesAction.Do(this)
    return updatePayorTypesAction.response;
  }
}

