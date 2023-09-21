
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { BatchControl, UserCreateBatchControlInput, UserUpdateBatchControlInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateBatchControlExcelDataAction } from './actions/validate-batch-control-excel-data.action'
import { CreateBatchControlAction } from './actions/create-batch-control.action'
import { UpdateBatchControlsAction, UpdateBatchControlAction } from './actions/update-batch-controls.action'


@Injectable({providedIn: 'root'})
export class BatchControlBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.BatchControlBusinessProviderService', logger, serviceContext)
  }

  createBatchControl(input: UserCreateBatchControlInput): Observable<BatchControl> {
    const action = new CreateBatchControlAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateBatchControl(input: UserUpdateBatchControlInput, batchControlId: string): Observable<BatchControl> {
    const action = new UpdateBatchControlAction(input, batchControlId); 
    action.Do(this);
    return action.response;   
  }
  
  importBatchControls(batchControls: UserUpdateBatchControlInput[]): Observable<UpdateResult> {
    const updateBatchControlsAction = new UpdateBatchControlsAction(batchControls);
    updateBatchControlsAction.Do(this)
    return updateBatchControlsAction.response;
  }

  validateBatchControlExcelData(excelData: any[] ) {
    const validateBatchControlExcelDataAction = new ValidateBatchControlExcelDataAction(excelData );
    validateBatchControlExcelDataAction.Do(this)
    return validateBatchControlExcelDataAction.response;
  }
}

