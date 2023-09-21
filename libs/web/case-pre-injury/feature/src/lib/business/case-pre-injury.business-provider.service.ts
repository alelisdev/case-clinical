
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateCasePreInjuryAction} from './actions/create-case-pre-injury.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {CasePreInjury, UserCreateCasePreInjuryInput, UserUpdateCasePreInjuryInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateCasePreInjuriesAction, UpdateCasePreInjuryAction } from './actions/update-case-pre-injuries.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class CasePreInjuryBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.CasePreInjuryBusinessProviderService', logger, serviceContext)
  }

  createCasePreInjury(input: UserCreateCasePreInjuryInput): Observable<CasePreInjury> {
    const action = new CreateCasePreInjuryAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateCasePreInjury(input: UserUpdateCasePreInjuryInput, casePreInjuryId: string): Observable<CasePreInjury> {
    const action = new UpdateCasePreInjuryAction(input, casePreInjuryId); 
    action.Do(this);
    return action.response;   
  }
  
  importCasePreInjuries(casePreInjuries: UserUpdateCasePreInjuryInput[]): Observable<boolean> {
    const updateCasePreInjuriesAction = new UpdateCasePreInjuriesAction(casePreInjuries);
    updateCasePreInjuriesAction.Do(this)
    return updateCasePreInjuriesAction.response;
  }
}

