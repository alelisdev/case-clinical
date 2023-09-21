
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { Setting, UserCreateSettingInput, UserUpdateSettingInput, UpdateResult, User } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateSettingExcelDataAction } from './actions/validate-setting-excel-data.action'
import { CreateSettingAction } from './actions/create-setting.action'
import { UpdateSettingsAction, UpdateSettingAction } from './actions/update-settings.action'


@Injectable({providedIn: 'root'})
export class SettingBusinessProviderService extends ServiceBase {
  constructor(
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
  
  importSettings(settings: UserUpdateSettingInput[]): Observable<UpdateResult> {
    const updateSettingsAction = new UpdateSettingsAction(settings);
    updateSettingsAction.Do(this)
    return updateSettingsAction.response;
  }

  validateSettingExcelData(excelData: any[], users: User[]) {
    const validateSettingExcelDataAction = new ValidateSettingExcelDataAction(excelData, users);
    validateSettingExcelDataAction.Do(this)
    return validateSettingExcelDataAction.response;
  }
}

