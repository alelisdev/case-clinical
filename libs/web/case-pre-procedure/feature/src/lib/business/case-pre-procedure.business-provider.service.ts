
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateCasePreProcedureAction} from './actions/create-case-pre-procedure.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {CasePreProcedure, UserCreateCasePreProcedureInput, UserUpdateCasePreProcedureInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateCasePreProceduresAction, UpdateCasePreProcedureAction } from './actions/update-case-pre-procedures.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class CasePreProcedureBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.CasePreProcedureBusinessProviderService', logger, serviceContext)
  }

  createCasePreProcedure(input: UserCreateCasePreProcedureInput): Observable<CasePreProcedure> {
    const action = new CreateCasePreProcedureAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateCasePreProcedure(input: UserUpdateCasePreProcedureInput, casePreProcedureId: string): Observable<CasePreProcedure> {
    const action = new UpdateCasePreProcedureAction(input, casePreProcedureId); 
    action.Do(this);
    return action.response;   
  }
  
  importCasePreProcedures(casePreProcedures: UserUpdateCasePreProcedureInput[]): Observable<boolean> {
    const updateCasePreProceduresAction = new UpdateCasePreProceduresAction(casePreProcedures);
    updateCasePreProceduresAction.Do(this)
    return updateCasePreProceduresAction.response;
  }
}

