
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateContactSettingAction} from './actions/create-contact-setting.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {ContactSetting, UserCreateContactSettingInput, UserUpdateContactSettingInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateContactSettingsAction, UpdateContactSettingAction } from './actions/update-contact-settings.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class ContactSettingBusinessProviderService extends ServiceBase {constructor(
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
  
  importContactSettings(contactSettings: UserUpdateContactSettingInput[]): Observable<boolean> {
    const updateContactSettingsAction = new UpdateContactSettingsAction(contactSettings);
    updateContactSettingsAction.Do(this)
    return updateContactSettingsAction.response;
  }
}

