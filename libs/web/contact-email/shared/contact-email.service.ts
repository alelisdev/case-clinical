
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { ContactEmail, UserCreateContactEmailInput, UserUpdateContactEmailInput, UpdateResult, Contact } from "@case-clinical/shared/util/sdk";
import { ContactEmailBusinessProviderService } from "./contact-email.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class ContactEmailService extends ServiceBase {
 constructor(
  @Inject(ContactEmailBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: ContactEmailBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("ContactEmailService", loggingService, serviceContext);
 }

    createContactEmail(input: UserCreateContactEmailInput): Observable<ContactEmail> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createContactEmail(filteredObj);
    }

    updateContactEmail(input: UserUpdateContactEmailInput, contactEmailId: string): Observable<ContactEmail> {
        return this.businessProvider.updateContactEmail(input, contactEmailId);
    }

    importContactEmails(contactEmails: UserUpdateContactEmailInput[]): Observable<UpdateResult> {
        return this.businessProvider.importContactEmails(contactEmails);
    }

    validateContactEmailExcelData(excelData: any[], contacts: Contact[]) {
      return this.businessProvider.validateContactEmailExcelData(excelData, contacts);
    }
}

