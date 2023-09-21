
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Setting, UserCreateSettingInput, UserUpdateSettingInput } from "@case-clinical/shared/util/sdk";
import { SettingBusinessProviderService } from "./business/setting.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class SettingService extends ServiceBase {
 constructor(
  @Inject(SettingBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: SettingBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("SettingService", loggingService, serviceContext);
 }

    createSetting(input: UserCreateSettingInput): Observable<Setting> {
        return this.businessProvider.createSetting(input);
    }

    updateSetting(input: UserUpdateSettingInput, settingId: string): Observable<Setting> {
        return this.businessProvider.updateSetting(input, settingId);
    }

    importSettings(settings: UserUpdateSettingInput[]): Observable<boolean> {
        return this.businessProvider.importSettings(settings);
    }
}

