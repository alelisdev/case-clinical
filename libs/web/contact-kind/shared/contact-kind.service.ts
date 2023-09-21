
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { ContactKind, UserCreateContactKindInput, UserUpdateContactKindInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { ContactKindBusinessProviderService } from "./contact-kind.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class ContactKindService extends ServiceBase {
 constructor(
  @Inject(ContactKindBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: ContactKindBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("ContactKindService", loggingService, serviceContext);
 }

    createContactKind(input: UserCreateContactKindInput): Observable<ContactKind> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createContactKind(filteredObj);
    }

    updateContactKind(input: UserUpdateContactKindInput, contactKindId: string): Observable<ContactKind> {
        return this.businessProvider.updateContactKind(input, contactKindId);
    }

    importContactKinds(contactKinds: UserUpdateContactKindInput[]): Observable<UpdateResult> {
        return this.businessProvider.importContactKinds(contactKinds);
    }

    validateContactKindExcelData(excelData: any[] ) {
      return this.businessProvider.validateContactKindExcelData(excelData );
    }
}

