
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { ContactEmail, UserCreateContactEmailInput, UserUpdateContactEmailInput, UpdateResult, Contact } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateContactEmailExcelDataAction } from './actions/validate-contact-email-excel-data.action'
import { CreateContactEmailAction } from './actions/create-contact-email.action'
import { UpdateContactEmailsAction, UpdateContactEmailAction } from './actions/update-contact-emails.action'


@Injectable({providedIn: 'root'})
export class ContactEmailBusinessProviderService extends ServiceBase {
  constructor(
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
  
  importContactEmails(contactEmails: UserUpdateContactEmailInput[]): Observable<UpdateResult> {
    const updateContactEmailsAction = new UpdateContactEmailsAction(contactEmails);
    updateContactEmailsAction.Do(this)
    return updateContactEmailsAction.response;
  }

  validateContactEmailExcelData(excelData: any[], contacts: Contact[]) {
    const validateContactEmailExcelDataAction = new ValidateContactEmailExcelDataAction(excelData, contacts);
    validateContactEmailExcelDataAction.Do(this)
    return validateContactEmailExcelDataAction.response;
  }
}

