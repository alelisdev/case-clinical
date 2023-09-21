
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateGuidelineUsedAction} from './actions/create-guideline-used.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {GuidelineUsed, UserCreateGuidelineUsedInput, UserUpdateGuidelineUsedInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateGuidelineUsedsAction, UpdateGuidelineUsedAction } from './actions/update-guideline-useds.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class GuidelineUsedBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.GuidelineUsedBusinessProviderService', logger, serviceContext)
  }

  createGuidelineUsed(input: UserCreateGuidelineUsedInput): Observable<GuidelineUsed> {
    const action = new CreateGuidelineUsedAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateGuidelineUsed(input: UserUpdateGuidelineUsedInput, guidelineUsedId: string): Observable<GuidelineUsed> {
    const action = new UpdateGuidelineUsedAction(input, guidelineUsedId); 
    action.Do(this);
    return action.response;   
  }
  
  importGuidelineUseds(guidelineUseds: UserUpdateGuidelineUsedInput[]): Observable<boolean> {
    const updateGuidelineUsedsAction = new UpdateGuidelineUsedsAction(guidelineUseds);
    updateGuidelineUsedsAction.Do(this)
    return updateGuidelineUsedsAction.response;
  }
}

