
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { GuidelineUsed, UserCreateGuidelineUsedInput, UserUpdateGuidelineUsedInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateGuidelineUsedExcelDataAction } from './actions/validate-guideline-used-excel-data.action'
import { CreateGuidelineUsedAction } from './actions/create-guideline-used.action'
import { UpdateGuidelineUsedsAction, UpdateGuidelineUsedAction } from './actions/update-guideline-useds.action'


@Injectable({providedIn: 'root'})
export class GuidelineUsedBusinessProviderService extends ServiceBase {
  constructor(
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
  
  importGuidelineUseds(guidelineUseds: UserUpdateGuidelineUsedInput[]): Observable<UpdateResult> {
    const updateGuidelineUsedsAction = new UpdateGuidelineUsedsAction(guidelineUseds);
    updateGuidelineUsedsAction.Do(this)
    return updateGuidelineUsedsAction.response;
  }

  validateGuidelineUsedExcelData(excelData: any[] ) {
    const validateGuidelineUsedExcelDataAction = new ValidateGuidelineUsedExcelDataAction(excelData );
    validateGuidelineUsedExcelDataAction.Do(this)
    return validateGuidelineUsedExcelDataAction.response;
  }
}

