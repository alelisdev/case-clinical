
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { ContactPhoneNumber, UserCreateContactPhoneNumberInput, UserUpdateContactPhoneNumberInput, UpdateResult, Country, Contact } from "@case-clinical/shared/util/sdk";
import { ContactPhoneNumberBusinessProviderService } from "./contact-phone-number.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
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
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createContactPhoneNumber(filteredObj);
    }

    updateContactPhoneNumber(input: UserUpdateContactPhoneNumberInput, contactPhoneNumberId: string): Observable<ContactPhoneNumber> {
        return this.businessProvider.updateContactPhoneNumber(input, contactPhoneNumberId);
    }

    importContactPhoneNumbers(contactPhoneNumbers: UserUpdateContactPhoneNumberInput[]): Observable<UpdateResult> {
        return this.businessProvider.importContactPhoneNumbers(contactPhoneNumbers);
    }

    validateContactPhoneNumberExcelData(excelData: any[], countries: Country[], contacts: Contact[]) {
      return this.businessProvider.validateContactPhoneNumberExcelData(excelData, countries, contacts);
    }
}

