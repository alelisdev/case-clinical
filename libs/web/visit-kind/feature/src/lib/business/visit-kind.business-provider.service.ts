
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateVisitKindAction} from './actions/create-visit-kind.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {VisitKind, UserCreateVisitKindInput, UserUpdateVisitKindInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateVisitKindsAction, UpdateVisitKindAction } from './actions/update-visit-kinds.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class VisitKindBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.VisitKindBusinessProviderService', logger, serviceContext)
  }

  createVisitKind(input: UserCreateVisitKindInput): Observable<VisitKind> {
    const action = new CreateVisitKindAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateVisitKind(input: UserUpdateVisitKindInput, visitKindId: string): Observable<VisitKind> {
    const action = new UpdateVisitKindAction(input, visitKindId); 
    action.Do(this);
    return action.response;   
  }
  
  importVisitKinds(visitKinds: UserUpdateVisitKindInput[]): Observable<boolean> {
    const updateVisitKindsAction = new UpdateVisitKindsAction(visitKinds);
    updateVisitKindsAction.Do(this)
    return updateVisitKindsAction.response;
  }
}

