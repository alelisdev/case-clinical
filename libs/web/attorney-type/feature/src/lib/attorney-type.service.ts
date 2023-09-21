
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { AttorneyType, UserCreateAttorneyTypeInput, UserUpdateAttorneyTypeInput } from "@case-clinical/shared/util/sdk";
import { AttorneyTypeBusinessProviderService } from "./business/attorney-type.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class AttorneyTypeService extends ServiceBase {
 constructor(
  @Inject(AttorneyTypeBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: AttorneyTypeBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("AttorneyTypeService", loggingService, serviceContext);
 }

    createAttorneyType(input: UserCreateAttorneyTypeInput): Observable<AttorneyType> {
        return this.businessProvider.createAttorneyType(input);
    }

    updateAttorneyType(input: UserUpdateAttorneyTypeInput, attorneyTypeId: string): Observable<AttorneyType> {
        return this.businessProvider.updateAttorneyType(input, attorneyTypeId);
    }

    importAttorneyTypes(attorneyTypes: UserUpdateAttorneyTypeInput[]): Observable<boolean> {
        return this.businessProvider.importAttorneyTypes(attorneyTypes);
    }
}

