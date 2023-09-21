
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { ClinicalProviderTag, UserCreateClinicalProviderTagInput, UserUpdateClinicalProviderTagInput, UpdateResult, ClinicalProvider, Tag } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateClinicalProviderTagExcelDataAction } from './actions/validate-clinical-provider-tag-excel-data.action'
import { CreateClinicalProviderTagAction } from './actions/create-clinical-provider-tag.action'
import { UpdateClinicalProviderTagsAction, UpdateClinicalProviderTagAction } from './actions/update-clinical-provider-tags.action'


@Injectable({providedIn: 'root'})
export class ClinicalProviderTagBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.ClinicalProviderTagBusinessProviderService', logger, serviceContext)
  }

  createClinicalProviderTag(input: UserCreateClinicalProviderTagInput): Observable<ClinicalProviderTag> {
    const action = new CreateClinicalProviderTagAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateClinicalProviderTag(input: UserUpdateClinicalProviderTagInput, clinicalProviderTagId: string): Observable<ClinicalProviderTag> {
    const action = new UpdateClinicalProviderTagAction(input, clinicalProviderTagId); 
    action.Do(this);
    return action.response;   
  }
  
  importClinicalProviderTags(clinicalProviderTags: UserUpdateClinicalProviderTagInput[]): Observable<UpdateResult> {
    const updateClinicalProviderTagsAction = new UpdateClinicalProviderTagsAction(clinicalProviderTags);
    updateClinicalProviderTagsAction.Do(this)
    return updateClinicalProviderTagsAction.response;
  }

  validateClinicalProviderTagExcelData(excelData: any[], clinicalProviders: ClinicalProvider[], tags: Tag[]) {
    const validateClinicalProviderTagExcelDataAction = new ValidateClinicalProviderTagExcelDataAction(excelData, clinicalProviders, tags);
    validateClinicalProviderTagExcelDataAction.Do(this)
    return validateClinicalProviderTagExcelDataAction.response;
  }
}

