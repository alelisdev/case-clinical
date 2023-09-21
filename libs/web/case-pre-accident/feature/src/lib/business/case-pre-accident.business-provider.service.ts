
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateCasePreAccidentAction} from './actions/create-case-pre-accident.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {CasePreAccident, UserCreateCasePreAccidentInput, UserUpdateCasePreAccidentInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateCasePreAccidentsAction, UpdateCasePreAccidentAction } from './actions/update-case-pre-accidents.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class CasePreAccidentBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.CasePreAccidentBusinessProviderService', logger, serviceContext)
  }

  createCasePreAccident(input: UserCreateCasePreAccidentInput): Observable<CasePreAccident> {
    const action = new CreateCasePreAccidentAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateCasePreAccident(input: UserUpdateCasePreAccidentInput, casePreAccidentId: string): Observable<CasePreAccident> {
    const action = new UpdateCasePreAccidentAction(input, casePreAccidentId); 
    action.Do(this);
    return action.response;   
  }
  
  importCasePreAccidents(casePreAccidents: UserUpdateCasePreAccidentInput[]): Observable<boolean> {
    const updateCasePreAccidentsAction = new UpdateCasePreAccidentsAction(casePreAccidents);
    updateCasePreAccidentsAction.Do(this)
    return updateCasePreAccidentsAction.response;
  }
}

