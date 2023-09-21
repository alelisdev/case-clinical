
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Attorney, UserCreateAttorneyInput, UserUpdateAttorneyInput, UpdateResult, Firm, AttorneyStatus, AttorneyType } from "@case-clinical/shared/util/sdk";
import { AttorneyBusinessProviderService } from "./attorney.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
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
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createAttorney(filteredObj);
    }

    updateAttorney(input: UserUpdateAttorneyInput, attorneyId: string): Observable<Attorney> {
        return this.businessProvider.updateAttorney(input, attorneyId);
    }

    importAttorneys(attorneys: UserUpdateAttorneyInput[]): Observable<UpdateResult> {
        return this.businessProvider.importAttorneys(attorneys);
    }

    validateAttorneyExcelData(excelData: any[], firms: Firm[], attorneyStatuses: AttorneyStatus[], attorneyTypes: AttorneyType[]) {
      return this.businessProvider.validateAttorneyExcelData(excelData, firms, attorneyStatuses, attorneyTypes);
    }
}

