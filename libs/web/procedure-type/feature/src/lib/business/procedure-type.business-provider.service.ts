
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateProcedureTypeAction} from './actions/create-procedure-type.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {ProcedureType, UserCreateProcedureTypeInput, UserUpdateProcedureTypeInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateProcedureTypesAction, UpdateProcedureTypeAction } from './actions/update-procedure-types.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class ProcedureTypeBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.ProcedureTypeBusinessProviderService', logger, serviceContext)
  }

  createProcedureType(input: UserCreateProcedureTypeInput): Observable<ProcedureType> {
    const action = new CreateProcedureTypeAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateProcedureType(input: UserUpdateProcedureTypeInput, procedureTypeId: string): Observable<ProcedureType> {
    const action = new UpdateProcedureTypeAction(input, procedureTypeId); 
    action.Do(this);
    return action.response;   
  }
  
  importProcedureTypes(procedureTypes: UserUpdateProcedureTypeInput[]): Observable<boolean> {
    const updateProcedureTypesAction = new UpdateProcedureTypesAction(procedureTypes);
    updateProcedureTypesAction.Do(this)
    return updateProcedureTypesAction.response;
  }
}

