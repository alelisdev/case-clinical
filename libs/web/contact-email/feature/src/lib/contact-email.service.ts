
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { ContactEmail, UserCreateContactEmailInput, UserUpdateContactEmailInput } from "@case-clinical/shared/util/sdk";
import { ContactEmailBusinessProviderService } from "./business/contact-email.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
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
        return this.businessProvider.createContactEmail(input);
    }

    updateContactEmail(input: UserUpdateContactEmailInput, contactEmailId: string): Observable<ContactEmail> {
        return this.businessProvider.updateContactEmail(input, contactEmailId);
    }

    importContactEmails(contactEmails: UserUpdateContactEmailInput[]): Observable<boolean> {
        return this.businessProvider.importContactEmails(contactEmails);
    }
}

