
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateGuidelineAction} from './actions/create-guideline.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {Guideline, UserCreateGuidelineInput, UserUpdateGuidelineInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateGuidelinesAction, UpdateGuidelineAction } from './actions/update-guidelines.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class GuidelineBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.GuidelineBusinessProviderService', logger, serviceContext)
  }

  createGuideline(input: UserCreateGuidelineInput): Observable<Guideline> {
    const action = new CreateGuidelineAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateGuideline(input: UserUpdateGuidelineInput, guidelineId: string): Observable<Guideline> {
    const action = new UpdateGuidelineAction(input, guidelineId); 
    action.Do(this);
    return action.response;   
  }
  
  importGuidelines(guidelines: UserUpdateGuidelineInput[]): Observable<boolean> {
    const updateGuidelinesAction = new UpdateGuidelinesAction(guidelines);
    updateGuidelinesAction.Do(this)
    return updateGuidelinesAction.response;
  }
}

