
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { ContactSetting, UserCreateContactSettingInput, UserUpdateContactSettingInput, UpdateResult, Contact, Integration } from "@case-clinical/shared/util/sdk";
import { ContactSettingBusinessProviderService } from "./contact-setting.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
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
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createContactSetting(filteredObj);
    }

    updateContactSetting(input: UserUpdateContactSettingInput, contactSettingId: string): Observable<ContactSetting> {
        return this.businessProvider.updateContactSetting(input, contactSettingId);
    }

    importContactSettings(contactSettings: UserUpdateContactSettingInput[]): Observable<UpdateResult> {
        return this.businessProvider.importContactSettings(contactSettings);
    }

    validateContactSettingExcelData(excelData: any[], contacts: Contact[], integrations: Integration[]) {
      return this.businessProvider.validateContactSettingExcelData(excelData, contacts, integrations);
    }
}

