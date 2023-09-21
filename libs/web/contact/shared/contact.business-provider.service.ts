
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { Contact, UserCreateContactInput, UserUpdateContactInput, UpdateResult, ContactKind } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateContactExcelDataAction } from './actions/validate-contact-excel-data.action'
import { CreateContactAction } from './actions/create-contact.action'
import { UpdateContactsAction, UpdateContactAction } from './actions/update-contacts.action'


@Injectable({providedIn: 'root'})
export class ContactBusinessProviderService extends ServiceBase {
  constructor(
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
  
  importContacts(contacts: UserUpdateContactInput[]): Observable<UpdateResult> {
    const updateContactsAction = new UpdateContactsAction(contacts);
    updateContactsAction.Do(this)
    return updateContactsAction.response;
  }

  validateContactExcelData(excelData: any[], contactKinds: ContactKind[]) {
    const validateContactExcelDataAction = new ValidateContactExcelDataAction(excelData, contactKinds);
    validateContactExcelDataAction.Do(this)
    return validateContactExcelDataAction.response;
  }
}

