
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { AccidentType, UserCreateAccidentTypeInput, UserUpdateAccidentTypeInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { AccidentTypeBusinessProviderService } from "./accident-type.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class AccidentTypeService extends ServiceBase {
 constructor(
  @Inject(AccidentTypeBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: AccidentTypeBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("AccidentTypeService", loggingService, serviceContext);
 }

    createAccidentType(input: UserCreateAccidentTypeInput): Observable<AccidentType> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createAccidentType(filteredObj);
    }

    updateAccidentType(input: UserUpdateAccidentTypeInput, accidentTypeId: string): Observable<AccidentType> {
        return this.businessProvider.updateAccidentType(input, accidentTypeId);
    }

    importAccidentTypes(accidentTypes: UserUpdateAccidentTypeInput[]): Observable<UpdateResult> {
        return this.businessProvider.importAccidentTypes(accidentTypes);
    }

    validateAccidentTypeExcelData(excelData: any[] ) {
      return this.businessProvider.validateAccidentTypeExcelData(excelData );
    }
}

