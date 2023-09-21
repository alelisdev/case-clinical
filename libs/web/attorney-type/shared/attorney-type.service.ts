
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { AttorneyType, UserCreateAttorneyTypeInput, UserUpdateAttorneyTypeInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { AttorneyTypeBusinessProviderService } from "./attorney-type.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
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
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createAttorneyType(filteredObj);
    }

    updateAttorneyType(input: UserUpdateAttorneyTypeInput, attorneyTypeId: string): Observable<AttorneyType> {
        return this.businessProvider.updateAttorneyType(input, attorneyTypeId);
    }

    importAttorneyTypes(attorneyTypes: UserUpdateAttorneyTypeInput[]): Observable<UpdateResult> {
        return this.businessProvider.importAttorneyTypes(attorneyTypes);
    }

    validateAttorneyTypeExcelData(excelData: any[] ) {
      return this.businessProvider.validateAttorneyTypeExcelData(excelData );
    }
}

