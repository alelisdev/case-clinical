
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreatePriorAuthGuidelineAction} from './actions/create-prior-auth-guideline.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {PriorAuthGuideline, UserCreatePriorAuthGuidelineInput, UserUpdatePriorAuthGuidelineInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdatePriorAuthGuidelinesAction, UpdatePriorAuthGuidelineAction } from './actions/update-prior-auth-guidelines.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class PriorAuthGuidelineBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.PriorAuthGuidelineBusinessProviderService', logger, serviceContext)
  }

  createPriorAuthGuideline(input: UserCreatePriorAuthGuidelineInput): Observable<PriorAuthGuideline> {
    const action = new CreatePriorAuthGuidelineAction(input); 
    action.Do(this);
    return action.response;   
  }

  updatePriorAuthGuideline(input: UserUpdatePriorAuthGuidelineInput, priorAuthGuidelineId: string): Observable<PriorAuthGuideline> {
    const action = new UpdatePriorAuthGuidelineAction(input, priorAuthGuidelineId); 
    action.Do(this);
    return action.response;   
  }
  
  importPriorAuthGuidelines(priorAuthGuidelines: UserUpdatePriorAuthGuidelineInput[]): Observable<boolean> {
    const updatePriorAuthGuidelinesAction = new UpdatePriorAuthGuidelinesAction(priorAuthGuidelines);
    updatePriorAuthGuidelinesAction.Do(this)
    return updatePriorAuthGuidelinesAction.response;
  }
}

