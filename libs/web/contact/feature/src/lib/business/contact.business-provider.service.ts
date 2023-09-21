
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateContactAction} from './actions/create-contact.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {Contact, UserCreateContactInput, UserUpdateContactInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateContactsAction, UpdateContactAction } from './actions/update-contacts.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class ContactBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.ContactBusinessProviderService', logger, serviceContext)
  }

  createContact(input: UserCreateContactInput): Observable<Contact> {
    const action = new CreateContactAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateContact(input: UserUpdateContactInput, contactId: string): Observable<Contact> {
    const action = new UpdateContactAction(input, contactId); 
    action.Do(this);
    return action.response;   
  }
  
  importContacts(contacts: UserUpdateContactInput[]): Observable<boolean> {
    const updateContactsAction = new UpdateContactsAction(contacts);
    updateContactsAction.Do(this)
    return updateContactsAction.response;
  }
}

