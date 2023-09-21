
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { Experience, UserCreateExperienceInput, UserUpdateExperienceInput, UpdateResult, ClinicalProvider } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateExperienceExcelDataAction } from './actions/validate-experience-excel-data.action'
import { CreateExperienceAction } from './actions/create-experience.action'
import { UpdateExperiencesAction, UpdateExperienceAction } from './actions/update-experiences.action'


@Injectable({providedIn: 'root'})
export class ExperienceBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.ExperienceBusinessProviderService', logger, serviceContext)
  }

  createExperience(input: UserCreateExperienceInput): Observable<Experience> {
    const action = new CreateExperienceAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateExperience(input: UserUpdateExperienceInput, experienceId: string): Observable<Experience> {
    const action = new UpdateExperienceAction(input, experienceId); 
    action.Do(this);
    return action.response;   
  }
  
  importExperiences(experiences: UserUpdateExperienceInput[]): Observable<UpdateResult> {
    const updateExperiencesAction = new UpdateExperiencesAction(experiences);
    updateExperiencesAction.Do(this)
    return updateExperiencesAction.response;
  }

  validateExperienceExcelData(excelData: any[], clinicalProviders: ClinicalProvider[]) {
    const validateExperienceExcelDataAction = new ValidateExperienceExcelDataAction(excelData, clinicalProviders);
    validateExperienceExcelDataAction.Do(this)
    return validateExperienceExcelDataAction.response;
  }
}

