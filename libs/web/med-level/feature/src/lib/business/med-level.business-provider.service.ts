
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateMedLevelAction} from './actions/create-med-level.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {MedLevel, UserCreateMedLevelInput, UserUpdateMedLevelInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateMedLevelsAction, UpdateMedLevelAction } from './actions/update-med-levels.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class MedLevelBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.MedLevelBusinessProviderService', logger, serviceContext)
  }

  createMedLevel(input: UserCreateMedLevelInput): Observable<MedLevel> {
    const action = new CreateMedLevelAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateMedLevel(input: UserUpdateMedLevelInput, medLevelId: string): Observable<MedLevel> {
    const action = new UpdateMedLevelAction(input, medLevelId); 
    action.Do(this);
    return action.response;   
  }
  
  importMedLevels(medLevels: UserUpdateMedLevelInput[]): Observable<boolean> {
    const updateMedLevelsAction = new UpdateMedLevelsAction(medLevels);
    updateMedLevelsAction.Do(this)
    return updateMedLevelsAction.response;
  }
}

