
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { AccidentType, UserCreateAccidentTypeInput, UserUpdateAccidentTypeInput } from "@case-clinical/shared/util/sdk";
import { AccidentTypeBusinessProviderService } from "./business/accident-type.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
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
        return this.businessProvider.createAccidentType(input);
    }

    updateAccidentType(input: UserUpdateAccidentTypeInput, accidentTypeId: string): Observable<AccidentType> {
        return this.businessProvider.updateAccidentType(input, accidentTypeId);
    }

    importAccidentTypes(accidentTypes: UserUpdateAccidentTypeInput[]): Observable<boolean> {
        return this.businessProvider.importAccidentTypes(accidentTypes);
    }
}

