
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { Education, UserCreateEducationInput, UserUpdateEducationInput, UpdateResult, ClinicalProvider } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateEducationExcelDataAction } from './actions/validate-education-excel-data.action'
import { CreateEducationAction } from './actions/create-education.action'
import { UpdateEducationsAction, UpdateEducationAction } from './actions/update-educations.action'


@Injectable({providedIn: 'root'})
export class EducationBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.EducationBusinessProviderService', logger, serviceContext)
  }

  createEducation(input: UserCreateEducationInput): Observable<Education> {
    const action = new CreateEducationAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateEducation(input: UserUpdateEducationInput, educationId: string): Observable<Education> {
    const action = new UpdateEducationAction(input, educationId); 
    action.Do(this);
    return action.response;   
  }
  
  importEducations(educations: UserUpdateEducationInput[]): Observable<UpdateResult> {
    const updateEducationsAction = new UpdateEducationsAction(educations);
    updateEducationsAction.Do(this)
    return updateEducationsAction.response;
  }

  validateEducationExcelData(excelData: any[], clinicalProviders: ClinicalProvider[]) {
    const validateEducationExcelDataAction = new ValidateEducationExcelDataAction(excelData, clinicalProviders);
    validateEducationExcelDataAction.Do(this)
    return validateEducationExcelDataAction.response;
  }
}

