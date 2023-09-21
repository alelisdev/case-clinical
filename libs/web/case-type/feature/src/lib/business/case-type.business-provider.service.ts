
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateCaseTypeAction} from './actions/create-case-type.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {CaseType, UserCreateCaseTypeInput, UserUpdateCaseTypeInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateCaseTypesAction, UpdateCaseTypeAction } from './actions/update-case-types.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class CaseTypeBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.CaseTypeBusinessProviderService', logger, serviceContext)
  }

  createCaseType(input: UserCreateCaseTypeInput): Observable<CaseType> {
    const action = new CreateCaseTypeAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateCaseType(input: UserUpdateCaseTypeInput, caseTypeId: string): Observable<CaseType> {
    const action = new UpdateCaseTypeAction(input, caseTypeId); 
    action.Do(this);
    return action.response;   
  }
  
  importCaseTypes(caseTypes: UserUpdateCaseTypeInput[]): Observable<boolean> {
    const updateCaseTypesAction = new UpdateCaseTypesAction(caseTypes);
    updateCaseTypesAction.Do(this)
    return updateCaseTypesAction.response;
  }
}

