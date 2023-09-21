
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreatePriorAuthDmeAction} from './actions/create-prior-auth-dme.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {PriorAuthDme, UserCreatePriorAuthDmeInput, UserUpdatePriorAuthDmeInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdatePriorAuthDmesAction, UpdatePriorAuthDmeAction } from './actions/update-prior-auth-dmes.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class PriorAuthDmeBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.PriorAuthDmeBusinessProviderService', logger, serviceContext)
  }

  createPriorAuthDme(input: UserCreatePriorAuthDmeInput): Observable<PriorAuthDme> {
    const action = new CreatePriorAuthDmeAction(input); 
    action.Do(this);
    return action.response;   
  }

  updatePriorAuthDme(input: UserUpdatePriorAuthDmeInput, priorAuthDmeId: string): Observable<PriorAuthDme> {
    const action = new UpdatePriorAuthDmeAction(input, priorAuthDmeId); 
    action.Do(this);
    return action.response;   
  }
  
  importPriorAuthDmes(priorAuthDmes: UserUpdatePriorAuthDmeInput[]): Observable<boolean> {
    const updatePriorAuthDmesAction = new UpdatePriorAuthDmesAction(priorAuthDmes);
    updatePriorAuthDmesAction.Do(this)
    return updatePriorAuthDmesAction.response;
  }
}

