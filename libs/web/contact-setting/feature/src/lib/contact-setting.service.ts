
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { ContactSetting, UserCreateContactSettingInput, UserUpdateContactSettingInput } from "@case-clinical/shared/util/sdk";
import { ContactSettingBusinessProviderService } from "./business/contact-setting.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class ContactSettingService extends ServiceBase {
 constructor(
  @Inject(ContactSettingBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: ContactSettingBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("ContactSettingService", loggingService, serviceContext);
 }

    createContactSetting(input: UserCreateContactSettingInput): Observable<ContactSetting> {
        return this.businessProvider.createContactSetting(input);
    }

    updateContactSetting(input: UserUpdateContactSettingInput, contactSettingId: string): Observable<ContactSetting> {
        return this.businessProvider.updateContactSetting(input, contactSettingId);
    }

    importContactSettings(contactSettings: UserUpdateContactSettingInput[]): Observable<boolean> {
        return this.businessProvider.importContactSettings(contactSettings);
    }
}

