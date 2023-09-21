
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreatePriorAuthorizationImplantAction} from './actions/create-prior-authorization-implant.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {PriorAuthorizationImplant, UserCreatePriorAuthorizationImplantInput, UserUpdatePriorAuthorizationImplantInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdatePriorAuthorizationImplantsAction, UpdatePriorAuthorizationImplantAction } from './actions/update-prior-authorization-implants.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class PriorAuthorizationImplantBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.PriorAuthorizationImplantBusinessProviderService', logger, serviceContext)
  }

  createPriorAuthorizationImplant(input: UserCreatePriorAuthorizationImplantInput): Observable<PriorAuthorizationImplant> {
    const action = new CreatePriorAuthorizationImplantAction(input); 
    action.Do(this);
    return action.response;   
  }

  updatePriorAuthorizationImplant(input: UserUpdatePriorAuthorizationImplantInput, priorAuthorizationImplantId: string): Observable<PriorAuthorizationImplant> {
    const action = new UpdatePriorAuthorizationImplantAction(input, priorAuthorizationImplantId); 
    action.Do(this);
    return action.response;   
  }
  
  importPriorAuthorizationImplants(priorAuthorizationImplants: UserUpdatePriorAuthorizationImplantInput[]): Observable<boolean> {
    const updatePriorAuthorizationImplantsAction = new UpdatePriorAuthorizationImplantsAction(priorAuthorizationImplants);
    updatePriorAuthorizationImplantsAction.Do(this)
    return updatePriorAuthorizationImplantsAction.response;
  }
}

