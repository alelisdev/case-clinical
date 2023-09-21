
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateContactPhoneNumberAction} from './actions/create-contact-phone-number.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {ContactPhoneNumber, UserCreateContactPhoneNumberInput, UserUpdateContactPhoneNumberInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateContactPhoneNumbersAction, UpdateContactPhoneNumberAction } from './actions/update-contact-phone-numbers.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class ContactPhoneNumberBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.ContactPhoneNumberBusinessProviderService', logger, serviceContext)
  }

  createContactPhoneNumber(input: UserCreateContactPhoneNumberInput): Observable<ContactPhoneNumber> {
    const action = new CreateContactPhoneNumberAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateContactPhoneNumber(input: UserUpdateContactPhoneNumberInput, contactPhoneNumberId: string): Observable<ContactPhoneNumber> {
    const action = new UpdateContactPhoneNumberAction(input, contactPhoneNumberId); 
    action.Do(this);
    return action.response;   
  }
  
  importContactPhoneNumbers(contactPhoneNumbers: UserUpdateContactPhoneNumberInput[]): Observable<boolean> {
    const updateContactPhoneNumbersAction = new UpdateContactPhoneNumbersAction(contactPhoneNumbers);
    updateContactPhoneNumbersAction.Do(this)
    return updateContactPhoneNumbersAction.response;
  }
}

