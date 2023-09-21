
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateImplantAction} from './actions/create-implant.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {Implant, UserCreateImplantInput, UserUpdateImplantInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateImplantsAction, UpdateImplantAction } from './actions/update-implants.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class ImplantBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.ImplantBusinessProviderService', logger, serviceContext)
  }

  createImplant(input: UserCreateImplantInput): Observable<Implant> {
    const action = new CreateImplantAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateImplant(input: UserUpdateImplantInput, implantId: string): Observable<Implant> {
    const action = new UpdateImplantAction(input, implantId); 
    action.Do(this);
    return action.response;   
  }
  
  importImplants(implants: UserUpdateImplantInput[]): Observable<boolean> {
    const updateImplantsAction = new UpdateImplantsAction(implants);
    updateImplantsAction.Do(this)
    return updateImplantsAction.response;
  }
}

