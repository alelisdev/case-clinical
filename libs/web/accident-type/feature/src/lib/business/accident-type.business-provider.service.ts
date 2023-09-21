
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateAccidentTypeAction} from './actions/create-accident-type.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {AccidentType, UserCreateAccidentTypeInput, UserUpdateAccidentTypeInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateAccidentTypesAction, UpdateAccidentTypeAction } from './actions/update-accident-types.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class AccidentTypeBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.AccidentTypeBusinessProviderService', logger, serviceContext)
  }

  createAccidentType(input: UserCreateAccidentTypeInput): Observable<AccidentType> {
    const action = new CreateAccidentTypeAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateAccidentType(input: UserUpdateAccidentTypeInput, accidentTypeId: string): Observable<AccidentType> {
    const action = new UpdateAccidentTypeAction(input, accidentTypeId); 
    action.Do(this);
    return action.response;   
  }
  
  importAccidentTypes(accidentTypes: UserUpdateAccidentTypeInput[]): Observable<boolean> {
    const updateAccidentTypesAction = new UpdateAccidentTypesAction(accidentTypes);
    updateAccidentTypesAction.Do(this)
    return updateAccidentTypesAction.response;
  }
}

