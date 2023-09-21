
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Contact, UserCreateContactInput, UserUpdateContactInput } from "@case-clinical/shared/util/sdk";
import { ContactBusinessProviderService } from "./business/contact.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class ContactService extends ServiceBase {
 constructor(
  @Inject(ContactBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: ContactBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("ContactService", loggingService, serviceContext);
 }

    createContact(input: UserCreateContactInput): Observable<Contact> {
        return this.businessProvider.createContact(input);
    }

    updateContact(input: UserUpdateContactInput, contactId: string): Observable<Contact> {
        return this.businessProvider.updateContact(input, contactId);
    }

    importContacts(contacts: UserUpdateContactInput[]): Observable<boolean> {
        return this.businessProvider.importContacts(contacts);
    }
}

