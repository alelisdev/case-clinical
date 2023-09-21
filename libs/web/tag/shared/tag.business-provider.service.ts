
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { Tag, UserCreateTagInput, UserUpdateTagInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateTagExcelDataAction } from './actions/validate-tag-excel-data.action'
import { CreateTagAction } from './actions/create-tag.action'
import { UpdateTagsAction, UpdateTagAction } from './actions/update-tags.action'


@Injectable({providedIn: 'root'})
export class TagBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.TagBusinessProviderService', logger, serviceContext)
  }

  createTag(input: UserCreateTagInput): Observable<Tag> {
    const action = new CreateTagAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateTag(input: UserUpdateTagInput, tagId: string): Observable<Tag> {
    const action = new UpdateTagAction(input, tagId); 
    action.Do(this);
    return action.response;   
  }
  
  importTags(tags: UserUpdateTagInput[]): Observable<UpdateResult> {
    const updateTagsAction = new UpdateTagsAction(tags);
    updateTagsAction.Do(this)
    return updateTagsAction.response;
  }

  validateTagExcelData(excelData: any[] ) {
    const validateTagExcelDataAction = new ValidateTagExcelDataAction(excelData );
    validateTagExcelDataAction.Do(this)
    return validateTagExcelDataAction.response;
  }
}

