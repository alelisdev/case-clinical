
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateSurgicalPositionAction} from './actions/create-surgical-position.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {SurgicalPosition, UserCreateSurgicalPositionInput, UserUpdateSurgicalPositionInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateSurgicalPositionsAction, UpdateSurgicalPositionAction } from './actions/update-surgical-positions.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class SurgicalPositionBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.SurgicalPositionBusinessProviderService', logger, serviceContext)
  }

  createSurgicalPosition(input: UserCreateSurgicalPositionInput): Observable<SurgicalPosition> {
    const action = new CreateSurgicalPositionAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateSurgicalPosition(input: UserUpdateSurgicalPositionInput, surgicalPositionId: string): Observable<SurgicalPosition> {
    const action = new UpdateSurgicalPositionAction(input, surgicalPositionId); 
    action.Do(this);
    return action.response;   
  }
  
  importSurgicalPositions(surgicalPositions: UserUpdateSurgicalPositionInput[]): Observable<boolean> {
    const updateSurgicalPositionsAction = new UpdateSurgicalPositionsAction(surgicalPositions);
    updateSurgicalPositionsAction.Do(this)
    return updateSurgicalPositionsAction.response;
  }
}

