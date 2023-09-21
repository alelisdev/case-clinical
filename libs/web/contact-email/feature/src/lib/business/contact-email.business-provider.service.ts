
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateContactEmailAction} from './actions/create-contact-email.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {ContactEmail, UserCreateContactEmailInput, UserUpdateContactEmailInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateContactEmailsAction, UpdateContactEmailAction } from './actions/update-contact-emails.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class ContactEmailBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.ContactEmailBusinessProviderService', logger, serviceContext)
  }

  createContactEmail(input: UserCreateContactEmailInput): Observable<ContactEmail> {
    const action = new CreateContactEmailAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateContactEmail(input: UserUpdateContactEmailInput, contactEmailId: string): Observable<ContactEmail> {
    const action = new UpdateContactEmailAction(input, contactEmailId); 
    action.Do(this);
    return action.response;   
  }
  
  importContactEmails(contactEmails: UserUpdateContactEmailInput[]): Observable<boolean> {
    const updateContactEmailsAction = new UpdateContactEmailsAction(contactEmails);
    updateContactEmailsAction.Do(this)
    return updateContactEmailsAction.response;
  }
}

