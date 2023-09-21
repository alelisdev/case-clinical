
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { Guideline, UserCreateGuidelineInput, UserUpdateGuidelineInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateGuidelineExcelDataAction } from './actions/validate-guideline-excel-data.action'
import { CreateGuidelineAction } from './actions/create-guideline.action'
import { UpdateGuidelinesAction, UpdateGuidelineAction } from './actions/update-guidelines.action'


@Injectable({providedIn: 'root'})
export class GuidelineBusinessProviderService extends ServiceBase {
  constructor(
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
  
  importGuidelines(guidelines: UserUpdateGuidelineInput[]): Observable<UpdateResult> {
    const updateGuidelinesAction = new UpdateGuidelinesAction(guidelines);
    updateGuidelinesAction.Do(this)
    return updateGuidelinesAction.response;
  }

  validateGuidelineExcelData(excelData: any[] ) {
    const validateGuidelineExcelDataAction = new ValidateGuidelineExcelDataAction(excelData );
    validateGuidelineExcelDataAction.Do(this)
    return validateGuidelineExcelDataAction.response;
  }
}

