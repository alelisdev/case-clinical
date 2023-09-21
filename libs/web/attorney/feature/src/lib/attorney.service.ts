
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Attorney, UserCreateAttorneyInput, UserUpdateAttorneyInput } from "@case-clinical/shared/util/sdk";
import { AttorneyBusinessProviderService } from "./business/attorney.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class AttorneyService extends ServiceBase {
 constructor(
  @Inject(AttorneyBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: AttorneyBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("AttorneyService", loggingService, serviceContext);
 }

    createAttorney(input: UserCreateAttorneyInput): Observable<Attorney> {
        return this.businessProvider.createAttorney(input);
    }

    updateAttorney(input: UserUpdateAttorneyInput, attorneyId: string): Observable<Attorney> {
        return this.businessProvider.updateAttorney(input, attorneyId);
    }

    importAttorneys(attorneys: UserUpdateAttorneyInput[]): Observable<boolean> {
        return this.businessProvider.importAttorneys(attorneys);
    }
}

