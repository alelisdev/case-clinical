
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Setting, UserCreateSettingInput, UserUpdateSettingInput, UpdateResult, User } from "@case-clinical/shared/util/sdk";
import { SettingBusinessProviderService } from "./setting.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
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
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createSetting(filteredObj);
    }

    updateSetting(input: UserUpdateSettingInput, settingId: string): Observable<Setting> {
        return this.businessProvider.updateSetting(input, settingId);
    }

    importSettings(settings: UserUpdateSettingInput[]): Observable<UpdateResult> {
        return this.businessProvider.importSettings(settings);
    }

    validateSettingExcelData(excelData: any[], users: User[]) {
      return this.businessProvider.validateSettingExcelData(excelData, users);
    }
}

