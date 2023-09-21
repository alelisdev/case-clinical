
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { ContactTag, UserCreateContactTagInput, UserUpdateContactTagInput } from "@case-clinical/shared/util/sdk";
import { ContactTagBusinessProviderService } from "./business/contact-tag.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class ContactTagService extends ServiceBase {
 constructor(
  @Inject(ContactTagBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: ContactTagBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("ContactTagService", loggingService, serviceContext);
 }

    createContactTag(input: UserCreateContactTagInput): Observable<ContactTag> {
        return this.businessProvider.createContactTag(input);
    }

    updateContactTag(input: UserUpdateContactTagInput, contactTagId: string): Observable<ContactTag> {
        return this.businessProvider.updateContactTag(input, contactTagId);
    }

    importContactTags(contactTags: UserUpdateContactTagInput[]): Observable<boolean> {
        return this.businessProvider.importContactTags(contactTags);
    }
}

