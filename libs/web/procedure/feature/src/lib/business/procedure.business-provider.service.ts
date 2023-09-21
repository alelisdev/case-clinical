
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateProcedureAction} from './actions/create-procedure.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {Procedure, UserCreateProcedureInput, UserUpdateProcedureInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateProceduresAction, UpdateProcedureAction } from './actions/update-procedures.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class ProcedureBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.ProcedureBusinessProviderService', logger, serviceContext)
  }

  createProcedure(input: UserCreateProcedureInput): Observable<Procedure> {
    const action = new CreateProcedureAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateProcedure(input: UserUpdateProcedureInput, procedureId: string): Observable<Procedure> {
    const action = new UpdateProcedureAction(input, procedureId); 
    action.Do(this);
    return action.response;   
  }
  
  importProcedures(procedures: UserUpdateProcedureInput[]): Observable<boolean> {
    const updateProceduresAction = new UpdateProceduresAction(procedures);
    updateProceduresAction.Do(this)
    return updateProceduresAction.response;
  }
}

