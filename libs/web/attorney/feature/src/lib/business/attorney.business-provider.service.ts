
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateAttorneyAction} from './actions/create-attorney.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {Attorney, UserCreateAttorneyInput, UserUpdateAttorneyInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateAttorneysAction, UpdateAttorneyAction } from './actions/update-attorneys.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class AttorneyBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.AttorneyBusinessProviderService', logger, serviceContext)
  }

  createAttorney(input: UserCreateAttorneyInput): Observable<Attorney> {
    const action = new CreateAttorneyAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateAttorney(input: UserUpdateAttorneyInput, attorneyId: string): Observable<Attorney> {
    const action = new UpdateAttorneyAction(input, attorneyId); 
    action.Do(this);
    return action.response;   
  }
  
  importAttorneys(attorneys: UserUpdateAttorneyInput[]): Observable<boolean> {
    const updateAttorneysAction = new UpdateAttorneysAction(attorneys);
    updateAttorneysAction.Do(this)
    return updateAttorneysAction.response;
  }
}

