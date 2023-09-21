
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateCaseProcedureAction} from './actions/create-case-procedure.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {CaseProcedure, UserCreateCaseProcedureInput, UserUpdateCaseProcedureInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateCaseProceduresAction, UpdateCaseProcedureAction } from './actions/update-case-procedures.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class CaseProcedureBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.CaseProcedureBusinessProviderService', logger, serviceContext)
  }

  createCaseProcedure(input: UserCreateCaseProcedureInput): Observable<CaseProcedure> {
    const action = new CreateCaseProcedureAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateCaseProcedure(input: UserUpdateCaseProcedureInput, caseProcedureId: string): Observable<CaseProcedure> {
    const action = new UpdateCaseProcedureAction(input, caseProcedureId); 
    action.Do(this);
    return action.response;   
  }
  
  importCaseProcedures(caseProcedures: UserUpdateCaseProcedureInput[]): Observable<boolean> {
    const updateCaseProceduresAction = new UpdateCaseProceduresAction(caseProcedures);
    updateCaseProceduresAction.Do(this)
    return updateCaseProceduresAction.response;
  }
}

