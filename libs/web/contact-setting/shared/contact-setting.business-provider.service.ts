
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { ContactSetting, UserCreateContactSettingInput, UserUpdateContactSettingInput, UpdateResult, Contact, Integration } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateContactSettingExcelDataAction } from './actions/validate-contact-setting-excel-data.action'
import { CreateContactSettingAction } from './actions/create-contact-setting.action'
import { UpdateContactSettingsAction, UpdateContactSettingAction } from './actions/update-contact-settings.action'


@Injectable({providedIn: 'root'})
export class ContactSettingBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.ContactSettingBusinessProviderService', logger, serviceContext)
  }

  createContactSetting(input: UserCreateContactSettingInput): Observable<ContactSetting> {
    const action = new CreateContactSettingAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateContactSetting(input: UserUpdateContactSettingInput, contactSettingId: string): Observable<ContactSetting> {
    const action = new UpdateContactSettingAction(input, contactSettingId); 
    action.Do(this);
    return action.response;   
  }
  
  importContactSettings(contactSettings: UserUpdateContactSettingInput[]): Observable<UpdateResult> {
    const updateContactSettingsAction = new UpdateContactSettingsAction(contactSettings);
    updateContactSettingsAction.Do(this)
    return updateContactSettingsAction.response;
  }

  validateContactSettingExcelData(excelData: any[], contacts: Contact[], integrations: Integration[]) {
    const validateContactSettingExcelDataAction = new ValidateContactSettingExcelDataAction(excelData, contacts, integrations);
    validateContactSettingExcelDataAction.Do(this)
    return validateContactSettingExcelDataAction.response;
  }
}

