
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { ContactPhoneNumber, UserCreateContactPhoneNumberInput, UserUpdateContactPhoneNumberInput } from "@case-clinical/shared/util/sdk";
import { ContactPhoneNumberBusinessProviderService } from "./business/contact-phone-number.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class ContactPhoneNumberService extends ServiceBase {
 constructor(
  @Inject(ContactPhoneNumberBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: ContactPhoneNumberBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("ContactPhoneNumberService", loggingService, serviceContext);
 }

    createContactPhoneNumber(input: UserCreateContactPhoneNumberInput): Observable<ContactPhoneNumber> {
        return this.businessProvider.createContactPhoneNumber(input);
    }

    updateContactPhoneNumber(input: UserUpdateContactPhoneNumberInput, contactPhoneNumberId: string): Observable<ContactPhoneNumber> {
        return this.businessProvider.updateContactPhoneNumber(input, contactPhoneNumberId);
    }

    importContactPhoneNumbers(contactPhoneNumbers: UserUpdateContactPhoneNumberInput[]): Observable<boolean> {
        return this.businessProvider.importContactPhoneNumbers(contactPhoneNumbers);
    }
}

