
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateAttorneyTypeAction} from './actions/create-attorney-type.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {AttorneyType, UserCreateAttorneyTypeInput, UserUpdateAttorneyTypeInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateAttorneyTypesAction, UpdateAttorneyTypeAction } from './actions/update-attorney-types.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class AttorneyTypeBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.AttorneyTypeBusinessProviderService', logger, serviceContext)
  }

  createAttorneyType(input: UserCreateAttorneyTypeInput): Observable<AttorneyType> {
    const action = new CreateAttorneyTypeAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateAttorneyType(input: UserUpdateAttorneyTypeInput, attorneyTypeId: string): Observable<AttorneyType> {
    const action = new UpdateAttorneyTypeAction(input, attorneyTypeId); 
    action.Do(this);
    return action.response;   
  }
  
  importAttorneyTypes(attorneyTypes: UserUpdateAttorneyTypeInput[]): Observable<boolean> {
    const updateAttorneyTypesAction = new UpdateAttorneyTypesAction(attorneyTypes);
    updateAttorneyTypesAction.Do(this)
    return updateAttorneyTypesAction.response;
  }
}

