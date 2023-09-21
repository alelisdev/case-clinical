
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateContactTagAction} from './actions/create-contact-tag.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {ContactTag, UserCreateContactTagInput, UserUpdateContactTagInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateContactTagsAction, UpdateContactTagAction } from './actions/update-contact-tags.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class ContactTagBusinessProviderService extends ServiceBase {constructor(
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
  
  importContactTags(contactTags: UserUpdateContactTagInput[]): Observable<boolean> {
    const updateContactTagsAction = new UpdateContactTagsAction(contactTags);
    updateContactTagsAction.Do(this)
    return updateContactTagsAction.response;
  }
}

