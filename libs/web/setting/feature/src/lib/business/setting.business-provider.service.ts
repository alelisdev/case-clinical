
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateSettingAction} from './actions/create-setting.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {Setting, UserCreateSettingInput, UserUpdateSettingInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateSettingsAction, UpdateSettingAction } from './actions/update-settings.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class SettingBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.SettingBusinessProviderService', logger, serviceContext)
  }

  createSetting(input: UserCreateSettingInput): Observable<Setting> {
    const action = new CreateSettingAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateSetting(input: UserUpdateSettingInput, settingId: string): Observable<Setting> {
    const action = new UpdateSettingAction(input, settingId); 
    action.Do(this);
    return action.response;   
  }
  
  importSettings(settings: UserUpdateSettingInput[]): Observable<boolean> {
    const updateSettingsAction = new UpdateSettingsAction(settings);
    updateSettingsAction.Do(this)
    return updateSettingsAction.response;
  }
}

