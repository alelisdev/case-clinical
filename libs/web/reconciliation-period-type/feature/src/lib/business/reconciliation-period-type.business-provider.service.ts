
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateReconciliationPeriodTypeAction} from './actions/create-reconciliation-period-type.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {ReconciliationPeriodType, UserCreateReconciliationPeriodTypeInput, UserUpdateReconciliationPeriodTypeInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateReconciliationPeriodTypesAction, UpdateReconciliationPeriodTypeAction } from './actions/update-reconciliation-period-types.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class ReconciliationPeriodTypeBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.ReconciliationPeriodTypeBusinessProviderService', logger, serviceContext)
  }

  createReconciliationPeriodType(input: UserCreateReconciliationPeriodTypeInput): Observable<ReconciliationPeriodType> {
    const action = new CreateReconciliationPeriodTypeAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateReconciliationPeriodType(input: UserUpdateReconciliationPeriodTypeInput, reconciliationPeriodTypeId: string): Observable<ReconciliationPeriodType> {
    const action = new UpdateReconciliationPeriodTypeAction(input, reconciliationPeriodTypeId); 
    action.Do(this);
    return action.response;   
  }
  
  importReconciliationPeriodTypes(reconciliationPeriodTypes: UserUpdateReconciliationPeriodTypeInput[]): Observable<boolean> {
    const updateReconciliationPeriodTypesAction = new UpdateReconciliationPeriodTypesAction(reconciliationPeriodTypes);
    updateReconciliationPeriodTypesAction.Do(this)
    return updateReconciliationPeriodTypesAction.response;
  }
}

