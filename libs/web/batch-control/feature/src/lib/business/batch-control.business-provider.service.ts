
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateBatchControlAction} from './actions/create-batch-control.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {BatchControl, UserCreateBatchControlInput, UserUpdateBatchControlInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateBatchControlsAction, UpdateBatchControlAction } from './actions/update-batch-controls.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class BatchControlBusinessProviderService extends ServiceBase {constructor(
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
  
  importBatchControls(batchControls: UserUpdateBatchControlInput[]): Observable<boolean> {
    const updateBatchControlsAction = new UpdateBatchControlsAction(batchControls);
    updateBatchControlsAction.Do(this)
    return updateBatchControlsAction.response;
  }
}

