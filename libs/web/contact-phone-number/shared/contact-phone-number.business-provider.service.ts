
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { ContactPhoneNumber, UserCreateContactPhoneNumberInput, UserUpdateContactPhoneNumberInput, UpdateResult, Country, Contact } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateContactPhoneNumberExcelDataAction } from './actions/validate-contact-phone-number-excel-data.action'
import { CreateContactPhoneNumberAction } from './actions/create-contact-phone-number.action'
import { UpdateContactPhoneNumbersAction, UpdateContactPhoneNumberAction } from './actions/update-contact-phone-numbers.action'


@Injectable({providedIn: 'root'})
export class ContactPhoneNumberBusinessProviderService extends ServiceBase {
  constructor(
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
  
  importContactPhoneNumbers(contactPhoneNumbers: UserUpdateContactPhoneNumberInput[]): Observable<UpdateResult> {
    const updateContactPhoneNumbersAction = new UpdateContactPhoneNumbersAction(contactPhoneNumbers);
    updateContactPhoneNumbersAction.Do(this)
    return updateContactPhoneNumbersAction.response;
  }

  validateContactPhoneNumberExcelData(excelData: any[], countries: Country[], contacts: Contact[]) {
    const validateContactPhoneNumberExcelDataAction = new ValidateContactPhoneNumberExcelDataAction(excelData, countries, contacts);
    validateContactPhoneNumberExcelDataAction.Do(this)
    return validateContactPhoneNumberExcelDataAction.response;
  }
}

