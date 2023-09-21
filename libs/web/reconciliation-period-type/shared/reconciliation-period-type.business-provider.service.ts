
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { ReconciliationPeriodType, UserCreateReconciliationPeriodTypeInput, UserUpdateReconciliationPeriodTypeInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateReconciliationPeriodTypeExcelDataAction } from './actions/validate-reconciliation-period-type-excel-data.action'
import { CreateReconciliationPeriodTypeAction } from './actions/create-reconciliation-period-type.action'
import { UpdateReconciliationPeriodTypesAction, UpdateReconciliationPeriodTypeAction } from './actions/update-reconciliation-period-types.action'


@Injectable({providedIn: 'root'})
export class ReconciliationPeriodTypeBusinessProviderService extends ServiceBase {
  constructor(
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
  
  importReconciliationPeriodTypes(reconciliationPeriodTypes: UserUpdateReconciliationPeriodTypeInput[]): Observable<UpdateResult> {
    const updateReconciliationPeriodTypesAction = new UpdateReconciliationPeriodTypesAction(reconciliationPeriodTypes);
    updateReconciliationPeriodTypesAction.Do(this)
    return updateReconciliationPeriodTypesAction.response;
  }

  validateReconciliationPeriodTypeExcelData(excelData: any[] ) {
    const validateReconciliationPeriodTypeExcelDataAction = new ValidateReconciliationPeriodTypeExcelDataAction(excelData );
    validateReconciliationPeriodTypeExcelDataAction.Do(this)
    return validateReconciliationPeriodTypeExcelDataAction.response;
  }
}

