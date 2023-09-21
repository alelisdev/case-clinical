
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { ContactTag, UserCreateContactTagInput, UserUpdateContactTagInput, UpdateResult, Contact } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateContactTagExcelDataAction } from './actions/validate-contact-tag-excel-data.action'
import { CreateContactTagAction } from './actions/create-contact-tag.action'
import { UpdateContactTagsAction, UpdateContactTagAction } from './actions/update-contact-tags.action'


@Injectable({providedIn: 'root'})
export class ContactTagBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.ContactTagBusinessProviderService', logger, serviceContext)
  }

  createContactTag(input: UserCreateContactTagInput): Observable<ContactTag> {
    const action = new CreateContactTagAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateContactTag(input: UserUpdateContactTagInput, contactTagId: string): Observable<ContactTag> {
    const action = new UpdateContactTagAction(input, contactTagId); 
    action.Do(this);
    return action.response;   
  }
  
  importContactTags(contactTags: UserUpdateContactTagInput[]): Observable<UpdateResult> {
    const updateContactTagsAction = new UpdateContactTagsAction(contactTags);
    updateContactTagsAction.Do(this)
    return updateContactTagsAction.response;
  }

  validateContactTagExcelData(excelData: any[], contacts: Contact[]) {
    const validateContactTagExcelDataAction = new ValidateContactTagExcelDataAction(excelData, contacts);
    validateContactTagExcelDataAction.Do(this)
    return validateContactTagExcelDataAction.response;
  }
}

